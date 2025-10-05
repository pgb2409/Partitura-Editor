// Partitura simulada de 40 compases con salto de línea.
const longAbcNotation = `X:1
T:Partitura Larga de Simulación
M:4/4
L:1/8
K:C
V:1 name="Voz 1"
V:2 name="Voz 2" clef=bass

[V:1] "C"C2E2G2c2 | "G"d2B2G2d2 | "Am"c2A2E2c2 | "Em"B2G2E2B2 | "F"A2c2E2A2 | "C"G2E2C2G2 | "G7"F2E2D2C2 | "C"C8 |
[V:2] "C"C8 | "G"G8 | "Am"A8 | "Em"E8 | "F"F8 | "C"C8 | "G7"G,8 | "C"C8 |

[V:1] "Dm"D2F2A2d2 | "Am"c2E2A2c2 | "G"B2D2G2B2 | "C"A2E2C2A2 | "F"G2C2F2G2 | "Bb"F2D2B,2F2 | "Eb"E2C2G,2E2 | "Ab"D2B,2F,2D2 |
[V:2] "Dm"D8 | "Am"A8 | "G"G8 | "C"C8 | "F"F8 | "Bb"B,8 | "Eb"E,8 | "Ab"A,,8 |

[V:1] "Db"Db2F2Ab2db2 | "Gb"c2Bb2F2c2 | "B"B2Eb2G#2B2 | "E"A2Db2Gb2A2 | "A"G2C2E2G2 | "D"F2B,2D2F2 | "E7"E2D2C2B,2 | "A"A8 |
[V:2] "Db"Db8 | "Gb"Gb8 | "B"B8 | "E"E8 | "A"A8 | "D"D8 | "E7"E8 | "A"A,8 |

[V:1] "Ebm"Eb2Gb2Bb2eb2 | "Abm"d2C2G2d2 | "Db"c2Bb2F2c2 | "Gb"B2Db2Gb2B2 | "Cb"A2Eb2Ab2A2 | "F#"G2D2B,2G2 | "Bbm"F2Eb2Db2C2 | "Ebm"Eb8 |
[V:2] "Ebm"Eb8 | "Abm"Ab8 | "Db"Db8 | "Gb"Gb8 | "Cb"Cb8 | "F#"F#8 | "Bbm"Bb8 | "Ebm"Eb8 |
`;

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const convertButton = document.getElementById('convert-button');
    const partituraContainer = document.getElementById('partitura-container');
    const messageContainer = document.getElementById('message-container');

    // Inicializa el renderizador de ABC.
    ABCJS.renderAbc("partitura-container", "");

    // Manejador del botón de conversión.
    convertButton.addEventListener('click', () => {
        messageContainer.textContent = 'Procesando archivo (Simulación)...';
        partituraContainer.innerHTML = ''; // Limpiar partitura anterior

        if (!fileInput.files.length) {
            messageContainer.textContent = 'Por favor, selecciona un archivo de audio primero.';
            return;
        }

        // --- SIMULACIÓN DE PROCESAMIENTO ---
        // Retraso para simular un proceso de transcripción real.
        setTimeout(() => {
            try {
                // Renderizar la partitura de simulación.
                ABCJS.renderAbc("partitura-container", longAbcNotation, {
                    responsive: "resize",
                    staffwidth: 750 // Ancho de la partitura
                });
                messageContainer.textContent = 'Partitura simulada cargada correctamente (40 compases).';
            } catch (error) {
                messageContainer.textContent = `Error al renderizar la partitura: ${error.message}`;
            }
        }, 3000); // 3 segundos de espera para simular la API
        // ------------------------------------
    });
});
