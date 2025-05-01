chrome.storage.local.get("bookmarks", (result) => {
    const bookmarks = result.bookmarks || [];
    const list = document.getElementById("bookmarkList");
  
    if (bookmarks.length === 0) {
      list.innerHTML = "<li>No bookmarks yet.</li>";
      return;
    }
  
    bookmarks.forEach(({ repo, url, notes }) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${url}" target="_blank">${repo}</a><br/>
        <small>${notes || ''}</small>
      `;
      list.appendChild(li);
    });
  });
  