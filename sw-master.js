// Apni Saltanat Consolidated Service Worker (sw-master.js)
// Handles caching, PWA installation, Fetch, and Firebase Background Messaging

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCsIZ_H0sJddEkiPHfuMPlLNvjxn-1Jzbc",
  authDomain: "apnisaltanat.com",
  databaseURL: "https://apni-saltanat-default-rtdb.firebaseio.com",
  projectId: "apni-saltanat",
  storageBucket: "apni-saltanat.firebasestorage.app",
  messagingSenderId: "691941073239",
  appId: "1:691941073239:web:9e0b568eccc347a0c0de12"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const CACHE_NAME = 'saltanat-cache-v5';
const ASSETS = [
  '/',
  '/index.html',
  '/royal.css',
  '/theme-manager.js',
  '/favicon.png',
  '/logo.png',
  '/style.css'
];

// 1. PWA Installation & Cache Setup
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

// 2. Fetch Handling (Stale-While-Revalidate caching strategy)
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip caching third party firebase libraries or external calls
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

// 3. Background Notification Handling
messaging.onBackgroundMessage((payload) => {
  console.log('[sw-master.js] Background Message Received:', payload);

  const notificationTitle = payload.notification.title || "New Order Received!";
  const nData = payload.data || {};
  
  const notificationOptions = {
    body: payload.notification.body || "Check your dashboard for details.",
    icon: '/favicon.png', 
    badge: '/favicon.png',
    image: nData.image || payload.notification.image || '/royal_order_banner.png',
    vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450],
    data: {
      ...nData,
      url: nData.click_action || '/seller-dashboard.html'
    },
    actions: [
        { action: 'view', title: 'VIEW DASHBOARD 👑', icon: '/favicon.png' },
        { action: 'dismiss', title: 'DISMISS' }
    ],
    requireInteraction: true,
    tag: 'royal-order-' + (nData.orderId || Date.now())
  };

  if ('setAppBadge' in navigator) {
    navigator.setAppBadge(1).catch((error) => {
      console.error('Badging API error:', error);
    });
  }

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle Notification Clicks
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const action = event.action;
  const targetUrl = notification.data.url || '/seller-dashboard.html';

  notification.close();

  if (action === 'dismiss') {
      console.log('Notification dismissed by Seller.');
      return;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('seller-dashboard.html') && 'focus' in client) {
            return client.focus();
        }
      }
      if (clients.openWindow) {
          return clients.openWindow(targetUrl);
      }
    })
  );
});
