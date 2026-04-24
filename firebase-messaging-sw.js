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

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'favicon.png'
  };

  // Set App Badge
  if ('setAppBadge' in navigator) {
    navigator.setAppBadge(1).catch(e => console.log("Badge error:", e));
  }

  self.registration.showNotification(notificationTitle, notificationOptions);
});
