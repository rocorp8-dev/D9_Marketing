import { supabase, syncToCloud, loadFromCloud } from './supabase.js';




// ============================================
// I.A. KNOWLEDGE BASE (INTEGRADO)
// ============================================

const services = {
    logo: {
        id: 'logo',
        name: 'Diseño de Logotipo',
        description: 'Creación de identidad visual profesional. Incluye concepto creativo.',
        price: '$3,500.00 MXN',
        priceBase: 3500,
        billingCycle: 'pago único',
        includes: ['2 Propuestas de diseño', 'Modificaciones/Correcciones', 'Pruebas de color', 'Formatos finales: EPS, JPG, TIFF']
    },
    redisenolog: {
        id: 'redisenolog',
        name: 'Rediseño de Logotipo',
        description: 'Actualización y modernización de marca existente.',
        price: '$499.00 MXN',
        priceBase: 499,
        billingCycle: 'pago único',
        includes: ['Ajustes visuales', 'Optimización de trazos']
    },
    vectorizacion: {
        id: 'vectorizacion',
        name: 'Vectorización de Logo',
        description: 'Conversión de imagen a formato vectorial (curvas).',
        price: '$250.00 MXN',
        priceBase: 250,
        billingCycle: 'pago único',
        includes: ['Digitalización profesional', 'Entrega en formato editable']
    },
    manual: {
        id: 'manual',
        name: 'Manual de Imagen Corporativa',
        description: 'Documento detallado con normas de uso de marca.',
        price: '$10,000.00 MXN',
        priceBase: 10000,
        billingCycle: 'pago único',
        includes: ['Especificaciones cromáticas', 'Tipografía oficial', 'Usos permitidos y prohibidos', 'Versión digital e impresa']
    },
    tarjetas: {
        id: 'tarjetas',
        name: 'Diseño de Tarjetas de Presentación',
        description: 'Diseño profesional para impresión.',
        price: '$350.00 MXN',
        priceBase: 350,
        billingCycle: 'pago único',
        includes: ['Diseño personalizado', 'Preparación para imprenta']
    },
    hoja: {
        id: 'hoja',
        name: 'Diseño de Hoja Membretada',
        description: 'Diseño de papelería corporativa.',
        price: '$250.00 MXN',
        priceBase: 250,
        billingCycle: 'pago único',
        includes: ['Layout profesional', 'Formatos para impresión y digital']
    },
    recibos: {
        id: 'recibos',
        name: 'Diseño de Recibos/Recetas',
        description: 'Formatos corporativos para notas o facturas.',
        price: '$250.00 MXN',
        priceBase: 250,
        billingCycle: 'pago único',
        includes: ['Diseño personalizado', 'Lineamientos D9']
    },
    triptico: {
        id: 'triptico',
        name: 'Diseño de Tríptico / Díptico',
        description: 'Material publicitario plegable.',
        price: '$500.00 MXN',
        priceBase: 500,
        billingCycle: 'pago único',
        includes: ['Diseño editorial', 'Organización de contenido']
    },
    flyer: {
        id: 'flyer',
        name: 'Diseño de Flyer / Volante',
        description: 'Diseño publicitario de una cara.',
        price: '$400.00 MXN',
        priceBase: 400,
        billingCycle: 'pago único',
        includes: ['Concepto visual impactante']
    },
    carpeta: {
        id: 'carpeta',
        name: 'Diseño de Carpeta Promocional',
        description: 'Diseño para carpetas de presentación.',
        price: '$450.00 MXN',
        priceBase: 450,
        billingCycle: 'pago único',
        includes: ['Diseño exterior e interior']
    },
    webBasica: {
        id: 'webBasica',
        name: 'Sitio Web Básico',
        description: 'Presencia digital esencial.',
        price: '$4,800.00 MXN',
        priceBase: 4800,
        billingCycle: 'pago único',
        includes: ['1 a 4 secciones', '3 Correos corporativos', 'Dominio y Hospedaje (1 año)']
    },
    webIntermedia: {
        id: 'webIntermedia',
        name: 'Sitio Web Intermedia',
        description: 'Web con mayor contenido y funciones.',
        price: '$7,200.00 MXN',
        priceBase: 7200,
        billingCycle: 'pago único',
        includes: ['1 a 6 secciones', '5 correos electrónicos', 'Menús interactivos']
    },
    webAvanzada: {
        id: 'webAvanzada',
        name: 'Sitio Web Avanzada',
        description: 'Plataforma web robusta.',
        price: '$10,500.00 MXN',
        priceBase: 10500,
        billingCycle: 'pago único',
        includes: ['4 a 8 secciones', '7 a 10 correos electrónicos', 'Integración de audio/video']
    },
    webMaster: {
        id: 'webMaster',
        name: 'Sitio Web Master',
        description: 'Plataforma completa con bases de datos.',
        price: '$20,000.00 MXN',
        priceBase: 20000,
        billingCycle: 'pago único',
        includes: ['8 a 12 secciones', 'Correos ilimitados', 'Base de Datos']
    },
    mantenimiento: {
        id: 'mantenimiento',
        name: 'Mantenimiento Web',
        description: 'Actualización y soporte web.',
        price: '$500 - $2,000 MXN',
        priceBase: 500,
        billingCycle: 'mensual',
        includes: ['Cambios de contenido', 'Soporte técnico']
    },
    redesBasico: {
        id: 'redesBasico',
        name: 'Gestión Redes Social (Básico)',
        description: 'Manejo de presencia en redes.',
        price: '$3,999.00 MXN / mes',
        priceBase: 3999,
        billingCycle: 'mensual',
        includes: ['2 redes sociales', '8 diseños mensuales', 'Gestión de campañas']
    },
    redesMedio: {
        id: 'redesMedio',
        name: 'Gestión Redes Social (Medio)',
        description: 'Estrategia activa en redes.',
        price: '$5,999.00 MXN / mes',
        priceBase: 5999,
        billingCycle: 'mensual',
        includes: ['3 redes sociales', '12 diseños mensuales', 'Stories', 'Análisis trimestral']
    },
    animacion: {
        id: 'animacion',
        name: 'Animación Digital',
        description: 'Clips animados publicitarios.',
        price: '$500 - $2,000 MXN',
        priceBase: 1000,
        billingCycle: 'pago único',
        includes: ['Diseño de clips', 'Efectos visuales']
    },
    vinilHD: {
        id: 'vinilHD',
        name: 'Vinil HD Exterior',
        description: 'Impresión y diseño de vinil de alta definición.',
        price: '$350.00 MXN / m',
        priceBase: 350,
        billingCycle: 'pago único',
        includes: ['Diseño a medida', 'Preparación HD']
    },
    vinilAuto: {
        id: 'vinilAuto',
        name: 'Vinil Automotriz',
        description: 'Rotulación de vehículos.',
        price: '$3,937.00 MXN',
        priceBase: 3937,
        billingCycle: 'pago único',
        includes: ['Capó y costados', 'Diseño de rotulación']
    },
    anuncio: {
        id: 'anuncio',
        name: 'Diseño Anuncio Exterior',
        description: 'Diseño para espectaculares o anuncios.',
        price: '$300 - $1,000 MXN',
        priceBase: 500,
        billingCycle: 'pago único',
        includes: ['Visualización exterior', 'Alta visibilidad']
    }
}

const packages = {
    corpBase: {
        id: 'corpBase',
        name: 'Paquete Corporativo Base',
        services: ['logo', 'tarjetas', 'hoja'],
        price: '$3,950.00 MXN',
        discount: '5%',
        savings: '$150 MXN',
        description: 'Ideal para iniciar con una imagen profesional completa.'
    },
    corpPlus: {
        id: 'corpPlus',
        name: 'Paquete Corporativo Plus',
        services: ['logo', 'tarjetas', 'hoja', 'triptico'],
        price: '$4,750.00 MXN',
        discount: '8%',
        savings: '$350 MXN',
        description: 'Paquete integral para marketing y papelería.'
    }
}

