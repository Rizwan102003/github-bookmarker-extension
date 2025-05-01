// Extract repo info from the current tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    const match = url.match(/https:\/\/github\.com\/([^/]+)\/([^/]+)/);
  
    if (match) {
      const repoName = `${match[1]}/${match[2]}`;
      document.getElementById("repoName").textContent = repoName;
  
      document.getElementById("saveBtn").addEventListener("click", () => {
        const notes = document.getElementById("notes").value;
  
        chrome.storage.local.get(["bookmarks"], (result) => {
          const bookmarks = result.bookmarks || [];
          bookmarks.push({ repo: repoName, url, notes, timestamp: new Date() });
          chrome.storage.local.set({ bookmarks }, () => {
            alert("Bookmarked!");
          });
        });
      });
    } else {
      document.getElementById("repoName").textContent = "Not a GitHub repo page.";
    }
  });
  