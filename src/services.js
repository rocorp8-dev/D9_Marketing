// ============================================
// I.A. KNOWLEDGE BASE (SERVICES & TEMPLATES)
// ============================================

export const services = {
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
};

export const packages = {
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
};

export const budgetTemplates = {
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
};

export const whatsappTemplates = {
    seguimiento: (clientName) => `Hola ${clientName}, espero que estés muy bien. 👋\n\nQuería confirmar si tuviste oportunidad de revisar el presupuesto que te envié. Me encantaría saber tus comentarios o si tienes alguna duda puntual.\n\nQuedo atenta, ¡saludos!`,
    vencimiento: (clientName) => `Hola ${clientName}, un gusto saludarte.\n\nTe comento que la validez de nuestra cotización está por vencer (los precios pueden variar después de 15 días). ¿Te gustaría que formalicemos para congelar el precio actual? 🧊\n\nAvísame cualquier cosa.`,
    cierre: (clientName) => `Hola ${clientName}, ¿cómo va tu semana?\n\nEstoy organizando la agenda de inicios de proyecto para este mes y me gustaría reservar tu espacio. ¿Te parece si procedemos con el anticipo para arrancar? 🚀`,
    reunion: (clientName) => `Hola ${clientName}, gracias por el tiempo de hoy.\n\nMe quedé pensando en lo que platicamos sobre [Mencionar punto clave]. Creo que tenemos una gran oportunidad ahí. Te estaré mandando la propuesta ajustada en breve.\n\n¡Seguimos!`,
    reactivacion: (clientName) => `Hola ${clientName}, hace tiempo no platicamos.\n\nEstaba revisando algunos casos de éxito recientes y me acordé de tu proyecto. Se me ocurrieron un par de ideas nuevas para [Su Sector]. ¿Tienes 5 mins esta semana para un audio rápido? 🎙️`,
    gracias: (clientName) => `¡Hola ${clientName}! 👋\n\nSolo escribía para darte las gracias por recomendarnos con [Nombre Referido]. Ya estamos en contacto. ¡Te debo una! 🙌`,
    bienvenida: (clientName) => `¡Bienvenido ${clientName}! Es oficial. 🎉\n\nEstamos muy emocionados de empezar a trabajar con tu marca. En breve te llegará un correo con los siguientes pasos para el onboarding.\n\n¡Vamos a romperla! 🚀`
};

export const companyInfo = {
    name: "D9 Marketing",
    tagline: "De Todas Formas... Diseño",
    contact: { phone: "51 654 47", address: "Constitución 213-A...", website: "www.despacho9.com.mx" },
    hours: "Lunes a Viernes de 9:00 AM a 6:00 PM",
    paymentMethods: ["Transferencia Bancaria", "Depósito en Efectivo", "PayPal"],
    policies: { advance: "50% de anticipo", validity: "15 días hábiles", iva: "Precios + IVA (16%)" }
};

export const getServiceInfo = (id) => services[id] || null;
export const listAllServices = () => Object.values(services);

export const generateQuote = (serviceQuery, clientName, duration = 1, customPrice = null) => {
    const query = serviceQuery.toLowerCase().trim();

    // 1. Buscar por ID exacto (Prioridad absoluta)
    let key = Object.keys(services).find(k => k.toLowerCase() === query);

    // 2. Si no se encuentra, buscar por nombre del servicio exacto
    if (!key) {
        key = Object.keys(services).find(k => services[k].name.toLowerCase() === query);
    }

    // 3. Fallback: buscar si el nombre contiene la palabra (pero con precaución)
    if (!key) {
        key = Object.keys(services).find(k => services[k].name.toLowerCase().includes(query));
    }

    if (key) {
        if (key === 'metaAds') return budgetTemplates.metaAds(clientName, duration, customPrice)
        return budgetTemplates.generic(clientName, key, duration, customPrice)
    }

    // 4. Buscar en paquetes por ID o nombre
    let pkgKey = Object.keys(packages).find(k => k.toLowerCase() === query);
    if (!pkgKey) {
        pkgKey = Object.keys(packages).find(k => packages[k].name.toLowerCase().includes(query));
    }

    if (pkgKey) return budgetTemplates.package(clientName, pkgKey);

    return "Servicio no encontrado.";
};

export const generateWhatsApp = (type, clientName, dynamicTemplates = []) => {
    const tId = type.toLowerCase();

    // 1. Buscar en plantillas estáticas
    const key = Object.keys(whatsappTemplates).find(k => k.toLowerCase() === tId);
    if (key) {
        return whatsappTemplates[key](clientName);
    }

    // 2. Buscar en plantillas dinámicas (IA)
    if (dynamicTemplates) {
        const dynamicTemplate = dynamicTemplates.find(t => t.name.toLowerCase() === tId);
        if (dynamicTemplate) {
            let message = dynamicTemplate.text;
            message = message.replace(/{nombre}/gi, clientName);
            message = message.replace(/\[nombre\]/gi, clientName);
            message = message.replace(/\${clientName}/gi, clientName);
            return message;
        }
    }

    return "Plantilla no encontrada. Prueba con: " + Object.keys(whatsappTemplates).join(', ');
};
