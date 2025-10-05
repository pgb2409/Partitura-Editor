document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener elementos necesarios
    window.abcTextarea = document.getElementById('abcTextarea');
    window.outputDiv = document.getElementById('output');
    window.fileInput = document.getElementById('fileInput');

    // 2. Ejecutar la función inicial de dibujo
    renderMusic();
});

// FUNCIÓN PARA DIBUJAR LA PARTITURA (Llamada al cargar y al escribir)
function renderMusic() {
    const abc = abcTextarea.value;
    const downloadPdfButton = document.getElementById('downloadPdfButton');
    
    outputDiv.innerHTML = '';
    const notation = window.ABCJS.renderAbc('output', abc, { 
        staffwidth: 800,
        responsive: 'resize'
    });
    
    // Muestra el botón PDF solo si hay partitura dibujada
    if (notation && notation.length > 0) {
        downloadPdfButton.style.display = 'block'; 
    } else {
        downloadPdfButton.style.display = 'none'; 
    }
}

// ------------------------------------------------------------------
// FUNCIÓN 1: CONVERTIR A PARTITURA (Conectada directamente por onclick)
// ------------------------------------------------------------------
function handleConvertClick() {
    const file = fileInput.files[0];
    
    if (!file) {
         alert("Por favor, selecciona un archivo MP3, WAV o MusicXML para intentar la conversión.");
         return;
    }

    // ESTA ALERTA DEBE APARECER SÍ O SÍ
    alert("La función de Transcripción no está activa. Debes añadir la lógica de conexión al servidor aquí.");
}

// ------------------------------------------------------------------
// FUNCIÓN 2: DESCARGAR PDF (Conectada directamente por onclick)
// ------------------------------------------------------------------
function downloadPdf() {
    const svgElement = outputDiv.querySelector('svg');
    if (!svgElement) {
        alert('Error: No se encontró la partitura para descargar.');
        return;
    }

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBase64 = btoa(svgData);
    const svgUrl = 'data:image/svg+xml;base64,' + svgBase64;
    
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

// Escuchador para actualizar la partitura mientras el usuario escribe
window.abcTextarea.addEventListener('input', renderMusic);
