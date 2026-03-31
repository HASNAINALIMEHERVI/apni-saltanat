self.addEventListener('install', (e) => {
  console.log('Saltanat App Installed!');
});

self.addEventListener('fetch', (e) => {
  // Filhal ye sirf basic functionality ke liye hai
  e.respondWith(fetch(e.request));
});