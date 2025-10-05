const { Deepgram } = require('@deepgram/sdk');

// IMPORTANTE: Tu DEEPGRAM_API_KEY debe estar configurada en Netlify.

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Método no permitido. Usa POST." }),
        };
    }

    try {
        const data = JSON.parse(event.body);
        const { fileName, fileContent, fileType } = data;

        if (!fileContent || !fileType.startsWith('audio/')) {
             return {
                statusCode: 400,
                body: JSON.stringify({ error: "Datos de audio no válidos." }),
            };
        }
        
        const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);
        const audioBuffer = Buffer.from(fileContent, 'base64');
        
        // Transcripción a Texto
        const transcriptionResult = await deepgram.transcription.preRecorded(
            { buffer: audioBuffer, mimetype: fileType },
            { smart_format: true, model: 'latest' }
        );

        const transcript = transcriptionResult.results.channels[0].alternatives[0].transcript;
        
        // SIMULACIÓN DE CONVERSIÓN A NOTACIÓN ABC
        let abcNotation = 
`X: 1
T: Minueto Generado (Simulado)
M: 4/4
L: 1/4
K: C
|: CDEF | GABc | d2c2 | B2A2 :|`;

        if (transcript.toLowerCase().includes('hola')) {
            abcNotation = 
`X: 2
T: Saludo de Prueba
M: 3/4
L: 1/8
K: G
| D'D'B2 | GABG | D'2G2 | z4 |`;
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: 'Transcripción y simulación exitosa.',
                transcript: transcript,
                abcNotation: abcNotation
            }),
        };

    } catch (error) {
        console.error('Transcription error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Fallo al procesar la solicitud en el servidor.', 
                details: error.message 
            }),
        };
    }
};