const budgetTemplates = {
    standard: (clientName, items, date = new Date().toLocaleDateString('es-MX')) => {
        const total = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
        return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🅳9  D9 MARKETING
    De Todas Formas... Diseño
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRESENTE
${clientName}

Fecha: ${date}

Por medio de la presente envío la cotización que amablemente me fue solicitada:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${items.map(item => `
CANTIDAD: ${item.quantity}
DESCRIPCIÓN: ${item.description}
Precio Unidad: $${item.unitPrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
COSTO: $${(item.quantity * item.unitPrice).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOTAL: $${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TÉRMINOS Y CONDICIONES:
• La presente cotización tiene vigencia de 15 días hábiles a partir de su fecha de expedición.
• Los costos no incluyen IVA, agregar el 16%.
• Se requiere el 50% de anticipo al momento de aprobar el proyecto y el 50% restante al momento de la entrega.
• Despacho9 no se hace responsable por errores ortográficos o falta de texto.
• Aprobado y aceptado el Diseño Final el Cliente adquiere la propiedad exclusiva del mismo, sin embargo los diseños restantes presentados como alternativas, son propiedad del Despacho.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Gracias por su preferencia.

D9 Marketing
`.trim()
    },
    metaAds: (clientName, duration = 1, customPrice = null) => {
        const service = services.metaAds
        const price = customPrice || service.priceBase
        const items = [{
            quantity: duration,
            description: `${service.name}\n${service.description}\n\nIncluye:\n${service.includes.map(i => `• ${i}`).join('\n')}`,
            unitPrice: price
        }]
        return budgetTemplates.standard(clientName, items)
    },
    generic: (clientName, serviceId, duration = 1, customPrice = null) => {
        const service = services[serviceId]
        if (!service) return 'Servicio no encontrado'
        const price = customPrice || service.priceBase
        const items = [{
            quantity: duration,
            description: `${service.name}\n${service.description}\n\nIncluye:\n${service.includes.map(i => `• ${i}`).join('\n')}`,
            unitPrice: price
        }]
        return budgetTemplates.standard(clientName, items)
    },
    package: (clientName, packageId) => {
        const pkg = packages[packageId]
        if (!pkg) return 'Paquete no encontrado'
        const items = pkg.services.map(sId => {
            const service = services[sId]
            return {
                quantity: 1,
                description: `${service.name}\n${service.description}`,
                unitPrice: service.priceBase
            }
        })
        const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
        const discountAmount = subtotal * (parseInt(pkg.discount) / 100)
        items.push({
            quantity: 1,
            description: `Descuento por Paquete ${pkg.name} (${pkg.discount})`,
            unitPrice: -discountAmount
        })
        return budgetTemplates.standard(clientName, items)
    }
}

const whatsappTemplates = {
    followUpQuote: (clientName) => `Hola ${clientName}, espero que estés muy bien. 👋\n\nQuería confirmar si tuviste oportunidad de revisar el presupuesto que te envié. Me encantaría saber tus comentarios o si tienes alguna duda puntual.\n\nQuedo atenta, ¡saludos!`,
    quoteExpiration: (clientName) => `Hola ${clientName}, un gusto saludarte.\n\nTe comento que la validez de nuestra cotización está por vencer (los precios pueden variar después de 15 días). ¿Te gustaría que formalicemos para congelar el precio actual? 🧊\n\nAvísame cualquier cosa.`,
    closingSale: (clientName) => `Hola ${clientName}, ¿cómo va tu semana?\n\nEstoy organizando la agenda de inicios de proyecto para este mes y me gustaría reservar tu espacio. ¿Te parece si procedemos con el anticipo para arrancar? 🚀`,
    postMeeting: (clientName) => `Hola ${clientName}, gracias por el tiempo de hoy.\n\nMe quedé pensando en lo que platicamos sobre [Mencionar punto clave]. Creo que tenemos una gran oportunidad ahí. Te estaré mandando la propuesta ajustada en breve.\n\n¡Seguimos!`,
    reactivation: (clientName) => `Hola ${clientName}, hace tiempo no platicamos.\n\nEstaba revisando algunos casos de éxito recientes y me acordé de tu proyecto. Se me ocurrieron un par de ideas nuevas para [Su Sector]. ¿Tienes 5 mins esta semana para un audio rápido? 🎙️`,
    referralThanks: (clientName) => `¡Hola ${clientName}! 👋\n\nSolo escribía para darte las gracias por recomendarnos con [Nombre Referido]. Ya estamos en contacto. ¡Te debo una! 🙌`,
    welcome: (clientName) => `¡Bienvenido ${clientName}! Es oficial. 🎉\n\nEstamos muy emocionados de empezar a trabajar con tu marca. En breve te llegará un correo con los siguientes pasos para el onboarding.\n\n¡Vamos a romperla! 🚀`
}

const companyInfo = {
    name: "D9 Marketing",
    tagline: "De Todas Formas... Diseño",
    contact: { phone: "51 654 47", address: "Constitución 213-A...", website: "www.despacho9.com.mx" },
    hours: "Lunes a Viernes de 9:00 AM a 6:00 PM",
    paymentMethods: ["Transferencia Bancaria", "Depósito en Efectivo", "PayPal"],
    policies: { advance: "50% de anticipo", validity: "15 días hábiles", iva: "Precios + IVA (16%)" }
}

const getServiceInfo = (id) => services[id] || null
const listAllServices = () => Object.values(services)
const generateQuote = (serviceId, clientName, duration = 1, customPrice = null) => {
    const sId = serviceId.toLowerCase();
    const key = Object.keys(services).find(k => k.toLowerCase() === sId);

    if (key) {
        if (key === 'metaAds') return budgetTemplates.metaAds(clientName, duration, customPrice)
        return budgetTemplates.generic(clientName, key, duration, customPrice)
    }

    const pkgKey = Object.keys(packages).find(k => k.toLowerCase() === sId);
    if (pkgKey) return budgetTemplates.package(clientName, pkgKey) // Paquetes no suelen permitir cambio precio fácil

    return "Servicio no encontrado.";
}
const generateWhatsApp = (type, clientName) => {
    const tId = type.toLowerCase();
    const key = Object.keys(whatsappTemplates).find(k => k.toLowerCase() === tId);

    if (key) {
        let message = whatsappTemplates[key](clientName);
        // Fix for welcome template typo if it exists in the string
        message = message.replace('${clientName]', clientName);
        return message;
    }
    return "Plantilla no encontrada.";
}
const detectCommand = (input) => {
    const trimmed = input.trim();
    const text = trimmed.toLowerCase();

    if (text.startsWith('/presupuesto')) {
        const parts = trimmed.split(' ');
        const serviceId = parts[1] ? parts[1].toLowerCase() : '';

        let customPrice = null;
        let nameIndex = 2;

        // Detectar si el segundo argumento es un número (precio personalizado)
        // Eliminamos $, comas y espacios antes de chequear si es número
        const potentialPrice = parts[2] ? parts[2].replace(/[$,]/g, '') : '';
        if (potentialPrice && !isNaN(potentialPrice) && potentialPrice.length > 0) {
            customPrice = parseFloat(potentialPrice);
            nameIndex = 3;
        }

        const clientName = parts.slice(nameIndex).join(' ') || 'Cliente';
        return { type: 'quote', serviceId, clientName, customPrice }
    }
    if (text.startsWith('/whatsapp')) {
        const parts = trimmed.split(' ');
        const templateType = parts[1] ? parts[1].toLowerCase() : '';
        const clientName = parts.slice(2).join(' ') || 'Cliente';
        return { type: 'whatsapp', templateType, clientName }
    }
    if (text.startsWith('/servicios') || text.startsWith('/precios')) return { type: 'services' }
    if (text.startsWith('/paquetes')) return { type: 'packages' }
    return null
}

// Estado Global con Persistencia
const state = {
    currentView: 'dashboard',
    timeLeft: 3 * 60 * 60,
    leads: [],
    calendarEvents: [],
    tasks: [],
    history: []
};

// Cargar estado inicial
async function loadState() {
    try {
        const cloudState = await loadFromCloud();
        const localSaved = localStorage.getItem('ninja_state');

        let localData = localSaved ? JSON.parse(localSaved) : null;
        let finalData = null;

        // Lógica de Sincronización:
        // Priorizamos la nube si tiene contenido real (leads o tareas)
        const cloudHasData = cloudState && (
            (cloudState.leads && cloudState.leads.length > 0) ||
            (cloudState.tasks && cloudState.tasks.length > 0) ||
            (cloudState.calendarEvents && cloudState.calendarEvents.length > 0)
        );

        if (cloudHasData) {
            console.log("Cargando desde Supabase (Datos detectados)");
            finalData = cloudState;
        } else if (localData) {
            console.log("Cargando desde LocalStorage (Nube vacía o sin datos)");
            finalData = localData;
            // Si la nube está vacía pero tenemos datos locales, sincronizar a la nube
            if (!cloudHasData) syncToCloud(localData);
        }

        if (finalData) {
            const parsed = finalData;
            if (parsed.leads) state.leads = parsed.leads;
            if (parsed.calendarEvents) state.calendarEvents = parsed.calendarEvents;
            if (parsed.tasks) state.tasks = parsed.tasks;
            if (parsed.history) state.history = parsed.history;
            if (parsed.timeLeft !== undefined) state.timeLeft = parsed.timeLeft;
            if (parsed.currentView) state.currentView = parsed.currentView;

            console.log("Estado cargado con éxito.");

            // Si cargamos de local y la nube estaba vacía, forzar un saveState para subirlo
            if (finalData === localData && !cloudHasData) {
                saveState();
            }
            return;
        }
    } catch (e) {
        console.error("Error al cargar estado:", e);
    }

    cargarDefaults();
}

function cargarDefaults() {
    console.log("Cargando datos por defecto...");
    state.leads = [
        { id: 1, name: 'Inmobiliaria Sol', interest: 'Redes Sociales', status: 'cold', brandDNA: { sector: 'Inmobiliario', values: 'Confianza, Lujo, Rapidez' } },
        { id: 2, name: 'Gimnasio Fit', interest: 'Diseño Logo', status: 'warm' }
    ];
    state.calendarEvents = [
        { id: 101, title: 'Reunión con Inmobiliaria Sol', date: new Date().toISOString().split('T')[0], time: '10:00', type: 'meeting', leadId: 1 }
    ];
    state.tasks = [
        { id: 201, text: 'Seguimiento a 3 prospectos actuales', completed: false },
        { id: 202, text: 'Generar 3 posts para Meta (FB/IG)', completed: false }
    ];
    saveState();
}

async function saveState() {
    const syncIndicator = document.getElementById('sync-indicator');
    const syncText = document.getElementById('sync-text');

    try {
        if (syncIndicator) {
            syncIndicator.classList.add('syncing');
            if (syncText) syncText.textContent = "Sincronizando...";
        }

        const dataToSave = {
            currentView: state.currentView,
            leads: state.leads,
            calendarEvents: state.calendarEvents,
            tasks: state.tasks,
            history: state.history,
            timeLeft: state.timeLeft,
            updatedAt: new Date().toISOString()
        };
        const jsonStr = JSON.stringify(dataToSave);
        localStorage.setItem('ninja_state', jsonStr);

        // Intentar sincronizar con la nube
        const success = await syncToCloud(dataToSave);

        if (syncIndicator && syncText) {
            syncIndicator.classList.remove('syncing');
            if (success) {
                syncText.textContent = "Sincronizado";
                syncIndicator.style.color = "#4ade80";
            } else {
                syncText.textContent = "Solo Local";
                syncIndicator.style.color = "#f87171";
            }
        }
    } catch (e) {
        console.error("Error al guardar estado:", e);
        if (syncText) syncText.textContent = "Error Sync";
    }
}

function logActivity(text, icon = 'activity') {
    const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    state.history.unshift({ text, icon, time });
    if (state.history.length > 8) state.history.pop();
    saveState();
}

function renderHeaderRight() {
    return `
        <div class="status-group">
            <div id="sync-indicator" class="sync-badge" title="Estado de Sincronización">
                <i data-lucide="cloud-check"></i>
                <span id="sync-text">Sincronizado</span>
            </div>
            <div class="clock-badge">
                <i data-lucide="clock"></i>
                <span id="real-clock">00:00:00</span>
            </div>
            <div class="timer-badge">
                <i data-lucide="hourglass"></i>
                <span id="session-timer">00:00:00</span>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadState();
    initNavigation();

    // Restore last view or default to dashboard
    const savedView = state.currentView || 'nav-dashboard';
    // Update active class
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const activeLink = document.getElementById(savedView);
    if (activeLink) activeLink.classList.add('active');

    renderView(savedView);
    setupGlobalTimer();
    setupConcierge();
    setupMobileMenu();
});

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');

    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    const toggleMenu = () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    if (btn) btn.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // Close on nav click
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });

    // Mobile Chat Toggle
    const chatFab = document.getElementById('mobile-chat-toggle');
    const conciergeSidebar = document.querySelector('.concierge-sidebar');
    const closeChatBtn = document.getElementById('close-chat-btn');

    if (chatFab) {
        chatFab.addEventListener('click', () => {
            // Cerrar menú principal si está abierto
            sidebar.classList.remove('active');
            overlay.classList.remove('active');

            conciergeSidebar.classList.add('active');
            if (window.lucide) window.lucide.createIcons();
        });
    }

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            conciergeSidebar.classList.remove('active');
        });
    }
}

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            renderView(item.id);
        });
    });
}

function renderView(viewId) {
    const viewContainer = document.getElementById('view-container');
    const pageTitle = document.getElementById('page-title');
    if (!viewContainer) return;

    viewContainer.innerHTML = '';

    switch (viewId) {
        case 'nav-dashboard':
            pageTitle.innerText = "Dashboard de Comando";
            renderDashboard(viewContainer);
            break;
        case 'nav-leads':
            pageTitle.innerText = "Gestión de Prospectos";
            renderLeads(viewContainer);
            setupLeads();
            break;
        case 'nav-calendar':
            pageTitle.innerText = "Agenda Estratégica";
            renderCalendar(viewContainer);
            setupCalendar();
            break;
        case 'nav-design':
            pageTitle.innerText = "Co-piloto de Diseño";
            renderDesign(viewContainer);
            setupDesignPilot();
            break;
        case 'nav-settings':
            pageTitle.innerText = "Ajustes del Sistema";
            renderSettings(viewContainer);
            setupSettings();
            break;
        default:
            renderDashboard(viewContainer);
    }

    // Update global state for active view
    state.currentView = viewId;
    saveState();

    if (window.lucide) window.lucide.createIcons();
}

function renderDashboard(container) {
    const taskHtml = state.tasks.filter(t => !t.completed).map(task => `
        <li class="task-item">
            <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''} onchange="window.toggleTask(${task.id})">
            <label for="task-${task.id}">${task.text}</label>
        </li>
    `).join('') || '<li class="task-item">No hay tareas pendientes. 🔥</li>';

    const historyHtml = state.history.map(h => `
        <div class="activity-item" style="display:flex; gap:10px; margin-bottom:12px; font-size:0.85rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom:8px;">
            <i data-lucide="${h.icon}" style="width:14px; color:var(--accent-primary);"></i>
            <div style="flex:1;">${h.text}</div>
            <div style="color:var(--text-dim); font-size:0.75rem;">${h.time}</div>
        </div>
    `).join('') || '<p style="font-size:0.8rem; color:var(--text-dim);">Sin actividad reciente.</p>';

    const activeClients = state.leads.filter(l => l.status === 'hot').length;

    container.innerHTML = `
        <section class="dashboard-grid" style="padding-top: 20px;">
            <div class="card critical-tasks">
                <div class="card-header">
                    <h3><i data-lucide="alert-circle"></i> Tareas de Hoy</h3>
                </div>
                <ul class="task-list">
                    ${taskHtml}
                </ul>
            </div>

            <div class="card leads-summary">
                <div class="card-header">
                    <h3><i data-lucide="trending-up"></i> Pipeline de Ventas</h3>
                </div>
                <div class="stats-grid">
                    <div class="stat-item"><span class="stat-value">${activeClients}</span><span class="stat-label">${activeClients === 1 ? 'Cliente Caliente' : 'Clientes Calientes'}</span></div>
                    <div class="stat-item"><span class="stat-value">${state.leads.length}</span><span class="stat-label">Prospectos</span></div>
                </div>
            </div>

            <div class="card recent-activity" style="grid-column: span 1;">
                <div class="card-header">
                    <h3><i data-lucide="history"></i> Actividad Reciente</h3>
                </div>
                <div class="activity-list" style="margin-top:15px;">
                    ${historyHtml}
                </div>
            </div>
        </section>
    `;
}

window.toggleTask = function (taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        if (task.completed) logActivity(`Tarea completada: ${task.text}`, 'check-circle');
        saveState();
        renderView('nav-dashboard');
    }
}

function renderLeads(container) {
    container.innerHTML = `
        <div style="display:flex; justify-content: flex-end; margin-bottom: 20px;">
            <button id="add-lead-btn" class="btn-primary" onclick="window.currentOpenModal()"><i data-lucide="plus"></i> Nuevo Lead</button>
        </div>

        <section class="kanban-board">
            <div class="kanban-column" id="col-cold" data-status="cold" ondrop="drop(event)" ondragover="allowDrop(event)">
                <div class="column-header cold">
                    <h4>Contacto Inicial (${state.leads.filter(l => l.status === 'cold').length})</h4>
                </div>
                <div class="kanban-list">
                    ${state.leads.filter(l => l.status === 'cold').map(l => createLeadCard(l)).join('')}
                </div>
            </div>
            <div class="kanban-column" id="col-warm" data-status="warm" ondrop="drop(event)" ondragover="allowDrop(event)">
                <div class="column-header warm">
                    <h4>Propuesta (${state.leads.filter(l => l.status === 'warm').length})</h4>
                </div>
                <div class="kanban-list">
                    ${state.leads.filter(l => l.status === 'warm').map(l => createLeadCard(l)).join('')}
                </div>
            </div>
            <div class="kanban-column" id="col-hot" data-status="hot" ondrop="drop(event)" ondragover="allowDrop(event)">
                <div class="column-header hot">
                    <h4>Cierre (${state.leads.filter(l => l.status === 'hot').length})</h4>
                </div>
                <div class="kanban-list">
                    ${state.leads.filter(l => l.status === 'hot').map(l => createLeadCard(l)).join('')}
                </div>
            </div>
        </section>

        <!-- LEAD MODAL -->
        <div id="lead-modal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:9999; justify-content:center; align-items:center;">
            <div class="modal-content" style="background:#1e293b; border-radius:16px; width:95%; max-width:800px; max-height:90vh; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); border: 1px solid #334155; color: white; display:flex; flex-direction:column;">
                
                <div class="modal-header" style="padding:24px; border-bottom:1px solid #334155; display:flex; justify-content:space-between; align-items:center;">
                    <h2 id="modal-title" style="margin:0; color:#f8fafc; font-size:1.5rem;">Ficha del Prospecto</h2>
                    <div class="modal-tabs" style="display:flex; gap:10px;">
                        <button class="tab-btn active" data-tab="tab-basic">Básico</button>
                        <button class="tab-btn" data-tab="tab-dna">Identidad</button>
                        <button class="tab-btn" data-tab="tab-analysis">Análisis</button>
                        <button class="tab-btn" data-tab="tab-marketing">Marketing</button>
                    </div>
                </div>

                <div class="modal-body" style="padding:24px; overflow-y:auto; flex:1;">
                    <!-- TAB: BASICO -->
                    <div id="tab-basic" class="tab-content active">
                        <div class="grid-2" style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                            <div class="form-group">
                                <label>Nombre del Lead / Marca</label>
                                <input type="text" id="lead-name" placeholder="Ej: Inmobiliaria Futuro">
                            </div>
                            <div class="form-group">
                                <label>Servicio de Interés</label>
                                <select id="lead-interest">
                                    <option value="Meta Ads">Meta Ads (FB/IG)</option>
                                    <option value="Diseño Web">Diseño Web / Landing</option>
                                    <option value="Identidad Visual">Identidad Visual / Logo</option>
                                    <option value="Community Mgmt">Community Management</option>
                                    <option value="Consultoría">Consultoría Estratégica</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" style="margin-top:20px;">
                            <label>Nombre del Contacto y Cargo</label>
                            <input type="text" id="lead-contact" placeholder="Ej: Juan Pérez - Director Comercial">
                        </div>
                        <div class="form-group" style="margin-top:20px;">
                            <label>Sitio Web / Redes Actuales</label>
                            <input type="text" id="lead-web" placeholder="URL o N/A">
                        </div>
                    </div>

                    <!-- TAB: IDENTIDAD (Brand DNA) -->
                    <div id="tab-dna" class="tab-content" style="display:none;">
                        <div class="form-group">
                            <label>Sector o Industria</label>
                            <input type="text" id="lead-sector" placeholder="¿A qué se dedican?">
                        </div>
                        <div class="form-group" style="margin-top:20px;">
                            <label>Valores de Marca (3 palabras clave)</label>
                            <input type="text" id="lead-values" placeholder="Ej: Innovación, Tradición, Lujo">
                        </div>
                        <div class="form-group" style="margin-top:20px;">
                            <label>¿Cuál es el dolor principal?</label>
                            <textarea id="lead-pain" rows="3" placeholder="Ej: Mi logo se ve viejo, no vendo en redes..."></textarea>
                        </div>
                        <div class="form-group" style="margin-top:20px;">
                            <label>Objetivo del Proyecto</label>
                            <textarea id="lead-goal" rows="2" placeholder="¿Qué quieren lograr exactamente?"></textarea>
                        </div>
                    </div>

                    <!-- TAB: ANALISIS -->
                    <div id="tab-analysis" class="tab-content" style="display:none;">
                        <div class="form-group">
                            <label>Perfil del Cliente Ideal (Target)</label>
                            <textarea id="lead-target" rows="3" placeholder="Edad, intereses, ubicación..."></textarea>
                        </div>
                        <div class="form-group" style="margin-top:20px;">
                            <label>¿Qué problema resuelves y cómo?</label>
                            <textarea id="lead-solution" rows="3" placeholder="Describe tu producto o servicio principal"></textarea>
                        </div>
                        <div class="form-group" style="margin-top:20px;">
                            <label>Principales 3 Competidores</label>
                            <textarea id="lead-competitors" rows="2" placeholder="Nombres o links..."></textarea>
                        </div>
                    </div>

                    <!-- TAB: MARKETING & SPECS -->
                    <div id="tab-marketing" class="tab-content" style="display:none;">
                        <div class="form-group">
                            <label>Objetivo de Campaña</label>
                            <select id="lead-campaign-goal">
                                <option value="ventas">Generar más ventas/conversiones</option>
                                <option value="seguidores">Conseguir más seguidores/comunidad</option>
                                <option value="posicionamiento">Posicionamiento de marca</option>
                                <option value="lanzamiento">Lanzar un producto nuevo</option>
                            </select>
                        </div>
                        <div class="grid-2" style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:20px;">
                            <div class="form-group">
                                <label>Meta Menstrual (Leads/Ventas)</label>
                                <input type="text" id="lead-target-number" placeholder="Ej: 50 leads/mes">
                            </div>
                            <div class="form-group">
                                <label>Acompañamiento Ads</label>
                                <select id="lead-ads-budget">
                                    <option value="5k-10k">$5,000 - $10,000 MXN</option>
                                    <option value="10k-30k">$10,000 - $30,000 MXN</option>
                                    <option value="30k+">Más de $30,000 MXN</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" style="margin-top:20px;">
                            <label>Material Gráfico / Video</label>
                            <select id="lead-assets">
                                <option value="si">Sí, cuento con material</option>
                                <option value="no">No cuento con material</option>
                                <option value="crear">Necesito que lo creen</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="modal-footer" style="padding:24px; border-top:1px solid #334155; display:flex; justify-content:flex-end; gap:12px; background:#0f172a;">
                    <input type="hidden" id="lead-id">
                    <input type="hidden" id="lead-status">
                    <button id="delete-lead-btn" class="btn-secondary" style="background:rgba(239, 68, 68, 0.1); color:#ef4444; border:1px solid rgba(239, 68, 68, 0.2); display:none; margin-right:auto;">Eliminar</button>
                    <button id="cancel-lead-btn" class="btn-secondary">Cancelar</button>
                    <button id="save-lead-btn" class="btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    `;

    // Configurar Drag & Drop global si no existe
    window.allowDrop = (ev) => ev.preventDefault();

    window.drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
        ev.target.classList.add('dragging');
    };

    window.drop = (ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        const draggedElement = document.getElementById(data);
        if (!draggedElement) return;

        draggedElement.classList.remove('dragging');

        // Encontrar la columna destino (puede ser el div o un hijo)
        let targetColumn = ev.target.closest('.kanban-column');

        if (targetColumn) {
            const newStatus = targetColumn.getAttribute('data-status');
            const leadId = parseInt(data.replace('lead-', ''));

            // Actualizar estado
            const leadIndex = state.leads.findIndex(l => l.id === leadId);
            if (leadIndex !== -1 && state.leads[leadIndex].status !== newStatus) {
                state.leads[leadIndex].status = newStatus;
                saveState();
                // Re-renderizar para actualizar contadores y orden
                renderView('nav-leads');
            }
        }
    };
}

