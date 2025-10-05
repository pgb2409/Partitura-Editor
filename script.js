// ==================================================================
// VARIABLES GLOBALES
// ==================================================================
let abcTextarea;
let outputDiv;
let fileInput;
let downloadPdfButton;
let convertButton;

// Código ABC de ejemplo que simularía el servidor al convertir el archivo
const SIMULATED_ABC_RESULT = `X:2
T:Prueba Serverless
M:4/4
L:1/4
K:C
|: CDEG | FGAc | c2c2 | c4 :|
w: (Simulación) Partitura ge-ne-ra-da por fun-ción Serverless.`;


// ==================================================================
// FUNCIONES DE UTILIDAD (Debounce y Mensajes)
// ==================================================================

/**
 * Muestra un mensaje temporal al usuario.
 * @param {string} msg - Mensaje a mostrar.
 * @param {string} type - Tipo de mensaje ('success', 'error', 'info').
 */
function showMessage(msg, type = 'info') {
    const messageContainer = document.getElementById('messageContainer');
    if (!messageContainer) return;

    messageContainer.style.display = 'block';
    messageContainer.className = `alert ${type}`;
    messageContainer.innerHTML = msg;

    // Ocultar después de 5 segundos
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 5000);
}

// Función Debounce: Retrasa la ejecución de una función para mejorar el rendimiento
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}


// ==================================================================
// FUNCIÓN PRINCIPAL DE DIBUJO
// ==================================================================
function renderMusic() {
    const abc = abcTextarea.value;
    
    // Limpia el output anterior
    outputDiv.innerHTML = '';
    
    // 1. Dibuja la partitura y captura la salida
    const notation = window.ABCJS.renderAbc(outputDiv, abc, {
        staffwidth: 800,
        responsive: 'resize'
    });
    
    // 2. Manejo de Errores (Si abcjs devuelve un error, lo mostramos)
    if (notation && notation[0] && notation[0].error) {
        showMessage(`Error en la notación ABC: ${notation[0].error.message}`, 'error');
        downloadPdfButton.style.display = 'none';
        return; // Detenemos la función si hay error
    }

    // 3. Muestra el botón PDF solo si hay partitura dibujada
    if (notation && notation.length > 0) {
        downloadPdfButton.style.display = 'block';
    } else {
        downloadPdfButton.style.display = 'none';
    }
}

// Versión optimizada de renderMusic que usa debounce (se ejecuta 500ms después de la última tecla)
const debouncedRenderMusic = debounce(renderMusic, 500);


// ==================================================================
// FUNCIÓN 1: CONVERTIR A PARTITURA (Simulación Serverless)
// ==================================================================

function handleConvertClick() {
    const file = fileInput.files[0];
    
    if (!file) {
        showMessage("Por favor, selecciona un archivo para simular la conversión Serverless.", 'error');
        return;
    }

    // --- Lógica de CONEXIÓN REAL al Serverless ---
    
    // 1. Mostrar estado de carga
    const originalText = convertButton.textContent;
    convertButton.textContent = 'Analizando Archivo (Serverless)...';
    convertButton.disabled = true;
    showMessage(`Subiendo ${file.name} a la Netlify Function...`, 'info');

    // 2. Simular el tiempo de procesamiento (2.5 segundos)
    setTimeout(() => {
        
        // 3. *Aquí iría la llamada 'fetch' a la URL de tu Netlify Function*
        
        // 4. Cargamos el resultado simulado en el editor
        abcTextarea.value = SIMULATED_ABC_RESULT;
        renderMusic(); // Redibuja la partitura con el resultado

        // 5. Restaurar el botón y mostrar éxito
        convertButton.textContent = originalText;
        convertButton.disabled = false;
        showMessage("¡Éxito! Conexión simulada Serverless completada. Partitura cargada.", 'success');
        
    }, 2500); 
}


// ==================================================================
// FUNCIÓN 2: DESCARGAR PDF (Sin cambios mayores)
// ==================================================================

function downloadPdf() {
    const svgElement = outputDiv.querySelector('svg');
    if (!svgElement) {
        showMessage('Error: No se encontró la partitura para descargar.', 'error');
        return;
    }

    // Mostrar mensaje de inicio de descarga
    showMessage('Generando PDF, por favor espera...', 'info');

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBase64 = btoa(svgData);
    const svgUrl = 'data:image/svg+xml;base64,' + svgBase64;
    
    // Nota: window.jspdf es necesario porque usamos la versión UMD.
    const doc = new window.jspdf.jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    doc.addImage(svgUrl, 'SVG', 10, 10, 277, 190);

    let filename = 'Partitura.pdf';
    const abc = abcTextarea.value;
    const titleMatch = abc.match(/^T:\s*(.*)/m);
    if (titleMatch && titleMatch[1]) {
        filename = titleMatch[1].replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
    }
    
    doc.save(filename);
}

// ==================================================================
// INICIALIZACIÓN
// ==================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener elementos necesarios (Ahora sin usar 'window.')
    abcTextarea = document.getElementById('abcTextarea');
    outputDiv = document.getElementById('output');
    fileInput = document.getElementById('fileInput');
    downloadPdfButton = document.getElementById('downloadPdfButton');
    convertButton = document.getElementById('convertButton');

    // 2. Ejecutar la función inicial de dibujo
    renderMusic();
    
    // 3. Escuchador optimizado: usa el debouncedRenderMusic
    abcTextarea.addEventListener('input', debouncedRenderMusic);
});
