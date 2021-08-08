//getting the last focused window to move the tab in it
var tab_id;
var current_window_id;
var last_window_id;
var last_window_id_keeper;
//we need a buffer because, getLastFocused's callback function chaging the variable back after callback function ends (really don't know why)
chrome.windows.onFocusChanged.addListener(function(windowId){
  chrome.windows.getLastFocused((window) => buffer_last_window_id = window.id);
  current_window_id = windowId;
  last_window_id = buffer_last_window_id;
  console.log(last_window_id + " last");
  console.log(current_window_id + " current");
});

//listening the shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command == "move"){
    after_command();
    console.log(last_window_id_keeper + " last_kepper");
    console.log(last_window_id + " last");
    console.log(current_window_id + " current");
  }
});

function after_command() {
  chrome.tabs.query({active: true, currentWindow: true}, (tab) => tab_id = tab[0].id);
  if (current_window_id != -1)
  {
    last_window_id_keeper = last_window_id;
  }
  else
  {
    last_window_id = last_window_id_keeper;
  }
  move(tab_id, last_window_id);
}

//moving the tab to another chrome window
function move(tabId, last_window_id) {
    chrome.tabs.move(tabId, {index: -1, windowId: last_window_id});
    console.log('Success.');
}

//moving the tab to another chrome window (older version)
//async function async_move(tabId, last_window_id) {
//  try {
//      await chrome.tabs.move(tabId, {index: -1, windowId: last_window_id});
//      console.log('Success.');
//    } 
//    catch (error) {
//    if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
//      setTimeout(() => async_move(tabId), 50);
//      console.log("error happend");
//    }
//  }
//}
