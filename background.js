// Set the initial state of dark mode when the extension is installed.
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ darkModeEnabled: false });
  });
  