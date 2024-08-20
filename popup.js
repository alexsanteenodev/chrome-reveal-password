document.getElementById('reveal-btn').addEventListener('click', () => {
    // Sends a message to the content script to reveal passwords
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content.js']
        });
    });
});