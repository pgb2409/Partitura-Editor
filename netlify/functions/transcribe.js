// netlify/functions/transcribe.js
exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: "Método no permitido." }) };
    }

    const longAbcNotation = `X:1\nT:Partitura Larga de Simulación\nM:4/4\nL:1/8\nK:C\nV:1 name="Voz 1"\nV:2 name="Voz 2" clef=bass\n\n[V:1] "C"C2E2G2c2 | "G"d2B2G2d2 | "Am"c2A2E2c2 | "Em"B2G2E2B2 | "F"A2c2E2A2 | "C"G2E2C2G2 | "G7"F2E2D2C2 | "C"C8 |\n[V:2] "C"C8 | "G"G8 | "Am"A8 | "Em"E8 | "F"F8 | "C"C8 | "G7"G,8 | "C"C8 |\n\n[V:1] "Dm"D2F2A2d2 | "Am"c2E2A2c2 | "G"B2D2G2B2 | "C"A2E2C2A2 | "F"G2C2F2G2 | "Bb"F2D2B,2F2 | "Eb"E2C2G,2E2 | "Ab"D2B,2F,2D2 |\n[V:2] "Dm"D8 | "Am"A8 | "G"G8 | "C"C8 | "F"F8 | "Bb"B,8 | "Eb"E,8 | "Ab"A,,8 |\n\n[V:1] "Db"Db2F2Ab2db2 | "Gb"c2Bb2F2c2 | "B"B2Eb2G#2B2 | "E"A2Db2Gb2A2 | "A"G2C2E2G2 | "D"F2B,2D2F2 | "E7"E2D2C2B,2 | "A"A8 |\n[V:2] "Db"Db8 | "Gb"Gb8 | "B"B8 | "E"E8 | "A"A8 | "D"D8 | "E7"E8 | "A"A,8 |\n\n[V:1] "Ebm"Eb2Gb2Bb2eb2 | "Abm"d2C2G2d2 | "Db"c2Bb2F2c2 | "Gb"B2Db2Gb2B2 | "Cb"A2Eb2Ab2A2 | "F#"G2D2B,2G2 | "Bbm"F2Eb2Db2C2 | "Ebm"Eb8 |\n[V:2] "Ebm"Eb8 | "Abm"Ab8 | "Db"Db8 | "Gb"Gb8 | "Cb"Cb8 | "F#"F#8 | "Bbm"Bb8 | "Ebm"Eb8 |\n`;

    // Devolver la respuesta como si la transcripción fuera exitosa
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: "Simulación de transcripción completa.",
            abcNotation: longAbcNotation,
        }),
    };
};
