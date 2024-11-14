// popup.js

// Function to create a list item
function createListItem(file) {
  const li = document.createElement("li");

  const link = document.createElement("a");
  link.href = file.url;
  link.download = file.filename;
  link.textContent = file.filename;

  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Download";
  downloadButton.style.marginLeft = "10px";
  downloadButton.style.padding = "5px 10px";
  downloadButton.style.backgroundColor = "#34a853";
  downloadButton.style.border = "none";
  borderRadius = "4px";
  downloadButton.style.borderRadius = "4px";
  downloadButton.style.color = "white";
  downloadButton.style.cursor = "pointer";

  downloadButton.addEventListener("click", () => {
    chrome.downloads.download({ url: file.url, filename: file.filename });
  });

  li.appendChild(link);
  li.appendChild(downloadButton);
  return li;
}

// Function to load and display media files
function loadMediaFiles() {
  chrome.runtime.sendMessage({ action: "getMediaFiles" }, (mediaFiles) => {
    const mediaList = document.getElementById("mediaList");
    mediaList.innerHTML = "";

    if (mediaFiles.length === 0) {
      const emptyMessage = document.createElement("li");
      emptyMessage.textContent = "No media files captured.";
      emptyMessage.style.textAlign = "center";
      emptyMessage.style.color = "#777";
      mediaList.appendChild(emptyMessage);
      return;
    }

    // Sort media files alphabetically by filename
    mediaFiles.sort((a, b) => a.filename.localeCompare(b.filename));

    mediaFiles.forEach((file) => {
      const li = createListItem(file);
      mediaList.appendChild(li);
    });
  });
}

// Event listener for the "Clear List" button
document.getElementById("clearButton").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "clearMediaFiles" }, (response) => {
    if (response.success) {
      loadMediaFiles();
    } else {
      console.error("Failed to clear media files.");
    }
  });
});

// Event listener for the "Refresh" button
document.getElementById("refreshButton").addEventListener("click", () => {
  loadMediaFiles();
});

// Initial load
document.addEventListener("DOMContentLoaded", loadMediaFiles);
