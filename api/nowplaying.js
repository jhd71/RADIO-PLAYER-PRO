// api/nowplaying.js - API Vercel pour récupérer les métadonnées radio

export default async function handler(req, res) {
    // Autoriser CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).json({ error: 'URL manquante' });
    }

    try {
        // Faire une requête vers le flux avec les headers ICY
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Icy-MetaData': '1',
                'User-Agent': 'RadioFM/1.0'
            },
            signal: controller.signal
        });

        clearTimeout(timeout);

        // Récupérer les headers ICY
        const icyName = response.headers.get('icy-name') || '';
        const icyDescription = response.headers.get('icy-description') || '';
        const icyGenre = response.headers.get('icy-genre') || '';
        const icyBr = response.headers.get('icy-br') || '';
        const icyMetaInt = response.headers.get('icy-metaint');

        let nowPlaying = '';

        // Si le flux supporte les métadonnées en temps réel
        if (icyMetaInt) {
            const metaInt = parseInt(icyMetaInt, 10);
            
            // Lire assez de données pour atteindre les métadonnées
            const reader = response.body.getReader();
            let bytesRead = 0;
            let chunks = [];

            while (bytesRead < metaInt + 4080) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
                bytesRead += value.length;
                
                // Limiter pour ne pas trop télécharger
                if (bytesRead > 50000) break;
            }

            reader.cancel();

            // Combiner les chunks
            const allData = new Uint8Array(bytesRead);
            let offset = 0;
            for (const chunk of chunks) {
                allData.set(chunk, offset);
                offset += chunk.length;
            }

            // Chercher les métadonnées après metaInt octets
            if (allData.length > metaInt) {
                const metaLength = allData[metaInt] * 16;
                if (metaLength > 0 && allData.length > metaInt + 1 + metaLength) {
                    const metaData = new TextDecoder().decode(
                        allData.slice(metaInt + 1, metaInt + 1 + metaLength)
                    );
                    
                    // Extraire StreamTitle
                    const match = metaData.match(/StreamTitle='([^']*?)'/);
                    if (match && match[1]) {
                        nowPlaying = match[1].trim();
                    }
                }
            }
        }

        // Nettoyer le titre (enlever les caractères bizarres)
        nowPlaying = nowPlaying.replace(/\0/g, '').trim();

        return res.status(200).json({
            success: true,
            nowPlaying: nowPlaying || null,
            stationName: icyName || null,
            description: icyDescription || null,
            genre: icyGenre || null,
            bitrate: icyBr || null
        });

    } catch (error) {
        console.error('Erreur nowplaying:', error.message);
        return res.status(200).json({
            success: false,
            nowPlaying: null,
            error: error.message
        });
    }
}