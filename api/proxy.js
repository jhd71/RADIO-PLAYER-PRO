// API Proxy pour streaming audio avec gestion CORS
export default async function handler(req, res) {
    // Headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges');
    
    // Répondre aux requêtes OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Récupérer l'URL de la radio
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).json({ 
            error: 'Paramètre URL manquant' 
        });
    }
    
    try {
        const radioUrl = decodeURIComponent(url);
        
        // Headers pour la requête
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Icy-MetaData': '1'
        };
        
        // Ajouter Range si présent
        if (req.headers.range) {
            headers['Range'] = req.headers.range;
        }
        
        // Faire la requête vers le flux radio
        const response = await fetch(radioUrl, {
            method: 'GET',
            headers: headers
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        // Définir les headers de réponse
        const contentType = response.headers.get('content-type') || 'audio/mpeg';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Accept-Ranges', 'bytes');
        
        // Copier les autres headers utiles
        if (response.headers.get('content-length')) {
            res.setHeader('Content-Length', response.headers.get('content-length'));
        }
        
        // IMPORTANT: Streamer les données au lieu de tout charger
        const reader = response.body.getReader();
        
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            // Envoyer les chunks au client
            res.write(Buffer.from(value));
        }
        
        res.end();
        
    } catch (error) {
        console.error('Erreur proxy:', error.message);
        
        if (!res.headersSent) {
            return res.status(500).json({ 
                error: 'Erreur de streaming',
                message: error.message 
            });
        }
    }
}

// Configuration Vercel pour permettre le streaming
export const config = {
    api: {
        responseLimit: false,
        bodyParser: false
    }
};