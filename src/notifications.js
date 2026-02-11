import { state, saveState, logActivity } from './state.js';

export async function requestNotificationPermission() {
    if (!("Notification" in window)) {
        alert("Este navegador no soporta notificaciones de escritorio");
        return false;
    }

    let permission = await Notification.requestPermission();
    state.notificationPermission = permission === 'granted';
    saveState();

    if (permission === 'granted') {
        new Notification("D9 Marketing", {
            body: "Notificaciones activadas correctamente 🚀",
            icon: "/vite.svg" // Placeholder icon
        });
    }

    return permission === 'granted';
}

export function checkUpcomingEvents() {
    if (Notification.permission !== 'granted' || !state.notificationPermission) return;

    const now = new Date();
    state.calendarEvents.forEach(event => {
        const eventDate = new Date(`${event.date}T${event.time}`);
        const diffMs = eventDate - now;
        const diffMinutes = Math.floor(diffMs / 60000);

        // Initialize notification tracking object if missing
        if (!state.notifiedEvents) state.notifiedEvents = {};
        if (!state.notifiedEvents[event.id]) state.notifiedEvents[event.id] = {};

        // 15 Minutes Warning
        if (diffMinutes <= 15 && diffMinutes > 10 && !state.notifiedEvents[event.id].notified15) {
            sendNotification(`📅 En 15 min: ${event.title}`, {
                body: `Hora: ${event.time}`,
                tag: `event-15-${event.id}`
            });
            state.notifiedEvents[event.id].notified15 = true;
            saveState();
        }

        // 5 Minutes Urgent Warning
        if (diffMinutes <= 5 && diffMinutes > 0 && !state.notifiedEvents[event.id].notified5) {
            sendNotification(`⏰ ¡AHORA! En 5 min: ${event.title}`, {
                body: `Prepárate para ${event.title} a las ${event.time}`,
                tag: `event-5-${event.id}`,
                requireInteraction: true
            });
            state.notifiedEvents[event.id].notified5 = true;
            saveState();
        }
    });
}

function sendNotification(title, options) {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            icon: '/vite.svg', // Using default vite icon as placeholder
            badge: '/vite.svg',
            ...options
        });
        logActivity(`Notificación enviada: ${title}`, 'bell');
    }
}
