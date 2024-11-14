// background.js

let mediaFiles = [];

// Listen for completed web requests and filter media types
chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (details.type === "media") {
      mediaFiles.push({
        url: details.url,
        filename: decodeURIComponent(details.url.split('/').pop().split('?')[0]),
      });
    }
  },
  { urls: ["<all_urls>"] }
);

// Handle messages from popup scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getMediaFiles") {
    sendResponse(mediaFiles);
  } else if (request.action === "clearMediaFiles") {
    mediaFiles = [];
    sendResponse({ success: true });
  }
});
