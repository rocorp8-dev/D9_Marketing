import { syncToCloud, loadFromCloud } from '../supabase.js';

// Estado Global con Persistencia
export const state = {
    currentView: 'dashboard',
    timeLeft: 3 * 60 * 60,
    leads: [],
    calendarEvents: [],
    tasks: [],
    strategies: [],
    history: [],
    whatsappTemplates: [],
    theme: 'light', // 'light' or 'dark'
    notificationPermission: false,
    notifiedEvents: {}, // {eventId: {notified15: bool, notified5: bool}}
    chatHistory: [] // Conversación con la IA
};

// Cargar estado inicial
export async function loadState() {
    try {
        const cloudState = await loadFromCloud();
        const localSaved = localStorage.getItem('ninja_state');

        let localData = localSaved ? JSON.parse(localSaved) : null;
        let finalData = null;

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
            if (!cloudHasData) syncToCloud(localData);
        }

        if (finalData) {
            console.log("Datos encontrados:", {
                leads: finalData.leads?.length,
                tasks: finalData.tasks?.length,
                events: finalData.calendarEvents?.length
            });
            Object.assign(state, finalData);
            console.log("Estado cargado con éxito.");

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

export function cargarDefaults() {
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

export async function saveState() {
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
            strategies: state.strategies,
            history: state.history,
            timeLeft: state.timeLeft,
            whatsappTemplates: state.whatsappTemplates,
            theme: state.theme,
            notificationPermission: state.notificationPermission,
            notifiedEvents: state.notifiedEvents,
            chatHistory: state.chatHistory,
            updatedAt: new Date().toISOString()
        };
        const jsonStr = JSON.stringify(dataToSave);
        localStorage.setItem('ninja_state', jsonStr);

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

export function logActivity(text, icon = 'activity') {
    const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    state.history.unshift({ text, icon, time });
    if (state.history.length > 8) state.history.pop();
    saveState();
}
