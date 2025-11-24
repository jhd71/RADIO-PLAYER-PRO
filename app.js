// ========================================
// RADIO PLAYER PRO - APPLICATION PRINCIPALE
// VERSION CORRIGÉE ET AMÉLIORÉE
// ========================================

class RadioPlayerApp {
    constructor() {
        // === LISTE DES RADIOS ===
        this.stations = [
    {
        id: 'Ici-Bourgogne',
        name: 'Ici Bourgogne',
        url: 'https://icecast.radiofrance.fr/fbbourgogne-midfi.mp3',
        logo: 'images/radio-logos/Ici-Bourgogne.png',
        description: 'Info Bourgogne',
        category: 'locale'  // AJOUTEZ
    },
    {
        id: 'Radio-Prevert',
        name: 'Radio Prevert',
        url: 'https://vps.cbad.fr:8443/prevert',
        logo: 'images/radio-logos/Radio-Prevert.png',
        description: 'Chalon Sur Saône',
        category: 'locale'  // AJOUTEZ
    },
    {
        id: 'La-Radio-Sans-pub',
        name: 'La Radio Sans pub',
        url: 'https://live1.jupinfo.fr:8443/play',
        logo: 'images/radio-logos/La-Radio-Sans-pub.png',
        description: '100% Hits 24/24',
        category: 'generaliste'  // AJOUTEZ
    },
    {
        id: 'Skyrock',
        name: 'Skyrock',
        url: 'https://icecast.skyrock.net/s/natio_aac_128k?tvr_name=tunein16&tvr_section1=64aac',
        logo: 'images/radio-logos/Skyrock.png',
        description: 'Skyrock 1er sur le rap',
        category: 'thematique'  // AJOUTEZ
    },
    {
        id: 'NRJ',
        name: 'NRJ',
        url: 'https://streaming.nrjaudio.fm/oumvmk8fnozc?origine=fluxurlradio',
        logo: 'images/radio-logos/nrj.png',
        description: 'Hits & musique',
        category: 'generaliste'  // AJOUTEZ
    },
    {
        id: 'Fun-Radio',
        name: 'Fun Radio',
        url: 'https://streamer-02.rtl.fr/fun-1-44-128',
        logo: 'images/radio-logos/Fun-Radio.png',
        description: 'Le son dancefloor',
        category: 'generaliste'  // AJOUTEZ
    },
    {
        id: 'Nostalgie',
        name: 'Nostalgie',
        url: 'https://streaming.nrjaudio.fm/oug7girb92oc?origine=fluxradios',
        logo: 'images/radio-logos/nostalgie.png',
        description: 'Oldies & classics',
        category: 'thematique'  // AJOUTEZ
    },
    {
        id: 'Cherie-FM',
        name: 'Chérie FM',
        url: 'https://streaming.nrjaudio.fm/ouuku85n3nje?origine=fluxradios',
        logo: 'images/radio-logos/cherie-fm.png',
        description: 'Love songs',
        category: 'thematique'  // AJOUTEZ
    },
    {
        id: 'Frequence-Plus',
        name: 'Fréquence Plus',
        url: 'https://fplus-chalonsursaone.ice.infomaniak.ch/fplus-chalonsursaone-128.mp3',
        logo: 'images/radio-logos/Frequence-Plus.png',
        description: 'A plein tubes, Chalon',
        category: 'locale'  // AJOUTEZ
    },
    {
        id: 'M-Radio',
        name: 'M Radio',
        url: 'https://mradio-lyon.ice.infomaniak.ch/mradio-lyon.mp3',
        logo: 'images/radio-logos/M-Radio.png',
        description: 'Numéro 1 sur la chanson française',
        category: 'thematique'  // AJOUTEZ
    },
    {
        id: 'Cerise-FM',
        name: 'Cerise FM',
        url: 'https://stream.rcs.revma.com/q90fb3dwnwzuv.mp3',
        logo: 'images/radio-logos/Cerise-FM.png',
        description: 'Les tubes d\'hier, les hits d\'aujourd\'hui',
        category: 'locale'  // AJOUTEZ
    },
    {
        id: 'Alouette-FM',
        name: 'Alouette FM',
        url: 'https://alouette-poitiers.ice.infomaniak.ch/alouette-poitiers-128.mp3',
        logo: 'images/radio-logos/Alouette-FM.png',
        description: 'Toujours plus de Hits',
        category: 'locale'  // AJOUTEZ
    },
    {
        id: 'RTL2',
        name: 'RTL2',
        url: 'https://streamer-02.rtl.fr/rtl2-1-44-128',
        logo: 'images/radio-logos/RTL2.png',
        description: 'Le Son Pop-Rock',
        category: 'rock'  // AJOUTEZ
    },
    {
        id: 'Alouette-Nouveaux-Talents',
        name: 'Alouette Nouveaux Talents',
        url: 'https://alouettenouveauxtalents.ice.infomaniak.ch/alouettenouveauxtalents-128.mp3',
        logo: 'images/radio-logos/Alouette-Nouveaux-Talents.png',
        description: '1ère Radio Régionale de France',
        category: 'locale'  // AJOUTEZ
    },
    {
        id: 'RTL',
        name: 'RTL',
        url: 'https://streamer-03.rtl.fr/rtl-1-44-128',
        logo: 'images/radio-logos/rtl.png',
        description: 'Info & divertissement',
        category: 'info'  // AJOUTEZ
    },
    {
        id: 'Europe-1',
        name: 'Europe 1',
        url: 'https://europe1.lmn.fm/europe1.mp3',
        logo: 'images/radio-logos/europe1.png',
        description: 'Talk & actualités',
        category: 'info'  // AJOUTEZ
    },
    {
        id: 'RMC',
        name: 'RMC',
        url: 'https://audio.bfmtv.com/rmcradio_128.mp3',
        logo: 'images/radio-logos/rmc.png',
        description: 'Sport & info',
        category: 'info'  // AJOUTEZ
    },
    {
        id: 'France-Info',
        name: 'France Info',
        url: 'https://icecast.radiofrance.fr/franceinfo-midfi.mp3',
        logo: 'images/radio-logos/france-info.png',
        description: 'Info en continu',
        category: 'info'  // AJOUTEZ
    },
    {
        id: 'France-Inter',
        name: 'France Inter',
        url: 'https://icecast.radiofrance.fr/franceinter-midfi.mp3',
        logo: 'images/radio-logos/France-Inter.png',
        description: 'Service public radio',
        category: 'info'  // AJOUTEZ
    },
    {
		id: 'Vibration',
		name: 'Vibration',
		url: 'http://vibration.ice.infomaniak.ch/vibration-high.mp3',
		logo: 'images/radio-logos/Vibration.png',
		description: 'Hits & variétés',
		category: 'generaliste'
	},
	{
		id: 'Voltage',
		name: 'Voltage',
		url: 'https://start-voltage.ice.infomaniak.ch/start-voltage-high.mp3',
		logo: 'images/radio-logos/Voltage.png',
		description: 'Pop-rock français',
		category: 'generaliste'
	},
	{
		id: 'Virage-Radio',
		name: 'Virage Radio',
		url: 'http://virageradio.ice.infomaniak.ch/virageradio-high.mp3',
		logo: 'images/radio-logos/Virage-Radio.png',
		description: 'Rock & pop',
		category: 'rock'
	},
	{
		id: 'BFM-Radio',
		name: 'BFM Radio',
		url: 'http://audio.bfmtv.com/bfmradio_128.mp3',
		logo: 'images/radio-logos/BFM-Radio.png',
		description: 'Info en continu',
		category: 'info'
	},
	{
		id: 'Sud-Radio',
		name: 'Sud Radio',
		url: 'https://live.sudradio.fr/sudradio-mp3-128',
		logo: 'images/radio-logos/Sud-Radio.png',
		description: 'Talk & débats',
		category: 'info'
	},
	{
		id: 'Voltage-80s',
		name: 'Voltage 80s',
		url: 'https://voltage80s.ice.infomaniak.ch/voltage80s-128.mp3',
		logo: 'images/radio-logos/Voltage-80s.png',
		description: 'Hits années 80',
		category: 'thematique'
	},
	{
		id: 'Voltage-90s',
		name: 'Voltage 90s',
		url: 'https://voltage90s.ice.infomaniak.ch/voltage90s-128.mp3',
		logo: 'images/radio-logos/Voltage-90s.png',
		description: 'Hits années 90',
		category: 'thematique'
	},
	{
		id: 'Voltage-2000',
		name: 'Voltage 2000',
		url: 'https://voltage2000.ice.infomaniak.ch/voltage2000-128.mp3',
		logo: 'images/radio-logos/Voltage-2000.png',
		description: 'Hits années 2000',
		category: 'thematique'
	},
	{
		id: 'Kiss-FM',
		name: 'Kiss FM',
		url: 'http://kissfm2.ice.infomaniak.ch/kissfm2-128.mp3',
		logo: 'images/radio-logos/Kiss-fm.png',
		description: 'Urban & R&B',
		category: 'thematique'
	}
	];

                        // === ÉTAT DE L'APPLICATION ===
        this.currentStation = null;
        this.isPlaying = false;
        this.favorites = this.loadFavorites();
        this.volume = 0.3;
        this.isMuted = false;
        this.previousVolume = 0.3;
        this.audioContext = null;
        this.playerMinimized = false;
        this.errorCount = 0;

        // === CHROMECAST ===
        this.castSession = null;
        this.isCasting = false;
        this.castInitialized = false;

        // Minuteur de sommeil & reprise automatique
        this.sleepTimerId = null;
        this.sleepTimerEndTime = null;
        this.autoResumeEnabled = localStorage.getItem('autoResumeLastStation') === 'true';
		this.autoResumeEnabled = localStorage.getItem('autoResumeLastStation') === 'true';
        this.startOnFavorites = localStorage.getItem('startOnFavorites') === 'true';
		this.startOnFavorites = localStorage.getItem('startOnFavorites') === 'true';
        this.currentCategory = localStorage.getItem('currentCategory') || 'toutes';
        
        // === ÉLÉMENTS DOM ===

        this.deferredPrompt = null; // Événement PWA stocké pour l'installation
        this.isStopping = false; // Sert à ignorer les erreurs juste après un STOP volontaire


        // === ÉLÉMENTS DOM ===
        this.audioPlayer = document.getElementById('audioPlayer');
        this.playerContainer = document.getElementById('playerContainer');
        this.radiosGrid = document.getElementById('radiosGrid');
        this.favorisGrid = document.getElementById('favorisGrid');
        this.favorisEmpty = document.getElementById('favorisEmpty');
        this.contextMenu = document.getElementById('contextMenu');
        this.toast = document.getElementById('toast');
        
        // === INITIALISATION ===
        this.init();
    }

