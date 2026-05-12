/**
 * APNI SALTANAT — THEME MANAGER (V2.3)
 * Handles custom color themes for sellers and buyers.
 * Features: High-visibility Night/Day modes, global FAB, and menu injection.
 * Enhanced: Explicit labels for "Night Mode" and "Crystal Mode" to satisfy user requirements.
 */

const RoyalThemes = {
    // --- NIGHT COLLECTION (DARK) ---
    'imperial-gold': {
        name: 'Imperial Gold',
        type: 'dark',
        primary: '#FFCC00',
        primaryDim: '#9a7c00',
        primaryLight: '#FFE566',
        accent: '#FFCC00',
        textMain: '#e5e2e1',
        textMuted: '#9a9078',
        textDim: '#555',
        bgDark: '#131313',
        bgSurface: '#1c1c1c',
        bgDeep: '#0d0d0d',
        border: 'rgba(255, 255, 255, 0.07)',
        borderGold: 'rgba(255, 204, 0, 0.25)',
        shadowGold: '0 8px 30px rgba(255, 204, 0, 0.15)',
        glassBg: 'rgba(19, 19, 19, 0.9)',
        glassBorder: 'rgba(255, 255, 255, 0.07)',
        gradient: 'linear-gradient(0deg, #131313, #1a1200, #131313)'
    },
    'midnight-royal': {
        name: 'Midnight Royal',
        type: 'dark',
        primary: '#2196F3',
        primaryDim: '#1565C0',
        primaryLight: '#64B5F6',
        accent: '#2196F3',
        textMain: '#e0e7ff',
        textMuted: '#94a3b8',
        textDim: '#475569',
        bgDark: '#0a0b10',
        bgSurface: '#111827',
        bgDeep: '#020617',
        border: 'rgba(255, 255, 255, 0.05)',
        borderGold: 'rgba(33, 150, 243, 0.25)',
        shadowGold: '0 8px 30px rgba(33, 150, 243, 0.15)',
        glassBg: 'rgba(10, 11, 16, 0.9)',
        glassBorder: 'rgba(255, 255, 255, 0.05)',
        gradient: 'linear-gradient(0deg, #0a0b10, #001a33, #0a0b10)'
    },
    'emerald-majesty': {
        name: 'Emerald Majesty',
        type: 'dark',
        primary: '#00c864',
        primaryDim: '#008e46',
        primaryLight: '#50fa7b',
        accent: '#00c864',
        textMain: '#e2f3e5',
        textMuted: '#88998d',
        textDim: '#4a554d',
        bgDark: '#0a100d',
        bgSurface: '#121a16',
        bgDeep: '#050a08',
        border: 'rgba(255, 255, 255, 0.05)',
        borderGold: 'rgba(0, 200, 100, 0.25)',
        shadowGold: '0 8px 30px rgba(0, 200, 100, 0.15)',
        glassBg: 'rgba(10, 16, 13, 0.9)',
        glassBorder: 'rgba(255, 255, 255, 0.05)',
        gradient: 'linear-gradient(0deg, #0a100d, #002211, #0a100d)'
    },
    'ruby-reign': {
        name: 'Ruby Reign',
        type: 'dark',
        primary: '#f44336',
        primaryDim: '#b71c1c',
        primaryLight: '#ff7961',
        accent: '#f44336',
        textMain: '#fdecea',
        textMuted: '#9a8888',
        textDim: '#554a4a',
        bgDark: '#100a0a',
        bgSurface: '#1a1212',
        bgDeep: '#0a0505',
        border: 'rgba(255, 255, 255, 0.05)',
        borderGold: 'rgba(244, 67, 54, 0.25)',
        shadowGold: '0 8px 30px rgba(244, 67, 54, 0.15)',
        glassBg: 'rgba(16, 10, 10, 0.9)',
        glassBorder: 'rgba(255, 255, 255, 0.05)',
        gradient: 'linear-gradient(0deg, #100a0a, #330000, #100a0a)'
    },
    'onyx-palace': {
        name: 'Onyx Palace',
        type: 'dark',
        primary: '#ffffff',
        primaryDim: '#94a3b8',
        primaryLight: '#f8fafc',
        accent: '#ffffff',
        textMain: '#ffffff',
        textMuted: '#94a3b8',
        textDim: '#475569',
        bgDark: '#000000',
        bgSurface: '#111111',
        bgDeep: '#050505',
        border: 'rgba(255, 255, 255, 0.1)',
        borderGold: 'rgba(255, 255, 255, 0.15)',
        shadowGold: '0 8px 30px rgba(255, 255, 255, 0.1)',
        glassBg: 'rgba(0, 0, 0, 0.9)',
        glassBorder: 'rgba(255, 255, 255, 0.1)',
        gradient: 'linear-gradient(0deg, #000000, #1a1a1a, #000000)'
    },

    // --- DAY COLLECTION (LIGHT) ---
    'crystal-white': {
        name: 'Crystal White',
        type: 'light',
        primary: '#FFCC00',
        primaryDim: '#b38f00',
        primaryLight: '#ffdb52',
        accent: '#FFCC00',
        textMain: '#0f172a',
        textMuted: '#475569',
        textDim: '#94a3b8',
        bgDark: '#f8fafc',
        bgSurface: '#ffffff',
        bgDeep: '#f1f5f9',
        border: 'rgba(0, 0, 0, 0.08)',
        borderGold: 'rgba(255, 204, 0, 0.4)',
        shadowGold: '0 8px 30px rgba(255, 204, 0, 0.2)',
        glassBg: 'rgba(255, 255, 255, 0.9)',
        glassBorder: 'rgba(0, 0, 0, 0.08)',
        gradient: 'linear-gradient(0deg, #f8fafc, #ffffff, #f8fafc)'
    },
    'snow-royal': {
        name: 'Snow Royal',
        type: 'light',
        primary: '#2196F3',
        primaryDim: '#1565C0',
        primaryLight: '#64B5F6',
        accent: '#2196F3',
        textMain: '#0f172a',
        textMuted: '#475569',
        textDim: '#94a3b8',
        bgDark: '#f1f5f9',
        bgSurface: '#ffffff',
        bgDeep: '#e2e8f0',
        border: 'rgba(0, 0, 0, 0.06)',
        borderGold: 'rgba(33, 150, 243, 0.3)',
        shadowGold: '0 8px 30px rgba(33, 150, 243, 0.15)',
        glassBg: 'rgba(255, 255, 255, 0.85)',
        glassBorder: 'rgba(0, 0, 0, 0.06)',
        gradient: 'linear-gradient(0deg, #f1f5f9, #f8fafc, #f1f5f9)'
    },
    'majestic-violet': {
        name: 'Majestic Violet',
        type: 'light',
        primary: '#7C3AED',
        primaryDim: '#5B21B6',
        primaryLight: '#A78BFA',
        accent: '#7C3AED',
        textMain: '#1e1b4b',
        textMuted: '#4c1d95',
        textDim: '#a78bfa',
        bgDark: '#f5f3ff',
        bgSurface: '#ffffff',
        bgDeep: '#ede9fe',
        border: 'rgba(124, 58, 237, 0.1)',
        borderGold: 'rgba(124, 58, 237, 0.4)',
        shadowGold: '0 8px 30px rgba(124, 58, 237, 0.2)',
        glassBg: 'rgba(255, 255, 255, 0.9)',
        glassBorder: 'rgba(124, 58, 237, 0.1)',
        gradient: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 50%, #f5f3ff 100%)'
    }
};

