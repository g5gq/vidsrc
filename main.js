function searchResults(query) {
  const searchUrl = `https://vidsrc.to/search?query=${encodeURIComponent(query)}`;
  
  return fetch(searchUrl)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const items = [];
      
      doc.querySelectorAll('.movie-item').forEach(item => {
        const title = item.querySelector('h3 a').textContent.trim();
        const link = item.querySelector('h3 a').href;
        const image = item.querySelector('img').src;

        items.push({
          title: title,
          url: link,
          image: image,
        });
      });

      return items;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      return [];
    });
}

function extractDetails(url) {
  return fetch(url)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const title = doc.querySelector('h1').textContent;
      const description = doc.querySelector('.description').textContent;
      const imageUrl = doc.querySelector('img').src;

      return {
        title,
        description,
        imageUrl,
      };
    });
}

function extractStreamUrl(url) {
  return fetch(url)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const streamUrl = doc.querySelector('video').src;
      return streamUrl;
    });
}

function search(query) {
  return searchResults(query).then(results => ({
    results,
  }));
}
