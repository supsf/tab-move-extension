//listening the event
chrome.tabs.onMoved.addListener((tabId) => move(tabId));
chrome.windows.getCurrent((window) => console.log(window.id));

//moving the tab to another chrome window
async function move(tabId) {
  try {
      await chrome.tabs.move(tabId, {index: -1, windowId: 1});
      console.log('Success.');
    } 
    catch (error) {
    if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
      setTimeout(() => move(tabId), 50);
      console.log("error happend");
    }
  }
}