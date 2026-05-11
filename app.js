// Lógica de la Landing GeoPatagonia

function openLeadModal(proyecto) {
    const modal = document.getElementById('leadModal');
    const title = document.getElementById('modalTitle');
    const projectSelect = document.getElementById('geo-proyecto');

    title.innerText = 'Interés en: ' + proyecto;
    projectSelect.value = proyecto;
    modal.style.display = 'block';
}

function closeLeadModal() {
    const modal = document.getElementById('leadModal');
    modal.style.display = 'none';
}

// Cerrar modal al hacer clic fuera
window.onclick = function (event) {
    const modal = document.getElementById('leadModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Envío de formulario a n8n y apertura de WhatsApp
document.getElementById('geopatagonia-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = e.target.querySelector('button');
    const nombre = document.getElementById('geo-nombre').value;
    const telefono = document.getElementById('geo-telefono').value;
    const proyecto = document.getElementById('geo-proyecto').value;
    const intencion = document.getElementById('geo-intencion') ? document.getElementById('geo-intencion').value : 'No especificada';
    const email = document.getElementById('geo-email') ? document.getElementById('geo-email').value : '';

    btn.innerText = 'Enviando...';
    btn.disabled = true;

    const leadData = {
        nombre: nombre,
        telefono: telefono,
        proyecto: proyecto,
        email: email,
        intencion: intencion,
        origen: 'Landing GeoPatagonia - Modal',
        fecha: new Date().toISOString()
    };

    try {
        // Enviar a n8n (Webhook exclusivo de GeoPatagonia)
        await fetch('https://saaul.app.n8n.cloud/webhook/geopatagonia-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        });

        // El Bot será proactivo, evitamos redirigir a wa.me para no duplicar mensajes
        btn.innerText = '¡Listo! Revisa tu WhatsApp 📲';
        setTimeout(() => {
            closeLeadModal();
        }, 3000);
    } catch (error) {
        alert('Hubo un problema. Por favor, contáctanos directamente al +569 5252 8416');
        btn.innerText = 'Enviar Información por WhatsApp';
        btn.disabled = false;
    }
});

// ==========================================
// Lógica del Formulario Flotante
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const floatBtn = document.getElementById('floating-btn');
    const floatPanel = document.getElementById('floating-form-panel');
    const closeFloatBtn = document.getElementById('close-floating-btn');
    const floatForm = document.getElementById('floating-contact-form');

    // Abrir/Cerrar Panel
    if (floatBtn && floatPanel && closeFloatBtn) {
        floatBtn.addEventListener('click', () => {
            floatPanel.classList.toggle('hidden');
            floatPanel.classList.toggle('flex');
        });

        closeFloatBtn.addEventListener('click', () => {
            floatPanel.classList.add('hidden');
            floatPanel.classList.remove('flex');
        });
    }

    // Envío de Formulario Flotante
    if (floatForm) {
        floatForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const nombre = document.getElementById('float-nombre').value;
            const telefono = document.getElementById('float-telefono').value;
            const intencion = document.getElementById('float-intencion').value;
            const email = document.getElementById('float-email') ? document.getElementById('float-email').value : '';

            btn.innerHTML = 'Conectando...';
            btn.disabled = true;

            const leadData = {
                nombre: nombre,
                telefono: telefono,
                proyecto: 'Consulta General',
                email: email,
                intencion: intencion,
                origen: 'Landing GeoPatagonia - Widget Flotante',
                fecha: new Date().toISOString()
            };

            try {
                await fetch('https://saaul.app.n8n.cloud/webhook/geopatagonia-lead', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(leadData)
                });

                // Feedback visual de Bot Proactivo
                btn.innerHTML = '¡Listo! Te escribiremos ahora 📲';
            } catch (error) {
                alert('Hubo un problema. Por favor, contáctanos directamente al +569 5252 8416');
                btn.innerHTML = 'Iniciar Chat';
                btn.disabled = false;
            }
        });
    }
});

// ==========================================
// Lógica del Cotizador Premium (Smart Modal)
// ==========================================
let smartData = {
    intencion: '',
    plazo: ''
};

function openSmartModal() {
    const modal = document.getElementById('smart-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        showStep(1); // Reiniciar al paso 1 siempre que se abre
    }
}

function closeSmartModal() {
    const modal = document.getElementById('smart-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function showStep(step) {
    // Ocultar todos los pasos
    document.getElementById('step-1')?.classList.add('hidden');
    document.getElementById('step-2')?.classList.add('hidden');
    document.getElementById('step-3')?.classList.add('hidden');

    // Mostrar el paso actual
    document.getElementById('step-' + step)?.classList.remove('hidden');

    // Actualizar barra de progreso
    const progress = document.getElementById('progress-bar');
    if (progress) {
        if (step === 1) progress.style.width = '33%';
        if (step === 2) progress.style.width = '66%';
        if (step === 3) progress.style.width = '100%';
    }
}

function nextStep(step, value, type) {
    if (type === 'intencion') smartData.intencion = value;
    if (type === 'plazo') smartData.plazo = value;
    showStep(step);
}

function prevStep(step) {
    showStep(step);
}

// Evento Submit del Cotizador Premium
document.getElementById('smart-lead-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = document.getElementById('smart-submit-btn');

    const leadData = {
        nombre: document.getElementById('smart-nombre').value,
        telefono: document.getElementById('smart-telefono').value,
        email: document.getElementById('smart-email').value,
        proyecto: 'Cotizador Premium GeoPatagonia',
        intencion: smartData.intencion + ' | Plazo: ' + smartData.plazo,
        origen: 'Landing GeoPatagonia - Cotizador Smart',
        fecha: new Date().toISOString()
    };

    btn.innerText = 'CONECTANDO CON ASESOR...';
    btn.disabled = true;

    try {
        await fetch('https://saaul.app.n8n.cloud/webhook/geopatagonia-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        });

        btn.innerText = '¡LISTO! REVISA TU WHATSAPP';
        setTimeout(() => {
            closeSmartModal();
            btn.innerText = 'SOLICITAR DOSSIER';
            btn.disabled = false;
            e.target.reset();
        }, 3000);
    } catch (error) {
        alert('Error de conexión. Contáctanos al +569 5252 8416');
        btn.innerText = 'SOLICITAR DOSSIER';
        btn.disabled = false;
    }
});