        // === INITIALISATION ===
    init() {
        this.setupAudioPlayer();
        this.renderRadios();
        this.renderFavorites();
        this.setupEventListeners();
        this.setupSleepTimerUI();
        this.setupPWA();
        this.setupCast();
        this.checkNetworkStatus();
        this.applyStartupTab();
    }

     // === CONFIGURATION AUDIO ===
    setupAudioPlayer() {
        this.audioPlayer.volume = this.volume;
        
        // L'égaliseur sera créé à la demande (au premier clic sur le bouton)
        
        // Événements audio
        this.audioPlayer.addEventListener('play', () => {
            this.isPlaying = true;
            this.errorCount = 0;
            this.updatePlayerUI();
            this.updateRadioCards();
            this.startVisualizer();
        });

        this.audioPlayer.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updatePlayerUI();
            this.updateRadioCards();
            this.stopVisualizer();
        });

        this.audioPlayer.addEventListener('error', (e) => {
            if (this.isStopping) {
                this.isStopping = false;
                return;
            }

            this.errorCount++;
            console.error('Erreur audio:', e);

            if (this.errorCount >= 3) {
                this.showToast('Impossible de lire cette radio');
                this.stopRadio();
            } else {
                this.showToast('Erreur de lecture, nouvelle tentative...');
                setTimeout(() => {
                    if (this.currentStation && this.isPlaying) {
                        this.audioPlayer.load();
                        this.audioPlayer.play().catch(err => {
                            console.error('Erreur replay:', err);
                        });
                    }
                }, 2000);
            }
        });
    }

    // === RENDU DES RADIOS ===
    renderRadios() {
        this.radiosGrid.innerHTML = '';
        
        // Filtrer les stations selon la catégorie sélectionnée
        const filteredStations = this.currentCategory === 'toutes' 
            ? this.stations 
            : this.stations.filter(station => station.category === this.currentCategory);
        
        // Afficher les stations filtrées
        filteredStations.forEach(station => {
            const card = this.createRadioCard(station);
            this.radiosGrid.appendChild(card);
        });
        
        // Afficher un message si aucune radio dans la catégorie
        if (filteredStations.length === 0) {
            this.radiosGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: rgba(255,255,255,0.6);">
                    <span class="material-icons" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;">radio</span>
                    <p style="font-size: 1.1rem;">Aucune radio dans cette catégorie</p>
                </div>
            `;
        }
    }

    // === CRÉATION D'UNE CARTE RADIO ===
    createRadioCard(station) {
        const card = document.createElement('div');
        card.className = 'radio-card glass-effect';
        card.dataset.stationId = station.id;
        
        // Vérifier si c'est un favori
        if (this.favorites.includes(station.id)) {
            card.classList.add('is-favorite');
        }
        
        // Vérifier si c'est la radio en cours
        if (this.currentStation && this.currentStation.id === station.id && this.isPlaying) {
            card.classList.add('playing');
        }
        
        card.innerHTML = `
            <img class="radio-logo" src="${station.logo}" alt="${station.name}" 
                 onerror="this.src='images/radio-logos/default.png'">
            <span class="radio-name">${station.name}</span>
            <span class="material-icons favorite-indicator">favorite</span>
        `;
        
        // Événements
        card.addEventListener('click', () => this.playRadio(station));
        
        // Long press pour menu contextuel (amélioré pour détecter le scroll)
        let pressTimer;
        let longPress = false;
        let touchStartX = 0;
        let touchStartY = 0;
        let hasMoved = false;
        
        // Pour desktop (souris)
        card.addEventListener('mousedown', (e) => {
            longPress = false;
            pressTimer = setTimeout(() => {
                longPress = true;
                this.showContextMenu(e, station);
            }, 500);
        });
        
        card.addEventListener('mouseup', () => {
            clearTimeout(pressTimer);
            longPress = false;
        });
        
        card.addEventListener('mouseleave', () => {
            clearTimeout(pressTimer);
            longPress = false;
        });
        
        // Pour mobile (tactile) - avec détection de mouvement
        card.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches.length === 1) {
                const touch = e.touches[0];
                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
                hasMoved = false;
                longPress = false;
                
                pressTimer = setTimeout(() => {
                    // Ne déclencher le long press que si l'utilisateur n'a pas bougé
                    if (!hasMoved) {
                        longPress = true;
                        const fakeEvent = {
                            clientX: touch.clientX,
                            clientY: touch.clientY,
                            preventDefault: () => {}
                        };
                        this.showContextMenu(fakeEvent, station);
                        
                        // Vibration pour feedback (si disponible)
                        if (navigator.vibrate) {
                            navigator.vibrate(50);
                        }
                        
                        e.preventDefault();
                    }
                }, 600); // Augmenté à 600ms pour être plus précis
            }
        });
        
        card.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches.length === 1) {
                const touch = e.touches[0];
                const deltaX = Math.abs(touch.clientX - touchStartX);
                const deltaY = Math.abs(touch.clientY - touchStartY);
                
                // Si mouvement > 10px, c'est un scroll, pas un long press
                if (deltaX > 10 || deltaY > 10) {
                    hasMoved = true;
                    clearTimeout(pressTimer);
                }
            }
        });
        
        card.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
            
            // Si c'était un long press, empêcher le clic
            if (longPress) {
                longPress = false;
                return;
            }
            
            longPress = false;
        });
        
        card.addEventListener('touchcancel', () => {
            clearTimeout(pressTimer);
            longPress = false;
        });
        
        card.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e, station);
        });
        
        return card;
    }

    // === LECTURE D'UNE RADIO ===
    playRadio(station) {
        // Si c'est la même station
        if (this.currentStation && this.currentStation.id === station.id) {
            if (this.isPlaying) {
                this.pauseRadio();
            } else {
                this.resumeRadio();
            }
            return;
        }
        
        // Réinitialiser le compteur d'erreurs
        this.errorCount = 0;
        
        // Nouvelle station
        this.currentStation = station;
        
        // Utiliser l'URL directe
        this.audioPlayer.src = station.url;
        
        this.audioPlayer.play().catch(error => {
            console.error('Erreur lecture:', error);
            this.showToast('Impossible de lire cette radio');
        });
        
        // Afficher le player
        this.playerContainer.style.display = 'block';
        this.updatePlayerInfo();
        
        // Sauvegarder la dernière radio
        localStorage.setItem('lastStation', station.id);
        
        this.showToast(`Lecture de ${station.name}`);
    }

    // === PAUSE/REPRISE ===
    pauseRadio() {
        this.audioPlayer.pause();
    }

    resumeRadio() {
        if (this.audioPlayer.src) {
            this.audioPlayer.play();
        }
    }

        // === ARRÊT COMPLET ===
    stopRadio() {
        // Indiquer qu'on arrête volontairement (pour éviter les tentatives de relance)
        this.isStopping = true;
        
        // Si une diffusion Chromecast est en cours, on termine aussi la session
        if (this.isCasting && window.cast && window.cast.framework) {
            try {
                const context = cast.framework.CastContext.getInstance();
                context.endCurrentSession(true);
            } catch (e) {
                console.error('Erreur arrêt Cast:', e);
            }
        }

        this.isCasting = false;
        this.isPlaying = false;
        this.audioPlayer.pause();
        this.audioPlayer.src = '';
        this.currentStation = null;
        this.errorCount = 0;
        this.playerContainer.style.display = 'none';
        this.updateRadioCards();
        this.stopVisualizer();
        this.updateCastButtonUI();
        
        // Réinitialiser le flag après un court délai
        setTimeout(() => {
            this.isStopping = false;
        }, 500);
    }

    // === MISE À JOUR DU PLAYER ===
    updatePlayerInfo() {
        if (!this.currentStation) return;
        
        document.getElementById('playerLogo').src = this.currentStation.logo;
        document.getElementById('playerTitle').textContent = this.currentStation.name;
    }

    updatePlayerUI() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const icon = playPauseBtn.querySelector('.material-icons');
        
        if (this.isPlaying) {
            icon.textContent = 'pause';
            document.getElementById('playerStatus').textContent = 'En lecture';
        } else {
            icon.textContent = 'play_arrow';
            document.getElementById('playerStatus').textContent = 'En pause';
        }
    }

    updateRadioCards() {
        // Retirer toutes les classes playing de TOUTES les cartes (Radios ET Favoris)
        document.querySelectorAll('.radio-card').forEach(card => {
            card.classList.remove('playing');
        });
        
        // Ajouter la classe playing à TOUTES les cartes avec le bon ID (Radios ET Favoris)
        if (this.currentStation && this.isPlaying) {
            document.querySelectorAll(`[data-station-id="${this.currentStation.id}"]`).forEach(card => {
                card.classList.add('playing');
            });
        }
    }

    // === VISUALISEUR ===
    startVisualizer() {
        const visualizer = document.getElementById('visualizer');
        visualizer.classList.add('active');
    }

    stopVisualizer() {
        const visualizer = document.getElementById('visualizer');
        visualizer.classList.remove('active');
    }

        // === GESTION DU VOLUME ET MUTE ===
    setupVolumeControl() {
        const muteBtn = document.getElementById('muteBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeContainer = document.getElementById('volumeSliderContainer');
        
        // Vérifier que les éléments existent
        if (!muteBtn || !volumeSlider || !volumeContainer) {
            console.warn('Éléments de volume non trouvés');
            return;
        }
        
        const volumeValue = volumeContainer.querySelector('.volume-value');
        
        // Bouton Mute/Unmute
        muteBtn.addEventListener('click', () => {
            this.toggleMute();
        });
        
        // Slider de volume
        volumeSlider.addEventListener('input', (e) => {
            const newVolume = e.target.value / 100;
            
            // Si on change le volume alors qu'on est muté, on démute
            if (this.isMuted && newVolume > 0) {
                this.isMuted = false;
            }
            
            this.volume = newVolume;
            this.audioPlayer.volume = this.volume;
            
            if (volumeValue) {
                volumeValue.textContent = `${e.target.value}%`;
            }
            
            this.updateVolumeIcon();
        });
        
        // Initialiser le slider
        volumeSlider.value = this.volume * 100;
        
        if (volumeValue) {
            volumeValue.textContent = `${Math.round(this.volume * 100)}%`;
        }
        
        this.updateVolumeIcon();
    }

    toggleMute() {
        if (this.isMuted) {
            // Unmute
            this.isMuted = false;
            this.audioPlayer.volume = this.previousVolume;
            this.volume = this.previousVolume;
        } else {
            // Mute
            this.isMuted = true;
            this.previousVolume = this.volume;
            this.audioPlayer.volume = 0;
        }
        
        this.updateVolumeIcon();
        
        // Mettre à jour le slider
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeValue = document.querySelector('.volume-value');
        
        if (volumeSlider && volumeValue) {
            volumeSlider.value = this.isMuted ? 0 : this.volume * 100;
            volumeValue.textContent = `${Math.round(this.isMuted ? 0 : this.volume * 100)}%`;
        }
    }

    updateMuteButton() {
        // Pour compatibilité avec l'ancien code
        this.updateVolumeIcon();
    }

    updateVolumeIcon() {
        const muteBtn = document.getElementById('muteBtn');
        if (!muteBtn) return;

        const icon = muteBtn.querySelector('.material-icons');
        if (!icon) return;

        if (this.isMuted || this.volume === 0) {
            icon.textContent = 'volume_off';
            muteBtn.classList.add('muted');
        } else if (this.volume < 0.5) {
            icon.textContent = 'volume_down';
            muteBtn.classList.remove('muted');
        } else {
            icon.textContent = 'volume_up';
            muteBtn.classList.remove('muted');
        }
    }

    // === CHROMECAST ===
    setupCast() {
        // Désactiver sur iOS (SDK Cast limité)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
            console.log('Cast désactivé sur iOS');
            return;
        }

        if (this.castInitialized) {
            return;
        }

        // Si le SDK est déjà chargé
        if (window.cast && window.cast.framework && window.chrome && chrome.cast) {
            this.initCastContext();
        } else {
            // Callback appelé par le SDK quand il est prêt
            window.__onGCastApiAvailable = (isAvailable) => {
                if (isAvailable) {
                    this.initCastContext();
                } else {
                    console.log('Google Cast non disponible');
                }
            };
        }
    }

    initCastContext() {
        try {
            const context = cast.framework.CastContext.getInstance();
            context.setOptions({
                receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
                autoJoinPolicy: chrome.cast.AutoJoinPolicy.TAB_AND_ORIGIN_SCOPED
            });

            context.addEventListener(
                cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
                this.onCastSessionStateChanged.bind(this)
            );

            this.castInitialized = true;
            console.log('Chromecast initialisé');
        } catch (error) {
            console.error('Erreur init Cast:', error);
        }
    }

    onCastSessionStateChanged(event) {
        const context = cast.framework.CastContext.getInstance();

        switch (event.sessionState) {
            case cast.framework.SessionState.SESSION_STARTED:
            case cast.framework.SessionState.SESSION_RESUMED:
                this.castSession = context.getCurrentSession();
                this.isCasting = true;
                this.updateCastButtonUI();

                if (this.currentStation) {
                    this.castLoadCurrentStation();
                }
                break;

            case cast.framework.SessionState.SESSION_ENDED:
                this.castSession = null;
                this.isCasting = false;
                this.updateCastButtonUI();
                break;
        }
    }

    toggleCast() {
        if (!window.cast || !window.cast.framework || !window.chrome || !chrome.cast) {
            this.showToast('Chromecast non disponible sur ce navigateur');
            return;
        }

        const context = cast.framework.CastContext.getInstance();

        if (this.isCasting) {
            // Arrêter la session
            context.endCurrentSession(true);
        } else {
            // Démarrer une nouvelle session
            context.requestSession().then(
                () => {
                    console.log('Session Chromecast démarrée');
                    if (this.currentStation) {
                        this.castLoadCurrentStation();
                    }
                },
                (error) => {
                    if (error !== 'cancel') {
                        console.error('Erreur Cast:', error);
                        this.showToast('Impossible de se connecter à Chromecast');
                    }
                }
            );
        }
    }

    castLoadCurrentStation() {
        if (!this.castSession || !this.currentStation) {
            return;
        }

        const mediaInfo = new chrome.cast.media.MediaInfo(
            this.currentStation.url,
            'audio/mpeg'
        );

        const metadata = new chrome.cast.media.GenericMediaMetadata();
        metadata.title = this.currentStation.name;
        metadata.subtitle = this.currentStation.description || 'Radio en ligne';

        metadata.images = [
            new chrome.cast.Image(window.location.origin + '/' + this.currentStation.logo)
        ];

        mediaInfo.metadata = metadata;
        mediaInfo.streamType = chrome.cast.media.StreamType.LIVE;

        const request = new chrome.cast.media.LoadRequest(mediaInfo);
        request.autoplay = true;

        this.castSession.loadMedia(request).then(
            () => {
                console.log('Radio diffusée sur Chromecast');
                const deviceName = this.castSession.getCastDevice().friendlyName;
                this.showToast('Diffusion sur ' + deviceName);
            },
            (error) => {
                console.error('Erreur de diffusion Cast:', error);
                this.showToast('Erreur lors de la diffusion');
            }
        );
    }

    updateCastButtonUI() {
        const castBtn = document.getElementById('castBtn');
        if (!castBtn) return;

        const icon = castBtn.querySelector('.material-icons');

        if (this.isCasting) {
            castBtn.classList.add('casting');
            if (icon) icon.textContent = 'cast_connected';
        } else {
            castBtn.classList.remove('casting');
            if (icon) icon.textContent = 'cast';
        }
    }

        // === MINIMISER/AGRANDIR LE PLAYER ===
    togglePlayerSize() {
        const playerContainer = document.getElementById('playerContainer');
        const toggleBtn = document.getElementById('togglePlayerBtn');
        const icon = toggleBtn.querySelector('.material-icons');
        
        this.playerMinimized = !this.playerMinimized;
        
        if (this.playerMinimized) {
            playerContainer.classList.add('minimized');
            icon.textContent = 'expand_less';
        } else {
            playerContainer.classList.remove('minimized');
            icon.textContent = 'expand_more';
        }
    }

        // === MINUTEUR DE SOMMEIL & PARAMÈTRES DU PLAYER ===
    setupSleepTimerUI() {
        const settingsBtn = document.getElementById('settingsBtn');
        const overlay = document.getElementById('settingsOverlay');
        const panel = document.getElementById('settingsPanel');
        const closeBtn = document.getElementById('settingsCloseBtn');
        const sleepSelect = document.getElementById('sleepTimerSelect');
        const startBtn = document.getElementById('sleepTimerStartBtn');
        const cancelBtn = document.getElementById('sleepTimerCancelBtn');
        const autoResumeCheckbox = document.getElementById('autoResumeCheckbox');

        if (!settingsBtn || !overlay || !panel) {
            return;
        }

        const openPanel = () => {
            overlay.style.display = 'flex';
            this.updateSleepTimerInfo();
            if (autoResumeCheckbox) {
                autoResumeCheckbox.checked = this.autoResumeEnabled;
            }
        };

        const closePanel = () => {
            overlay.style.display = 'none';
        };

        // Ouvrir/fermer le panneau
        settingsBtn.addEventListener('click', openPanel);
        if (closeBtn) {
            closeBtn.addEventListener('click', closePanel);
        }

        // Fermer en cliquant en dehors de la carte
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePanel();
            }
        });

        // Démarrer/Arrêter le minuteur (bouton dynamique)
        if (startBtn && sleepSelect) {
            startBtn.addEventListener('click', () => {
                // Si un minuteur est actif, on l'arrête
                if (this.sleepTimerEndTime) {
                    this.cancelSleepTimer();
                    this.updateSleepTimerInfo();
                    this.showToast('Minuteur arrêté');
                    return;
                }

                // Sinon on démarre un nouveau minuteur
                const minutes = parseInt(sleepSelect.value, 10);

                if (isNaN(minutes) || minutes <= 0) {
                    this.showToast('⚠️ Sélectionnez une durée');
                } else {
                    this.startSleepTimer(minutes);
                    this.updateSleepTimerInfo();
                    this.showToast(`⏱️ La radio s'arrêtera dans ${minutes} min`);
                }
            });
        }

        // Annuler le minuteur
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.cancelSleepTimer();
                this.updateSleepTimerInfo();
                this.showToast('Minuteur annulé');
            });
        }

        // Gestion de la case "reprendre la dernière radio"
        if (autoResumeCheckbox) {
            autoResumeCheckbox.checked = this.autoResumeEnabled;
            autoResumeCheckbox.addEventListener('change', (e) => {
                this.autoResumeEnabled = e.target.checked;
                localStorage.setItem(
                    'autoResumeLastStation',
                    this.autoResumeEnabled ? 'true' : 'false'
                );

                if (this.autoResumeEnabled) {
                    this.showToast('Reprise automatique activée');
                } else {
                    this.showToast('Reprise automatique désactivée');
                }
            });
        }

