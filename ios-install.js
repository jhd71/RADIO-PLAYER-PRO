// ios-install.js - Popup d'installation iOS pour Radio Player Pro
(function() {
    'use strict';
    
    // Détection iOS ultra-précise
    const isReallyIOS = () => {
        const ua = navigator.userAgent;
        const platform = navigator.platform;
        
        const iosPattern = /iPad|iPhone|iPod/.test(ua);
        const notAndroid = !(/Android/.test(ua));
        const notMSStream = !window.MSStream;
        const isPadOnIOS13 = platform === 'MacIntel' && navigator.maxTouchPoints > 1;
        
        return (iosPattern || isPadOnIOS13) && notAndroid && notMSStream;
    };
    
    function showIOSInstallPrompt() {
        const isIOS = isReallyIOS();
        const isInStandaloneMode = window.navigator.standalone === true;
        
        console.log("🔍 Vérification iOS install:", { 
            isIOS, 
            isInStandaloneMode, 
            userAgent: navigator.userAgent,
            platform: navigator.platform 
        });
        
        // Ne pas afficher si pas iOS ou déjà installé
        if (!isIOS || isInStandaloneMode) {
            console.log("❌ Conditions non remplies pour afficher le prompt iOS");
            return;
        }
        
        // Vérifier si on a déjà montré récemment
        const lastPrompt = localStorage.getItem('radioPlayerIOSPromptShown');
        const now = Date.now();
        const showAgain = !lastPrompt || (now - parseInt(lastPrompt)) > 2 * 24 * 60 * 60 * 1000; // 2 jours
        
        if (!showAgain) {
            console.log("⏰ Prompt iOS déjà montré récemment");
            return;
        }
        
        console.log("✅ Affichage du prompt iOS");
        
        // Supprimer tout prompt existant
        const existingPrompt = document.querySelector('.ios-install-prompt');
        if (existingPrompt) existingPrompt.remove();
        
        // Détecter le type d'appareil
        const isIPhone = /iPhone/.test(navigator.userAgent);
        const isIPad = /iPad/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const deviceName = isIPhone ? 'iPhone' : isIPad ? 'iPad' : 'appareil';
        
        // Créer le popup
        const iosPrompt = document.createElement('div');
        iosPrompt.className = 'ios-install-prompt';
        iosPrompt.innerHTML = `
            <div class="ios-prompt-overlay"></div>
            <div class="ios-prompt-card">
                <div class="ios-prompt-header">
                    <div class="ios-app-icon">📻</div>
                    <h3>Installer Radio Player Pro</h3>
                    <button class="ios-prompt-close">&times;</button>
                </div>
                
                <div class="ios-prompt-content">
                    <p class="ios-prompt-subtitle">Ajoutez l'app à votre ${deviceName} pour une expérience optimale !</p>
                    
                    <div class="ios-steps">
                        <div class="ios-step">
                            <div class="ios-step-number">1</div>
                            <div class="ios-step-content">
                                <span class="ios-step-text">Appuyez sur</span>
                                <div class="ios-share-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.5 3.5-1.4 1.4L13 5.8V15h-2V5.8L9.9 6.9 8.5 5.5 12 2zm7 9h-2v9H7v-9H5v9c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-9z"/>
                                    </svg>
                                </div>
                                <span class="ios-step-text">Partager</span>
                            </div>
                        </div>
                        
                        <div class="ios-step">
                            <div class="ios-step-number">2</div>
                            <div class="ios-step-content">
                                <span class="ios-step-text">Sélectionnez</span>
                                <div class="ios-home-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                    </svg>
                                </div>
                                <span class="ios-step-text">"Sur l'écran d'accueil"</span>
                            </div>
                        </div>
                        
                        <div class="ios-step">
                            <div class="ios-step-number">3</div>
                            <div class="ios-step-content">
                                <span class="ios-step-text">Appuyez sur</span>
                                <strong>"Ajouter"</strong>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ios-benefits">
                        <div class="ios-benefit">
                            <span class="ios-benefit-icon">🎵</span>
                            <span>Écoute en arrière-plan</span>
                        </div>
                        <div class="ios-benefit">
                            <span class="ios-benefit-icon">⚡</span>
                            <span>Accès instantané</span>
                        </div>
                        <div class="ios-benefit">
                            <span class="ios-benefit-icon">📱</span>
                            <span>Mode plein écran</span>
                        </div>
                    </div>
                </div>
                
                <div class="ios-prompt-actions">
                    <button class="ios-btn-later">Plus tard</button>
                    <button class="ios-btn-install">J'installe !</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(iosPrompt);
        
        // Animation d'entrée
        setTimeout(() => {
            iosPrompt.classList.add('ios-prompt-visible');
        }, 100);
        
        // Gestion des événements
        const closePrompt = () => {
            iosPrompt.classList.remove('ios-prompt-visible');
            setTimeout(() => {
                if (document.body.contains(iosPrompt)) {
                    iosPrompt.remove();
                }
            }, 300);
            localStorage.setItem('radioPlayerIOSPromptShown', now.toString());
        };
        
        // Bouton fermer
        iosPrompt.querySelector('.ios-prompt-close').addEventListener('click', closePrompt);
        
        // Bouton "Plus tard"
        iosPrompt.querySelector('.ios-btn-later').addEventListener('click', closePrompt);
        
        // Bouton "J'installe"
        iosPrompt.querySelector('.ios-btn-install').addEventListener('click', () => {
            closePrompt();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                showShareIconAnimation();
            }, 800);
        });
        
        // Fermer en cliquant sur l'overlay
        iosPrompt.querySelector('.ios-prompt-overlay').addEventListener('click', closePrompt);
        
        // Auto-fermeture après 20 secondes
        setTimeout(() => {
            if (document.body.contains(iosPrompt)) {
                closePrompt();
            }
        }, 20000);
    }
    
    function showShareIconAnimation() {
        const arrow = document.createElement('div');
        arrow.className = 'ios-share-arrow';
        arrow.innerHTML = `
            <div class="ios-arrow-content">
                <div class="ios-arrow-text">Appuyez ici</div>
                <div class="ios-arrow-pointer">↓</div>
            </div>
        `;
        
        document.body.appendChild(arrow);
        
        setTimeout(() => {
            arrow.classList.add('ios-arrow-visible');
        }, 100);
        
        setTimeout(() => {
            arrow.classList.remove('ios-arrow-visible');
            setTimeout(() => {
                if (document.body.contains(arrow)) {
                    arrow.remove();
                }
            }, 500);
        }, 5000);
    }
    
    // Styles CSS
    const style = document.createElement('style');
    style.id = 'ios-install-styles';
    style.textContent = `
        .ios-install-prompt {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            z-index: 99999 !important;
            opacity: 0;
            transform: scale(0.9);
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .ios-install-prompt.ios-prompt-visible {
            opacity: 1;
            transform: scale(1);
        }
        
        .ios-prompt-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }
        
        .ios-prompt-card {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 40px);
            max-width: 360px;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        
        .ios-prompt-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            position: relative;
        }
        
        .ios-app-icon {
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
        }
        
        .ios-prompt-header h3 {
            flex: 1;
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }
        
        .ios-prompt-close {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            border: none;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }
        
        .ios-prompt-close:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .ios-prompt-content {
            padding: 20px;
        }
        
        .ios-prompt-subtitle {
            text-align: center;
            color: #666;
            margin: 0 0 20px;
            font-size: 14px;
        }
        
        .ios-steps {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .ios-step {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .ios-step-number {
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
            flex-shrink: 0;
        }
        
        .ios-step-content {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            font-size: 14px;
            color: #333;
        }
        
        .ios-share-icon,
        .ios-home-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .ios-benefits {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 12px;
        }
        
        .ios-benefit {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
        }
        
        .ios-benefit-icon {
            font-size: 24px;
        }
        
        .ios-benefit span:last-child {
            font-size: 11px;
            color: #666;
            font-weight: 500;
        }
        
        .ios-prompt-actions {
            display: flex;
            gap: 10px;
            padding: 0 20px 20px;
        }
        
        .ios-btn-later,
        .ios-btn-install {
            flex: 1;
            padding: 14px 20px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .ios-btn-later {
            background: #f0f0f0;
            color: #666;
        }
        
        .ios-btn-later:hover {
            background: #e0e0e0;
        }
        
        .ios-btn-install {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .ios-btn-install:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }
        
        .ios-share-arrow {
            position: fixed !important;
            bottom: calc(20px + env(safe-area-inset-bottom, 0px)) !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            z-index: 100000 !important;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .ios-share-arrow.ios-arrow-visible {
            opacity: 1;
            animation: iosBounce 1s infinite;
        }
        
        .ios-arrow-content {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 20px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }
        
        .ios-arrow-text {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .ios-arrow-pointer {
            font-size: 24px;
        }
        
        @keyframes iosBounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-10px); }
        }
        
        /* Thème sombre */
        body.dark-theme .ios-prompt-header {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }
        
        body.dark-theme .ios-step-number,
        body.dark-theme .ios-share-icon,
        body.dark-theme .ios-home-icon {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }
        
        body.dark-theme .ios-btn-install {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }
        
        body.dark-theme .ios-arrow-content {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }
        
        /* Adaptation aux thèmes couleur */
        body.theme-ocean .ios-prompt-header,
        body.theme-ocean .ios-step-number,
        body.theme-ocean .ios-share-icon,
        body.theme-ocean .ios-home-icon,
        body.theme-ocean .ios-btn-install,
        body.theme-ocean .ios-arrow-content {
            background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%) !important;
        }
        
        body.theme-nature .ios-prompt-header,
        body.theme-nature .ios-step-number,
        body.theme-nature .ios-share-icon,
        body.theme-nature .ios-home-icon,
        body.theme-nature .ios-btn-install,
        body.theme-nature .ios-arrow-content {
            background: linear-gradient(135deg, #2d6a4f 0%, #1b4332 100%) !important;
        }
        
        body.theme-sunset .ios-prompt-header,
        body.theme-sunset .ios-step-number,
        body.theme-sunset .ios-share-icon,
        body.theme-sunset .ios-home-icon,
        body.theme-sunset .ios-btn-install,
        body.theme-sunset .ios-arrow-content {
            background: linear-gradient(135deg, #f77f00 0%, #d62828 100%) !important;
        }
        
        body.theme-rose .ios-prompt-header,
        body.theme-rose .ios-step-number,
        body.theme-rose .ios-share-icon,
        body.theme-rose .ios-home-icon,
        body.theme-rose .ios-btn-install,
        body.theme-rose .ios-arrow-content {
            background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%) !important;
        }
        
        body.theme-turquoise .ios-prompt-header,
        body.theme-turquoise .ios-step-number,
        body.theme-turquoise .ios-share-icon,
        body.theme-turquoise .ios-home-icon,
        body.theme-turquoise .ios-btn-install,
        body.theme-turquoise .ios-arrow-content {
            background: linear-gradient(135deg, #00cec9 0%, #0984e3 100%) !important;
        }
        
        body.theme-midnight .ios-prompt-header,
        body.theme-midnight .ios-step-number,
        body.theme-midnight .ios-share-icon,
        body.theme-midnight .ios-home-icon,
        body.theme-midnight .ios-btn-install,
        body.theme-midnight .ios-arrow-content {
            background: linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%) !important;
        }
        
        @media (max-width: 360px) {
            .ios-prompt-card {
                width: calc(100vw - 20px);
            }
            .ios-benefits {
                grid-template-columns: 1fr;
            }
            .ios-prompt-actions {
                flex-direction: column;
            }
        }
        
        @supports (padding: env(safe-area-inset-top)) {
            .ios-prompt-card {
                bottom: calc(20px + env(safe-area-inset-bottom)) !important;
            }
        }
    `;
    
    // Ajouter les styles seulement sur iOS
    if (isReallyIOS()) {
        document.head.appendChild(style);
    }
    
    // Initialisation
    console.log("📱 Script iOS Install chargé");
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                showIOSInstallPrompt();
            }, 3000);
        });
    } else {
        setTimeout(() => {
            showIOSInstallPrompt();
        }, 3000);
    }
    
    // Exposer pour tests
    window.showIOSInstallPrompt = showIOSInstallPrompt;
    window.testIOSPopup = () => {
        console.log("🧪 Test manuel du popup iOS");
        localStorage.removeItem('radioPlayerIOSPromptShown');
        showIOSInstallPrompt();
    };
    
})();