
// ============================================
// SERVICIOS D9 MARKETING
// ============================================

export const services = {
    metaAds: {
        id: 'metaAds',
        name: 'Campaña Publicitaria Meta Ads',
        description: 'Estructura, diseño, lanzamiento y optimización de campañas publicitarias en Facebook e Instagram Ads.',
        price: 'Desde $3,500 MXN / mes',
        priceBase: 3500, // Precio base numérico para cálculos
        billingCycle: 'mensual',
        includes: [
            'Estrategia Publicitaria Personalizada',
            'Segmentación de Audiencias Avanzada',
            'Diseño de Creativos (Imágenes/Videos)',
            'Redacción de Textos Persuasivos (Copywriting)',
            'Configuración de Pixel y Eventos',
            'Reporte de Resultados Mensual'
        ],
        notIncludes: [
            'Inversión publicitaria (pagada directamente a Meta)',
            'Gestión de comentarios (Community Management)'
        ]
    },
    googleAds: {
        id: 'googleAds',
        name: 'Google Ads (SEM)',
        description: 'Campañas de búsqueda y display en Google para captar clientes con alta intención de compra.',
        price: 'Desde $4,000 MXN / mes',
        priceBase: 4000,
        billingCycle: 'mensual',
        includes: [
            'Investigación de Palabras Clave',
            'Configuración de Campañas de Búsqueda',
            'Redacción de Anuncios',
            'Optimización de Presupuesto',
            'Reporte de Rendimiento'
        ],
        notIncludes: [
            'Inversión publicitaria (pagada a Google)',
            'Diseño de Landing Page (se cotiza aparte)'
        ]
    },
    consultoria: {
        id: 'consultoria',
        name: 'Consultoría Estratégica',
        description: 'Sesiones 1 a 1 para analizar tu negocio y definir una hoja de ruta digital clara.',
        price: '$1,500 MXN / hora',
        priceBase: 1500,
        billingCycle: 'pago unico',
        includes: [
            'Análisis de Situación Actual',
            'Definición de Objetivos',
            'Estrategia de Canales',
            'Auditoría de Redes Sociales',
            'Grabación de la Sesión'
        ],
        notIncludes: [
            'Implementación de la estrategia',
            'Herramientas de pago'
        ]
    },
    seo: {
        id: 'seo',
        name: 'Posicionamiento SEO',
        description: 'Optimización de tu sitio web para aparecer orgánicamente en los primeros lugares de Google.',
        price: 'Desde $5,000 MXN / mes',
        priceBase: 5000,
        billingCycle: 'mensual',
        includes: [
            'Auditoría Técnica SEO',
            'Optimización On-Page',
            'Estrategia de Contenidos (Blog)',
            'Link Building Básico',
            'Reporte de Posicionamiento'
        ],
        notIncludes: [
            'Rediseño completo del sitio web',
            'Costos de hosting/dominio'
        ]
    },
    socialMedia: {
        id: 'socialMedia',
        name: 'Gestión de Redes Sociales',
        description: 'Creación de contenido, programación y gestión de comunidad para mantener tus redes activas.',
        price: 'Desde $4,500 MXN / mes',
        priceBase: 4500,
        billingCycle: 'mensual',
        includes: [
            'Planificación de Contenidos (12 posts/mes)',
            'Diseño Gráfico y Edición de Video simple',
            'Redacción de Copies',
            'Publicación Programada',
            'Respuesta a Comentarios (L-V)'
        ],
        notIncludes: [
            'Inversión publicitaria',
            'Sesiones de fotos presenciales'
        ]
    },
    webDesign: {
        id: 'webDesign',
        name: 'Diseño Web Profesional',
        description: 'Sitios web modernos, rápidos y optimizados para ventas.',
        price: 'Desde $8,000 MXN',
        priceBase: 8000,
        billingCycle: 'pago unico',
        includes: [
            'Diseño UX/UI Personalizado',
            'Desarrollo en WordPress o Código',
            'Optimización Móvil (Responsive)',
            'Integración con WhatsApp/CRM',
            'SEO Básico'
        ],
        notIncludes: [
            'Hosting y Dominio (Anual)',
            'Mantenimiento mensual'
        ]
    },
    emailMarketing: {
        id: 'emailMarketing',
        name: 'Email Marketing',
        description: 'Campañas de correo para nutrir leads y fidelizar clientes.',
        price: 'Desde $2,500 MXN / mes',
        priceBase: 2500,
        billingCycle: 'mensual',
        includes: [
            'Estrategia de Secuencias',
            'Diseño de Plantillas',
            'Redacción de Correos',
            'Segmentación de Base de Datos',
            'Reporte de Aperturas y Clics'
        ],
        notIncludes: [
            'Costo de plataforma de envíos (Mailchimp, etc.)'
        ]
    },
    branding: {
        id: 'branding',
        name: 'Identidad Visual (Branding)',
        description: 'Creación de logotipos y manuales de identidad visual para marcas memorables.',
        price: 'Desde $6,000 MXN',
        priceBase: 6000,
        billingCycle: 'pago unico',
        includes: [
            'Diseño de Logotipo (3 propuestas)',
            'Paleta de Colores y Tipografía',
            'Manual de Uso de Marca',
            'Archivos Editables (AI, PDF, PNG)',
            'Diseño de Tarjeta de Presentación'
        ],
        notIncludes: [
            'Impresión de materiales'
        ]
    }
}

