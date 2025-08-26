document.addEventListener('DOMContentLoaded', () => {
  const clearButton = document.getElementById('clearButton');
  const statusDiv = document.getElementById('status');

  clearButton.addEventListener('click', () => {
    // Define the website origin to remove data from
    const removalOptions = {
      "origins": ["https://pixlr.com/"]
    };
    
    // Specify that we are removing local storage data
    const dataToRemove = {
      "localStorage": true
    };

    // Call the Chrome API to remove the browsing data
    chrome.browsingData.remove(removalOptions, dataToRemove, () => {
      // Find all tabs with the pixlr.com URL and reload them
      chrome.tabs.query({url: "*://*.pixlr.com/*"}, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.id) {
            chrome.tabs.reload(tab.id);
          }
        });
      });

      statusDiv.textContent = 'Storage cleared & page reloaded!';
      
      // Close the popup after a short delay for better UX
      setTimeout(() => window.close(), 1500);
    });
  });
});