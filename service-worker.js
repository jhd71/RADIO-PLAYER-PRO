const CACHE_NAME = 'radio-player-v3';
const RUNTIME_CACHE = 'radio-runtime-v1';

// Fichiers à mettre en cache
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// === INSTALLATION ===
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installation...');
    
    // Créer le fichier offline.html dynamiquement
    const offlineResponse = new Response(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Radio Player Pro - Hors ligne</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                }
                .offline-container {
                    text-align: center;
                    padding: 2rem;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                .offline-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                h1 {
                    margin: 0 0 0.5rem 0;
                    font-size: 1.5rem;
                }
                p {
                    margin: 0;
                    opacity: 0.8;
                }
                button {
                    margin-top: 1.5rem;
                    padding: 0.75rem 2rem;
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                button:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            </style>
        </head>
        <body>
            <div class="offline-container">
                <div class="offline-icon">📡</div>
                <h1>Mode hors ligne</h1>
                <p>Impossible de se connecter au serveur</p>
                <p>Vérifiez votre connexion Internet</p>
                <button onclick="window.location.reload()">Réessayer</button>
            </div>
        </body>
        </html>
    `, {
        headers: { 'Content-Type': 'text/html' }
    });
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // Mettre en cache les fichiers statiques
                return Promise.all([
                    cache.addAll(STATIC_CACHE_URLS.filter(url => !url.startsWith('https://'))),
                    cache.put('/offline.html', offlineResponse)
                ]);
            })
            .then(() => self.skipWaiting())
    );
});

// === ACTIVATION ===
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activation...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => {
                            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
                        })
                        .map(cacheName => {
                            console.log('Service Worker: Suppression du cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// === FETCH ===
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Ignorer les requêtes non-GET
    if (request.method !== 'GET') {
        return;
    }
    
    // Pour les flux audio (streaming), ne pas mettre en cache
    if (request.url.includes('.mp3') || request.url.includes('.aac') || 
        request.url.includes('stream') || request.url.includes('icecast')) {
        event.respondWith(
            fetch(request)
                .catch(() => {
                    // En cas d'erreur réseau pour l'audio
                    return new Response('', {
                        status: 503,
                        statusText: 'Service Unavailable'
                    });
                })
        );
        return;
    }
    
    // Pour les images de logos
if (request.url.includes('/images/radio-logos/')) {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    
                    return fetch(request)
                        .then(response => {
                            // Ne pas mettre en cache les erreurs
                            if (!response || response.status !== 200) {
                                return response;
                            }
                            
                            const responseToCache = response.clone();
                            
                            caches.open(RUNTIME_CACHE)
                                .then(cache => {
                                    cache.put(request, responseToCache);
                                });
                            
                            return response;
                        })
                        .catch(() => {
                            // Retourner une image par défaut
							return caches.match('/images/radio-logos/default.png');

                        });
                })
        );
        return;
    }
    
    // Pour les ressources statiques
    if (url.origin === location.origin) {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    
                    return fetch(request)
                        .then(response => {
                            // Ne pas mettre en cache les erreurs
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }
                            
                            const responseToCache = response.clone();
                            
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(request, responseToCache);
                                });
                            
                            return response;
                        });
                })
                .catch(() => {
                    // Retourner la page offline si disponible
                    if (request.destination === 'document') {
                        return caches.match('/offline.html');
                    }
                })
        );
        return;
    }
    
    // Pour les ressources externes (fonts, etc.)
    event.respondWith(
        caches.match(request)
            .then(response => {
                if (response) {
                    return response;
                }
                
                return fetch(request)
                    .then(response => {
                        // Mettre en cache les fonts Google
                        if (request.url.includes('fonts.googleapis.com') || 
                            request.url.includes('fonts.gstatic.com')) {
                            
                            const responseToCache = response.clone();
                            
                            caches.open(RUNTIME_CACHE)
                                .then(cache => {
                                    cache.put(request, responseToCache);
                                });
                        }
                        
                        return response;
                    });
            })
            .catch(() => {
                // Erreur réseau
                console.error('Fetch failed:', request.url);
            })
    );
});

// === MESSAGES ===
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
                caches.delete(cacheName);
            });
        });
    }
});

// === PUSH NOTIFICATIONS (pour futur usage) ===
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'Nouvelle notification',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ouvrir',
                icon: '/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Fermer',
                icon: '/icons/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Radio Player Pro', options)
    );
});

// === NOTIFICATION CLICK ===
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// === SYNC (pour futur usage) ===
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-favorites') {
        event.waitUntil(
            // Synchroniser les favoris avec le serveur
            console.log('Synchronisation des favoris...')
        );
    }
});
