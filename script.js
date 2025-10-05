// script.js - Versión final de la lógica del cliente

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('audioFile');
    const convertButton = document.getElementById('convertButton');
    const outputDiv = document.getElementById('output');
    const messageDiv = document.getElementById('message');
    const abcTextarea = document.getElementById('abcTextarea');
    const pdfDownloadButton = document.getElementById('downloadPdf');

    // Función para renderizar la partitura
    const renderABC = (abcNotation) => {
        try {
            // Limpia el área de visualización
            outputDiv.innerHTML = '';
            
            // Renderiza la partitura ABC
            ABCJS.renderAbc(outputDiv, abcNotation, {
                add_classes: true,
                staffwidth: 800,
                responsive: 'resize',
            });
            
            // Actualiza el textarea con la notación ABC
            abcTextarea.value = abcNotation;

        } catch (error) {
            console.error("Error al renderizar ABC:", error);
            messageDiv.textContent = 'Error al renderizar la partitura.';
        }
    };

    // --- Lógica del Botón Convertir ---
    convertButton.addEventListener('click', async () => {
        const file = fileInput.files[0];
        if (!file) {
            messageDiv.textContent = 'Por favor, selecciona un archivo de audio.';
            return;
        }

        convertButton.disabled = true;
        messageDiv.textContent = 'Procesando archivo... Esto es una simulación de 40 compases.';
        outputDiv.innerHTML = 'Cargando...';

        try {
            // Usamos un FileReader para leer el contenido del archivo
            const reader = new FileReader();
            reader.readAsDataURL(file); // Lee el archivo como Base64 (necesario para la función Netlify)
            
            reader.onload = async () => {
                const base64Content = reader.result.split(',')[1];
                
                const response = await fetch('/.netlify/functions/transcribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // Enviamos solo la información necesaria para la SIMULACIÓN
                    body: JSON.stringify({
                        fileContent: base64Content,
                        fileType: file.type,
                        fileName: file.name, // El nombre del archivo es lo único que usamos
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Error en el servidor: ${errorData.error || response.statusText}`);
                }

                const data = await response.json();
                
                // Renderizar la partitura simulada
                renderABC(data.abcNotation);
                messageDiv.textContent = `Éxito: ${data.message}`;
            };

            reader.onerror = () => {
                throw new Error("Error al leer el archivo de audio.");
            };

        } catch (error) {
            console.error("Error en la conversión:", error);
            // Mostrar un error genérico, ya que la API KEY no se necesita aquí.
            messageDiv.textContent = `Error: ${error.message}`;
        } finally {
            convertButton.disabled = false;
        }
    });

    // --- Lógica de Edición en Tiempo Real ---
    abcTextarea.addEventListener('input', () => {
        const newAbcNotation = abcTextarea.value;
        try {
            outputDiv.innerHTML = '';
            ABCJS.renderAbc(outputDiv, newAbcNotation, {
                add_classes: true,
                staffwidth: 800,
                responsive: 'resize',
            });
        } catch (error) {
            // No hacemos nada, solo evitamos que se rompa la aplicación
        }
    });


    // --- Lógica del Botón Descargar PDF ---
    pdfDownloadButton.addEventListener('click', () => {
        downloadPdf();
    });

    const downloadPdf = () => {
        const abc = abcTextarea.value;
        if (!abc) {
            alert("No hay partitura para descargar.");
            return;
        }

        const fileName = 'Partitura_Editada.pdf';
        
        // La función de impresión de abcjs funciona bien para generar PDF
        ABCJS.renderAbc('hiddenPdfOutput', abc, {});
        
        // Simulación de descarga: Usamos la función de impresión del navegador
        // para asegurar que se genera el PDF de la partitura.
        
        // Abre una nueva ventana de impresión
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>' + fileName + '</title>');
        
        // Copia los estilos de abcjs y la partitura
        printWindow.document.write('<style>@media print { .abcjs-container { max-width: 100%; } }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(document.getElementById('output').innerHTML);
        printWindow.document.write('</body></html>');
        
        printWindow.document.close();
        printWindow.focus();
        
        // Pequeño retardo para asegurar que la partitura se renderiza antes de imprimir
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500); 
    };

    // Creamos un div oculto para la descarga, si fuera necesario
    const hiddenPdfDiv = document.createElement('div');
    hiddenPdfDiv.id = 'hiddenPdfOutput';
    hiddenPdfDiv.style.display = 'none';
    document.body.appendChild(hiddenPdfDiv);


    // --- Estilos de Scroll y Renderizado Inicial ---

    // Establece el scroll en el div de salida
    outputDiv.style.maxHeight = '500px';
    outputDiv.style.overflowY = 'scroll';
});
