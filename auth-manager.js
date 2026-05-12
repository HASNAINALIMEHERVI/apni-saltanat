import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCsIZ_H0sJddEkiPHfuMPlLNvjxn-1Jzbc",
    authDomain: "apnisaltanat.com",
    databaseURL: "https://apni-saltanat-default-rtdb.firebaseio.com",
    projectId: "apni-saltanat",
    storageBucket: "apni-saltanat.firebasestorage.app",
    messagingSenderId: "691941073239",
    appId: "1:691941073239:web:9e0b568eccc347a0c0de12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// SULTAN (Admin) UID
const SULTAN_UID = "qnWFjg3XNlO7jHDhz84bPJMikP72";

const logout = () => {
    if (confirm("Are you sure you want to log out and exit the marketplace?")) {
        console.log("Logging out...");
        signOut(auth).then(() => {
            localStorage.removeItem('saltanatCart');
            localStorage.removeItem('shahi_user'); // Legacy key if any
            window.location.href = 'index.html';
        }).catch(err => {
            console.error("Logout Error:", err);
            window.location.href = 'index.html';
        });
    }
};

/**
 * Page Protection & UI Standardizer
 */
onAuthStateChanged(auth, (user) => {
    console.log("Apni Saltanat Auth State:", user ? user.uid : "Anonymous");
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 1. DISMISS LOADER IMMEDIATELY (Fail-safe)
    const loader = document.getElementById('shahi-auth-loader') || document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    }

    // 2. RUN ASYNC ROLE CHECKS & UI UPDATES
    const runAuthLogic = async () => {
        if (user) {
            window.currentUser = user;
            try {
                const sSnap = await get(ref(db, `users/sardaars/${user.uid}`));
                const isSardaar = sSnap.exists();
                const isAdmin = user.uid === SULTAN_UID;

                // RBAC Redirects
                if (currentPage === 'admin-dashboard.html' && !isAdmin) {
                    window.location.href = 'index.html';
                    return;
                }
                if (currentPage === 'seller-dashboard.html' && !isSardaar && !isAdmin) {
                    window.location.href = 'index.html';
                    return;
                }
                if ((currentPage === 'login.html' || currentPage === 'signup.html')) {
                    window.location.href = 'index.html';
                    return;
                }

                updateGlobalUI(true, isSardaar || isAdmin, isAdmin);
            } catch (err) {
                console.error("RBAC Error:", err);
                updateGlobalUI(true, false, false);
            }
        } else {
            window.currentUser = null;
            const restricted = ['seller-dashboard.html', 'admin-dashboard.html', 'profile.html'];
            if (restricted.includes(currentPage)) {
                window.location.href = 'login.html';
                return;
            }
            updateGlobalUI(false, false, false);
        }
    };

    runAuthLogic();
});

/**
 * Standardizes Menu and Navbar across all pages
 */
function updateGlobalUI(isLoggedIn, isSeller, isAdmin) {
    // Menu Dashboard Link
    const menuDashboard = document.getElementById('menuDashboard');
    if (menuDashboard) {
        menuDashboard.style.display = (isSeller || isAdmin) ? 'flex' : 'none';
        menuDashboard.href = isAdmin ? 'admin-dashboard.html' : 'seller-dashboard.html';
    }

    // Navbar Profile Trigger / Icon
    const profileTrigger = document.getElementById('profileTrigger');
    if (profileTrigger) {
        profileTrigger.style.display = isLoggedIn ? 'flex' : 'none';
        profileTrigger.href = isAdmin ? 'admin-dashboard.html' : (isSeller ? 'seller-dashboard.html' : 'profile.html');
    }

    // Menu Join/Login Link
    const menuLogin = document.getElementById('menuLogin');
    if (menuLogin) {
        if (isLoggedIn) {
            menuLogin.innerHTML = `<i class="fas fa-user-circle"></i> ${isAdmin ? 'Sultan Profile' : (isSeller ? 'Sardaar Profile' : 'My Account')}`;
            menuLogin.href = isAdmin ? 'admin-dashboard.html' : (isSeller ? 'seller-dashboard.html' : 'profile.html');
        } else {
            menuLogin.innerHTML = `<i class="fas fa-sign-in-alt"></i> Join / Login`;
            menuLogin.href = 'login.html';
        }
    }

    // Footer Dashboard Link (if exists)
    const footerDashboard = document.getElementById('footerDashboard');
    if (footerDashboard) {
        footerDashboard.style.display = (isSeller || isAdmin) ? 'block' : 'none';
    }

    // Sidebar/Menu Logout
    const logoutBtn = document.getElementById('menuLogout');
    if (logoutBtn) {
        logoutBtn.style.display = isLoggedIn ? 'flex' : 'none';
        logoutBtn.onclick = (e) => {
            e.preventDefault();
            logout();
        };
    }
}

// Unified Export
export { app, auth, db, SULTAN_UID, logout };

// Global Flag for verification
window.shahiAuthLoaded = true;
console.log("Apni Saltanat Auth Manager: Standardized & Loaded.");
