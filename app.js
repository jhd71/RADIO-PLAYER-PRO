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
        this.playerMinimized = false;
        this.errorCount = 0;

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
        this.setupSettingsPanel();
        this.setupSleepTimer();
        this.setupPWA();
        this.checkNetworkStatus();
    }

    // === CONFIGURATION AUDIO ===
    setupAudioPlayer() {
        this.audioPlayer.volume = this.volume;
        
        // Événements audio
        this.audioPlayer.addEventListener('play', () => {
            this.isPlaying = true;
            this.errorCount = 0; // Réinitialiser le compteur d'erreurs
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
            // Si on vient d'appuyer sur STOP, on ignore cette erreur
            if (this.isStopping) {
                this.isStopping = false;
                return;
            }

            // Éviter la boucle infinie d'erreurs
            this.errorCount++;
            
            if (this.errorCount <= 1 && this.audioPlayer.src !== '') {
                console.error('Erreur audio:', e);
                this.showToast('Erreur de lecture. Vérifiez votre connexion.');
                // Arrêter proprement sans déclencher de nouvelles erreurs
                this.isPlaying = false;
                this.audioPlayer.pause();
                this.audioPlayer.src = '';
                this.updatePlayerUI();
                this.updateRadioCards();
                this.stopVisualizer();
            }
        });

        this.audioPlayer.addEventListener('waiting', () => {
            document.getElementById('playerStatus').textContent = 'Chargement...';
        });

        this.audioPlayer.addEventListener('canplay', () => {
            if (this.isPlaying) {
                document.getElementById('playerStatus').textContent = 'En lecture';
            }
        });
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
        // Indique qu'on arrête volontairement la lecture
        this.isStopping = true;
        this.isPlaying = false;
        this.audioPlayer.pause();
        this.audioPlayer.src = '';
        this.currentStation = null;
        this.errorCount = 0;
        this.playerContainer.style.display = 'none';
        this.updateRadioCards();
        this.stopVisualizer();
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
            volumeValue.textContent = `${e.target.value}%`;
            this.updateVolumeIcon();
        });
        
        // Initialiser le slider
        volumeSlider.value = this.volume * 100;
        volumeValue.textContent = `${Math.round(this.volume * 100)}%`;
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
		this.setupAutoResumeCheckbox();
    }

        // === PWA ET LECTURE AUTOMATIQUE ===
setupPWA() {
    // Installation PWA
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        console.log('PWA peut être installée');
        
        // Afficher la bannière d'installation
        const banner = document.getElementById('pwaInstallBanner');
        if (banner) {
            banner.style.display = 'flex';
            
            // Gérer le bouton installer
            const installBtn = document.getElementById('pwaInstallBtn');
            if (installBtn) {
                installBtn.addEventListener('click', async () => {
                    if (deferredPrompt) {
                        deferredPrompt.prompt();
                        const { outcome } = await deferredPrompt.userChoice;
                        console.log(`Installation ${outcome}`);
                        deferredPrompt = null;
                        banner.style.display = 'none';
                    }
                });
            }
            
            // Gérer le bouton plus tard
            const laterBtn = document.getElementById('pwaLaterBtn');
            if (laterBtn) {
                laterBtn.addEventListener('click', () => {
                    banner.style.display = 'none';
                });
            }
        }
    });

    // Gérer l'installation
    window.addEventListener('appinstalled', () => {
        console.log('PWA installée');
        this.showToast('Application installée avec succès!');
        const banner = document.getElementById('pwaInstallBanner');
        if (banner) {
            banner.style.display = 'none';
        }
    });

    // === LECTURE AUTOMATIQUE AU DÉMARRAGE ===
    // Vérifier si l'option est activée
    const autoResume = localStorage.getItem('autoResumeRadio') === 'true';
    const lastStation = localStorage.getItem('lastStation');
    
    if (autoResume && lastStation) {
        const station = this.stations.find(s => s.id === lastStation);
        if (station) {
            // Attendre que la page soit complètement chargée
            setTimeout(() => {
                console.log('Reprise automatique de:', station.name);
                
                // Démarrer la lecture automatiquement
                this.currentStation = station;
                this.audioPlayer.src = station.url;
                
                // Tentative de lecture automatique
                const playPromise = this.audioPlayer.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // Lecture démarrée avec succès
                        console.log('Lecture automatique démarrée');
                        this.showToast(`Reprise de ${station.name}`);
                        
                        // Afficher le player
                        this.playerContainer.style.display = 'block';
                        this.updatePlayerInfo();
                    }).catch(error => {
                        console.log('Lecture automatique bloquée:', error);
                        
                        // Si la lecture automatique est bloquée (politique navigateur)
                        // Préparer la radio mais attendre une interaction utilisateur
                        this.currentStation = station;
                        this.playerContainer.style.display = 'block';
                        this.updatePlayerInfo();
                        
                        // Afficher un message pour informer l'utilisateur
                        this.showToast(`${station.name} prête. Cliquez sur lecture pour démarrer.`);
                        
                        // Ajouter un écouteur pour démarrer au premier clic
                        const startPlayback = () => {
                            if (!this.isPlaying && this.currentStation) {
                                this.audioPlayer.play().then(() => {
                                    console.log('Lecture démarrée après interaction');
                                }).catch(err => console.error('Erreur:', err));
                            }
                            // Retirer l'écouteur après le premier clic
                            document.removeEventListener('click', startPlayback);
                        };
                        
                        // Attendre le premier clic de l'utilisateur
                        document.addEventListener('click', startPlayback);
                    });
                }
            }, 1000); // Attendre 1 seconde après le chargement
        }
    }
}

