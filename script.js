/* ESTE CÓDIGO HA SIDO MODIFICADO PARA FORZAR LA SIMULACIÓN ESTÁTICA
   Y EVITAR LLAMADAS A SERVIDORES/APIs/NETLIFY. */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Identificar las áreas de la página
    const convertButton = document.getElementById('convert-button');
    const inputArea = document.getElementById('input-text');
    const resultArea = document.getElementById('result-partitura');

    // 2. Ajustar la interfaz para modo Simulación
    if (convertButton) {
        convertButton.style.display = 'none'; // Ocultamos el botón
    }
    if (inputArea) {
        inputArea.value = "SIMULACIÓN DE ENTRADA ESTATICA CARGADA";
        inputArea.setAttribute('readonly', 'true');
    }

    // 3. Definir e Insertar el Contenido de la SIMULACIÓN ESTÁTICA
    const simulationContent = `
        <div style="border: 2px solid #4CAF50; padding: 15px; background-color: #e8f5e9; margin-top: 10px;">
            <h3>✅ SIMULACIÓN DE PARTITURA CARGADA CORRECTAMENTE</h3>
            <p><strong>Estado:</strong> Partitura-Editor está funcionando en modo estático (sin API ni Netlify).</p>
            <p><strong>Resultado de la Simulación:</strong></p>
            <pre style="background-color: #ffffff; padding: 10px; border: 1px dashed #4CAF50;">
# Título: Partitura de Prueba Estática
# Músico: Gemini Asistente
# Versión: 1.0

X: 1
T: Canto Estático
M: 4/4
L: 1/4
K: C
"C"C D E F | "G"G2 "C"C2 |]
            </pre>
            <p style="font-size: 0.9em; color: #555;">Si ve este mensaje, la simulación funciona correctamente.</p>
        </div>
    `;

    if (resultArea) {
        resultArea.innerHTML = simulationContent;
    } else {
        // En caso de que no encontremos el área de resultado (poco probable)
        console.error("No se encontró el área de resultado ('result-partitura') en index.html.");
    }

    // 4. Prevenir que se envíe cualquier formulario
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }
});
