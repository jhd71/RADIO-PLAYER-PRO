# 🎵 Radio Player Pro - PWA avec effet Liquid Glass

## 📱 Description

Radio Player Pro est une Progressive Web App (PWA) moderne pour écouter vos radios préférées avec un superbe design "liquid glass" (verre liquide).

## ✨ Fonctionnalités

- **🎨 Design Liquid Glass** : Interface moderne avec effets de verre et animations fluides
- **📱 PWA Complète** : Installable sur Android et iPhone comme une vraie application
- **❤️ Système de Favoris** : Marquez vos radios préférées (appui long ou clic droit)
- **🎵 20 Radios Françaises** : France Inter, RTL, Europe 1, RMC, etc.
- **📶 Mode Hors Ligne** : L'interface reste accessible même sans connexion
- **🎮 Contrôles Intuitifs** : Play/Pause, Volume, Stop
- **💾 Sauvegarde Automatique** : Vos favoris sont sauvegardés localement
- **🌊 Animations Fluides** : Visualiseur audio animé pendant la lecture
- **📲 Responsive** : S'adapte parfaitement à tous les écrans

## 📂 Structure des fichiers

```
radio-player-pro/
├── index.html          # Page principale
├── style.css          # Styles avec effet liquid glass
├── app.js             # Logique JavaScript
├── service-worker.js  # Service Worker pour PWA
├── manifest.json      # Configuration PWA
├── server.py          # Serveur de test
├── create_logos.py    # Script pour générer les logos
├── logos/             # Logos des radios (PNG)
│   ├── france-inter.png
│   ├── rtl.png
│   └── ...
└── icons/             # Icônes de l'application
    ├── icon-192.png
    ├── icon-512.png
    └── ...
```

## 🚀 Installation et Utilisation

### Option 1 : Test en local

1. **Lancer le serveur de test** :
   ```bash
   python3 server.py
   ```

2. **Ouvrir dans le navigateur** :
   - Sur PC : http://localhost:8000
   - Sur mobile (même réseau WiFi) : http://[VOTRE-IP]:8000

### Option 2 : Déploiement sur votre site

1. **Copier tous les fichiers** dans un dossier de votre site web

2. **Configurer le serveur** pour servir les fichiers avec les bons headers :
   - Le Service Worker nécessite HTTPS (sauf localhost)
   - Le manifest.json doit avoir le Content-Type `application/manifest+json`

3. **Modifier les URLs** dans `app.js` si nécessaire (logos, etc.)

## 📱 Installation sur Mobile

### Sur Android :
1. Ouvrez le site dans Chrome
2. Un bandeau "Installer l'application" apparaîtra
3. Ou cliquez sur le menu (3 points) → "Installer l'application"

### Sur iPhone/iPad :
1. Ouvrez le site dans Safari
2. Cliquez sur le bouton Partage (carré avec flèche)
3. Choisissez "Sur l'écran d'accueil"

## 🎮 Utilisation

### Navigation :
- **Onglet Radios** : Toutes les radios disponibles
- **Onglet Favoris** : Vos radios préférées

### Contrôles :
- **Clic simple** sur une radio : Lance la lecture
- **Clic long** (ou clic droit) : Menu contextuel (ajouter/retirer des favoris)
- **Bouton Play/Pause** : Contrôle la lecture
- **Bouton Volume** : Affiche le slider de volume
- **Bouton Stop** : Arrête complètement la lecture

### Favoris :
- **Ajouter** : Clic long sur une radio → "Ajouter aux favoris"
- **Retirer** : Clic long sur un favori → "Retirer des favoris"
- Les favoris sont sauvegardés automatiquement

## 🎨 Personnalisation

### Modifier les couleurs (dans style.css) :

```css
:root {
    --primary-color: #4a90e2;      /* Couleur principale */
    --secondary-color: #7b68ee;     /* Couleur secondaire */
    --accent-color: #ff6b6b;        /* Couleur d'accent */
    --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Fond */
}
```

### Ajouter une radio (dans app.js) :

```javascript
{
    id: 'ma-radio',
    name: 'Ma Radio',
    url: 'https://stream.maradio.fr/stream.mp3',
    logo: 'logos/ma-radio.png',
    description: 'Description de ma radio'
}
```

### Créer un nouveau logo :

Modifiez `create_logos.py` et ajoutez votre radio :
```python
'ma-radio': {'name': 'Ma\nRadio', 'color': '#FFFFFF', 'bg': '#FF0000'}
```

Puis exécutez :
```bash
python3 create_logos.py
```

## 🐛 Dépannage

### La radio ne se lance pas :
- Vérifiez votre connexion Internet
- Certains flux peuvent être bloqués par CORS
- Vérifiez l'URL du flux dans la console du navigateur

### L'installation PWA ne fonctionne pas :
- Le site doit être en HTTPS (sauf localhost)
- Vérifiez que le Service Worker est bien enregistré
- Sur iOS, utilisez Safari (pas Chrome)

### Les logos ne s'affichent pas :
- Vérifiez que le dossier `logos/` est bien présent
- Les images doivent être en PNG
- Un logo par défaut est utilisé en cas d'erreur

## 📝 Notes Techniques

- **Service Worker** : Met en cache l'interface pour le mode hors ligne
- **LocalStorage** : Sauvegarde les favoris et préférences
- **Audio API** : Utilise l'élément HTML5 `<audio>` natif
- **Responsive** : Grille adaptative de 3 à 5 colonnes selon l'écran
- **Animations** : CSS animations avec GPU acceleration

## 🔧 Configuration Serveur (pour production)

### Apache (.htaccess) :
```apache
<IfModule mod_headers.c>
    Header set Service-Worker-Allowed "/"
    <FilesMatch "\.json$">
        Header set Content-Type "application/manifest+json"
    </FilesMatch>
</IfModule>
```

### Nginx :
```nginx
location / {
    add_header Service-Worker-Allowed "/";
}

location ~ \.json$ {
    add_header Content-Type "application/manifest+json";
}
```

## 📄 Licence

Ce projet est libre d'utilisation. Vous pouvez le modifier et l'adapter selon vos besoins.

## 🙏 Crédits

- Design : Effet Liquid Glass moderne
- Icônes : Material Icons (Google)
- Police : Inter (Google Fonts)

---

**Développé avec ❤️ pour Hervé et la communauté actuetmedia.fr**
