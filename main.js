import { state, loadState, saveState } from './src/state.js';
import { renderHeaderRight, setupMobileMenu, initNavigation, renderView, setupConcierge, appendMessage } from './src/ui.js';
import { detectCommand, sendMessageToAI } from './src/ai.js';
import { generateQuote, generateWhatsApp, listAllServices, packages } from './src/services.js';
import { checkUpcomingEvents, requestNotificationPermission } from './src/notifications.js';

// ============================================
// MAIN INITIALIZATION
// ============================================

function setupGlobalTimer() {
    setInterval(() => {
        const timerDisplay = document.getElementById('session-timer');
        const clockDisplay = document.getElementById('real-clock');

        // Reloj Real
        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
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
            if (state.timeLeft % 10 === 0) {
                saveState();
            }
        }

        // Check for notifications every minute
        if (new Date().getSeconds() === 0) {
            checkUpcomingEvents();
        }
    }, 1000);
}

// Global initialization
document.addEventListener('DOMContentLoaded', async () => {
    // Inject dynamic header parts
    const headerRight = document.querySelector('.header-right');
    if (headerRight) headerRight.innerHTML = renderHeaderRight();

    await loadState();
    initNavigation();
    setupMobileMenu();
    setupGlobalTimer();

    // Reset Timer on Click
    const timerBadge = document.querySelector('.timer-badge');
    if (timerBadge) {
        timerBadge.style.cursor = 'pointer';
        timerBadge.title = 'Click para reiniciar ciclo de 3h';
        timerBadge.onclick = () => {
            state.timeLeft = 3 * 60 * 60;
            saveState();
            logActivity('Ciclo de potencia reiniciado (3h)', 'hourglass');
            const timerDisplay = document.getElementById('session-timer');
            if (timerDisplay) timerDisplay.textContent = "03:00:00";
        };
    }

    // Initialize Theme
    initializeTheme();

    // Setup Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.onclick = toggleTheme;
    }

    // Concierge interaction is handled in ui.js setupConcierge or here
    // Let's call the setup from ui.js
    setupConcierge();

    // Restore last view
    const savedView = state.currentView || 'nav-dashboard';
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const activeLink = document.getElementById(savedView);
    if (activeLink) activeLink.classList.add('active');

    renderView(savedView);
});

// ============================================
// THEME LOGIC
// ============================================

function initializeTheme() {
    // 1. Check state
    let theme = state.theme;

    // 2. If no state, check system preference
    if (!theme) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            theme = 'dark';
        } else {
            theme = 'light';
        }
        state.theme = theme;
    }

    // 3. Apply theme
    document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    state.theme = newTheme;
    saveState();
}

// Re-exporting for debugging or legacy window access if needed
window.D9_STATE = state;
window.toggleTheme = toggleTheme; // Make it available globally if needed for inline onclicks, though we attached it via ID