function createLeadCard(lead) {
    return `
        <div id="lead-${lead.id}" class="lead-card" draggable="true" ondragstart="drag(event)" onclick="window.openLeadModal(${lead.id})" style="cursor:pointer; transition:transform 0.2s;">
            <div class="card-top">
                <h5>${lead.name}</h5>
                <i data-lucide="pencil" style="opacity:0.9; width:14px;"></i>
            </div>
            <p class="interest"><i data-lucide="target" style="width:14px"></i> ${lead.interest}</p>
            ${lead.brandDNA?.sector ? `<p class="sector" style="font-size:0.75em; color:var(--accent-primary); margin-top:4px;">${lead.brandDNA.sector}</p>` : ''}
            <span class="badge ${lead.status}">${translateStatus(lead.status)}</span>
        </div>
    `;
}

// Hacer la función accesible globalmente para el onclick
window.openLeadModal = (id) => {
    const event = new CustomEvent('open-lead-editor', { detail: { id } });
    document.dispatchEvent(event);
};

function setupLeads() {
    const modal = document.getElementById('lead-modal');
    const addBtn = document.getElementById('add-lead-btn');
    const cancelBtn = document.getElementById('cancel-lead-btn');
    const saveBtn = document.getElementById('save-lead-btn');
    const deleteBtn = document.getElementById('delete-lead-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');

    // Inputs
    const title = document.getElementById('modal-title');
    // Inputs Básico
    const nameInput = document.getElementById('lead-name');
    const interestInput = document.getElementById('lead-interest');
    const contactInput = document.getElementById('lead-contact');
    const webInput = document.getElementById('lead-web');
    // Inputs Identidad
    const sectorInput = document.getElementById('lead-sector');
    const valuesInput = document.getElementById('lead-values');
    const painInput = document.getElementById('lead-pain');
    const goalInput = document.getElementById('lead-goal');
    // Inputs Análisis
    const targetInput = document.getElementById('lead-target');
    const solutionInput = document.getElementById('lead-solution');
    const competitorsInput = document.getElementById('lead-competitors');
    // Inputs Marketing
    const campaignGoalInput = document.getElementById('lead-campaign-goal');
    const targetNumberInput = document.getElementById('lead-target-number');
    const adsBudgetInput = document.getElementById('lead-ads-budget');
    const assetsInput = document.getElementById('lead-assets');

    const idInput = document.getElementById('lead-id');
    const statusInput = document.getElementById('lead-status');

    if (!modal) return;

    // Estado para confirmación de borrado
    let isConfirmingDelete = false;

    // Lógica de Pestañas
    const tabs = modal.querySelectorAll('.tab-btn');
    const contents = modal.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.style.display = 'none');
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).style.display = 'block';
        };
    });

    // Función interna para abrir modal
    const openModal = (lead = null) => {
        modal.style.display = 'flex';
        // Reset tabs
        tabs[0].click();

        // Reset botón de borrado
        isConfirmingDelete = false;
        if (deleteBtn) {
            deleteBtn.innerHTML = '<i data-lucide="trash-2"></i> Eliminar';
            deleteBtn.className = 'btn-danger';
            if (window.lucide) lucide.createIcons();
        }

        if (lead) {
            document.getElementById('modal-title').textContent = "Editar Prospecto";
            nameInput.value = lead.name || '';
            interestInput.value = lead.interest || 'Meta Ads';
            contactInput.value = lead.contact || '';
            webInput.value = lead.web || '';

            const dna = lead.brandDNA || {};
            sectorInput.value = dna.sector || '';
            valuesInput.value = dna.values || '';
            painInput.value = dna.pain || '';
            goalInput.value = dna.goal || '';

            const analysis = lead.analysis || {};
            targetInput.value = analysis.target || '';
            solutionInput.value = analysis.solution || '';
            competitorsInput.value = analysis.competitors || '';

            const mkt = lead.marketing || {};
            campaignGoalInput.value = mkt.campaignGoal || 'ventas';
            targetNumberInput.value = mkt.targetNumber || '';
            adsBudgetInput.value = mkt.adsBudget || '10k-30k';
            assetsInput.value = mkt.assets || 'no';

            idInput.value = lead.id;
            statusInput.value = lead.status;
            if (deleteBtn) deleteBtn.style.display = 'block';
        } else {
            document.getElementById('modal-title').textContent = "Nuevo Prospecto";
            [nameInput, contactInput, webInput, sectorInput, valuesInput, painInput, goalInput, targetInput, solutionInput, competitorsInput, targetNumberInput].forEach(i => i.value = '');
            interestInput.value = 'Meta Ads';
            campaignGoalInput.value = 'ventas';
            adsBudgetInput.value = '10k-30k';
            assetsInput.value = 'no';
            idInput.value = '';
            statusInput.value = 'cold';
            if (deleteBtn) deleteBtn.style.display = 'none';
        }
    };

    const closeModal = () => {
        modal.style.display = 'none';
    };

    window.currentOpenModal = () => openModal();

    // Actualizar el manejador global para que use el openModal de esta renderización
    window._lastOpenModal = openModal;

    if (!window._leadEditorListener) {
        document.addEventListener('open-lead-editor', (e) => {
            const lead = state.leads.find(l => l.id === e.detail.id);
            if (lead && window._lastOpenModal) window._lastOpenModal(lead);
        });
        window._leadEditorListener = true;
    }

    if (cancelBtn) cancelBtn.onclick = closeModal;

    if (deleteBtn) {
        deleteBtn.onclick = () => {
            if (!isConfirmingDelete) {
                isConfirmingDelete = true;
                deleteBtn.innerHTML = '<i data-lucide="alert-triangle"></i> ¿Confirmar?';
                deleteBtn.className = 'btn-danger confirm-danger';
                if (window.lucide) lucide.createIcons();
            } else {
                const leadName = nameInput.value || 'Lead';
                state.leads = state.leads.filter(l => l.id !== parseInt(idInput.value));
                logActivity(`Prospecto eliminado: ${leadName}`, 'trash-2');
                saveState();
                closeModal();
                renderView('nav-leads');
            }
        };
    }

    if (saveBtn) saveBtn.onclick = () => {
        const name = nameInput.value.trim();
        if (!name) return alert('El nombre es obligatorio');

        const leadId = idInput.value ? parseInt(idInput.value) : Date.now();
        const existingIndex = state.leads.findIndex(l => l.id === leadId);

        const leadData = {
            id: leadId,
            name: name,
            interest: interestInput.value,
            contact: contactInput.value,
            web: webInput.value,
            status: statusInput.value || 'cold',
            brandDNA: {
                sector: sectorInput.value,
                values: valuesInput.value,
                pain: painInput.value,
                goal: goalInput.value
            },
            analysis: {
                target: targetInput.value,
                solution: solutionInput.value,
                competitors: competitorsInput.value
            },
            marketing: {
                campaignGoal: campaignGoalInput.value,
                targetNumber: targetNumberInput.value,
                adsBudget: adsBudgetInput.value,
                assets: assetsInput.value
            }
        };

        if (existingIndex !== -1) {
            state.leads[existingIndex] = leadData;
            logActivity(`Prospecto actualizado: ${name}`, 'edit');
        } else {
            state.leads.push(leadData);
            logActivity(`Nuevo prospecto: ${name}`, 'user-plus');
        }

        saveState();
        closeModal();
        renderView('nav-leads');
    };
}


