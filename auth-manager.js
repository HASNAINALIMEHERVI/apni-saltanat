import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


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

// ADMIN (Admin) UID
const ADMIN_UID = "qnWFjg3XNlO7jHDhz84bPJMikP72";

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});


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
                let sSnap = await get(ref(db, `users/sellers/${user.uid}`));
                if (!sSnap.exists()) {
                    sSnap = await get(ref(db, `users/sellers/${user.uid}`));
                }
                const isSeller = sSnap.exists() && sSnap.val() && sSnap.val().status === 'active';
                const isAdmin = user.uid === ADMIN_UID || (user.email && user.email.toLowerCase() === 'saltanatapni@gmail.com');

                // One-time Admin migration of legacy data
                if (isAdmin) {
                    try {
                        const sellersRef = ref(db, 'users/sellers');
                        const sellersSnap = await get(sellersRef);
                        if (!sellersSnap.exists()) {
                            const sellersSnap = await get(ref(db, 'users/sellers'));
                            if (sellersSnap.exists()) {
                                await set(sellersRef, sellersSnap.val());
                                console.log("Admin migrated sellers to sellers node successfully.");
                            }
                        }
                        const ledgerRef = ref(db, 'sellers_ledger');
                        const ledgerSnap = await get(ledgerRef);
                        if (!ledgerSnap.exists()) {
                            const shahiLedgerSnap = await get(ref(db, 'sellers_ledger'));
                            if (shahiLedgerSnap.exists()) {
                                await set(ledgerRef, shahiLedgerSnap.val());
                                console.log("Admin migrated sellers_ledger to sellers_ledger node successfully.");
                            }
                        }
                    } catch (migrationError) {
                        console.error("Migration Error:", migrationError);
                    }
                }

                // RBAC Redirects
                if (currentPage === 'seller-dashboard.html' && !isSeller && !isAdmin) {
                    window.location.href = 'index.html';
                    return;
                }
                if (currentPage === 'become-seller.html' && (isSeller || isAdmin)) {
                    window.location.href = isAdmin ? 'admin-dashboard.html' : 'seller-dashboard.html';
                    return;
                }
                if ((currentPage === 'login.html' || currentPage === 'signup.html')) {
                    const urlParams = new URLSearchParams(window.location.search);
                    const redirect = urlParams.get('redirect');
                    if (redirect) {
                        window.location.href = decodeURIComponent(redirect);
                    } else if (isAdmin) {
                        window.location.href = 'admin-dashboard.html';
                    } else if (isSeller) {
                        window.location.href = 'seller-dashboard.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                    return;
                }

                updateGlobalUI(true, isSeller || isAdmin, isAdmin);
            } catch (err) {
                console.error("RBAC Error:", err);
                updateGlobalUI(true, false, false);
            }
        } else {
            window.currentUser = null;
            const restricted = ['seller-dashboard.html', 'profile.html', 'become-seller.html'];
            if (restricted.includes(currentPage)) {
                window.location.href = 'login.html?redirect=' + encodeURIComponent(currentPage);
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
            menuLogin.innerHTML = `<i class="fas fa-user-circle"></i> ${isAdmin ? 'Admin Profile' : (isSeller ? 'Seller Profile' : 'My Account')}`;
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

    // Update static/dynamic "Become a Seller" buttons
    const staticSellerBtns = document.querySelectorAll('a[href="signup.html"], a[href="become-seller.html"]');
    staticSellerBtns.forEach(btn => {
        btn.style.display = 'none'; // Hide all other static links/buttons
    });

    let becomeSellerBtn = document.getElementById('headerBecomeSellerBtn');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isMainPage = currentPage === 'index.html' || currentPage === '' || currentPage === 'index';
    
    if (!isSeller && !isAdmin && isMainPage) {
        if (!becomeSellerBtn) {
            becomeSellerBtn = document.createElement('a');
            becomeSellerBtn.id = 'headerBecomeSellerBtn';
            becomeSellerBtn.className = 'btn-become-seller';
            becomeSellerBtn.innerHTML = '<i class="fas fa-crown"></i> Become a Seller';
            
            const actions = document.querySelector('.nav-actions') || 
                            document.querySelector('.nav-container > div[style*="display:flex"]') ||
                            document.querySelector('.nav-container > div[style*="align-items:center"]');
            if (actions) {
                actions.insertBefore(becomeSellerBtn, actions.firstChild);
            }
        }
        
        // Update URL/action based on current auth state
        if (isLoggedIn) {
            becomeSellerBtn.href = '#';
            becomeSellerBtn.onclick = (e) => {
                e.preventDefault();
                const modal = document.getElementById('becomeSellerModal');
                if (modal) modal.style.display = 'flex';
            };
        } else {
            becomeSellerBtn.href = 'login.html?redirect=' + encodeURIComponent('index.html?action=become-seller');
            becomeSellerBtn.onclick = null;
        }
    } else {
        if (becomeSellerBtn) becomeSellerBtn.remove();
    }

    // Hide slideout/menu "Become a Seller" link to ensure only one button exists
    const menuBecomeSeller = Array.from(document.querySelectorAll('.menu-item')).find(el => 
        el.textContent.includes('Become a Seller') || 
        el.href.includes('signup.html') || 
        el.href.includes('become-seller.html')
    );
    if (menuBecomeSeller) {
        menuBecomeSeller.style.display = 'none';
    }
}

// Unified Export
export { app, auth, db, ADMIN_UID, logout, googleProvider, signInWithPopup };

// Global Flag for verification
window.shahiAuthLoaded = true;
console.log("Apni Saltanat Auth Manager: Standardized & Loaded.");