// ============================================
// PAQUETES
// ============================================

export const packages = {
    starter: {
        id: 'starter',
        name: 'Paquete Emprendedor',
        services: ['socialMedia', 'metaAds'],
        price: '$7,200 MXN / mes',
        discount: '10%',
        savings: '$800 MXN',
        description: 'Ideal para negocios que inician y buscan visibilidad inmediata.'
    },
    growth: {
        id: 'growth',
        name: 'Paquete Crecimiento',
        services: ['socialMedia', 'metaAds', 'emailMarketing'],
        price: '$9,450 MXN / mes',
        discount: '15%',
        savings: '$1,050 MXN',
        description: 'Para empresas que quieren escalar y diversificar canales.'
    },
    premium: {
        id: 'premium',
        name: 'Paquete Dominio Total',
        services: ['socialMedia', 'metaAds', 'googleAds', 'seo'],
        price: '$15,300 MXN / mes',
        discount: '20%',
        savings: '$1,700 MXN',
        description: 'Estrategia 360 para liderar el mercado.'
    }
}

// ============================================
// TEMPLATES DE PRESUPUESTOS (FORMATO D9)
// ============================================

export const budgetTemplates = {
    // Template principal que coincide con el formato de D9
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

    // Template para servicios de marketing digital (formato adaptado)
    metaAds: (clientName, duration = 1, customPrice = null) => {
        const service = services.metaAds
        const price = customPrice || service.priceBase

        const items = [
            {
                quantity: duration,
                description: `${service.name}\n${service.description}\n\nIncluye:\n${service.includes.map(i => `• ${i}`).join('\n')}`,
                unitPrice: price
            }
        ]

        return budgetTemplates.standard(clientName, items)
    },

    // Template genérico para cualquier servicio
    generic: (clientName, serviceId, duration = 1, customPrice = null) => {
        const service = services[serviceId]
        if (!service) return 'Servicio no encontrado'

        const price = customPrice || service.priceBase

        const items = [
            {
                quantity: duration,
                description: `${service.name}\n${service.description}\n\nIncluye:\n${service.includes.map(i => `• ${i}`).join('\n')}`,
                unitPrice: price
            }
        ]

        return budgetTemplates.standard(clientName, items)
    },

    // Template para paquetes
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

        // Agregar descuento como item
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

// ============================================
// TEMPLATES WHATSAPP
// ============================================

export const whatsappTemplates = {
    // 1. Seguimiento post-cotización (Neutro)
    followUpQuote: (clientName) =>
        `Hola ${clientName}, espero que estés muy bien. 👋\n\nQuería confirmar si tuviste oportunidad de revisar el presupuesto que te envié. Me encantaría saber tus comentarios o si tienes alguna duda puntual.\n\nQuedo atenta, ¡saludos!`,

    // 2. Recordatorio de vencimiento (Urgencia suave)
    quoteExpiration: (clientName) =>
        `Hola ${clientName}, un gusto saludarte.\n\nTe comento que la validez de nuestra cotización está por vencer (los precios pueden variar después de 15 días). ¿Te gustaría que formalicemos para congelar el precio actual? 🧊\n\nAvísame cualquier cosa.`,

    // 3. Cierre de venta (Asertivo)
    closingSale: (clientName) =>
        `Hola ${clientName}, ¿cómo va tu semana?\n\nEstoy organizando la agenda de inicios de proyecto para este mes y me gustaría reservar tu espacio. ¿Te parece si procedemos con el anticipo para arrancar? 🚀`,

    // 4. Seguimiento post-reunión
    postMeeting: (clientName) =>
        `Hola ${clientName}, gracias por el tiempo de hoy.\n\nMe quedé pensando en lo que platicamos sobre [Mencionar punto clave]. Creo que tenemos una gran oportunidad ahí. Te estaré mandando la propuesta ajustada en breve.\n\n¡Seguimos!`,

    // 5. Reactivación de cliente inactivo
    reactivation: (clientName) =>
        `Hola ${clientName}, hace tiempo no platicamos.\n\nEstaba revisando algunos casos de éxito recientes y me acordé de tu proyecto. Se me ocurrieron un par de ideas nuevas para [Su Sector]. ¿Tienes 5 mins esta semana para un audio rápido? 🎙️`,

    // 6. Agradecimiento por referido
    referralThanks: (clientName) =>
        `¡Hola ${clientName}! 👋\n\nSolo escribía para darte las gracias por recomendarnos con [Nombre Referido]. Ya estamos en contacto. ¡Te debo una! 🙌`,

    // 7. Bienvenida Nuevo Cliente
    welcome: (clientName) =>
        `¡Bienvenido ${clientName]! Es oficial. 🎉\n\nEstamos muy emocionados de empezar a trabajar con tu marca.En breve te llegará un correo con los siguientes pasos para el onboarding.\n\n¡Vamos a romperla! 🚀`
}

// ============================================
// INFO EMPRESA
// ============================================

export const companyInfo = {
    name: "D9 Marketing",
    tagline: "De Todas Formas... Diseño",
    contact: {
        phone: "51 654 47",
        address: "Constitución 213-A, Centro Histórico, Oaxaca de Juárez, Oax.",
        website: "www.despacho9.com.mx" // Aunque el usuario dijo que ya no lo tiene, se incluye para referencia interna o footer si es necesario
    },
    hours: "Lunes a Viernes de 9:00 AM a 6:00 PM",
    paymentMethods: ["Transferencia Bancaria", "Depósito en Efectivo", "PayPal"],
    policies: {
        advance: "50% de anticipo requerido",
        validity: "15 días hábiles",
        iva: "Precios + IVA (16%)"
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getServiceInfo = (id) => services[id] || null

export const listAllServices = () => Object.values(services)

export const generateQuote = (serviceId, clientName, duration = 1) => {
    if (services[serviceId]) {
        if (serviceId === 'metaAds') return budgetTemplates.metaAds(clientName, duration)
        return budgetTemplates.generic(clientName, serviceId, duration)
    }
    // Check packages
    if (packages[serviceId]) {
        return budgetTemplates.package(clientName, serviceId)
    }
    return "Servicio no encontrado."
}

export const generateWhatsApp = (type, clientName) => {
    const template = whatsappTemplates[type]
    if (template) return template(clientName)
    return "Plantilla no encontrada."
}

export const detectCommand = (input) => {
    const text = input.toLowerCase().trim()
    
    // Commands
    if (text.startsWith('/presupuesto')) {
        const parts = text.split(' ')
        const serviceId = parts[1] // metaAds, seo, etc.
        // El resto es el nombre del cliente
        const clientName = parts.slice(2).join(' ') || 'Cliente'
        return { type: 'quote', serviceId, clientName }
    }
    
    if (text.startsWith('/whatsapp')) {
        const parts = text.split(' ')
        const templateType = parts[1] // followUpQuote, closingSale
        const clientName = parts.slice(2).join(' ') || 'Cliente'
        return { type: 'whatsapp', templateType, clientName }
    }
    
    if (text.startsWith('/servicios') || text.startsWith('/precios')) {
        return { type: 'services' }
    }
    
    if (text.startsWith('/paquetes')) {
        return { type: 'packages' }
    }
    
    return null
}
