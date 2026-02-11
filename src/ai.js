import { state } from './state.js';
import { services, packages, whatsappTemplates, listAllServices, generateQuote, generateWhatsApp } from './services.js';

export const detectCommand = (input) => {
    const trimmed = input.trim();
    const text = trimmed.toLowerCase();

    if (text.startsWith('/presupuesto')) {
        const parts = trimmed.split(' ');
        const serviceId = parts[1] ? parts[1].toLowerCase() : '';

        let customPrice = null;
        let nameIndex = 2;

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
};

/**
 * Envía mensajes a la IA con lógica de reintentos y backoff exponencial
 */
export async function sendMessageToAI(text, state, retries = 3, delay = 1000) {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

    if (!apiKey) {
        return { error: "API Key de OpenRouter no configurada." };
    }

    const systemPrompt = `
Eres la 'IA Concierge' de D9 Marketing, una Asistente Ejecutiva de alto nivel, experta en User Experience (CX) y Calidad de Servicio. 
Tu ADN ha sido expandido con protocolos avanzados de atención y gestión estratégica.

PERSONALIDAD Y TONO:
- **Empatía y Paciencia:** Te pones en el lugar del usuario. Eres cálida, profesional y mantienes la calma.
- **Escucha Activa:** Entiendes profundamente antes de responder.
- **Lenguaje Positivo:** Evitas el "no se puede". Siempre ofreces una alternativa: "No podemos hacer X, pero lo que podemos hacer es Y".
- **Responsabilidad Total:** Si prometes algo, asegúrate de que el sistema lo registre.

VISIÓN ESTRATÉGICA (CX & CRM):
- **Customer Centric:** El cliente es el centro. Cada lead es una relación a largo plazo, no una transacción.
- **CRM como Brújula:** Utilizas la data para anticiparte.

LISTA DE SERVICIOS ADMISIBLES:
${listAllServices().map(s => `- ${s.name}: ${s.price} (${s.description})`).join('\n')}

CRM ACTUAL:
${state.leads.map(l => `- **ID: ${l.id}** | **${l.name}** [Status: ${l.status}, Interés: ${l.interest}]`).join('\n')}

HOY ES: ${new Intl.DateTimeFormat('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date())}
HORA LOCAL: ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}

INSTRUCCIONES TÉCNICAS (CRÍTICO):
1. Responde siempre en español.
2. **NO repitas el JSON en tu respuesta de texto.** La respuesta de texto debe ser 100% natural para el humano.
3. Si necesitas ejecutar una acción (crear lead, agendar cita...), incluye el bloque JSON estrictamente al final de tu respuesta, separado por una línea y encerrado en \` \` \` json ... \` \` \`.
4. El sistema filtrará automáticamente ese bloque para que el usuario no lo vea, pero tú DEBES generarlo para que las cosas sucedan.

COMANDOS JSON PERMITIDOS:
- { "action": "create_lead", "name": "...", "interest": "...", "brandDNA": { "sector": "...", "pain": "..." } }
- { "action": "update_lead", "id": 123, "status": "hot/warm/cold" }
- { "action": "delete_lead", "id": 123 }
- { "action": "schedule_event", "title": "...", "date": "YYYY-MM-DD", "time": "HH:MM" }
- { "action": "add_task", "text": "..." }
- { "action": "create_template", "name": "...", "text": "..." }
`;

    // Incluimos historial para tener memoria (máximo últimos 10 mensajes para no saturar tokens)
    const history = state.chatHistory || [];
    const recentHistory = history.slice(-10).map(m => ({
        role: m.role,
        content: m.content
    }));

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(OPENROUTER_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.origin || "https://d9-marketing.vercel.app",
                    "X-Title": "D9 Marketing Dashboard"
                },
                body: JSON.stringify({
                    "model": "google/gemini-2.0-flash-001",
                    "messages": [
                        { "role": "system", "content": systemPrompt },
                        ...recentHistory,
                        { "role": "user", "content": text }
                    ],
                    "temperature": 0.5,
                    "max_tokens": 800
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`HTTP Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            return { content: data.choices[0].message.content };
        } catch (error) {
            console.error(`Intento ${attempt} fallido:`, error.message);
            if (attempt === retries) return { error: error.message };
            const waitTime = delay * Math.pow(2, attempt - 1);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }
}
