document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle-dark-mode');  // Get the toggle switch element.
  
    // Retrieve the current dark mode setting from storage.
    chrome.storage.sync.get('darkModeEnabled', (data) => {
      toggle.checked = data.darkModeEnabled;  // Set the toggle switch based on the stored setting.
    });
  
    // Add an event listener to the toggle switch.
    toggle.addEventListener('change', () => {
      const isEnabled = toggle.checked;  // Get the current state of the toggle switch.
      chrome.storage.sync.set({ darkModeEnabled: isEnabled });  // Save the new state to storage.
  
      // Send a message to the content script to enable/disable dark mode.
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { darkModeEnabled: isEnabled });
      });
    });
  });
  