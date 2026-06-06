/**
 * APNI SALTANAT — THEME MANAGER (V3.0 - Amazon Style)
 * Enforces a single Amazon Classic design theme across all buyer and seller pages.
 * Hides all theme picker switches and floating selectors.
 */

const RoyalThemes = {
    'amazon-classic': {
        name: 'Amazon Classic',
        type: 'light',
        primary: '#2ecc71', // Light Green
        primaryDim: '#27ae60',
        primaryLight: '#a5d6a7',
        accent: '#2ecc71',
        textMain: '#1e3f20', // Dark Forest Green for readability
        textMuted: '#3b7a40',
        textDim: '#60a065',
        bgDark: '#ffffff', // Pure White
        bgSurface: '#ffffff', // Pure White
        bgDeep: '#f1fbf6', // Light Green Tint
        border: '#d4edda',
        borderGold: 'rgba(46, 204, 113, 0.4)',
        shadowGold: '0 2px 5px rgba(46, 204, 113, 0.1)',
        glassBg: '#ffffff',
        glassBorder: '#d4edda',
        gradient: 'linear-gradient(180deg, #ffffff 0%, #f1fbf6 100%)'
    }
};

const ThemeManager = {
    init() {
        console.log("👑 ThemeManager Init (V3.0 - Amazon Style)...");
        this.applyTheme('amazon-classic');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.applyTheme('amazon-classic');
            });
        } else {
            this.applyTheme('amazon-classic');
        }
        
        window.addEventListener('storage', (e) => {
            if (e.key === 'saltanat_theme') this.applyTheme('amazon-classic');
        });
    },

    applyTheme(themeId) {
        const theme = RoyalThemes['amazon-classic'];
        const root = document.documentElement;
        
        // Base tokens
        root.style.setProperty('--royal-gold', theme.primary);
        root.style.setProperty('--gold-dim', theme.primaryDim);
        root.style.setProperty('--gold-light', theme.primaryLight);
        root.style.setProperty('--accent-blue', theme.accent);
        root.style.setProperty('--border-gold', theme.borderGold);
        root.style.setProperty('--shadow-gold', theme.shadowGold);
        root.style.setProperty('--gradient', theme.gradient);
        root.style.setProperty('--royal-gold-rgb', '46, 204, 113');

        // Extended tokens
        root.style.setProperty('--text-light', theme.textMain);
        root.style.setProperty('--text-main', theme.textMain);
        root.style.setProperty('--text-muted', theme.textMuted);
        root.style.setProperty('--text-dim', theme.textDim);
        root.style.setProperty('--bg-dark', theme.bgDark);
        root.style.setProperty('--bg-surface', theme.bgSurface);
        root.style.setProperty('--bg-deep', theme.bgDeep);
        root.style.setProperty('--border', theme.border);
        root.style.setProperty('--glass-bg', theme.glassBg);
        root.style.setProperty('--glass-border', theme.glassBorder);
        
        // Compatibility variables
        root.style.setProperty('--primary', theme.primary);
        root.style.setProperty('--primary-glow', theme.borderGold);
        root.style.setProperty('--accent-gold', theme.primary);
        root.style.setProperty('--input-focus-border', theme.primary);
        root.style.setProperty('--shahi-gold', theme.primary);
        root.style.setProperty('--shahi-gold-dim', theme.borderGold);
        root.style.setProperty('--shahi-border', theme.borderGold);
        
        if (document.body) {
            document.body.style.background = theme.gradient;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            document.body.style.color = theme.textMain;
            
            // Set theme mode class
            document.body.classList.remove('theme-dark', 'theme-light');
            document.body.classList.add(`theme-${theme.type}`);
        }
        
        localStorage.setItem('saltanat_theme', 'amazon-classic');
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: 'amazon-classic' }));
    },

    injectGlobalSwitcher() {
        // Global floating picker is disabled for the Amazon Single-Theme design
        return;
    },

    toggleSwitcher() {
        return;
    },

    updateActivePickerState(themeId) {
        return;
    },

    injectThemePicker(containerId, isCompact = false) {
        const container = document.getElementById(containerId);
        if (!container) return;
        // Hide container UI elements
        container.style.display = 'none';
    }
};

// Auto-run initialization
ThemeManager.init();
window.ThemeManager = ThemeManager;
