// API Proxy pour contourner les restrictions CORS sur les flux radio
export default async function handler(req, res) {
    // Permettre toutes les origines (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Range');
    
    // Gérer les requêtes OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Récupérer l'URL de la radio depuis les paramètres
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).json({ 
            error: 'URL manquante',
            message: 'Utilisez ?url=https://...' 
        });
    }
    
    try {
        // Décoder l'URL si elle est encodée
        const radioUrl = decodeURIComponent(url);
        
        console.log('Proxy vers:', radioUrl);
        
        // Faire la requête vers le flux radio
        const response = await fetch(radioUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': '*/*',
                'Range': req.headers.range || 'bytes=0-'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        // Copier les headers importants
        const contentType = response.headers.get('content-type') || 'audio/mpeg';
        const contentLength = response.headers.get('content-length');
        
        res.setHeader('Content-Type', contentType);
        
        if (contentLength) {
            res.setHeader('Content-Length', contentLength);
        }
        
        // Permettre le streaming
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Cache-Control', 'no-cache');
        
        // Transférer le flux audio
        const buffer = await response.arrayBuffer();
        res.status(200).send(Buffer.from(buffer));
        
    } catch (error) {
        console.error('Erreur proxy:', error);
        
        return res.status(500).json({ 
            error: 'Erreur proxy',
            message: error.message 
        });
    }
}