function translateStatus(status) {
    const map = { 'cold': 'Frío', 'warm': 'Tibio', 'hot': 'Caliente' };
    return map[status] || status;
}

function renderDesign(container) {
    container.innerHTML = `
        <section class="design-studio">
            <div class="studio-sidebar">
                <div class="format-select">
                    <label>Formato Meta:</label>
                    <select id="meta-format">
                        <option value="1080x1080">Post Cuadrado (IG/FB)</option>
                        <option value="1080x1920">Story / Reel (9:16)</option>
                        <option value="1200x630">Horizontal (Ads)</option>
                    </select>
                </div>
                <div class="ai-generator">
                    <textarea id="design-prompt" placeholder="Describe el post que necesitas..."></textarea>
                    <button class="btn-primary" id="gen-strategy-btn" style="margin-bottom: 10px;">
                        <i data-lucide="lightbulb"></i> Generar Estrategia
                    </button>
                    <button class="btn-primary" id="gen-image-btn">
                        <i data-lucide="image"></i> Generar Imagen
                    </button>
                </div>
                <div id="strategy-status" style="margin-top: 10px; font-size: 0.8rem; color: var(--text-dim); display: none;">
                    <i data-lucide="check-circle" style="width:14px; vertical-align:middle;"></i> Estrategia lista para el asset
                </div>
                <div id="strategy-details" style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); border-radius: 12px; display: none; max-height: 400px; overflow-y: auto;">
                    <h4 style="color: var(--accent-primary); font-size: 0.85rem; margin-bottom: 12px; letter-spacing: 1px;">PROPUESTA ESTRATÉGICA</h4>
                    <div id="strategy-full-text" style="font-size: 0.85rem; line-height: 1.6; color: var(--text-main);"></div>
                </div>
            </div>
            <div class="canvas-preview">
                <div id="strategy-headline" style="width: 100%; margin-bottom: 15px; padding: 0 10px; display: none;">
                    <h2 id="headline-text" style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin: 0;"></h2>
                </div>
                <div class="preview-box" id="preview-box">
                    <span>Vista Previa del Asset</span>
                </div>
            </div>
        </section>
    `;
}

