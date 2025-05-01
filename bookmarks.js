chrome.storage.local.get("bookmarks", (result) => {
  const bookmarks = result.bookmarks || [];
  const list = document.getElementById("bookmarkList");

  if (bookmarks.length === 0) {
    list.innerHTML = "<li>No bookmarks yet.</li>";
    return;
  }

  bookmarks.forEach((bookmark, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="${bookmark.url}" target="_blank">${bookmark.repo}</a><br/>
      <small>${bookmark.notes || ''}</small><br/>
      <button data-index="${index}">❌ Delete</button>
    `;

    list.appendChild(li);
  });

  // Event delegation: handle delete clicks
  list.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const idx = parseInt(e.target.getAttribute("data-index"));
      bookmarks.splice(idx, 1); // remove item
      chrome.storage.local.set({ bookmarks }, () => {
        location.reload(); // refresh list
      });
    }
  });
});