// Gestion de la case "reprendre la dernière radio"
        if (autoResumeCheckbox) {
            autoResumeCheckbox.checked = this.autoResumeEnabled;
            autoResumeCheckbox.addEventListener('change', (e) => {
                this.autoResumeEnabled = e.target.checked;
                localStorage.setItem(
                    'autoResumeLastStation',
                    this.autoResumeEnabled ? 'true' : 'false'
                );

                if (this.autoResumeEnabled) {
                    this.showToast('Reprise automatique activée');
                } else {
                    this.showToast('Reprise automatique désactivée');
                }
            });
        }

        // Gestion de la case "démarrer sur favoris"
        const startOnFavoritesCheckbox = document.getElementById('startOnFavoritesCheckbox');
        if (startOnFavoritesCheckbox) {
            startOnFavoritesCheckbox.checked = this.startOnFavorites;
            startOnFavoritesCheckbox.addEventListener('change', (e) => {
                this.startOnFavorites = e.target.checked;
                localStorage.setItem(
                    'startOnFavorites',
                    this.startOnFavorites ? 'true' : 'false'
                );

                if (this.startOnFavorites) {
                    this.showToast('Démarrage sur Favoris activé');
                } else {
                    this.showToast('Démarrage sur Radios');
                }
            });
        }
		
        // Restaurer un minuteur éventuellement déjà programmé
        this.restoreSleepTimerFromStorage();
    }

    startSleepTimer(minutes) {
        // Annule un éventuel minuteur déjà actif
        this.cancelSleepTimer();

        const now = Date.now();
        this.sleepTimerEndTime = now + minutes * 60 * 1000;

        // Sauvegarder la date de fin dans le stockage
        localStorage.setItem('sleepTimerEndTime', String(this.sleepTimerEndTime));

        const remainingMs = this.sleepTimerEndTime - now;

        this.sleepTimerId = setTimeout(() => {
            this.stopRadio();
            this.sleepTimerId = null;
            this.sleepTimerEndTime = null;
            localStorage.removeItem('sleepTimerEndTime');
            this.updateSleepTimerInfo();
        }, remainingMs);
    }

    cancelSleepTimer() {
        if (this.sleepTimerId) {
            clearTimeout(this.sleepTimerId);
        }
        this.sleepTimerId = null;
        this.sleepTimerEndTime = null;
        localStorage.removeItem('sleepTimerEndTime');
    }

    restoreSleepTimerFromStorage() {
        const storedEndTime = localStorage.getItem('sleepTimerEndTime');

        if (!storedEndTime) {
            this.sleepTimerEndTime = null;
            this.sleepTimerId = null;
            this.updateSleepTimerInfo();
            return;
        }

        const endTime = parseInt(storedEndTime, 10);
        if (Number.isNaN(endTime)) {
            localStorage.removeItem('sleepTimerEndTime');
            this.sleepTimerEndTime = null;
            this.sleepTimerId = null;
            this.updateSleepTimerInfo();
            return;
        }

        const remainingMs = endTime - Date.now();

        if (remainingMs <= 0) {
            // Le minuteur est déjà censé être terminé
            localStorage.removeItem('sleepTimerEndTime');
            this.sleepTimerEndTime = null;
            this.sleepTimerId = null;
            this.updateSleepTimerInfo();
            return;
        }

        // Recrée le timeout avec le temps restant
        this.sleepTimerEndTime = endTime;
        this.sleepTimerId = setTimeout(() => {
            this.stopRadio();
            this.sleepTimerId = null;
            this.sleepTimerEndTime = null;
            localStorage.removeItem('sleepTimerEndTime');
            this.updateSleepTimerInfo();
        }, remainingMs);

        this.updateSleepTimerInfo();
    }

            updateSleepTimerInfo() {
        const info = document.getElementById('sleepTimerInfo');
        const settingsBtn = document.getElementById('settingsBtn');
        const indicator = document.getElementById('sleepTimerIndicator');
        const startBtn = document.getElementById('sleepTimerStartBtn');
        const cancelBtn = document.getElementById('sleepTimerCancelBtn');

        // Pas d'élément dans le DOM -> on ne fait rien
        if (!info) return;

        // Aucun minuteur en cours
        if (!this.sleepTimerEndTime) {
            info.textContent = 'Aucun minuteur actif';

            // Mettre le bouton en mode "Démarrer"
            if (startBtn) {
                startBtn.innerHTML = '<span class="material-icons">timer</span> Démarrer le minuteur';
                startBtn.classList.remove('active-timer');
            }
            if (cancelBtn) {
                cancelBtn.style.display = 'none';
            }

            // On enlève l'info-bulle + la pastille
            if (settingsBtn) {
                settingsBtn.removeAttribute('title');
            }
            if (indicator) {
                indicator.classList.remove('active');
            }
            return;
        }

        const remainingMs = this.sleepTimerEndTime - Date.now();

        // Minuteur déjà dépassé
        if (remainingMs <= 0) {
            info.textContent = 'Aucun minuteur actif';
            
            if (startBtn) {
                startBtn.innerHTML = '<span class="material-icons">timer</span> Démarrer le minuteur';
                startBtn.classList.remove('active-timer');
            }
            if (cancelBtn) {
                cancelBtn.style.display = 'none';
            }
            if (settingsBtn) {
                settingsBtn.removeAttribute('title');
            }
            if (indicator) {
                indicator.classList.remove('active');
            }
            return;
        }

        const remainingMinutes = Math.round(remainingMs / 60000);

        // Texte dans le panneau des paramètres
        info.textContent = `La radio s'arrêtera dans environ ${remainingMinutes} min`;

        // Mettre le bouton en mode "Arrêter"
        if (startBtn) {
            startBtn.innerHTML = '<span class="material-icons">stop</span> Arrêter le minuteur';
            startBtn.classList.add('active-timer');
        }
        if (cancelBtn) {
            cancelBtn.style.display = 'display: inline-flex;
    align-items: center;
}
        }

        // Info-bulle sur le bouton ⚙️ dans la barre du haut
        if (settingsBtn) {
            settingsBtn.title = `Minuteur actif : arrêt dans environ ${remainingMinutes} min`;
        }

        // Allumer la petite pastille
        if (indicator) {
            indicator.classList.add('active');
        }
    }

    // === FAVORIS ===

    loadFavorites() {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    }

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    toggleFavorite(stationId) {
        const index = this.favorites.indexOf(stationId);
        
        if (index === -1) {
            this.favorites.push(stationId);
            this.showToast('Ajouté aux favoris');
        } else {
            this.favorites.splice(index, 1);
            this.showToast('Retiré des favoris');
        }
        
        this.saveFavorites();
        this.renderRadios();
        this.renderFavorites();
    }

    renderFavorites() {
        if (this.favorites.length === 0) {
            this.favorisEmpty.style.display = 'block';
            this.favorisGrid.style.display = 'none';
            return;
        }
        
        this.favorisEmpty.style.display = 'none';
        this.favorisGrid.style.display = 'grid';
        this.favorisGrid.innerHTML = '';
        
        this.favorites.forEach(stationId => {
            const station = this.stations.find(s => s.id === stationId);
            if (station) {
                const card = this.createRadioCard(station);
                this.favorisGrid.appendChild(card);
            }
        });
    }

    // === MENU CONTEXTUEL ===
    showContextMenu(event, station) {
        // Vérifier si l'event a preventDefault
        if (event && typeof event.preventDefault === 'function') {
            event.preventDefault();
        }
        
        const x = event.clientX || event.pageX || 0;
        const y = event.clientY || event.pageY || 0;
        
        // Ajuster la position si le menu dépasse de l'écran
        const menuWidth = 200;
        const menuHeight = 150;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        let finalX = x;
        let finalY = y;
        
        if (x + menuWidth > windowWidth) {
            finalX = windowWidth - menuWidth - 10;
        }
        
        if (y + menuHeight > windowHeight) {
            finalY = windowHeight - menuHeight - 10;
        }
        
        this.contextMenu.style.left = `${finalX}px`;
        this.contextMenu.style.top = `${finalY}px`;
        this.contextMenu.style.display = 'block';
        
        // Configurer les boutons
        const addBtn = document.getElementById('addToFavorites');
        const removeBtn = document.getElementById('removeFromFavorites');
        
        if (this.favorites.includes(station.id)) {
            addBtn.style.display = 'none';
            removeBtn.style.display = 'flex';
        } else {
            addBtn.style.display = 'flex';
            removeBtn.style.display = 'none';
        }
        
        // Gérer les clics
        this.contextMenu.dataset.stationId = station.id;
    }

    hideContextMenu() {
        this.contextMenu.style.display = 'none';
    }

    // === NOTIFICATIONS TOAST ===
    showToast(message) {
        this.toast.textContent = message;
        this.toast.classList.add('show');
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }

    // === ÉVÉNEMENTS ===
        setupEventListeners() {
        // Swipe horizontal pour changer d'onglet
        this.setupSwipeNavigation();
        
        // Onglets
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                // Retirer active de tous
                document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Activer le bon onglet
                button.classList.add('active');
                const tabId = button.dataset.tab + '-tab';
                document.getElementById(tabId).classList.add('active');
            });
        });

		// Onglets
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                // Retirer active de tous
                document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Activer le bon onglet
                button.classList.add('active');
                const tabId = button.dataset.tab + '-tab';
                document.getElementById(tabId).classList.add('active');
                
                // Afficher/cacher le filtre selon l'onglet
                this.toggleCategoryFilter(button.dataset.tab);
            });
        });

        // Filtre de catégorie
        const categorySelect = document.getElementById('categorySelect');
        if (categorySelect) {
            // Restaurer la catégorie sauvegardée
            categorySelect.value = this.currentCategory;
            
            categorySelect.addEventListener('change', (e) => {
                this.currentCategory = e.target.value;
                localStorage.setItem('currentCategory', this.currentCategory);
                this.renderRadios();
                this.showToast(`Filtre : ${e.target.options[e.target.selectedIndex].text}`);
            });
        }
		
        // Contrôles du player
                document.getElementById('playPauseBtn').addEventListener('click', () => {
            if (this.isPlaying) {
                this.pauseRadio();
            } else {
                this.resumeRadio();
            }
        });

        document.getElementById('stopBtn').addEventListener('click', () => {
            this.stopRadio();
        });

        const castBtn = document.getElementById('castBtn');
        if (castBtn) {
            castBtn.addEventListener('click', () => {
                this.toggleCast();
            });
        }

        // Toggle player size
        document.getElementById('togglePlayerBtn').addEventListener('click', () => {
            this.togglePlayerSize();
        });
		
        // Volume et Mute
        this.setupVolumeControl();

        // Menu contextuel
        document.getElementById('addToFavorites').addEventListener('click', () => {
            const stationId = this.contextMenu.dataset.stationId;
            this.toggleFavorite(stationId);
            this.hideContextMenu();
        });

        document.getElementById('removeFromFavorites').addEventListener('click', () => {
            const stationId = this.contextMenu.dataset.stationId;
            this.toggleFavorite(stationId);
            this.hideContextMenu();
        });

        document.getElementById('shareRadio').addEventListener('click', () => {
            const stationId = this.contextMenu.dataset.stationId;
            const station = this.stations.find(s => s.id === stationId);
            
            if (navigator.share) {
                navigator.share({
                    title: `Écouter ${station.name}`,
                    text: station.description,
                    url: window.location.href
                }).catch(err => console.log('Erreur partage:', err));
            } else {
                this.showToast('Partage non disponible');
            }
            
            this.hideContextMenu();
        });

        // Fermer le menu contextuel en cliquant ailleurs
        document.addEventListener('click', (e) => {
            if (!this.contextMenu.contains(e.target)) {
                this.hideContextMenu();
            }
        });

        // Gestion réseau
        window.addEventListener('online', () => {
            this.showToast('Connexion rétablie');
            if (this.currentStation && !this.isPlaying) {
                // Ne pas reprendre automatiquement pour éviter les erreurs
                // this.resumeRadio();
            }
        });

        window.addEventListener('offline', () => {
            this.showToast('Connexion perdue');
        });
    }

        // === PWA ===
    setupPWA() {
        // Références de la bannière d'installation
        const banner = document.getElementById('pwaInstallBanner');
        const installBtn = document.getElementById('pwaInstallBtn');
        const dismissBtn = document.getElementById('pwaDismissBtn');

        // Vérifier si la PWA est déjà ouverte en mode standalone
        const isAlreadyInstalled =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true;

        if (isAlreadyInstalled && banner) {
            banner.style.display = 'none';
        }

        // Événement émis quand l'installation est possible
        window.addEventListener('beforeinstallprompt', (e) => {
            // Empêche la bannière automatique du navigateur
            e.preventDefault();
            this.deferredPrompt = e;

            const dismissed = localStorage.getItem('pwaInstallDismissed') === 'true';
            const installed =
                window.matchMedia('(display-mode: standalone)').matches ||
                window.navigator.standalone === true;

            // Affiche notre bannière personnalisée à l'ouverture
            if (!dismissed && !installed && banner) {
                banner.style.display = 'block';
            }

            console.log('PWA peut être installée');
        });

        // Clic sur le bouton "Installer"
        if (installBtn) {
            installBtn.addEventListener('click', async () => {
                if (!this.deferredPrompt) {
                    return;
                }

                // Affiche la popup système d'installation
                this.deferredPrompt.prompt();

                const choiceResult = await this.deferredPrompt.userChoice;

                if (choiceResult.outcome === 'accepted') {
                    console.log("L'utilisateur a accepté l'installation");
                } else {
                    console.log("L'utilisateur a refusé l'installation");
                }

                this.deferredPrompt = null;

                if (banner) {
                    banner.style.display = 'none';
                }

                // On ne repropose plus la bannière immédiatement
                localStorage.setItem('pwaInstallDismissed', 'true');
            });
        }

        // Clic sur le bouton "Plus tard"
        if (dismissBtn) {
            dismissBtn.addEventListener('click', () => {
                if (banner) {
                    banner.style.display = 'none';
                }
                localStorage.setItem('pwaInstallDismissed', 'true');
            });
        }

        // Événement quand la PWA est installée
        window.addEventListener('appinstalled', () => {
            console.log('PWA installée');
            this.showToast('Application installée avec succès !');
            if (banner) {
                banner.style.display = 'none';
            }
            localStorage.setItem('pwaInstallDismissed', 'true');
        });

        // Reprendre la dernière radio au démarrage (si l'option est activée)
        const lastStation = localStorage.getItem('lastStation');
        if (this.autoResumeEnabled && lastStation) {
            const station = this.stations.find(s => s.id === lastStation);
            if (station) {
                // Préparer le player sans lancer la lecture
                this.currentStation = station;
                this.audioPlayer.src = station.url;
                this.isPlaying = false;

                // Afficher le player
                this.playerContainer.style.display = 'block';
                this.playerContainer.classList.remove('minimized');
                this.updatePlayerInfo();
                this.updatePlayerUI();
                this.updateRadioCards();

                // Afficher l'overlay avec bouton de reprise
                const overlay = document.getElementById('autoResumeOverlay');
                const title = document.getElementById('autoResumeTitle');
                const text = document.getElementById('autoResumeText');
                const resumeBtn = document.getElementById('autoResumeBtn');
                const cancelBtn = document.getElementById('autoResumeCancelBtn');

                if (overlay && title && text && resumeBtn && cancelBtn) {
                    title.textContent = `Reprendre ${station.name}`;
                    text.textContent = station.description || 'Votre dernière radio est prête';
                    overlay.style.display = 'flex';

                    // Bouton "Démarrer"
                    resumeBtn.onclick = () => {
                        overlay.style.display = 'none';
                        this.playRadio(station);
                        this.showToast(`Lecture de ${station.name}`);
                    };

                    // Bouton "Annuler"
                    cancelBtn.onclick = () => {
                        overlay.style.display = 'none';
                    };
                }
            }
        }
 }
 
    // === VÉRIFICATION RÉSEAU ===
    checkNetworkStatus() {
        if (!navigator.onLine) {
            this.showToast('Mode hors ligne');
        }
    }
	
	// === APPLIQUER L'ONGLET DE DÉMARRAGE ===
    applyStartupTab() {
        if (this.startOnFavorites) {
            // Activer l'onglet Favoris
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            const favButton = document.querySelector('[data-tab="favoris"]');
            const favContent = document.getElementById('favoris-tab');
            
            if (favButton && favContent) {
                favButton.classList.add('active');
                favContent.classList.add('active');
            }
            
            // Cacher le filtre si on démarre sur Favoris
            this.toggleCategoryFilter('favoris');
        } else {
            // Afficher le filtre si on démarre sur Radios
            this.toggleCategoryFilter('radios');
        }
    }
	
	// === NAVIGATION PAR SWIPE ===
    setupSwipeNavigation() {
        const tabsContainer = document.querySelector('.tabs-container');
        if (!tabsContainer) return;

        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let isSwiping = false;
        let startTime = 0;

        tabsContainer.addEventListener('touchstart', (e) => {
            // Uniquement pour les vrais événements tactiles
            if (e.touches && e.touches.length === 1) {
                touchStartX = e.touches[0].screenX;
                touchStartY = e.touches[0].screenY;
                touchEndX = touchStartX;
                startTime = Date.now();
                isSwiping = false; // Pas encore confirmé
            }
        }, { passive: true });

        tabsContainer.addEventListener('touchmove', (e) => {
            if (!e.touches || e.touches.length !== 1) return;
            
            touchEndX = e.touches[0].screenX;
            const touchEndY = e.touches[0].screenY;
            
            const deltaX = Math.abs(touchEndX - touchStartX);
            const deltaY = Math.abs(touchEndY - touchStartY);
            
            // Confirmer le swipe seulement si mouvement horizontal > vertical
            if (deltaX > deltaY && deltaX > 10) {
                isSwiping = true;
            }
        }, { passive: true });

        tabsContainer.addEventListener('touchend', () => {
            if (!isSwiping) return;
            
            const swipeDistance = touchEndX - touchStartX;
            const swipeTime = Date.now() - startTime;
            const minSwipeDistance = 50;
            const maxSwipeTime = 500; // Max 500ms pour être un swipe rapide
            
            // Vérifier que c'est bien un swipe intentionnel
            if (Math.abs(swipeDistance) > minSwipeDistance && swipeTime < maxSwipeTime) {
                // Swipe vers la droite (afficher Radios)
                if (swipeDistance > 0) {
                    this.switchToTab('radios');
                }
                // Swipe vers la gauche (afficher Favoris)
                else {
                    this.switchToTab('favoris');
                }
            }
            
            isSwiping = false;
        }, { passive: true });
    }

    // === CHANGER D'ONGLET ===
    switchToTab(tabName) {
        // Retirer active de tous
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Activer le bon onglet
        const button = document.querySelector(`[data-tab="${tabName}"]`);
        const content = document.getElementById(`${tabName}-tab`);
        
        if (button && content) {
            button.classList.add('active');
            content.classList.add('active');
        }
    }
	
	// === AFFICHER/CACHER LE FILTRE SELON L'ONGLET ===
    toggleCategoryFilter(tab) {
        const categoryFilter = document.getElementById('categoryFilter');
        if (!categoryFilter) return;
        
        if (tab === 'favoris') {
            categoryFilter.classList.add('hidden');
        } else {
            categoryFilter.classList.remove('hidden');
        }
    }
}

// === INITIALISATION DE L'APPLICATION ===
document.addEventListener('DOMContentLoaded', () => {
    window.radioApp = new RadioPlayerApp();
});
