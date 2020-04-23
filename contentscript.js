//This script allows us to modify the active tab, in this case to find the username/password elements on the page and fill them with the values passed from popup.js
browser.runtime.onMessage.addListener(function(request, sender,   sendResponse) { 
      

	 const usernameElements = document.querySelectorAll(`input[type="text"], input[type="email"]`);			//Get all of the text input fields to enter username into
	 const passwordElements = document.querySelectorAll(`input[type="password"]`);		//Get all of the password input fields to enter password into

	 usernameElements.forEach(username => username.value = request.user);				//For each of those, input the value as passed from popup.js
	 passwordElements.forEach(password => password.value = request.pass);
});




var clickedEl = null;
document.addEventListener("mousedown", function (event) {
  //right click
  if (event.button == 2) {
    clickedEl = event.target;
  }
}, true);
browser.runtime.onMessage.addListener(function (request) {
  clickedEl.value = request.text;
});