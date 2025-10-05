document.addEventListener('DOMContentLoaded', () => {
    
    const abcTextarea = document.getElementById('abcTextarea');
    const outputDiv = document.getElementById('output');
    const downloadPdfButton = document.getElementById('downloadPdfButton');
    const convertButton = document.getElementById('convertButton');
    const fileInput = document.getElementById('fileInput');

    const renderMusic = () => {
        const abc = abcTextarea.value;
        
        outputDiv.innerHTML = '';
        const notation = window.ABCJS.renderAbc('output', abc, { 
            staffwidth: 800,
            responsive: 'resize'
        });
        
        if (notation && notation.length > 0) {
            downloadPdfButton.style.display = 'block'; 
        } else {
            downloadPdfButton.style.display = 'none'; 
        }
    };

    abcTextarea.addEventListener('input', renderMusic);
    renderMusic(); 

    convertButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        
        if (!file) {
             alert("Por favor, selecciona un archivo MP3, WAV o MusicXML para intentar la conversión.");
             return;
        }

        alert("La función de Transcripción no está activa. Debes añadir la lógica de conexión al servidor aquí.");
    });
    
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Archivo seleccionado:", file.name);
        }
    });
    
    downloadPdfButton.addEventListener('click', () => {
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
    });
});
