const WEBHOOK_URL = 'https://saaul.app.n8n.cloud/webhook/geopatagonia-lead';

const smartData = {
    intencion: 'Solo Terreno',
    plazo: 'No especificado'
};

function $(selector) {
    return document.querySelector(selector);
}

function openLeadModal(proyecto = 'Consulta General', intencion = 'Solo Terreno') {
    $('#lead-modal')?.classList.remove('hidden');
    $('#lead-modal-title').textContent = `Interes en: ${proyecto}`;
    $('#geo-proyecto').value = proyecto;
    $('#geo-intencion').value = intencion;
}

function closeLeadModal() {
    $('#lead-modal')?.classList.add('hidden');
}

function openSmartModal(intencion = '') {
    if (intencion) {
        smartData.intencion = intencion;
    }

    $('#smart-modal')?.classList.remove('hidden');
    showStep(1);
}

function closeSmartModal() {
    $('#smart-modal')?.classList.add('hidden');
}

function showStep(step) {
    document.querySelectorAll('.step-container').forEach((container) => {
        container.classList.add('hidden');
    });

    $(`#step-${step}`)?.classList.remove('hidden');

    const progress = $('#progress-bar');
    if (progress) {
        progress.style.width = `${step * 33.333}%`;
    }
}

function setSubmitting(button, label, disabled = true) {
    if (!button) return;
    button.textContent = label;
    button.disabled = disabled;
}

async function sendLead(leadData) {
    const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...leadData,
            fecha: new Date().toISOString(),
            canal: 'Landing GeoPatagonia',
            estado: 'nuevo'
        })
    });

    if (!response.ok) {
        throw new Error(`Webhook respondio con estado ${response.status}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-project]').forEach((button) => {
        button.addEventListener('click', () => {
            openLeadModal(button.dataset.project, 'Solo Terreno');
        });
    });

    document.querySelectorAll('[data-open-smart]').forEach((button) => {
        button.addEventListener('click', () => openSmartModal());
    });

    document.querySelectorAll('[data-intention]').forEach((button) => {
        button.addEventListener('click', () => openSmartModal(button.dataset.intention));
    });

    document.querySelectorAll('[data-close-modal]').forEach((button) => {
        button.addEventListener('click', closeLeadModal);
    });

    document.querySelectorAll('[data-close-smart]').forEach((button) => {
        button.addEventListener('click', closeSmartModal);
    });

    document.querySelectorAll('.modal').forEach((modal) => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });

    document.querySelectorAll('[data-next-step]').forEach((button) => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            const value = button.dataset.value;

            if (type === 'intencion') smartData.intencion = value;
            if (type === 'plazo') smartData.plazo = value;

            showStep(Number(button.dataset.nextStep));
        });
    });

    document.querySelectorAll('[data-prev-step]').forEach((button) => {
        button.addEventListener('click', () => showStep(Number(button.dataset.prevStep)));
    });

    $('#geopatagonia-form')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const button = event.target.querySelector('button[type="submit"]');
        setSubmitting(button, 'Enviando...');

        const leadData = {
            nombre: $('#geo-nombre').value.trim(),
            telefono: $('#geo-telefono').value.trim(),
            email: $('#geo-email').value.trim(),
            proyecto: $('#geo-proyecto').value,
            intencion: $('#geo-intencion').value,
            origen: 'Modal proyecto'
        };

        try {
            await sendLead(leadData);
            setSubmitting(button, 'Listo. Te contactaremos por WhatsApp.', true);
            setTimeout(() => {
                event.target.reset();
                $('#geo-telefono').value = '569';
                closeLeadModal();
                setSubmitting(button, 'Enviar solicitud', false);
            }, 2200);
        } catch (error) {
            console.error(error);
            alert('No pudimos enviar la solicitud. Contactanos al +569 5252 8416.');
            setSubmitting(button, 'Enviar solicitud', false);
        }
    });

    $('#smart-lead-form')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const button = $('#smart-submit-btn');
        setSubmitting(button, 'Conectando con asesor...');

        const leadData = {
            nombre: $('#smart-nombre').value.trim(),
            telefono: $('#smart-telefono').value.trim(),
            email: $('#smart-email').value.trim(),
            proyecto: 'Evaluacion GeoPatagonia',
            intencion: smartData.intencion,
            plazo: smartData.plazo,
            origen: 'Cotizador smart'
        };

        try {
            await sendLead(leadData);
            setSubmitting(button, 'Listo. Revisa tu WhatsApp.', true);
            setTimeout(() => {
                event.target.reset();
                $('#smart-telefono').value = '569';
                closeSmartModal();
                setSubmitting(button, 'Solicitar dossier', false);
            }, 2200);
        } catch (error) {
            console.error(error);
            alert('No pudimos enviar la solicitud. Contactanos al +569 5252 8416.');
            setSubmitting(button, 'Solicitar dossier', false);
        }
    });
});
