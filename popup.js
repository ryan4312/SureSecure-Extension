window.onload=function(){
	//document.getElementById('server').value = "wss://echo.websocket.org/";
	

//Listener for the set button to send those values to the contentscript.js
 document.getElementById('buttonSet').addEventListener('click',function(){

//This whole bit here is how you send the information to the contentscript.js (message passing)
 browser.tabs.query({}, function(tabs) {
	 //passes the message to just the active tab
	browser.tabs.query({active: true, currentWindow: true}, function(tabs){
    browser.tabs.sendMessage(tabs[0].id, {user :document.getElementById('username').value,
										  pass :document.getElementById('pass').value}, function(response) {
							});  
	});
 
 }); 

 });
 
  
 }

/*
Listeners
*/ 
 document.getElementById('pairs').addEventListener('change',Func3);				//When you select an item from the dropdown it runs this function (currently set to immediately pass values to contentscript.js)
 document.getElementById('server').addEventListener('change',changeServer);		//When the server text box changes, disconnect and reconnect to the new server.
 document.getElementById('changeButton').addEventListener('click',changeVis);	//When the 'change me' button is clicked, run this function. (hides the output)
 document.getElementById('passVis').addEventListener('click',passVis);			//When the password visibility icon is clicked, run this function (change the icon, cleartext the pw)
 
  
 function changeVis(){															//Changes the visibility of the output div (hides it)
	 
  if (document.getElementById('output').style.display === "none") {
				document.getElementById('output').style.display = "block";			//Hide the section
				document.getElementById('changeButton').innerHTML="Hide Output"		//Change the button to "hide output"
				
			} else {
				document.getElementById('output').style.display = "none";			//Reveal the section
				document.getElementById('changeButton').innerHTML="Show Output"		//Change the button to "show output"
				
			}
 }
 
 function passVis(){
	 if(document.getElementById('passVis').classList == "fa fa-eye"){		//currently it is visible, we need to make it not visible
      	document.getElementById('passVis').classList = "fa fa-eye-slash";		//change the eye to the slashed out eye
		document.getElementById('pass').type ="password";							//change the password field from text (legible) to password (not legible)
      }
      else{																	//currently it is NOT visible, we need to make it visible
      	document.getElementById('passVis').classList ="fa fa-eye";				//change the eye-slash to regular eye
		document.getElementById('pass').type ="text";							//change the password field to a regular text field
      }
 }
 
 //This part handles the options
  function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  
  if (item.server) {
	var server = item.server 
	document.getElementById('server').value = server;
	testWebSocket(server);
  }
  
}

