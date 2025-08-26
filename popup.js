document.addEventListener('DOMContentLoaded', () => {
  const clearButton = document.getElementById('clearButton');
  const statusDiv = document.getElementById('status');

  clearButton.addEventListener('click', () => {
    const removalOptions = {
      "origins": ["https://pixlr.com/"]
    };
    
    const dataToRemove = {
      "localStorage": true
    };

    chrome.browsingData.remove(removalOptions, dataToRemove, () => {
      chrome.tabs.query({url: "*://*.pixlr.com/*"}, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.id) {
            chrome.tabs.reload(tab.id);
          }
        });
      });

      statusDiv.textContent = 'Successful.';
            setTimeout(() => window.close(), 1500);
    });
  });
});