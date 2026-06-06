const CACHE_NAME = 'saltanat-cache-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/royal.css',
  '/theme-manager.js',
  '/favicon.png',
  '/logo.png',
  '/style.css'
];

self.addEventListener('install', (e) => {
  console.log('Saltanat App Service Worker Installed!');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  console.log('Saltanat App Service Worker Active!');
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Only cache GET requests originating from our origin
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip caching for Firebase Auth/Database/AdSense connections
  if (e.request.url.includes('googleapis.com') || e.request.url.includes('firebasejs') || e.request.url.includes('googlesyndication.com')) {
    return;
  }

  e.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(e.request).then((cachedResponse) => {
        const fetchedResponse = fetch(e.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            cache.put(e.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          return cachedResponse;
        });
        return cachedResponse || fetchedResponse;
      });
    })
  );
});
