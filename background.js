//Getting the last focused window to move the tab in it
var current_window_id;
var last_window_id;

//Keep the last chrome windowId to move the tab in it
chrome.windows.onFocusChanged.addListener(function(windowId) {
  if (!(windowId == -1 || windowId == current_window_id)) {
    last_window_id = current_window_id;
    current_window_id = windowId;
  }
});

//Listening the shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command == "move") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tab){
      move(tab[0].id, last_window_id);
    });
  }
});

//Moving the tab to another chrome window
function move(tabId, lastWindoowId) {
  //If there is only one window don't execute. 
  if (lastWindoowId != undefined) {
    chrome.tabs.move(tabId, {index: -1, windowId: lastWindoowId});
    //Focuses to the tab you move
    chrome.tabs.update(tabId, {active: true});
    console.log('Success.');
  }
}
