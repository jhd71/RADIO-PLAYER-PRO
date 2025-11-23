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
                description: 'Info Bourgogne'
            },
            {
                id: 'Radio-Prevert',
                name: 'Radio Prevert',
                url: 'https://vps.cbad.fr:8443/prevert',
                logo: 'images/radio-logos/Radio-Prevert.png',
                description: 'Chalon Sur Saône'
            },
            {
                id: 'La-Radio-Sans-pub',
                name: 'La Radio Sans pub',
                url: 'https://live1.jupinfo.fr:8443/play',
                logo: 'images/radio-logos/La-Radio-Sans-pub.png',
                description: '100% Hits 24/24'
            },
            {
                id: 'France-Info',
                name: 'France Info',
                url: 'https://icecast.radiofrance.fr/franceinfo-midfi.mp3',
                logo: 'images/radio-logos/france-info.png',
                description: 'Info en continu'
            },
            {
                id: 'RTL',
                name: 'RTL',
                url: 'https://streamer-03.rtl.fr/rtl-1-44-128',
                logo: 'images/radio-logos/rtl.png',
                description: 'Info & divertissement'
            },
            {
                id: 'Europe-1',
                name: 'Europe 1',
                url: 'https://europe1.lmn.fm/europe1.mp3',
                logo: 'images/radio-logos/europe1.png',
                description: 'Talk & actualités'
            },
            {
                id: 'RMC',
                name: 'RMC',
                url: 'https://audio.bfmtv.com/rmcradio_128.mp3',
                logo: 'images/radio-logos/rmc.png',
                description: 'Sport & info'
            },
            {
                id: 'Skyrock',
                name: 'Skyrock',
                url: 'https://icecast.skyrock.net/s/natio_aac_128k?tvr_name=tunein16&tvr_section1=64aac',
                logo: 'images/radio-logos/Skyrock.png',
                description: 'Skyrock 1er sur le rap'
            },
            {
                id: 'NRJ',
                name: 'NRJ',
                url: 'https://streaming.nrjaudio.fm/oumvmk8fnozc?origine=fluxurlradio',
                logo: 'images/radio-logos/nrj.png',
                description: 'Hits & musique'
            },
            {
                id: 'Fun-Radio',
                name: 'Fun Radio',
                url: 'https://streamer-02.rtl.fr/fun-1-44-128',
                logo: 'images/radio-logos/Fun-Radio.png',
                description: 'Le son dancefloor'
            },
            {
                id: 'Nostalgie',
                name: 'Nostalgie',
                url: 'https://streaming.nrjaudio.fm/oug7girb92oc?origine=fluxradios',
                logo: 'images/radio-logos/nostalgie.png',
                description: 'Oldies & classics'
            },
            {
                id: 'Cherie-FM',
                name: 'Chérie FM',
                url: 'https://streaming.nrjaudio.fm/ouuku85n3nje?origine=fluxradios',
                logo: 'images/radio-logos/cherie-fm.png',
                description: 'Love songs'
            },           
            {
                id: 'Frequence-Plus',
                name: 'Fréquence Plus',
                url: 'https://fplus-chalonsursaone.ice.infomaniak.ch/fplus-chalonsursaone-128.mp3',
                logo: 'images/radio-logos/Frequence-Plus.png',
                description: 'A plein tubes, Chalon'
            },
            {
                id: 'M-Radio',
                name: 'M Radio',
                url: 'https://mradio-lyon.ice.infomaniak.ch/mradio-lyon.mp3',
                logo: 'images/radio-logos/M-Radio.png',
                description: 'Numéro 1 sur la chanson française'
            },
            {
                id: 'Cerise-FM',
                name: 'Cerise FM',
                url: 'https://stream.rcs.revma.com/q90fb3dwnwzuv.mp3',
                logo: 'images/radio-logos/Cerise-FM.png',
                description: 'Les tubes d\'hier, les hits d\'aujourd\'hui'
            },
            {
                id: 'Alouette-FM',
                name: 'Alouette FM',
                url: 'https://alouette-poitiers.ice.infomaniak.ch/alouette-poitiers-128.mp3',
                logo: 'images/radio-logos/Alouette-FM.png',
                description: 'Toujours plus de Hits'
            },
            {
                id: 'RTL2',
                name: 'RTL2',
                url: 'https://streamer-02.rtl.fr/rtl2-1-44-128',
                logo: 'images/radio-logos/RTL2.png',
                description: 'Le Son Pop-Rock'
            },
            {
                id: 'Alouette-Nouveaux-Talents',
                name: 'Alouette Nouveaux Talents',
                url: 'https://alouettenouveauxtalents.ice.infomaniak.ch/alouettenouveauxtalents-128.mp3',
                logo: 'images/radio-logos/Alouette-Nouveaux-Talents.png',
                description: '1ère Radio Régionale de France'
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
		this.equalizerFilters = null;
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
    }

     // === CONFIGURATION AUDIO ===
    setupAudioPlayer() {
        this.audioPlayer.volume = this.volume;
        
        // Créer l'égaliseur dès le départ (maintenant que CORS est réglé via proxy)
        this.setupEqualizer();
        
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

    // === CONFIGURATION ÉGALISEUR ===
    setupEqualizer() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = this.audioContext.createMediaElementSource(this.audioPlayer);
            
            // Créer les filtres pour chaque bande
            this.equalizerFilters = [
                this.audioContext.createBiquadFilter(), // 60 Hz
                this.audioContext.createBiquadFilter(), // 250 Hz
                this.audioContext.createBiquadFilter(), // 1 kHz
                this.audioContext.createBiquadFilter(), // 4 kHz
                this.audioContext.createBiquadFilter()  // 14 kHz
            ];

            // Configurer les fréquences
            const frequencies = [60, 250, 1000, 4000, 14000];
            this.equalizerFilters.forEach((filter, index) => {
                filter.type = 'peaking';
                filter.frequency.value = frequencies[index];
                filter.Q.value = 1;
                filter.gain.value = 0;
            });

            // Connecter en chaîne : source → filtres → destination
            source.connect(this.equalizerFilters[0]);
            for (let i = 0; i < this.equalizerFilters.length - 1; i++) {
                this.equalizerFilters[i].connect(this.equalizerFilters[i + 1]);
            }
            this.equalizerFilters[this.equalizerFilters.length - 1].connect(this.audioContext.destination);

            console.log('Égaliseur initialisé');
        } catch (error) {
            console.error('Erreur initialisation égaliseur:', error);
        }
    }

    // === RENDU DES RADIOS ===
    renderRadios() {
        this.radiosGrid.innerHTML = '';
        
        this.stations.forEach(station => {
            const card = this.createRadioCard(station);
            this.radiosGrid.appendChild(card);
        });
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
        
        // Long press pour menu contextuel
        let pressTimer;
        let longPress = false;
        
        card.addEventListener('mousedown', (e) => {
            pressTimer = setTimeout(() => {
                longPress = true;
                this.showContextMenu(e, station);
            }, 500);
        });
        
        card.addEventListener('mouseup', () => {
            clearTimeout(pressTimer);
            if (longPress) {
                longPress = false;
            }
        });
        
        card.addEventListener('touchstart', (e) => {
            pressTimer = setTimeout(() => {
                longPress = true;
                // Utiliser les coordonnées du toucher correctement
                const touch = e.touches[0];
                const fakeEvent = {
                    clientX: touch.clientX,
                    clientY: touch.clientY,
                    preventDefault: () => {}
                };
                this.showContextMenu(fakeEvent, station);
                e.preventDefault();
            }, 500);
        });
        
        card.addEventListener('touchend', () => {
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
        
        // TEST: Utiliser l'URL directe SANS proxy pour vérifier
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
        // Retirer toutes les classes playing
        document.querySelectorAll('.radio-card').forEach(card => {
            card.classList.remove('playing');
        });
        
        // Ajouter la classe playing à la carte active
        if (this.currentStation && this.isPlaying) {
            const activeCard = document.querySelector(`[data-station-id="${this.currentStation.id}"]`);
            if (activeCard) {
                activeCard.classList.add('playing');
            }
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

        // Démarrer le minuteur
        if (startBtn && sleepSelect) {
            startBtn.addEventListener('click', () => {
                const minutes = parseInt(sleepSelect.value, 10);

                if (isNaN(minutes) || minutes <= 0) {
                    this.cancelSleepTimer();
                    this.showToast('Minuteur désactivé');
                } else {
                    this.startSleepTimer(minutes);
                    this.showToast(`La radio s'arrêtera dans ${minutes} minutes`);
                }

                this.updateSleepTimerInfo();
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

        // Pas d'élément dans le DOM -> on ne fait rien
        if (!info) return;

        // Aucun minuteur en cours
        if (!this.sleepTimerEndTime) {
            info.textContent = 'Aucun minuteur actif';

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

// Égaliseur
        document.getElementById('equalizerBtn').addEventListener('click', () => {
            this.toggleEqualizer();
        });

        document.getElementById('equalizerCloseBtn').addEventListener('click', () => {
            document.getElementById('equalizerPanel').style.display = 'none';
        });

        // Sliders d'égaliseur
        const eqSliders = document.querySelectorAll('.eq-slider');
        eqSliders.forEach((slider, index) => {
            slider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                const valueDisplay = e.target.nextElementSibling;
                valueDisplay.textContent = `${value > 0 ? '+' : ''}${value} dB`;
                
                if (this.equalizerFilters && this.equalizerFilters[index]) {
                    this.equalizerFilters[index].gain.value = value;
                }
            });
        });

        // Préréglages
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.applyEQPreset(btn.dataset.preset);
            });
        });

        // Reset égaliseur
        document.getElementById('equalizerReset').addEventListener('click', () => {
            this.applyEQPreset('flat');
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('[data-preset="flat"]').classList.add('active');
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
	
	// === TOGGLE ÉGALISEUR ===
    toggleEqualizer() {
        const panel = document.getElementById('equalizerPanel');
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
        } else {
            panel.style.display = 'none';
        }
    }

    // === APPLIQUER PRÉRÉGLAGE ÉGALISEUR ===
    applyEQPreset(preset) {
        const presets = {
            flat: [0, 0, 0, 0, 0],
            bass: [8, 4, 0, -2, -3],
            rock: [5, 3, -1, 2, 4],
            jazz: [4, 2, -2, 2, 4],
            vocal: [-2, -1, 3, 4, 2]
        };

        const values = presets[preset] || presets.flat;
        const sliders = document.querySelectorAll('.eq-slider');

        sliders.forEach((slider, index) => {
            slider.value = values[index];
            const valueDisplay = slider.nextElementSibling;
            valueDisplay.textContent = `${values[index] > 0 ? '+' : ''}${values[index]} dB`;

            if (this.equalizerFilters && this.equalizerFilters[index]) {
                this.equalizerFilters[index].gain.value = values[index];
            }
        });
    }
}

// === INITIALISATION DE L'APPLICATION ===
document.addEventListener('DOMContentLoaded', () => {
    window.radioApp = new RadioPlayerApp();
});
