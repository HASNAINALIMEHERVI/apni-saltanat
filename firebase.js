import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCsIZ_H0sJddEkiPHfuMPlLNvjxn-1Jzbc",
  authDomain: "apni-saltanat.firebaseapp.com",
  databaseURL: "https://apni-saltanat-default-rtdb.firebaseio.com",
  projectId: "apni-saltanat",
  storageBucket: "apni-saltanat.firebasestorage.app",
  messagingSenderId: "691941073239",
  appId: "1:691941073239:web:9e0b568eccc347a0c0de12",
  measurementId: "G-PT61BKD770"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Services
const auth = getAuth(app);
const dbFirestore = getFirestore(app);
const dbRealtime = getDatabase(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();
// Set custom parameters if needed, e.g. prompt for account selection
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export { app, analytics, auth, dbFirestore, dbRealtime, googleProvider };