const ThemeManager = {
    init() {
        console.log("👑 ThemeManager Init (V2.3)...");
        const savedTheme = localStorage.getItem('saltanat_theme') || 'majestic-violet';
        this.applyTheme(savedTheme);
        
        window.addEventListener('storage', (e) => {
            if (e.key === 'saltanat_theme') this.applyTheme(e.newValue);
        });

        // Use a persistent interval for robust injection
        let injectionAttempts = 0;
        const injectionInterval = setInterval(() => {
            injectionAttempts++;
            if (document.body) {
                this.injectGlobalSwitcher();
                // Auto-detect any containers needing injection
                const containers = document.querySelectorAll('[id*="theme-picker-container"]');
                containers.forEach(c => {
                    if (c.innerHTML.trim() === '') this.injectThemePicker(c.id, true);
                });
            }
            if (injectionAttempts > 50) clearInterval(injectionInterval); // Stop after 5 seconds
        }, 100);

        window.addEventListener('load', () => {
            this.injectGlobalSwitcher();
            const containers = document.querySelectorAll('[id*="theme-picker-container"]');
            containers.forEach(c => this.injectThemePicker(c.id, true));
        });
    },

    applyTheme(themeId) {
        const theme = RoyalThemes[themeId] || RoyalThemes['majestic-violet'];
        const root = document.documentElement;
        
        console.log(`🎨 ThemeManager: Applying ${theme.name}`);

        // Base tokens
        root.style.setProperty('--royal-gold', theme.primary);
        root.style.setProperty('--gold-dim', theme.primaryDim);
        root.style.setProperty('--gold-light', theme.primaryLight);
        root.style.setProperty('--accent-blue', theme.accent);
        root.style.setProperty('--border-gold', theme.borderGold);
        root.style.setProperty('--shadow-gold', theme.shadowGold);
        root.style.setProperty('--gradient', theme.gradient);

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
        
        localStorage.setItem('saltanat_theme', themeId);
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: themeId }));
        this.updateActivePickerState(themeId);
    },

    injectGlobalSwitcher() {
        if (document.getElementById('shahi-theme-fab')) return;

        const fab = document.createElement('div');
        fab.id = 'shahi-theme-fab';
        fab.innerHTML = `
            <div class="theme-fab-btn" onclick="ThemeManager.toggleSwitcher()" title="Change Website Theme">
                <i class="fas fa-palette"></i>
            </div>
            <div class="theme-switcher-panel" id="themePanel">
                <div class="panel-header">Imperial Theme Selector</div>
                
                <div class="mode-quick-switches">
                    <div class="quick-btn night-mode-btn" onclick="ThemeManager.applyTheme('imperial-gold')">
                        <i class="fas fa-moon"></i> NIGHT MODE
                    </div>
                    <div class="quick-btn crystal-mode-btn" onclick="ThemeManager.applyTheme('majestic-violet')">
                        <i class="fas fa-sun"></i> CRYSTAL MODE
                    </div>
                </div>

                <div class="theme-section-label">Dark Collection</div>
                <div class="theme-options-grid">
                    ${Object.entries(RoyalThemes).filter(([id, t]) => t.type === 'dark').map(([id, t]) => `
                        <div class="theme-hex ${localStorage.getItem('saltanat_theme') === id ? 'active' : ''}" 
                             onclick="ThemeManager.applyTheme('${id}')"
                             data-id="${id}"
                             title="${t.name}"
                             style="background: ${t.primary};">
                        </div>
                    `).join('')}
                </div>

                <div class="theme-section-label" style="margin-top: 15px;">Light Collection</div>
                <div class="theme-options-grid">
                    ${Object.entries(RoyalThemes).filter(([id, t]) => t.type === 'light').map(([id, t]) => `
                        <div class="theme-hex ${localStorage.getItem('saltanat_theme') === id ? 'active' : ''}" 
                             onclick="ThemeManager.applyTheme('${id}')"
                             data-id="${id}"
                             title="${t.name}"
                             style="background: ${t.primary}; border: 1px solid rgba(0,0,0,0.1) !important;">
                        </div>
                    `).join('')}
                </div>
            </div>
            <style>
                #shahi-theme-fab {
                    position: fixed;
                    bottom: 110px;
                    right: 36px;
                    z-index: 200000 !important;
                    font-family: 'Epilogue', sans-serif;
                }
                .theme-fab-btn {
                    width: 56px;
                    height: 56px;
                    background: var(--royal-gold) !important;
                    color: #000 !important;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    cursor: pointer;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.6), 0 0 0 4px rgba(255,204,0,0.15);
                    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    border: 2px solid rgba(255,255,255,0.3) !important;
                }
                .theme-fab-btn:hover { transform: scale(1.1) rotate(15deg); }
                .theme-switcher-panel {
                    position: absolute;
                    bottom: 75px;
                    right: 0;
                    background: rgba(10, 10, 10, 0.98) !important;
                    backdrop-filter: blur(30px);
                    -webkit-backdrop-filter: blur(30px);
                    border: 1px solid rgba(255, 255, 255, 0.15) !important;
                    border-radius: 28px;
                    padding: 24px;
                    width: 260px;
                    box-shadow: 0 35px 70px rgba(0,0,0,0.9);
                    opacity: 0;
                    transform: translateY(20px) scale(0.9);
                    pointer-events: none;
                    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    color: #fff;
                }
                .theme-switcher-panel.active { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }
                .panel-header { font-size: 13px; font-weight: 900; color: var(--royal-gold) !important; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px; }
                
                .mode-quick-switches { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
                .quick-btn { 
                    padding: 12px; border-radius: 14px; font-size: 11px; font-weight: 900; 
                    cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px;
                    border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05);
                }
                .night-mode-btn:hover { background: #1a1a1a; border-color: var(--royal-gold); color: var(--royal-gold); }
                .crystal-mode-btn { background: #fff; color: #000; border-color: #eee; }
                .crystal-mode-btn:hover { transform: scale(1.02); box-shadow: 0 5px 15px rgba(255,255,255,0.1); }

                .theme-section-label { font-size: 10px; font-weight: 800; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; color: var(--royal-gold); }
                .theme-options-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
                .theme-hex { aspect-ratio: 1; border-radius: 12px; cursor: pointer; transition: 0.3s; border: 2px solid rgba(255,255,255,0.1) !important; }
                .theme-hex:hover { transform: scale(1.15); border-color: #fff !important; }
                .theme-hex.active { border-color: var(--royal-gold) !important; transform: scale(1.1); box-shadow: 0 0 20px var(--royal-gold); }
                
                @media (max-width: 768px) {
                    #shahi-theme-fab { bottom: 90px; right: 24px; }
                    .theme-fab-btn { width: 50px; height: 50px; font-size: 20px; }
                    .theme-switcher-panel { width: 230px; padding: 20px; }
                }
            </style>
        `;
        document.body.appendChild(fab);
        
        document.addEventListener('click', (e) => {
            if (!fab.contains(e.target)) {
                const panel = document.getElementById('themePanel');
                if (panel) panel.classList.remove('active');
            }
        });
    },

    toggleSwitcher() {
        const panel = document.getElementById('themePanel');
        if (panel) panel.classList.toggle('active');
    },

    updateActivePickerState(themeId) {
        const hexes = document.querySelectorAll('.theme-hex, .theme-option');
        const theme = RoyalThemes[themeId];
        
        hexes.forEach(h => {
            if (h.getAttribute('data-id') === themeId || h.getAttribute('title') === theme?.name) h.classList.add('active');
            else h.classList.remove('active');
        });
    },

    injectThemePicker(containerId, isCompact = false) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const currentTheme = localStorage.getItem('saltanat_theme') || 'imperial-gold';
        
        console.log(`💉 ThemeManager: Injecting into #${containerId}`);

        let html = `
            <div class="theme-picker-wrap ${isCompact ? 'compact' : ''}">
                <div style="font-size: 12px; color: var(--royal-gold); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 18px; font-weight: 900; display:flex; align-items:center; gap:10px;">
                    <i class="fas fa-palette"></i> Website Appearance
                </div>
                
                <div class="mode-quick-switches" style="margin-bottom: 25px;">
                    <div class="quick-btn night-mode-btn" onclick="ThemeManager.applyTheme('imperial-gold')" style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); color:#fff; font-size:10px; padding:10px; border-radius:12px; cursor:pointer; text-align:center; font-weight:800; margin-bottom:8px;">
                        <i class="fas fa-moon"></i> ENABLE NIGHT MODE
                    </div>
                    <div class="quick-btn crystal-mode-btn" onclick="ThemeManager.applyTheme('majestic-violet')" style="background:#fff; color:#000; border:1px solid #ddd; font-size:10px; padding:10px; border-radius:12px; cursor:pointer; text-align:center; font-weight:800;">
                        <i class="fas fa-sun"></i> ENABLE CRYSTAL MODE
                    </div>
                </div>

                <div class="theme-section-label" style="font-size: 11px; opacity: 0.9; margin-bottom: 12px; color:var(--royal-gold); font-weight:800;">Imperial Colors</div>
                <div class="theme-grid">
                    ${Object.entries(RoyalThemes).map(([id, theme]) => `
                        <div class="theme-option ${currentTheme === id ? 'active' : ''}" 
                             onclick="ThemeManager.applyTheme('${id}')"
                             data-id="${id}"
                             title="${theme.name}"
                             style="background: ${theme.primary}; border: ${theme.type === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)'}">
                        </div>
                    `).join('')}
                </div>
            </div>
            <style>
                .theme-picker-wrap { padding: 15px 0; }
                .theme-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
                .theme-option { 
                    width: 38px; height: 38px; border-radius: 12px; cursor: pointer; 
                    display: flex; align-items: center; justify-content: center;
                    border: 2px solid transparent; transition: 0.3s;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                }
                .theme-option:hover { transform: scale(1.15); border-color: var(--royal-gold); }
                .theme-option.active { border-color: var(--royal-gold); transform: scale(1.1); box-shadow: 0 0 15px var(--royal-gold); }
                
                .theme-picker-wrap.compact .theme-option { width: 32px; height: 32px; border-radius: 10px; }
                .theme-picker-wrap.compact .theme-grid { gap: 10px; }
            </style>
        `;
        container.innerHTML = html;
    }
};

// Auto-run initialization
ThemeManager.init();
window.ThemeManager = ThemeManager;