// === GESTION DES PARAMÈTRES ===
setupAutoResumeCheckbox() {
    const checkbox = document.getElementById('autoResumeCheckbox');
    if (checkbox) {
        checkbox.checked = localStorage.getItem('autoResumeRadio') === 'true';
        
        checkbox.addEventListener('change', (e) => {
            localStorage.setItem('autoResumeRadio', e.target.checked ? 'true' : 'false');
            
            if (e.target.checked) {
                this.showToast('Reprise automatique activée');
            } else {
                this.showToast('Reprise automatique désactivée');
            }
        });
    }
}

setupSleepTimer() {
    const select = document.getElementById('sleepTimerSelect');
    const cancelBtn = document.getElementById('cancelSleepTimer');
    const status = document.getElementById('sleepTimerStatus');
    
    if (select) {
        select.addEventListener('change', (e) => {
            const minutes = parseInt(e.target.value);
            
            if (this.sleepTimer) {
                clearTimeout(this.sleepTimer);
                this.sleepTimer = null;
            }
            
            if (minutes > 0) {
                this.sleepTimer = setTimeout(() => {
                    this.stopRadio();
                    this.showToast('Radio arrêtée par le minuteur');
                    select.value = '0';
                    if (status) {
                        status.style.display = 'none';
                    }
                }, minutes * 60 * 1000);
                
                if (status) {
                    status.style.display = 'block';
                    status.textContent = `Arrêt dans ${minutes} minutes`;
                }
                
                this.showToast(`Minuteur: arrêt dans ${minutes} minutes`);
            } else {
                if (status) {
                    status.style.display = 'none';
                }
            }
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (this.sleepTimer) {
                clearTimeout(this.sleepTimer);
                this.sleepTimer = null;
            }
            if (select) {
                select.value = '0';
            }
            if (status) {
                status.style.display = 'none';
            }
            this.showToast('Minuteur annulé');
        });
    }
}

setupSettingsPanel() {
    const settingsBtn = document.getElementById('settingsBtn');
    const overlay = document.getElementById('settingsOverlay');
    const closeBtn = document.getElementById('closeSettings');
    
    if (settingsBtn && overlay) {
        settingsBtn.addEventListener('click', () => {
            overlay.style.display = 'flex';
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                overlay.style.display = 'none';
            });
        }
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    }
}

    // === VÉRIFICATION RÉSEAU ===
    checkNetworkStatus() {
        if (!navigator.onLine) {
            this.showToast('Mode hors ligne');
        }
    }
}

// === INITIALISATION DE L'APPLICATION ===
document.addEventListener('DOMContentLoaded', () => {
    window.radioApp = new RadioPlayerApp();
});
