// netlify/functions/transcribe.js

/**
 * Función Netlify para simular la transcripción de audio (o archivo) a notación ABC.
 * Esta versión devuelve una partitura de batería de 40 compases para pruebas visuales.
 */
exports.handler = async (event, context) => {
    // 1. Verificar el método (solo acepta POST)
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Método no permitido. Solo POST." }),
        };
    }

    try {
        // --- INICIO: GENERACIÓN DE PARTITURA SIMULADA DE 40 COMPASES ---

        // Configuración necesaria para la partitura de Batería (Percusión) en formato ABC
        const header = `X: 1
T: Canción de Prueba - Partitura Extendida (40 Compases)
M: 4/4
L: 1/8
K: perc
V: 1 name="Batería" clef=perc
%%measurebox 1 0 0 0
%%score 1
`;

        // Definiciones de Percusión Estándar en ABC
        // C: Crash Cymbal (Plato de Crash)
        // c: Ride Cymbal (Plato de Ride)
        // H: Hi-Hat cerrado (Plato)
        // h: Hi-Hat abierto (Plato)
        // S: Snare Drum (Caja)
        // T: High Tom (Tom Alto)
        // M: Mid Tom (Tom Medio)
        // L: Floor Tom (Tom de Piso)
        // B: Bass Drum (Bombo)
        
        // Patrones Reutilizables (en corcheas L: 1/8)
        const groove_rock = `[H2B2] [H2S2] [H2B2] [H2S2]`; // Bombo, Caja, Hi-Hat
        const groove_soft = `[c2] [S2] [c2B2] [S2]`;      // Ride, Caja, Bombo ocasional
        const groove_chorus = `[C2B2] [S2] [C2B2] [S2]`;  // Crash, Bombo, Caja (Potente)
        const fill_toms = `(T2M2) (L2S2)`;                // Relleno de Toms y Caja

        // Partitura (40 compases en total)
        let score = `\n[V: 1]\n`;

        // 1. INTRODUCCIÓN (8 compases)
        score += `\n% --- INTRODUCCIÓN (8 compases) ---\n`;
        // 7 compases de Groove + 1 compás de Relleno
        for (let i = 0; i < 7; i++) {
            score += `${groove_rock} `;
            if ((i + 1) % 4 === 0) score += `|\\n`; 
        }
        score += `| ${fill_toms} |`; // Compás 8
        
        // 2. VERSO 1 (10 compases)
        score += `\n% --- VERSO 1 (10 compases) ---\n`;
        // 9 compases de Groove Suave + 1 compás de Silencio
        for (let i = 0; i < 9; i++) {
            score += `${groove_soft} `;
            if ((i + 1) % 5 === 0) score += `|\\n`;
        }
        score += `| z8 |`; // Compás 18 (Silencio de 4 tiempos)

        // 3. ESTRIBILLO (8 compases)
        score += `\n% --- ESTRIBILLO (8 compases) ---\n`;
        // 8 compases de Groove Potente
        for (let i = 0; i < 8; i++) {
            score += `${groove_chorus} `;
            if ((i + 1) % 4 === 0) score += `|\\n`; 
        }

        // 4. SOLO DE TOMS/PUENTE (8 compases)
        score += `\n% --- SOLO DE TOMS (8 compases) ---\n`;
        score += `(T2M2L2B2) (T2M2L2S2) | (T2M2L2B2) (T2M2L2S2) |`; // Relleno de Toms
        score += `z8 | z8 |`; // 2 compases de silencio
        score += `${groove_rock} | ${groove_rock} |`; // 2 compases de vuelta
        score += `(B2S2) (B2S2) | ${fill_toms} |`; // Últimos 2 de transición
        
        // 5. FINAL (6 compases)
        score += `\n% --- FINAL (6 compases) ---\n`;
        score += `${groove_chorus} ${groove_chorus} ${groove_chorus} |\\n`; // 3 compases
        score += `${groove_rock} ${groove_rock} |`; // 2 compases
        score += `[C8] |]`; // Final con Crash largo (4 tiempos) y doble barra (])

        const finalAbcNotation = header + score;
        // Total: 8 + 10 + 8 + 8 + 6 = 40 compases.

        // --- FIN: GENERACIÓN DE PARTITURA SIMULADA ---


        // Simulación de respuesta exitosa
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                abcNotation: finalAbcNotation,
                message: "Partitura simulada generada exitosamente (40 compases).",
            }),
        };

    } catch (error) {
        console.error("Error en la función transcribe:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Error interno del servidor al simular la transcripción.",
                details: error.message
            }),
        };
    }
};
