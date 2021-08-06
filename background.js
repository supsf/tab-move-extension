chrome.tabs.onActivated.addListener(activeInfo => move(activeInfo));
chrome.windows.getCurrent((window) => console.log(window.id));

async function move(activeInfo) {
  try {
      await chrome.tabs.move(activeInfo.tabId, {index: 0});
      console.log('Success.');
    } 
    catch (error) {
    if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
      setTimeout(() => move(activeInfo), 50);
      console.log("error happend");
    }
  }
}