function setupDesignPilot() {
    const strategyBtn = document.getElementById('gen-strategy-btn');
    const imageBtn = document.getElementById('gen-image-btn');
    const promptArea = document.getElementById('design-prompt');
    const previewBox = document.getElementById('preview-box');
    const metaFormat = document.getElementById('meta-format');
    const strategyStatus = document.getElementById('strategy-status');
    const strategyDetails = document.getElementById('strategy-details');
    const strategyFullText = document.getElementById('strategy-full-text');
    const strategyHeadline = document.getElementById('strategy-headline');
    const headlineText = document.getElementById('headline-text');

    if (!strategyBtn || !imageBtn || !promptArea || !previewBox) return;

    // Variable para almacenar la estrategia generada
    let currentStrategy = '';

    // Botón 1: Generar Estrategia (Con IA - OpenRouter)
    strategyBtn.addEventListener('click', async () => {
        const prompt = promptArea.value.trim();
        if (!prompt) {
            alert("Por favor, describe qué necesitas para poder inspirarte.");
            return;
        }

        strategyBtn.disabled = true;
        strategyBtn.innerHTML = `<i data-lucide="loader" class="spin"></i> Pensando...`;
        if (window.lucide) window.lucide.createIcons();

        // Lista de modelos a probar en orden de preferencia
        const modelsToTry = [
            "meta-llama/llama-3.2-3b-instruct:free", // Muy rápido y fiable
            "google/gemini-2.0-flash-lite-preview-02-05:free",
            "google/gemini-flash-1.5",
            "mistralai/mistral-7b-instruct:free"
        ];

        let strategyGenerated = false;
        let lastError = null;

        for (const model of modelsToTry) {
            try {
                console.log(`Intentando con modelo: ${model}...`);
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${'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'}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": window.location.origin,
                        "X-Title": "D9 Marketing Dashboard"
                    },
                    body: JSON.stringify({
                        "model": model,
                        "messages": [
                            {
                                "role": "system",
                                "content": "Eres un Director Creativo experto en Meta Ads. Genera una estrategia visual detallada con: 1) Concepto principal (`concept`), 2) Paleta de colores sugerida (`colors`), 3) Elementos visuales clave (`elements`), 4) Copy sugerido (`copy`). Al final, incluye explícitamente `PROMPT_IMAGEN:` seguido de un prompt en inglés para generar la imagen."
                            },
                            { "role": "user", "content": prompt }
                        ]
                    })
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    console.warn(`Fallo con ${model}:`, errData);
                    continue; // Probar siguiente modelo
                }

                const data = await response.json();
                if (data.choices && data.choices[0] && data.choices[0].message) {
                    currentStrategy = data.choices[0].message.content;
                    if (strategyStatus) strategyStatus.style.display = 'block';
                    if (strategyDetails) strategyDetails.style.display = 'block';
                    if (strategyFullText) strategyFullText.innerHTML = currentStrategy.replace(/\n/g, '<br>');

                    strategyGenerated = true;
                    // Actualizar el overlay si la imagen ya existe
                    updateStrategyOverlay();
                    break; // Éxito, salir del loop
                }
            } catch (e) {
                lastError = e;
                console.error(`Error con ${model}:`, e);
            }
        }

        if (!strategyGenerated) {
            // GENERADOR DE ESTRATEGIA LOCAL CON VARIEDAD
            const p = prompt.toLowerCase();

            // Bases de datos creativas
            const db = {
                realEstate: {
                    temas: ["Vida de Lujo y Confort", "Inversión Inteligente para tu Futuro", "Tu Espacio Ideal en la Naturaleza", "Oportunidad de Plusvalía"],
                    colores: ["Verde Bosque, Café Tierra, Dorado", "Azul Real, Beige, Blanco", "Terracota, Gris Pizarra, Crema"],
                    elementos: ["Vista aérea (dron), planos topográficos", "Familia feliz en jardín, llaves en mano", "Render arquitectónico moderno al atardecer"],
                    copy: ["La oportunidad que estabas esperando está aquí.", "Construye el patrimonio que tu familia merece.", "Invierte en tierra, invierte en futuro."]
                },
                tech: {
                    temas: ["Innovación Disruptiva", "Eficiencia Automatizada", "El Futuro Hoy"],
                    colores: ["Azul Eléctrico, Morado Neón, Negro", "Cyan, Blanco, Plata", "Naranja Vibrante, Gris Oscuro"],
                    elementos: ["Pantallas flotantes, código abstracto", "Interfaz de usuario minimalista en móvil", "Redes de conexión brillantes"],
                    copy: ["Lleva tu negocio al siguiente nivel.", "Tecnología que trabaja por ti.", "Simplifica, automatiza, crece."]
                },
                general: {
                    temas: ["Exclusividad y Prestigio", "Solución Práctica a tu Problema", "Oferta Irresistible por Tiempo Limitado"],
                    colores: ["Rojo Intenso, Blanco, Negro", "Azul Marino, Oro, Blanco", "Amarillo, Negro, Gris"],
                    elementos: ["Fotografía de producto heroica", "Persona sonriendo usando el servicio", "Tipografía bold con alto contraste"],
                    copy: ["No dejes pasar esta oportunidad única.", "Descubre por qué somos los líderes.", "Calidad que se ve y se siente."]
                }
            };

            let category = 'general';
            if (p.includes("terreno") || p.includes("lote") || p.includes("casa") || p.includes("propiedad")) category = 'realEstate';
            else if (p.includes("tech") || p.includes("app") || p.includes("software") || p.includes("web")) category = 'tech';

            // Selección aleatoria
            const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

            const tema = pick(db[category].temas);
            const col = pick(db[category].colores);
            const elem = pick(db[category].elementos);
            const copy = pick(db[category].copy);

            currentStrategy = `✨ **ESTRATEGIA GENERADA**\n\n**📋 CONCEPTO:** ${tema}\n**🎨 PALETA:** ${col}\n**🖼️ ELEMENTOS:** ${elem}\n**✍️ COPY:** "${copy}"`;

            if (strategyStatus) strategyStatus.style.display = 'block';
            if (strategyDetails) strategyDetails.style.display = 'block';
            if (strategyFullText) strategyFullText.innerHTML = currentStrategy.replace(/\n/g, '<br>');

            updateStrategyOverlay();
        }

        strategyBtn.disabled = false;
        strategyBtn.innerHTML = `<i data-lucide="lightbulb"></i> Generar Estrategia`;
        if (window.lucide) window.lucide.createIcons();
    });

    // Botón 2: Generar Imagen (Hugging Face -> Unsplash Fallback)
    imageBtn.addEventListener('click', async () => {
        const prompt = promptArea.value.trim();
        if (!prompt) {
            alert("Por favor, describe qué necesitas para generar la imagen.");
            return;
        }

        imageBtn.disabled = true;
        imageBtn.innerHTML = `<i data-lucide="loader" class="spin"></i> Generando...`;
        if (window.lucide) window.lucide.createIcons();

        try {
            const dimensions = metaFormat.value.split('x');
            const width = parseInt(dimensions[0]);
            const height = parseInt(dimensions[1]);

            // Si hay estrategia generada, extraer el PROMPT_IMAGEN
            let imagePrompt = '';
            if (currentStrategy) {
                const imagePromptMatch = currentStrategy.match(/PROMPT_IMAGEN[:\s]*([\s\S]*?)(?=\n\n|$)/i);
                imagePrompt = imagePromptMatch ? imagePromptMatch[1].trim() : `Professional cinematic shot of ${prompt}, high end`;
            } else {
                imagePrompt = `Professional cinematic shot of ${prompt}, high end, 8k resolution`;
            }
            // Añadir ruido aleatorio al prompt para evitar cacheo
            imagePrompt += ` --seed ${Math.floor(Math.random() * 99999)}`;
            imagePrompt = imagePrompt.replace(/\n/g, ' ').trim();

            console.log('Generando imagen...');

            let imageUrl = null;
            let isFallback = false;

            try {
                const response = await fetch('https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ inputs: imagePrompt, parameters: { width, height, seed: Math.floor(Math.random() * 10000) } })
                });

                if (response.ok) {
                    const blob = await response.blob();
                    imageUrl = URL.createObjectURL(blob);
                } else {
                    throw new Error("HF Busy");
                }
            } catch (err) {
                console.log("Servidores de IA ocupados. Activando Smart Stock Gallery...");
                isFallback = true;

                const p = prompt.toLowerCase();

                // GALERIA DE IMAGENES CURADAS (Arrays para variedad)
                const galleries = {
                    realEstate: [
                        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1600596542815-60c37c6525fa?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
                    ],
                    tech: [
                        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
                    ],
                    office: [
                        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
                    ],
                    general: [
                        "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                    ]
                };

                let selectedGallery = galleries.general;
                if (p.includes("terreno") || p.includes("tierra") || p.includes("lote") || p.includes("casa")) selectedGallery = galleries.realEstate;
                else if (p.includes("tech") || p.includes("app") || p.includes("digital")) selectedGallery = galleries.tech;
                else if (p.includes("reunion") || p.includes("equipo") || p.includes("oficina")) selectedGallery = galleries.office;

                // Selección aleatoria de la galería
                imageUrl = selectedGallery[Math.floor(Math.random() * selectedGallery.length)];
            }

            previewBox.innerHTML = `
                <div id="generated-design" class="generated-mockup" style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                    <img id="generated-image" src="${imageUrl}" style="max-width:100%; max-height:100%; object-fit:contain; opacity:0; transition: opacity 0.5s;" 
                         alt="Imagen generada" 
                         onload="this.style.opacity=1" 
                         onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop'; this.style.opacity=1;">
                    
                    <div id="strategy-overlay-container"></div>
                    
                    <button id="download-btn" style="position: absolute; bottom: 20px; right: 20px; background: var(--accent-primary); color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 8px; opacity: 0; transition: opacity 0.3s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">
                        <i data-lucide="download"></i> Descargar
                    </button>
                    ${isFallback ? '<div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; display:flex; gap:4px; align-items:center;"><i data-lucide="image" style="width:12px"></i> Stock Premium</div>' : ''}
                </div>
            `;


            // Configurar el botón de descarga
            setTimeout(() => {
                const downloadBtn = document.getElementById('download-btn');
                const generatedImage = document.getElementById('generated-image');

                if (downloadBtn && generatedImage) {
                    downloadBtn.style.opacity = '1';
                    downloadBtn.addEventListener('click', () => {
                        const a = document.createElement('a');
                        a.href = imageUrl;
                        a.download = `ninja-design-${Date.now()}.png`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    });
                }
                if (window.lucide) window.lucide.createIcons();
            }, 1000);

        } catch (e) {
            console.error('Error al generar imagen:', e);

            // Fallback a Pollinations.ai si Segmind falla
            console.log('Intentando con Pollinations.ai como fallback...');
            const fallbackPrompt = `Professional marketing image for ${prompt}, high quality, modern design, vibrant colors`;
            const dimensions = metaFormat.value.split('x');
            const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fallbackPrompt)}?width=${dimensions[0]}&height=${dimensions[1]}&nologo=true&enhance=true&seed=${Date.now()}`;

            previewBox.innerHTML = `
                <div id="generated-design" class="generated-mockup" style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                    <img id="generated-image" src="${imageUrl}" style="max-width:100%; max-height:100%; object-fit:contain; opacity:0; transition: opacity 0.5s;" alt="Imagen generada" onload="this.style.opacity=1">
                    
                    <div id="strategy-overlay-container"></div>
                    
                    <button id="download-btn" style="position: absolute; bottom: 20px; right: 20px; background: var(--accent-primary); color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 8px; opacity: 0; transition: opacity 0.3s;">
                        <i data-lucide="download"></i> Descargar
                    </button>
                    <div style="position: absolute; top: 10px; left: 10px; background: rgba(255,193,7,0.9); color: #000; padding: 8px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; z-index:20;">
                        ⚠️ Usando fallback
                    </div>
                </div>
            `;

            setTimeout(() => {
                const downloadBtn = document.getElementById('download-btn');
                if (downloadBtn) {
                    downloadBtn.style.opacity = '1';
                    downloadBtn.addEventListener('click', () => {
                        const a = document.createElement('a');
                        a.href = imageUrl;
                        a.download = `ninja-design-${Date.now()}.png`;
                        a.target = '_blank';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    });
                }
                if (window.lucide) window.lucide.createIcons();
            }, 1000);
            updateStrategyOverlay();
        } finally {
            imageBtn.disabled = false;
            imageBtn.innerHTML = `<i data-lucide="image"></i> Generar Imagen`;
            if (window.lucide) window.lucide.createIcons();
        }
    });

    function updateStrategyOverlay() {
        if (!currentStrategy) return;
        const container = document.getElementById('strategy-overlay-container');
        if (!container) return;

        // Limpiar el texto de la estrategia para quedarnos con el concepto o copy
        let cleanText = currentStrategy;

        // Si viene de IA con formato Concepto/Copy, manejar markdown opcional **
        const copyMatch = currentStrategy.match(/(?:✍️|(?:\*\*))?\s*COPY[:\s*]*"?([^"*\n]*)"?/i);
        const conceptMatch = currentStrategy.match(/(?:📋|(?:\*\*))?\s*CONCEPTO[:\s*]*"?([^"*\n]*)"?/i);

        if (copyMatch && copyMatch[1].trim()) {
            cleanText = copyMatch[1].trim();
        } else if (conceptMatch && conceptMatch[1].trim()) {
            cleanText = conceptMatch[1].trim();
        } else {
            // Si es un texto libre de la IA, tomar la primera línea relevante
            const lines = currentStrategy.split('\n').filter(l => l.trim() && !l.includes('✨'));
            cleanText = lines[0] ? lines[0].replace(/[*#]/g, '').trim() : currentStrategy.substring(0, 50);
        }

        // Quitar el prompt de imagen si está pegado
        cleanText = cleanText.split('PROMPT_IMAGEN')[0].trim();

        console.log("Texto extraído para UI:", cleanText);

        if (strategyHeadline && headlineText) {
            strategyHeadline.style.display = 'block';
            headlineText.textContent = cleanText;
            headlineText.style.color = 'var(--accent-primary)';
        }

        if (container) {
            container.innerHTML = `
                <div class="strategy-overlay">
                    <h4>Estrategia D9</h4>
                    <div class="strategy-content">${cleanText}</div>
                </div>
            `;
        }
    }
}

function setupGlobalTimer() {
    setInterval(() => {
        const timerDisplay = document.getElementById('session-timer');
        const clockDisplay = document.getElementById('real-clock');

        // Reloj Real
        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-ES', { hour12: false });
        if (clockDisplay) clockDisplay.textContent = timeStr;

        // Temporizador de Sesión
        if (timerDisplay) {
            const hours = Math.floor(state.timeLeft / 3600);
            const minutes = Math.floor((state.timeLeft % 3600) / 60);
            const seconds = state.timeLeft % 60;
            timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        if (state.timeLeft > 0) {
            state.timeLeft--;
            // Guardar progreso cada 10 segundos para reducir conflictos entre pestañas
            if (state.timeLeft % 10 === 0) {
                saveState();
            }
        }
    }, 1000);
}

function setupConcierge() {
    const input = document.getElementById('concierge-input');
    const btn = document.getElementById('send-btn');
    if (!btn || !input) return;

    // Quick Actions
    document.querySelectorAll('.action-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            input.value = pill.dataset.cmd;
            input.focus();
        });
    });

    btn.addEventListener('click', async () => {
        const text = input.value.trim();
        if (!text) return;

        appendMessage('user', text);
        input.value = '';

        try {
            // 1. Detectar Comandos Locales (Presupuestos, WhatsApp, Servicios)
            const command = detectCommand(text);

            if (command) {
                let responseContent = '';

                if (command.type === 'quote') {
                    responseContent = generateQuote(command.serviceId, command.clientName, 1, command.customPrice);
                } else if (command.type === 'whatsapp') {
                    responseContent = generateWhatsApp(command.templateType, command.clientName);
                } else if (command.type === 'services') {
                    const services = listAllServices();
                    responseContent = `<strong>SERVICIOS DISPONIBLES:</strong><br><br>` +
                        services.map(s => `<strong>${s.name}</strong><br>${s.description}<br>💰 ${s.price}<br>`).join('<br>');
                } else if (command.type === 'packages') {
                    responseContent = `<strong>PAQUETES D9:</strong><br><br>` +
                        Object.values(packages).map(p => `<strong>${p.name}</strong><br>${p.description}<br>💰 ${p.price} (Ahorras ${p.savings})<br>`).join('<br>');
                }

                // Simular delay de "pensando"
                const thinkingMsg = document.createElement('div');
                thinkingMsg.className = 'message system thinking';
                thinkingMsg.innerHTML = '<i data-lucide="loader" class="spin"></i> Procesando...';
                document.getElementById('concierge-messages').appendChild(thinkingMsg);

                setTimeout(() => {
                    thinkingMsg.remove();
                    appendMessage('system', responseContent, true); // true = allowHTML/CopyButton
                }, 800);

                return; // Detener flujo, no llamar a la API
            }

            // Instrucciones del Sistema para Function Calling Simulado
            const systemPrompt = `
Eres la 'IA Concierge', una secretaria virtual ejecutiva super eficiente.
Tu objetivo es ayudar al usuario y gestionar el CRM, el CALENDARIO y las TAREAS.

CONOCIMIENTO DEL TIEMPO:
Hoy es ${new Intl.DateTimeFormat('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date())}
Hora local: ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}

CONOCIMIENTO ACTUAL DEL CRM (Detalle de IDENTIDAD):
${state.leads.map(l => `- **ID: ${l.id}** | **${l.name}** [Status: ${l.status}, Interés: ${l.interest}]
  Sector: ${l.brandDNA?.sector || 'N/A'}, Dolor: ${l.brandDNA?.pain || 'N/A'}`).join('\n')}

CALENDARIO (Incluye IDs para borrar):
${state.calendarEvents.map(e => `- [ID: ${e.id}] ${e.date} ${e.time}: ${e.title}`).join('\n')}

TAREAS PENDIENTES:
${state.tasks.filter(t => !t.completed).map(t => `- [${t.id}] ${t.text}`).join('\n')}

INSTRUCCIONES CLAVE:
1. Responde SIEMPRE en español.
2. Si el usuario pide cambiar el estado de un prospecto, usa el comando 'update_lead'. Los estados válidos son: cold, warm, hot, closed.
3. Si el usuario pide ELIMINAR o BORRAR un prospecto, usa 'delete_lead' con el ID del prospecto.
4. Sé proactivo sugiriendo acciones basadas en los 'Dolores' del cliente.

COMANDOS JSON:

SI EL USUARIO QUIERE AGREGAR UN PROSPECTO:
\`\`\`json
{ "action": "create_lead", "name": "Nombre", "interest": "Servicio", "brandDNA": { "sector": "Sector", "pain": "Dolor" } }
\`\`\`

SI EL USUARIO QUIERE CAMBIAR EL ESTADO DE UN PROSPECTO (Hot, Warm, Cold):
\`\`\`json
{ "action": "update_lead", "id": 123456789, "status": "hot" }
\`\`\`

SI EL USUARIO QUIERE ELIMINAR/BORRAR UN PROSPECTO:
\`\`\`json
{ "action": "delete_lead", "id": 123456789 }
\`\`\`

SI EL USUARIO QUIERE AGENDAR ALGO:
\`\`\`json
{ "action": "schedule_event", "title": "Cita", "date": "2026-01-31", "time": "10:00" }
\`\`\`

SI EL USUARIO QUIERE ANOTAR UNA TAREA:
\`\`\`json
{ "action": "add_task", "text": "Hacer X cosa" }
\`\`\`

SI EL USUARIO QUIERE BORRAR/ELIMINAR UN EVENTO DEL CALENDARIO:
\`\`\`json
{ "action": "delete_event", "id": 123456789 }
\`\`\`
            `;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${'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'}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "google/gemini-2.0-flash-001",
                    "messages": [
                        { "role": "system", "content": systemPrompt },
                        { "role": "user", "content": text }
                    ]
                })
            });
            const data = await response.json();
            const aiContent = data.choices[0].message.content;

            // Procesar respuesta para buscar comandos JSON
            const jsonRegex = /```json\n([\s\S]*?)\n```/g;
            let match;
            let displayMessage = aiContent;

            while ((match = jsonRegex.exec(aiContent)) !== null) {
                try {
                    const command = JSON.parse(match[1]);

                    if (command.action === 'create_lead') {
                        const newLead = {
                            id: Date.now(),
                            name: command.name || 'Nuevo Lead',
                            interest: command.interest || 'General',
                            notes: command.notes || '',
                            status: 'cold',
                            brandDNA: command.brandDNA || {}
                        };
                        state.leads.push(newLead);
                        logActivity(`IA creó prospecto: ${newLead.name}`, 'user-plus');
                        await saveState();

                        // Notificación en el chat
                        displayMessage = displayMessage.replace(match[0], `\n✅ **Lead creado:** ${newLead.name}`);

                        // Actualizar UI
                        renderView(window.location.hash.replace('#', 'nav-') || 'nav-dashboard');
                    }

                    if (command.action === 'update_lead') {
                        const leadId = parseInt(command.id);
                        const lead = state.leads.find(l => l.id === leadId);
                        if (lead) {
                            lead.status = command.status;
                            logActivity(`IA actualizó ${lead.name} a ${command.status}`, 'refresh-cw');
                            await saveState();
                            displayMessage = displayMessage.replace(match[0], `\n✅ **Estado actualizado:** ${lead.name} -> ${command.status}`);
                            renderView(window.location.hash.replace('#', 'nav-') || 'nav-dashboard');
                        }
                    }

                    if (command.action === 'delete_lead') {
                        const leadId = parseInt(command.id);
                        const lead = state.leads.find(l => l.id === leadId);
                        if (lead) {
                            const leadName = lead.name;
                            state.leads = state.leads.filter(l => l.id !== leadId);
                            logActivity(`IA eliminó prospecto: ${leadName}`, 'trash-2');
                            await saveState();
                            displayMessage = displayMessage.replace(match[0], `\n✅ **Prospecto eliminado:** ${leadName}`);
                            renderView(window.location.hash.replace('#', 'nav-') || 'nav-dashboard');
                        }
                    }

                    if (command.action === 'schedule_event') {
                        const newEvent = {
                            id: Date.now(),
                            title: command.title || 'Evento IA',
                            date: command.date || new Date().toISOString().split('T')[0],
                            time: command.time || '12:00',
                            type: 'ai_scheduled'
                        };
                        state.calendarEvents.push(newEvent);
                        logActivity(`IA agendó: ${newEvent.title}`, 'calendar');
                        await saveState();

                        // Notificación en el chat
                        displayMessage = displayMessage.replace(match[0], `\n📅 **Evento agendado:** ${newEvent.title} para el ${newEvent.date}`);

                        // Actualizar UI si estamos en la vista de calendario
                        if (state.currentView === 'nav-calendar') {
                            renderView('nav-calendar');
                        }
                    }

                    if (command.action === 'delete_event') {
                        const eventId = parseInt(command.id);
                        const event = state.calendarEvents.find(e => e.id === eventId);
                        if (event) {
                            const eventTitle = event.title;
                            state.calendarEvents = state.calendarEvents.filter(e => e.id !== eventId);
                            logActivity(`IA eliminó evento: ${eventTitle}`, 'calendar-x');
                            await saveState();
                            displayMessage = displayMessage.replace(match[0], `\n✅ **Evento eliminado:** ${eventTitle}`);
                            if (state.currentView === 'nav-calendar') {
                                renderView('nav-calendar');
                            }
                        }
                    }

                    if (command.action === 'add_task') {
                        const newTask = {
                            id: Date.now(),
                            text: command.text || 'Nueva tarea',
                            completed: false
                        };
                        state.tasks.push(newTask);
                        logActivity(`IA anotó tarea: ${newTask.text}`, 'list');
                        await saveState();

                        // Notificación en el chat
                        displayMessage = displayMessage.replace(match[0], `\n📝 **Tarea anotada:** ${newTask.text}`);

                        // Actualizar UI si estamos en el dashboard
                        const taskList = document.querySelector('.task-list');
                        if (taskList) renderView('nav-dashboard');
                    }
                } catch (err) {
                    console.error("Error al procesar comando de IA:", err);
                }
            }

            // Limpieza final de posibles bloques JSON sueltos o duplicados
            displayMessage = displayMessage.replace(/```json[\s\S]*?```/g, '').trim();

            appendMessage('system', displayMessage);

        } catch (e) {
            console.error(e);
            appendMessage('system', "Error de conexión con la IA.");
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            btn.click();
        }
    });
}

