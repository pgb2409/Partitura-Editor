// CÓDIGO PARA script.js
const fileInput = document.getElementById('fileInput');
const convertButton = document.getElementById('convertButton');
const abcTextarea = document.getElementById('abcTextarea');
const outputDiv = document.getElementById('output');
const messageContainer = document.getElementById('messageContainer');
const downloadPdfButton = document.getElementById('downloadPdfButton');

const TRANSCRIBE_URL = '/.netlify/functions/transcribe'; 

/**
 * Muestra una alerta temporal con los estilos CSS que proporcionaste.
 */
function displayAlert(message, type) {
    messageContainer.innerHTML = `<div class="alert ${type}">${message}</div>`;
    setTimeout(() => {
        messageContainer.innerHTML = ''; 
    }, 8000); 
}

/**
 * Función que maneja el clic en "Convertir a Partitura".
 */
async function handleConvertClick() {
    const file = fileInput.files[0];
    
    if (!file) {
        displayAlert("Por favor, selecciona un archivo de audio o XML.", 'info');
        return;
    }

    convertButton.disabled = true;
    convertButton.textContent = 'Convirtiendo... (Llamando al Servidor)';
    displayAlert(`Procesando archivo: ${file.name}. Esto puede tardar unos segundos.`, 'info');

    try {
        // Leer el archivo como Base64 para enviarlo por JSON a la Netlify Function
        const base64Content = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]); 
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });

        // 1. Llamar a la Netlify Function
        const response = await fetch(TRANSCRIBE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fileName: file.name,
                fileContent: base64Content,
                fileType: file.type,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || result.details || `Error del servidor: ${response.status}`);
        }

        const newAbcCode = result.abcNotation;
        
        abcTextarea.value = newAbcCode;
        renderAbcScore(newAbcCode);

        displayAlert("¡Conversión Serverless exitosa! El circuito funciona.", 'success');
        downloadPdfButton.style.display = 'block';

    } catch (error) {
        console.error("Error en la conexión o en la función Serverless:", error);
        displayAlert(`Error: ${error.message}. Asegúrate de que tu API KEY esté configurada.`, 'error');
        downloadPdfButton.style.display = 'none';
    } finally {
        convertButton.disabled = false;
        convertButton.textContent = 'Convertir a Partitura';
    }
}

/**
 * Renderiza el código ABC en el div de salida.
 */
function renderAbcScore(abcCode) {
    abcjs.renderAbc(outputDiv, abcCode);
}

// Escucha los cambios en el textarea para renderizar la partitura en tiempo real
abcTextarea.addEventListener('input', () => {
    const abcCode = abcTextarea.value;
    renderAbcScore(abcCode);
});

// Renderizar la partitura inicial al cargar (si tiene contenido)
renderAbcScore(abcTextarea.value); 


/**
 * Función de DESCARGA PDF
 */
function downloadPdf() {
    const abcCode = abcTextarea.value;
    const { jsPDF } = window.jspdf;
    
    const doc = new jsPDF();
    doc.text("Partitura Generada", 10, 10);
    
    const abcElement = document.getElementById('output').querySelector('svg');
    if (!abcElement) {
         displayAlert("No hay partitura renderizada para descargar.", 'info');
         return;
    }
    
    const svgString = new XMLSerializer().serializeToString(abcElement);
    const svgBase64 = btoa(unescape(encodeURIComponent(svgString)));
    
    doc.addImage(
        `data:image/svg+xml;base64,${svgBase64}`, 
        'SVG', 
        10, 20, 
        doc.internal.pageSize.getWidth() - 20, 
        (abcElement.clientHeight / abcElement.clientWidth) * (doc.internal.pageSize.getWidth() - 20)
    );
    
    doc.save("partitura_transcrita.pdf");
}
// NOTA: Tu botón "Convertir" en index.html debe llamar a handleConvertClick().