let getting = browser.storage.sync.get("server");
getting.then(onGot, onError);
 
 
 //
 
 
 
 
 ///////////////////////////////////////////////////////////////////////////////////////
 ///						Below is all the Websock Stuff							 ///
 ///////////////////////////////////////////////////////////////////////////////////////
 
 //Lets add the websock stuff here to see if it works
		//We created a text input for what server we want to connect to, lets try it.

 
       var wsUri = "wss://echo.websocket.org/";
	  //var wsUri = "ws://192.168.10.113:8080";
      var output;
	  var jsonObject;
		
      function init() {
         output = document.getElementById("output");
         //testWebSocket(wsUri);
      }
		
      function testWebSocket(server) {
         websocket = new WebSocket(server);			//this used to be wsUri (changed to test to the text input);
			
         websocket.onopen = function(evt) {
            onOpen(evt)
         };
		
         websocket.onmessage = function(evt) {
            onMessage(evt)
         };
		
         websocket.onerror = function(evt) {
            onError(evt)
         };
      }
		
		
		/*
		Thoughts:
		Every time the page is loaded, we should send a message to the web socket server.
		We can do this by calling this onOpen function on page load.
		Make sure to send the URL, well have to test that.
		*/
		
      function onOpen(evt) {					
         //writeToScreen("CONNECTED");
		 var pairs = [];			//Array to hold the objects, used for both part 1 and 2. Wont send properly formated JSON otherwise.
		 
		 var domain
		 	var obj ={										//We have to create the object
			url: "something"
		}
		 
		 //This part determines what the base url is and stores it in Domain
		 browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			var tab = tabs[0];
			var url = new URL(tab.url)
			domain = url.hostname
			// `domain` now has a value like 'example.com'
			alert(domain);
			obj.url=domain;
			pairs.push(obj);								//Add it to pairs (otherwise it wont send correct JSON)
			doSend(JSON.stringify(pairs));					//Send it
			
		})
		

		
	

      }
		
      function onMessage(evt) {				//what happens when we get a message
		//create a JSON object
		jsonObject = JSON.parse(evt.data);
		//var username = jsonObject.username;
		//var pass = jsonObject.pass;
			

		//Now that we have our array, we can populate the dropdown list
			var pairs = document.getElementById("pairs");		//find the element containing our selector
           
            //Add the Options to the DropDownList.
            for (var i = 0; i < jsonObject.length; i++) {
                var option = document.createElement("OPTION");
 
                //Set Customer Name in Text part.
                option.innerHTML = jsonObject[i].username;
 
                //Set CustomerId in Value part.
                option.value = jsonObject[i].username;		//was pass
 
                //Add the Option element to DropDownList.
                pairs.options.add(option);
            }
		  
         writeToScreen('<span style = "color: blue;">RESPONSE: ' +
            evt.data+'</span>'); 
			
			websocket.close();
      }

      function onError(evt) {
         writeToScreen('<span style="color: red;">ERROR: </span>unable to connect ');
      }
		
      function doSend(message) {
         writeToScreen("SENT: " + message); 
		 websocket.send(message);
      }
		
      function writeToScreen(message) {
         var pre = document.createElement("p"); 
         pre.style.wordWrap = "break-word"; 
         pre.innerHTML = message; 
		 output.appendChild(pre);
      }
		
      window.addEventListener("load", init, false);
	  
 ///////////////////////////////////////////////////////////////////////////////////////
 ///						END Websock Stuff							 			 ///
 ///////////////////////////////////////////////////////////////////////////////////////
	  

		
		
		function Func3(){										
			/*so my idea here is this:
			You click the fill button
			It determines what value is currently selected from the dropdown
			it matches that value to the one in the json object
			and then it fills the username/password field from the jsonobject
			*/
			
			//Determine what the value of the currently selected object from the dropdown
			var SelectorPair = document.getElementById("pairs").value;
			
			//alert("Were in Func3");
			
			//Now loop through the JsonObject and find the one that matches
			for (var i = 0; i < jsonObject.length; i++) {
				
				//alert("Testing: "+ jsonObject[i].username +" "+SelectorPair);					//for testing
				
				if(jsonObject[i].username == SelectorPair){										//If we did find a matching pair then we want to fill the username/pass field with these credentials (as they are taken from contentscript)
					//alert("Pair was found");													//for testing
					var username = jsonObject[i].username;										//variables that are sent via message passing
					var pw = jsonObject[i].pass;
					
					//This whole bit here is how you send the information to the contentscript.js (message passing) [sends the credentials to the active tab]
					browser.tabs.query({}, function(tabs) {
						//passes the message to just the active tab
						browser.tabs.query({active: true, currentWindow: true}, function(tabs){
							browser.tabs.sendMessage(tabs[0].id, {user : username,
																  pass : pw}, function(response) {
							});  
						});
 
					}); 
				
					document.getElementById("username").value = jsonObject[i].username;			//Fill the credentials on the popup.html page 
					document.getElementById("pass").value = jsonObject[i].pass;
				}
			}
			
		}
	
 function changeServer(){										//if we change the server
	var connectTo = document.getElementById('server').value;	//We get the value
	
	//We should check if it already contains the ws:// part, if not, we need to add it
	if(connectTo.includes("ws://")){							//It does include it, so do nothing
	}
	else if(connectTo.includes("wss://")){						//It does include it, so do nothing
	}
	else{														//otherwise, we have to add in the ws:// part.
		 connectTo = 'ws://' + connectTo;						//prepend ws://
	}
	 
	 alert('connecting to: ' + connectTo);						//Debugging	
		
	/*
		before we reconnect to the server, we have to:
		select the element 'output'
		get a list of children that were appended to it
		remove those children
	*/
	lastChild = document.getElementById("output").lastChild;
	//document.getElementById("output").removeChild(lastChild);
	document.getElementById("output").removeChild(lastChild);
	lastChild = document.getElementById("output").lastChild;
	document.getElementById("output").removeChild(lastChild);
	
	websocket.close();											//we should close the original connection
	testWebSocket(connectTo);									//reconnect to the server

 }
		
		

		
		
		
		
/*
Notes:

As of right now:
The application connects to a known web socket server. Sends JSON, and receives JSON.
The JSON receieved should be an array of objects with username/password.
We can use the popup.js to populate the dropdown on receiving the message from the web socket.

We can then select which username we wish to use, which will then run Func2 to compare that username to those found in the jsonObject array.
If found, it will put that information into the username/password field.
The user can then send that information to the current tab by pressing the Set Value button.   **Updated:: With the use of Func3, the selected pair from the dropdown is automatically passed to the active tab (message passing from popup.js -> contentscript.js)
The set value takes the values from the username/password field and sends (via messagepassing) those values to the contentscript.js where the information is injected into the page. (this part isnt necessary anymore)
Additionally there is a eye-slash button that allows you to view the password in the clear if desired.

Things we need to do:
1. Connect the extension to the application		
	--We have the ability to change servers
2. Clean it up a bit
3. Add context menu items


*/
 
	