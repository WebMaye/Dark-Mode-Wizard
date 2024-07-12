// Listen for messages from the popup script.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.darkModeEnabled !== undefined) {
      if (request.darkModeEnabled) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
  });
  
  function enableDarkMode() {
    // Apply dark mode by inverting colors on the entire document
    document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
  
    // Select all media elements (images and videos)
    const media = document.querySelectorAll('img, video, picture, iframe');
    
    // Reset filter for media elements to preserve original appearance
    media.forEach((mediaItem) => {
      mediaItem.style.filter = 'invert(1) hue-rotate(180deg)';
    });
  
    // Observe changes in the DOM to apply filters to dynamically loaded media elements
    const observer = new MutationObserver(() => {
      const media = document.querySelectorAll('img, video, picture, iframe');
      media.forEach((mediaItem) => {
        mediaItem.style.filter = 'invert(1) hue-rotate(180deg)';
      });
    });
  
    // Start observing the document for changes
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  function disableDarkMode() {
    // Remove the filter to disable dark mode
    document.documentElement.style.filter = '';
  
    // Select all media elements (images and videos)
    const media = document.querySelectorAll('img, video, picture, iframe');
    
    // Reset filter for media elements
    media.forEach((mediaItem) => {
      mediaItem.style.filter = '';
    });
  
    // Observe changes in the DOM to remove filters from dynamically loaded media elements
    const observer = new MutationObserver(() => {
      const media = document.querySelectorAll('img, video, picture, iframe');
      media.forEach((mediaItem) => {
        mediaItem.style.filter = '';
      });
    });
  
    // Start observing the document for changes
    observer.observe(document.body, { childList: true, subtree: true });
  }
  