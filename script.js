document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convert-button');
    const inputArea = document.getElementById('input-text');
    const resultArea = document.getElementById('result-partitura');

    if (convertButton) {
        convertButton.style.display = 'none';
    }
    if (inputArea) {
        inputArea.value = "SIMULACIÓN DE ENTRADA ESTATICA CARGADA";
        inputArea.setAttribute('readonly', 'true');
    }

    const simulationContent = `
        <div style="border: 2px solid #4CAF50; padding: 15px; background-color: #e8f5e9; margin-top: 10px;">
            <h3>✅ SIMULACIÓN DE PARTITURA CARGADA CORRECTAMENTE</h3>
            <p><strong>Estado:</strong> Partitura-Editor está funcionando en modo estático.</p>
            <p><strong>Resultado de la Simulación:</strong></p>
            <pre style="background-color: #ffffff; padding: 10px; border: 1px dashed #4CAF50;">
