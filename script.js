// ==================================================================
// FUNCIÓN 1: CONVERTIR A PARTITURA (Conexión Serverless Real)
// ==================================================================

async function handleConvertClick() {
    const file = fileInput.files[0];
    
    if (!file) {
        showMessage("Por favor, selecciona un archivo para comenzar la conversión.", 'error');
        return;
    }
    
    // Solo permitiremos archivos pequeños para la prueba de Netlify Function
    if (file.size > 5 * 1024 * 1024) { // 5 MB
         showMessage("El archivo es demasiado grande para esta prueba. Usa un archivo menor a 5MB.", 'error');
         return;
    }

    const originalText = convertButton.textContent;
    convertButton.textContent = 'Analizando Archivo (Enviando a Netlify)...';
    convertButton.disabled = true;
    showMessage(`Subiendo ${file.name} a la función Serverless...`, 'info');

    try {
        // Usamos FormData para enviar el archivo como un formulario
        const formData = new FormData();
        formData.append('audioFile', file);

        // ** AQUI ESTÁ LA CONEXIÓN REAL A LA NETLIFY FUNCTION **
        const response = await fetch('/.netlify/functions/transcribe', {
            method: 'POST',
            body: formData,
        });

        // Verificamos si la respuesta de la función Serverless fue exitosa
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.abc_notation) {
            // Cargar el resultado ABC devuelto por el servidor (simulado o real)
            abcTextarea.value = data.abc_notation;
            renderMusic(); 
            showMessage("¡Éxito! Partitura devuelta por la función Serverless.", 'success');
        } else {
            throw new Error('La función no devolvió notación ABC válida.');
        }

    } catch (error) {
        console.error('Error durante la conversión:', error);
        showMessage(`Error en la conexión Serverless: ${error.message}`, 'error');
    } finally {
        // Restaurar el botón
        convertButton.textContent = originalText;
        convertButton.disabled = false;
    }
}
