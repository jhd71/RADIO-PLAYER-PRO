// ios-fixes.js - Corrections d'affichage iOS pour Radio Player Pro
(function() {
    'use strict';

    // Détection iOS
    function isiOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }

    // Détection iPad sur iOS 13+
    function isIPadOS() {
        return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    }

    // Application des fixes iOS au chargement du DOM
    document.addEventListener('DOMContentLoaded', function() {
        if (isiOS() || isIPadOS()) {
            // Ajouter une classe au body pour cibler iOS
            document.body.classList.add('ios-device');
            
            console.log('📱 iOS détecté - Application des corrections...');
            
            // Créer et ajouter les styles CSS pour iOS
            const style = document.createElement('style');
            style.id = 'ios-fixes-styles';
            style.textContent = `
                /* ========================================
                   RADIO PLAYER PRO - iOS FIXES
                   ======================================== */
                
                /* Variables pour les espacements iOS */
                :root {
                    --ios-safe-area-top: env(safe-area-inset-top, 20px);
                    --ios-safe-area-bottom: env(safe-area-inset-bottom, 34px);
                    --ios-safe-area-left: env(safe-area-inset-left, 0px);
                    --ios-safe-area-right: env(safe-area-inset-right, 0px);
                }
                
                /* ========== HEADER ========== */
                .ios-device .app-header {
                    padding-top: calc(16px + var(--ios-safe-area-top)) !important;
                    position: sticky !important;
                    top: 0 !important;
                    z-index: 100 !important;
                }
                
                .ios-device .header-actions {
                    top: calc(16px + var(--ios-safe-area-top)) !important;
                }
                
                /* ========== ONGLETS RADIOS/FAVORIS ========== */
                .ios-device .tabs-header {
                    position: sticky !important;
                    top: calc(80px + var(--ios-safe-area-top)) !important;
                    z-index: 90 !important;
                }
                
                /* ========== FILTRE CATÉGORIE ========== */
                .ios-device .category-filter {
                    position: sticky !important;
                    top: calc(140px + var(--ios-safe-area-top)) !important;
                    z-index: 85 !important;
                }
                
                /* ========== GRILLE DE RADIOS ========== */
                .ios-device .radios-grid {
                    padding-bottom: calc(340px + var(--ios-safe-area-bottom)) !important;
                }
                
                .ios-device .radios-grid.list-view {
                    padding-bottom: calc(340px + var(--ios-safe-area-bottom)) !important;
                }
                
                /* ========== PLAYER ========== */
                .ios-device .player-container {
                    bottom: 0 !important;
                    padding-bottom: calc(16px + var(--ios-safe-area-bottom)) !important;
                    z-index: 1000 !important;
                }
                
                .ios-device .player-container.minimized {
                    padding-bottom: calc(12px + var(--ios-safe-area-bottom)) !important;
                }
                
                /* Volume slider ajusté */
                .ios-device .volume-slider-container {
                    padding-bottom: 8px !important;
                }
                
                /* ========== POPUP MINUTEUR ========== */
                .ios-device .sleep-timer-popup {
                    bottom: calc(100% + 10px) !important;
                    max-height: calc(70vh - var(--ios-safe-area-bottom)) !important;
                    overflow-y: auto !important;
                    -webkit-overflow-scrolling: touch !important;
                }
                
                /* ========== CHAT ========== */
                .ios-device .chat-container {
                    z-index: 999 !important;
                    position: fixed !important;
                }
                
                .ios-device .chat-container.open {
                    height: calc(100vh - var(--ios-safe-area-top) - var(--ios-safe-area-bottom) - 200px) !important;
                    max-height: calc(100vh - var(--ios-safe-area-top) - var(--ios-safe-area-bottom) - 200px) !important;
                    bottom: calc(180px + var(--ios-safe-area-bottom)) !important;
                    top: auto !important;
                }
                
                .ios-device .chat-messages {
                    -webkit-overflow-scrolling: touch !important;
                    overscroll-behavior: contain !important;
                }
                
                .ios-device .chat-input-container textarea {
                    font-size: 16px !important; /* Évite le zoom automatique sur iOS */
                    -webkit-text-size-adjust: 100% !important;
                }
                
                /* ========== PANNEAU PARAMÈTRES ========== */
                .ios-device #settingsPanel {
                    padding-top: calc(20px + var(--ios-safe-area-top)) !important;
                    padding-bottom: calc(20px + var(--ios-safe-area-bottom)) !important;
                    max-height: 100vh !important;
                    -webkit-overflow-scrolling: touch !important;
                }
                
                .ios-device #settingsPanel .settings-content {
                    padding-bottom: calc(100px + var(--ios-safe-area-bottom)) !important;
                }
                
                /* ========== MENU CONTEXTUEL ========== */
                .ios-device .context-menu {
                    z-index: 1001 !important;
                }
                
                /* ========== TOAST NOTIFICATIONS ========== */
                .ios-device .toast {
                    bottom: calc(200px + var(--ios-safe-area-bottom)) !important;
                }
                
                /* ========== SÉLECTEURS (éviter zoom) ========== */
                .ios-device select,
                .ios-device input[type="text"],
                .ios-device input[type="time"],
                .ios-device input[type="number"],
                .ios-device textarea {
                    font-size: 16px !important;
                    -webkit-text-size-adjust: 100% !important;
                }
                
                /* ========== SCROLL AMÉLIORÉ ========== */
                .ios-device .tabs-slider,
                .ios-device .radios-grid,
                .ios-device .settings-content {
                    -webkit-overflow-scrolling: touch !important;
                    overscroll-behavior-y: contain !important;
                }
                
                /* ========== FIX POUR LES BOUTONS ========== */
                .ios-device .control-btn,
                .ios-device .glass-button,
                .ios-device button {
                    -webkit-tap-highlight-color: transparent !important;
                    touch-action: manipulation !important;
                }
                
                /* ========== MODE PAYSAGE ========== */
                @media (orientation: landscape) {
                    .ios-device .player-container {
                        padding-bottom: calc(10px + var(--ios-safe-area-bottom)) !important;
                    }
                    
                    .ios-device .chat-container.open {
                        height: calc(100vh - var(--ios-safe-area-top) - var(--ios-safe-area-bottom) - 100px) !important;
                    }
                    
                    .ios-device .radios-grid {
                        padding-bottom: calc(280px + var(--ios-safe-area-bottom)) !important;
                    }
                }
                
                /* ========== PETITS ÉCRANS (iPhone SE, etc.) ========== */
                @media (max-width: 375px) {
                    .ios-device .player-container {
                        padding: 12px !important;
                        padding-bottom: calc(12px + var(--ios-safe-area-bottom)) !important;
                    }
                    
                    .ios-device .control-btn {
                        width: 42px !important;
                        height: 42px !important;
                    }
                    
                    .ios-device .sleep-timer-popup {
                        min-width: 160px !important;
                        padding: 10px !important;
                    }
                    
                    .ios-device .sleep-option {
                        padding: 8px 10px !important;
                        font-size: 0.8rem !important;
                    }
                }
                
                /* ========== GRANDS ÉCRANS (iPad) ========== */
                @media (min-width: 768px) {
                    .ios-device .chat-container.open {
                        width: 400px !important;
                        right: 20px !important;
                        left: auto !important;
                        height: 60vh !important;
                        max-height: 60vh !important;
                        border-radius: 20px !important;
                    }
                }
                
                /* ========== CLAVIER VIRTUEL OUVERT ========== */
                .ios-device.keyboard-visible .player-container {
                    position: relative !important;
                }
                
                .ios-device.keyboard-visible .chat-container.open {
                    height: 50vh !important;
                    max-height: 50vh !important;
                }
                
                /* ========== EMPÊCHER SCROLL QUAND CHAT OUVERT ========== */
                .ios-device.chat-open {
                    overflow: hidden !important;
                    position: fixed !important;
                    width: 100% !important;
                    height: 100% !important;
                }
                
                /* ========== NOW PLAYING ========== */
                .ios-device .player-now-playing {
                    max-width: calc(100% - 20px) !important;
                }
                
                /* ========== VISUALIZER ========== */
                .ios-device .visualizer {
                    margin-bottom: 8px !important;
                }
                
                /* ========== MODE LISTE - FIX DÉBORDEMENT ========== */
                .ios-device .radios-grid.list-view {
                    padding-left: 8px !important;
                    padding-right: 8px !important;
                }
                
                .ios-device .radios-grid.list-view .radio-card {
                    padding: 10px 12px !important;
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                }
                
                .ios-device .radios-grid.list-view .radio-logo {
                    width: 48px !important;
                    height: 48px !important;
                    min-width: 48px !important;
                }
                
                .ios-device .radios-grid.list-view .radio-name {
                    font-size: 0.95rem !important;
                }
                
                .ios-device .radios-grid.list-view .radio-description {
                    font-size: 0.75rem !important;
                }
            `;
            document.head.appendChild(style);
            
            console.log('✅ iOS fixes CSS appliqués');
            
            // ========== DÉTECTION DU CLAVIER VIRTUEL ==========
            let initialHeight = window.innerHeight;
            
            window.addEventListener('resize', function() {
                const currentHeight = window.innerHeight;
                
                if (currentHeight < initialHeight * 0.75) {
                    document.body.classList.add('keyboard-visible');
                    console.log('⌨️ Clavier virtuel détecté');
                } else {
                    document.body.classList.remove('keyboard-visible');
                }
            });
            
            // ========== GESTION DU CHAT ==========
            const observeChatState = () => {
                const checkAndObserve = setInterval(() => {
                    const chatContainer = document.querySelector('.chat-container');
                    if (chatContainer) {
                        const chatObserver = new MutationObserver((mutations) => {
                            mutations.forEach((mutation) => {
                                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                                    if (chatContainer.classList.contains('open')) {
                                        document.body.classList.add('chat-open');
                                    } else {
                                        document.body.classList.remove('chat-open');
                                    }
                                }
                            });
                        });
                        
                        chatObserver.observe(chatContainer, { attributes: true });
                        clearInterval(checkAndObserve);
                        console.log('👁️ Observer du chat configuré');
                    }
                }, 500);
                
                // Arrêter après 10 secondes si pas trouvé
                setTimeout(() => clearInterval(checkAndObserve), 10000);
            };
            
            observeChatState();
            
            // ========== FIX SCROLL BOUNCE ==========
            document.body.addEventListener('touchmove', function(e) {
                if (document.body.classList.contains('chat-open')) {
                    const chatMessages = document.querySelector('.chat-messages');
                    if (chatMessages && !chatMessages.contains(e.target)) {
                        e.preventDefault();
                    }
                }
            }, { passive: false });
            
            console.log('📱 iOS fixes complets appliqués pour Radio Player Pro');
        }
    });
    
    // Exposer pour debug
    window.checkiOS = function() {
        console.log('iOS:', isiOS());
        console.log('iPadOS:', isIPadOS());
        console.log('User Agent:', navigator.userAgent);
        console.log('Platform:', navigator.platform);
        console.log('Max Touch Points:', navigator.maxTouchPoints);
    };
    
})();