//getting the last focused window to move the tab in it
var tab_id;
var current_window_id;
var last_window_id;
var last_window_id_keeper;
//we need a buffer because, getLastFocused's callback function chaging the variable back after callback function ends (really don't know why)
chrome.windows.onFocusChanged.addListener(function(windowId){
  last_window_id_keeper = last_window_id;
  if (current_window_id == -1) {
    last_window_id = last_window_id_keeper;
  }
  else {
    last_window_id = current_window_id;
  }
  current_window_id = windowId;
  console.log(last_window_id_keeper + " last keeper (l)");
  console.log(last_window_id + " last (l)");
  console.log(current_window_id + " current (l)");
});

//listening the shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command == "move") {
    if(current_window_id == -1 && last_window_id_keeper != -1) {
      last_window_id = last_window_id_keeper;
    }
    move(tab_id, last_window_id);
    console.log(last_window_id_keeper + " last keeper (c)");
    console.log(last_window_id + " last (c)");
    console.log(current_window_id + " current (c)");
  }
});

//moving the tab to another chrome window (eğer async yapmak istersen async ve await ekle)
function move(tabId, last_window_id) {
    chrome.tabs.query({active: true, currentWindow: true}, (tab) => tab_id = tab[0].id);
    chrome.tabs.move(tabId, {index: -1, windowId: last_window_id});
    console.log('Success.');
}