function appendMessage(role, text, isHtml = false) {
    const chatDisplay = document.getElementById('concierge-messages');
    if (!chatDisplay) return;
    const div = document.createElement('div');
    div.className = `message ${role}`;

    // Formatear negritas de Markdown a HTML si viene texto plano
    let formattedText = text;
    if (!isHtml) {
        formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    if (isHtml || formattedText.includes('<strong>')) {
        div.innerHTML = formattedText.replace(/\n/g, '<br>');
    } else {
        div.textContent = text;
    }

    // Agregar botón de copiar si es un mensaje del sistema largo (presupuesto/whatsapp)
    if (role === 'system' && (text.includes('PRESUPUESTO') || text.includes('Hola'))) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i data-lucide="copy"></i> Copiar';
        copyBtn.style.cssText = 'display:block; margin-top:10px; font-size:0.7rem; padding:4px 8px; background:rgba(255,255,255,0.1); border:none; border-radius:4px; color:white; cursor:pointer;';

        copyBtn.onclick = () => {
            navigator.clipboard.writeText(text).then(() => {
                copyBtn.innerHTML = '<i data-lucide="check"></i> Copiado';
                setTimeout(() => copyBtn.innerHTML = '<i data-lucide="copy"></i> Copiar', 2000);
            });
        };
        div.appendChild(copyBtn);
    }

    chatDisplay.appendChild(div);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
}

