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






