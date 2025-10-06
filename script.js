/* ESTE CÓDIGO SOLO CARGA LA PANTALLA VERDE Y ELIMINA LA LLAMADA A LA API */
document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convert-button');
    const inputArea = document.getElementById('input-text');
    const resultArea = document.getElementById('result-partitura');

    // Deshabilita la interfaz original
    if (convertButton) {
        convertButton.style.display = 'none';
    }
    if (inputArea) {
        inputArea.value = "SIMULACIÓN DE ENTRADA ESTATICA CARGADA";
        inputArea.setAttribute('readonly', 'true');
    }

    // Contenido de la simulación estática (Recuadro Verde)
    const simulationContent = `
        <div style="border: 2px solid #4CAF50; padding: 15px; background-color: #e8f5e9; margin-top: 10px;">
            <h3>✅ SIMULACIÓN DE PARTITURA CARGADA CORRECTAMENTE</h3>
            <p><strong>Estado:</strong> Aplicación funcionando en modo estático localmente (IGNORANDO NETLIFY).</p>
            <p><strong>Resultado:</strong></p>
            <pre style="background-color: #ffffff; padding: 10px; border: 1px dashed #4CAF50;">
# Título: Prueba Estática
X: 1
T: Canto Estático
M: 4/4
L: 1/4
K: C
"C"C D E F | "G"G2 "C"C2 |]
            </pre>
        </div>
    `;

    if (resultArea) {
        resultArea.innerHTML = simulationContent;
    }

    // Evita cualquier envío de formulario
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }
});