// --- LOGICA DEL CALENDARIO ---

function renderCalendar(container) {
    container.innerHTML = `
        <div class="calendar-controls" style="display:flex; gap:10px; align-items:center; margin-bottom:15px; justify-content: flex-end;">
            <button id="view-week" class="btn-secondary active">Semana</button>
            <button id="view-month" class="btn-secondary">Mes</button>
            <button id="add-event-btn" class="btn-primary" style="margin-left:15px;"><i data-lucide="plus"></i> Agendar</button>
        </div>

        <section class="calendar-container" style="background:var(--bg-card); padding:20px; border-radius:12px; height:calc(100vh - 180px); display:flex; flex-direction:column;">
            <div class="calendar-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 id="calendar-title" style="margin:0; font-size:1.5rem;">Enero 2026</h2>
                <div class="nav-arrows">
                    <button id="prev-period" class="icon-btn"><i data-lucide="chevron-left"></i></button>
                    <button id="today-btn" class="btn-text">Hoy</button>
                    <button id="next-period" class="icon-btn"><i data-lucide="chevron-right"></i></button>
                </div>
            </div>
            
            <div id="calendar-grid" class="calendar-grid">
                <!-- Se inyecta dinámicamente -->
            </div>
        </section>

        <!-- EVENT MODAL -->
        <div id="event-modal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:9999; justify-content:center; align-items:center;">
            <div class="modal-content" style="background:#1e293b; padding:30px; border-radius:16px; width:90%; max-width:450px; border: 1px solid #334155; color: white;">
                <h2 style="margin-bottom:20px; color:#f8fafc;">Nuevo Evento</h2>
                
                <input type="text" id="event-title" placeholder="Título del evento" style="width:100%; padding:12px; margin-bottom:15px; border-radius:8px; background:#0f172a; border:1px solid #475569; color:white;">
                
                <div style="display:flex; gap:10px; margin-bottom:15px;">
                    <input type="date" id="event-date" style="flex:1; padding:12px; border-radius:8px; background:#0f172a; border:1px solid #475569; color:white;">
                    <input type="time" id="event-time" style="flex:1; padding:12px; border-radius:8px; background:#0f172a; border:1px solid #475569; color:white;">
                </div>

                <select id="event-lead" style="width:100%; padding:12px; margin-bottom:20px; border-radius:8px; background:#0f172a; border:1px solid #475569; color:white;">
                    <option value="">-- Vincular a Prospecto (Opcional) --</option>
                    ${state.leads.map(l => `<option value="${l.id}">${l.name}</option>`).join('')}
                </select>

                <div style="display:flex; justify-content:flex-end; gap:10px;">
                    <button id="cancel-event" class="btn-secondary" style="background:transparent; border:1px solid #475569; color:#cbd5e1;">Cancelar</button>
                    <button id="save-event" class="btn-primary" style="background:#3b82f6; color:white; border:none;">Guardar</button>
                </div>
            </div>
        </div>
    `;
}

