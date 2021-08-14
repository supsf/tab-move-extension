//Getting the last focused window to move the tab in it
var tab_id;
var current_window_id;
var last_window_id;

//Keep the last chrome windowId to move the tab in it
chrome.windows.onFocusChanged.addListener(function(windowId){
  if (windowId != -1){
    last_window_id = current_window_id;
    current_window_id = windowId;
  }
});

//Listening the shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command == "move") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tab){
      tab_id = tab[0].id;
      move(tab_id, last_window_id);
    });
  }
});

//Moving the tab to another chrome window
function move(tabId, last_window_id) {
    chrome.tabs.move(tabId, {index: -1, windowId: last_window_id});
    //Focuses to the tab you move
    chrome.tabs.update(tabId, {active: true});
    console.log('Success.');
}
