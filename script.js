/* CÓDIGO SIMPLIFICADO Y CORREGIDO PARA FORZAR LA CARGA LOCAL */
document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convert-button');
    const inputArea = document.getElementById('input-text');
    const resultArea = document.getElementById('result-partitura');

    // Deshabilita el botón y hace el campo de texto de solo lectura
    if (convertButton) {
        convertButton.style.display = 'none';
    }
    if (inputArea) {
        inputArea.value = "SIMULACIÓN DE ENTRADA ESTATICA CARGADA";
        inputArea.setAttribute('readonly', 'true');
    }

    // Contenido de la simulación estática
    const simulationContent = `
        <div style="border: 2px solid #4CAF50; padding: 15px; background-color: #e8f5e9; margin-top: 10px;">
            <h3>✅ SIMULACIÓN DE PARTITURA CARGADA CORRECTAMENTE</h3>
            <p><strong>Estado:</strong> Aplicación funcionando en modo estático localmente.</p>
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

    // Evita que el formulario haga cosas inesperadas
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }
});
