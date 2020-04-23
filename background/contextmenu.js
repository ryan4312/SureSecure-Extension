/*

function getword(info,tab) {
  console.log("Word " + info.selectionText + " was clicked.");
  browser.tabs.create({  
    url: "http://www.google.com/search?q=" + info.selectionText
  });
}
browser.contextMenus.create({
  title: "Search: %s", 
  contexts:["selection"], 
  onclick: getword
});


browser.contextMenus.create({
  title: "Test", 
  contexts:["all"], 
  onclick: getword
});


browser.contextMenus.create({
  id: "separator-1",
  type: "separator",
  contexts: ["all"]
});

browser.contextMenus.create({
  id: "radio1",
  type: "radio",
  title: "radio1",
  contexts: ["all"],
  checked: true,
  
});

browser.contextMenus.create({
  id: "radio2",
  type: "radio",
  title: "radio2",
  contexts: ["all"],
  checked: false,
  
});

browser.contextMenus.create({
  id: "separator-2",
  type: "separator",
  contexts: ["all"]
});

var checkedState = true;

browser.contextMenus.create({
  id: "check-uncheck",
  type: "checkbox",
  title: "uncheck me",
  contexts: ["all"],
  checked: checkedState
});













function sendUsername(){
	//This whole bit here is how you send the information to the contentscript.js (message passing)
 browser.tabs.query({}, function(tabs) {
	 //passes the message to just the active tab
	browser.tabs.query({active: true, currentWindow: true}, function(tabs){
    browser.tabs.sendMessage(tabs[0].id, {user :"testUsername",
										  pass :"testValue"}, function(response) {
							});  
	});
 
 }); 
	
}



/**
 * Add context menu entry for filling in username + password
 
 
browser.contextMenus.create({
	title: "Fill User + Pass",
	contexts: ["all"],
	onclick: getword
});
*/

/*
	Add context menu entry for entering username into the selected field

browser.contextMenus.create({
	title: "Fill Username",
	contexts: ["all"],
	onclick: sendUsername
});
*/

/*
T	Add context menu entry for entering password into the selected field

browser.contextMenus.create({
	title: "Fill Password",
	contexts: ["all"],
	onclick: getword
});
*/
function popup(info,tab) {
  
 let createData = {
      type: "popup",
	  url: "generator.html",
	  height: 300,
	  width: 500,
	  
    };
    let creating = browser.windows.create(createData);
    creating.then(() => {
      console.log("The popup has been created");
    });
	
}
browser.contextMenus.create({
	title: "Open Password Generator",
	contexts: ["all"],
	onclick: popup
});


////////////////////Right click an input type menu

function mycallback(info, tab) {
  if (info.editable) {
	  var randomstring = Math.random().toString(36);
	  
    browser.tabs.sendMessage(tab.id, {
      "text": randomstring
    });
  }
}
browser.contextMenus.create({
  title: "Generate Random Password",
  contexts: ["editable"],
  onclick: mycallback
});






