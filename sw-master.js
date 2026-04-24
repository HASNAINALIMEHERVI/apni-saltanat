// Apni Saltanat Consolidated Service Worker (sw-master.js)
// Handles PWA installation, Fetch, and Firebase Background Messaging

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

// 1. PWA Installation
self.addEventListener('install', (e) => {
  console.log('Saltanat App Service Worker Installed!');
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log('Saltanat App Service Worker Active!');
});

// 2. Fetch Handling (Basic for now)
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
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
    requireInteraction: true, // Keep notification visible until user interacts
    tag: 'royal-order-' + (nData.orderId || Date.now()) // Avoid duplicate notifications
  };

  // Update App Badge (The red dot/number on the home screen icon)
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
      console.log('Notification dismissed by Sardaar.');
      return;
  }

  // Handle 'view' action or general click
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Try to find an existing tab with the target URL
      for (const client of clientList) {
        if (client.url.includes('seller-dashboard.html') && 'focus' in client) {
            return client.focus();
        }
      }
      // If no tab found, open a new one
      if (clients.openWindow) {
          return clients.openWindow(targetUrl);
      }
    })
  );
});