function setupCalendar() {
    let currentDate = new Date();
    let currentView = 'week'; // 'week' or 'month'

    const grid = document.getElementById('calendar-grid');
    const title = document.getElementById('calendar-title');
    const btnWeek = document.getElementById('view-week');
    const btnMonth = document.getElementById('view-month');

    // Modal controls
    const modal = document.getElementById('event-modal');
    const addBtn = document.getElementById('add-event-btn');
    const saveBtn = document.getElementById('save-event');
    const cancelBtn = document.getElementById('cancel-event');

    // Inicializar estilos del grid
    grid.style.flex = '1';
    grid.style.overflowY = 'auto';

    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    function renderMonth() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        title.textContent = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(currentDate);

        // Estilo de Grid Mensual
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
        grid.style.gridTemplateRows = 'auto repeat(5, 1fr)'; // Header + 5 semanas
        grid.style.gap = '1px';
        grid.style.background = '#334155'; // Color de las líneas
        grid.style.marginTop = '10px';

        const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        let html = days.map(d => `<div style="background:var(--bg-card); padding:10px; text-align:center; font-weight:bold; color:var(--text-secondary);">${d}</div>`).join('');

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        // Padding days
        for (let i = 0; i < startingDay; i++) {
            html += `<div style="background:var(--bg-card);"></div>`;
        }

        // Real days
        for (let i = 1; i <= totalDays; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const isToday = dateStr === formatDate(new Date());
            const daysEvents = state.calendarEvents.filter(e => e.date === dateStr);

            html += `
                <div style="background:var(--bg-card); padding:10px; min-height:80px; position:relative; ${isToday ? 'background:#1e293b;' : ''}">
                    <span style="font-weight:bold; ${isToday ? 'color:var(--accent-primary);' : ''}">${i}</span>
                    <div style="margin-top:5px; display:flex; flex-direction:column; gap:2px;">
                        ${daysEvents.map(e => `
                            <div style="font-size:0.7em; background:${e.leadId ? '#3b82f6' : '#64748b'}; color:white; padding:2px 4px; border-radius:4px; overflow:hidden; white-space:nowrap;">
                                ${e.time} ${e.title}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        grid.innerHTML = html;
    }

    function renderWeek() {
        // Encontrar inicio de la semana (Domingo)
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        title.textContent = `${startOfWeek.getDate()} - ${new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(endOfWeek)}`;

        // Estilo Flexible para semana (Columnas)
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = '80px repeat(7, 1fr)'; // Hora + 7 días
        grid.style.background = 'transparent';
        grid.style.gap = '0';
        grid.style.overflow = 'auto';

        let html = '<div style="background:var(--bg-card);"></div>'; // Esquina vacía

        // Cabeceras de días
        const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        for (let i = 0; i < 7; i++) {
            const dayDate = new Date(startOfWeek);
            dayDate.setDate(startOfWeek.getDate() + i);
            const isToday = formatDate(dayDate) === formatDate(new Date());

            html += `
                <div style="background:${isToday ? '#1e293b' : 'var(--bg-card)'}; border-bottom:1px solid #334155; border-right:1px solid #334155; padding:10px; text-align:center;">
                    <div style="color:var(--text-secondary); font-size:0.8em;">${days[i]}</div>
                    <div style="font-weight:bold; font-size:1.2em; ${isToday ? 'color:var(--accent-primary);' : ''}">${dayDate.getDate()}</div>
                </div>
            `;
        }

        // Filas por hora (8am - 8pm)
        for (let h = 8; h <= 20; h++) {
            const timeLabel = `${h}:00`;
            html += `<div style="padding:10px; text-align:right; font-size:0.8em; color:gray; border-bottom:1px solid #334155; border-right:1px solid #334155;">${timeLabel}</div>`;

            for (let d = 0; d < 7; d++) {
                const dayDate = new Date(startOfWeek);
                dayDate.setDate(startOfWeek.getDate() + d);
                const dateStr = formatDate(dayDate);

                // Buscar eventos en esta hora
                const hourEvents = state.calendarEvents.filter(e => e.date === dateStr && parseInt(e.time.split(':')[0]) === h);

                html += `
                    <div style="min-height:50px; border-bottom:1px solid #334155; border-right:1px solid #334155; position:relative; padding:2px;">
                         ${hourEvents.map(e => `
                            <div style="background:${e.leadId ? 'rgba(59, 130, 246, 0.8)' : 'rgba(100, 116, 139, 0.8)'}; color:white; font-size:0.7em; padding:4px; border-radius:4px; border-left:3px solid ${e.leadId ? '#2563eb' : '#475569'}; margin-bottom:2px;">
                                <strong>${e.title}</strong>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        }
        grid.innerHTML = html;
    }

    const refresh = () => {
        if (currentView === 'month') renderMonth();
        else renderWeek();
    };

    // Listeners
    btnMonth.addEventListener('click', () => {
        currentView = 'month';
        btnWeek.classList.remove('active');
        btnMonth.classList.add('active');
        refresh();
    });

    btnWeek.addEventListener('click', () => {
        currentView = 'week';
        btnMonth.classList.remove('active');
        btnWeek.classList.add('active');
        refresh();
    });

    document.getElementById('prev-period').addEventListener('click', () => {
        if (currentView === 'month') currentDate.setMonth(currentDate.getMonth() - 1);
        else currentDate.setDate(currentDate.getDate() - 7);
        refresh();
    });

    document.getElementById('next-period').addEventListener('click', () => {
        if (currentView === 'month') currentDate.setMonth(currentDate.getMonth() + 1);
        else currentDate.setDate(currentDate.getDate() + 7);
        refresh();
    });

    document.getElementById('today-btn').addEventListener('click', () => {
        currentDate = new Date();
        refresh();
    });

    // Modal Logic
    addBtn.onclick = () => {
        document.getElementById('event-date').value = formatDate(new Date());
        document.getElementById('event-time').value = '09:00';
        modal.style.display = 'flex';
    };

    cancelBtn.onclick = () => modal.style.display = 'none';

    saveBtn.onclick = () => {
        const titleVal = document.getElementById('event-title').value;
        const dateVal = document.getElementById('event-date').value;
        const timeVal = document.getElementById('event-time').value;
        const leadVal = document.getElementById('event-lead').value;

        if (!titleVal || !dateVal) return alert("Título y fecha requeridos");

        const newEvent = {
            id: Date.now(),
            title: titleVal,
            date: dateVal,
            time: timeVal,
            leadId: leadVal ? parseInt(leadVal) : null,
            type: 'generic'
        };
        state.calendarEvents.push(newEvent);
        logActivity(`Nuevo evento: ${titleVal}`, 'calendar');

        modal.style.display = 'none';
        saveState();
        refresh();
    };

    // Render inicial
    refresh();
}

function renderSettings(container) {
    container.innerHTML = `
        <section class="settings-container" style="max-width: 800px; padding-top: 20px;">
            <div class="card settings-card">
                <div class="card-header">
                    <h3><i data-lucide="database"></i> Gestión de Datos (Backup)</h3>
                </div>
                <p style="color: var(--text-dim); margin-bottom: 20px; font-size: 0.9rem;">
                    Tus datos están protegidos en la nube de Supabase. Puedes descargar un respaldo manual si deseas
                    conservar una copia offline.
                </p>
                
                <div class="settings-actions" style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <button id="btn-export" class="btn-primary">
                        <i data-lucide="download"></i> Descargar Respaldo (JSON)
                    </button>
                    
                    <div style="position: relative;">
                         <input type="file" id="file-import" accept=".json" style="display: none;">
                         <button id="btn-import" class="btn-secondary" style="border: 1px solid var(--border-color); color: var(--text-main); background: var(--card-bg); padding: 12px 24px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 600;">
                            <i data-lucide="upload"></i> Restaurar Respaldo
                         </button>
                    </div>

                    <button id="btn-reset" class="btn-danger" style="margin-left: auto;">
                        <i data-lucide="trash"></i> Reset Fabric
                    </button>
                </div>
            </div>

            <div class="card settings-card" style="margin-top: 24px;">
                 <div class="card-header">
                    <h3><i data-lucide="info"></i> Información del Sistema</h3>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 0.9rem;">
                    <div><strong>Versión:</strong> 2.5.5 (Cloud Ready)</div>
                    <div><strong>Almacenamiento:</strong> Supabase Cloud</div>
                    <div><strong>Estado Sync:</strong> <span style="color: #4ade80;">● Sincronizado</span></div>
                </div>
            </div>
        </section>
    `;
}

function setupSettings() {
    const btnExport = document.getElementById('btn-export');
    const btnImport = document.getElementById('btn-import');
    const fileImport = document.getElementById('file-import');
    const btnReset = document.getElementById('btn-reset');

    if (btnExport) {
        btnExport.onclick = () => {
            const dataStr = localStorage.getItem('ninja_state');
            if (!dataStr) return alert("No hay datos para exportar.");

            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

            const exportFileDefaultName = `d9-backup-${new Date().toISOString().slice(0, 10)}.json`;

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();

            logActivity("Respaldo descargado", "download");
        };
    }

    if (btnImport && fileImport) {
        btnImport.onclick = () => fileImport.click();

        fileImport.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const obj = JSON.parse(event.target.result);
                    // Basic validation
                    if (!obj.leads && !obj.tasks) throw new Error("Formato inválido");

                    localStorage.setItem('ninja_state', JSON.stringify(obj));
                    alert("¡Datos restaurados con éxito! La página se recargará.");
                    location.reload();
                } catch (err) {
                    alert("Error al leer el archivo: " + err.message);
                }
            };
            reader.readAsText(file);
        };
    }

    if (btnReset) {
        btnReset.onclick = () => {
            if (confirm("¿Estás seguro? Esto borrará TODOS tus datos y restaurará el estado de fábrica.")) {
                localStorage.removeItem('ninja_state');
                location.reload();
            }
        };
    }
}
