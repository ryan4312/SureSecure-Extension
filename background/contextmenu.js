function getword(info,tab) {
  console.log("Word " + info.selectionText + " was clicked.");
  chrome.tabs.create({  
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

















/**
 * Add context menu entry for filling in username + password
 */
browser.contextMenus.create({
	title: "Fill User + Pass",
	contexts: ["all"],
	onclick: getword
});

/*
	Add context menu entry for entering username into the selected field
*/
browser.contextMenus.create({
	title: "Fill Username",
	contexts: ["all"],
	onclick: sendUsername
});

/*
T	Add context menu entry for entering password into the selected field
*/
browser.contextMenus.create({
	title: "Fill Password",
	contexts: ["all"],
	onclick: getword
});

function sendUsername(request, sender,   sendResponse) {
  console.log("Attempted to send username");
  const usernameElements = document.querySelectorAll(`input[type="text"]`);
  
  usernameElements.forEach(username => username.value = request.user);
}




