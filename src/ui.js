import { state, saveState, logActivity } from './state.js';
import { services, packages, whatsappTemplates, generateQuote, generateWhatsApp, listAllServices } from './services.js';
import { detectCommand, sendMessageToAI } from './ai.js';
import { requestNotificationPermission } from './notifications.js';

export function renderHeaderRight() {
    return `
        <div class="status-group">
            <button id="theme-toggle" class="theme-toggle-btn" title="Cambiar tema">
                <i data-lucide="sun" class="theme-icon-light"></i>
                <i data-lucide="moon" class="theme-icon-dark"></i>
            </button>
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

export function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');

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

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });

    const chatFab = document.getElementById('mobile-chat-toggle');
    const conciergeSidebar = document.querySelector('.concierge-sidebar');
    const closeChatBtn = document.getElementById('close-chat-btn');

    if (chatFab) {
        chatFab.addEventListener('click', () => {
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

export function initNavigation() {
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

export function renderView(viewId) {
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

    state.currentView = viewId;
    saveState();

    if (window.lucide) window.lucide.createIcons();
}

export function renderDashboard(container) {
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

export function renderLeads(container) {
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

        let targetColumn = ev.target.closest('.kanban-column');

        if (targetColumn) {
            const newStatus = targetColumn.getAttribute('data-status');
            const leadId = parseInt(data.replace('lead-', ''));

            const leadIndex = state.leads.findIndex(l => l.id === leadId);
            if (leadIndex !== -1 && state.leads[leadIndex].status !== newStatus) {
                state.leads[leadIndex].status = newStatus;
                saveState();
                renderView('nav-leads');
            }
        }
    };
}

export function createLeadCard(lead) {
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

window.openLeadModal = (id) => {
    const event = new CustomEvent('open-lead-editor', { detail: { id } });
    document.dispatchEvent(event);
};

export function setupLeads() {
    const modal = document.getElementById('lead-modal');
    const cancelBtn = document.getElementById('cancel-lead-btn');
    const saveBtn = document.getElementById('save-lead-btn');
    const deleteBtn = document.getElementById('delete-lead-btn');

    const nameInput = document.getElementById('lead-name');
    const interestInput = document.getElementById('lead-interest');
    const contactInput = document.getElementById('lead-contact');
    const webInput = document.getElementById('lead-web');
    const sectorInput = document.getElementById('lead-sector');
    const valuesInput = document.getElementById('lead-values');
    const painInput = document.getElementById('lead-pain');
    const goalInput = document.getElementById('lead-goal');
    const targetInput = document.getElementById('lead-target');
    const solutionInput = document.getElementById('lead-solution');
    const competitorsInput = document.getElementById('lead-competitors');
    const campaignGoalInput = document.getElementById('lead-campaign-goal');
    const targetNumberInput = document.getElementById('lead-target-number');
    const adsBudgetInput = document.getElementById('lead-ads-budget');
    const assetsInput = document.getElementById('lead-assets');
    const idInput = document.getElementById('lead-id');
    const statusInput = document.getElementById('lead-status');

    if (!modal) return;

    let isConfirmingDelete = false;

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

    const openModal = (lead = null) => {
        modal.style.display = 'flex';
        tabs[0].click();
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
            brandDNA: { sector: sectorInput.value, values: valuesInput.value, pain: painInput.value, goal: goalInput.value },
            analysis: { target: targetInput.value, solution: solutionInput.value, competitors: competitorsInput.value },
            marketing: { campaignGoal: campaignGoalInput.value, targetNumber: targetNumberInput.value, adsBudget: adsBudgetInput.value, assets: assetsInput.value }
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

export function translateStatus(status) {
    const map = { 'cold': 'Frío', 'warm': 'Tibio', 'hot': 'Caliente' };
    return map[status] || status;
}

export function renderDesign(container) {
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
                    
                    <div id="technical-prompt-container" style="display: block; margin-top: 10px;">
                        <label style="font-size: 0.75rem; color: var(--accent-primary); margin-bottom: 5px; display: block; font-weight: 600;">PROMPT TÉCNICO (EDITABLE):</label>
                        <textarea id="image-technical-prompt" style="font-family: monospace; font-size: 0.75rem; min-height: 80px; border: 1px dashed var(--accent-primary); background: rgba(var(--accent-primary-rgb), 0.05);" placeholder="La IA generará este prompt para la imagen..."></textarea>
                    </div>

                    <button class="btn-primary" id="gen-strategy-btn" style="margin-bottom: 10px; margin-top: 10px;">
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

export function setupDesignPilot() {
    const strategyBtn = document.getElementById('gen-strategy-btn');
    const imageBtn = document.getElementById('gen-image-btn');
    const promptArea = document.getElementById('design-prompt');
    const technicalPromptArea = document.getElementById('image-technical-prompt');
    const technicalPromptContainer = document.getElementById('technical-prompt-container');
    const previewBox = document.getElementById('preview-box');
    const metaFormat = document.getElementById('meta-format');
    const strategyStatus = document.getElementById('strategy-status');
    const strategyDetails = document.getElementById('strategy-details');
    const strategyFullText = document.getElementById('strategy-full-text');
    const strategyHeadline = document.getElementById('strategy-headline');
    const headlineText = document.getElementById('headline-text');

    if (!strategyBtn || !imageBtn || !promptArea || !previewBox) return;

    let currentStrategy = '';

    strategyBtn.addEventListener('click', async () => {
        const prompt = promptArea.value.trim();
        if (!prompt) return alert("Describe qué necesitas.");
        strategyBtn.disabled = true;
        strategyBtn.innerHTML = `<i data-lucide="loader" class="spin"></i> Pensando...`;
        if (window.lucide) window.lucide.createIcons();

        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    "model": "google/gemini-2.0-flash-001",
                    "messages": [{ "role": "system", "content": "Director Creativo Senior experto en Meta Ads. Genera: CONCEPTO, PALETA, ELEMENTOS, COPY, PROMPT_IMAGEN (inglés)." }, { "role": "user", "content": prompt }]
                })
            });
            const data = await response.json();
            currentStrategy = data.choices[0].message.content;
            const imagePromptMatch = currentStrategy.match(/PROMPT_IMAGEN[:\s]*([\s\S]*?)(?=\n\n|$)/i);
            if (imagePromptMatch && technicalPromptArea) technicalPromptArea.value = imagePromptMatch[1].trim();
            strategyFullText.innerHTML = currentStrategy.replace(/\n/g, '<br>');
            strategyStatus.style.display = 'block';
            strategyDetails.style.display = 'block';
            updateStrategyOverlay();
        } catch (e) { console.error(e); }
        strategyBtn.disabled = false;
        strategyBtn.innerHTML = `<i data-lucide="lightbulb"></i> Generar Estrategia`;
        if (window.lucide) window.lucide.createIcons();
    });

    imageBtn.addEventListener('click', async () => {
        const prompt = promptArea.value.trim();
        if (!prompt) return alert("Describe qué necesitas.");
        imageBtn.disabled = true;
        imageBtn.innerHTML = `<i data-lucide="loader" class="spin"></i> Generando...`;
        if (window.lucide) window.lucide.createIcons();

        try {
            const dimensions = metaFormat.value.split('x');
            const width = parseInt(dimensions[0]), height = parseInt(dimensions[1]);
            let imagePrompt = technicalPromptArea?.value.trim() || prompt;
            const imageUrl = `https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=${width}&h=${height}&q=80`;

            previewBox.innerHTML = `
                <img id="generated-image" src="${imageUrl}" crossorigin="anonymous" style="width:100%; height:100%; object-fit:contain; border-radius:12px;">
            `;

            // Create buttons container below preview box
            let actionsContainer = document.getElementById('design-actions-container');
            if (!actionsContainer) {
                actionsContainer = document.createElement('div');
                actionsContainer.id = 'design-actions-container';
                actionsContainer.style.cssText = 'display:flex; gap:15px; margin-top:20px; width:100%; justify-content:center;';
                previewBox.parentElement.appendChild(actionsContainer);
            }

            actionsContainer.innerHTML = `
                <button id="download-btn" class="btn-primary" style="background:#ff3b30; padding:14px 28px; font-size:1rem; min-width:180px; font-weight:700; border:none; cursor:pointer; border-radius:10px; color:white; display:flex; align-items:center; gap:8px; justify-content:center;">
                    <i data-lucide="download"></i> Descarga ${width}x${height}
                </button>
                <a href="https://arena.ai/es/c/new" target="_blank" class="btn-arena" style="text-decoration:none; display:flex; align-items:center; gap:10px; padding:14px 28px; background:#0f172a; color:white; border-radius:10px; font-weight:600; min-width:180px; border:1px solid #334155; justify-content:center;">
                    <i data-lucide="external-link"></i> Arena AI
                </a>
            `;
            setTimeout(() => {
                document.getElementById('download-btn')?.addEventListener('click', () => {
                    const canvas = document.createElement('canvas');
                    const img = document.getElementById('generated-image');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    const link = document.createElement('a');
                    link.download = `D9_Asset_${Date.now()}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                });
                if (window.lucide) window.lucide.createIcons();
                updateStrategyOverlay();
            }, 500);
        } catch (e) {
            console.error(e);
            previewBox.innerHTML = "Error al generar imagen.";
        }
        imageBtn.disabled = false;
        imageBtn.innerHTML = `<i data-lucide="image"></i> Generar Imagen`;
        if (window.lucide) window.lucide.createIcons();
    });
}
function updateStrategyOverlay() {
    if (!currentStrategy) return;
    const container = document.getElementById('strategy-overlay-container');
    if (!container) return;
    const copyMatch = currentStrategy.match(/COPY[:\s*]*"?([^"*\n]*)"?/i);
    const cleanText = copyMatch ? copyMatch[1].trim() : "Estrategia Generada";
    if (strategyHeadline && headlineText) {
        strategyHeadline.style.display = 'block';
        headlineText.textContent = cleanText;
    }
}

export function renderCalendar(container) {
    container.innerHTML = `
        <div class="calendar-header-pro">
            <div class="header-info">
                <h2 style="font-size:1.8rem; font-weight:700;">Agenda Estratégica</h2>
                <p style="color:var(--text-dim);">Gestiona tus reuniones y entregas de alto nivel.</p>
            </div>
            <div class="calendar-controls">
                <div class="view-switch">
                    <button id="view-week" class="switch-btn active">Semana</button>
                    <button id="view-month" class="switch-btn">Mes</button>
                </div>
                <button id="add-event-btn" class="btn-primary"><i data-lucide="plus"></i> Nueva Actividad</button>
            </div>
        </div>
        <div class="calendar-container-pro">
            <div id="calendar-grid" class="calendar-grid-pro"></div>
        </div>
        
        <div id="event-modal" class="modal-overlay" style="display:none;">
            <div class="modal-content pro">
                <div class="modal-header">
                    <h3><i data-lucide="calendar-plus"></i> Agendar Actividad</h3>
                    <button class="close-modal" id="cancel-event"><i data-lucide="x"></i></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Título de la actividad</label>
                        <input type="text" id="event-title" placeholder="Ej: Entrega de Logotipo">
                    </div>
                    <div class="grid-2">
                        <div class="form-group">
                            <label>Fecha</label>
                            <input type="date" id="event-date">
                        </div>
                        <div class="form-group">
                            <label>Hora</label>
                            <input type="time" id="event-time">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="save-event" class="btn-primary" style="width:100%">Guardar en Agenda</button>
                </div>
            </div>
        </div>
    `;
}

export function setupCalendar() {
    const grid = document.getElementById('calendar-grid');
    const addBtn = document.getElementById('add-event-btn');
    const modal = document.getElementById('event-modal');
    const saveBtn = document.getElementById('save-event');
    const cancelBtn = document.getElementById('cancel-event');
    const viewWeek = document.getElementById('view-week');
    const viewMonth = document.getElementById('view-month');

    if (!grid) return;

    let currentView = 'week';

    const render = () => {
        grid.innerHTML = '';
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());

        if (currentView === 'week') {
            const daysShort = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
            daysShort.forEach((day, i) => {
                const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
                const isToday = date.toDateString() === now.toDateString();
                const dayEvents = state.calendarEvents.filter(e => e.date === date.toISOString().split('T')[0]);

                const col = document.createElement('div');
                col.className = `calendar-col-pro ${isToday ? 'today' : ''}`;
                col.innerHTML = `
                    <div class="col-header-pro">
                        <span class="day-name">${day}</span>
                        <span class="day-number">${date.getDate()}</span>
                    </div>
                    <div class="col-events-pro">
                        ${dayEvents.length > 0 ? dayEvents.map(e => `
                            <div class="event-card-pro ${e.type || 'meeting'}">
                                <span class="event-time">${e.time}</span>
                                <span class="event-title">${e.title}</span>
                            </div>
                        `).join('') : '<div class="no-events-pro">Libre</div>'}
                    </div>
                `;
                grid.appendChild(col);
            });
        } else {
            // Month view - Full calendar grid with sidebar
            const year = now.getFullYear();
            const month = now.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            const startingDayOfWeek = firstDay.getDay();

            const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            const dayHeaders = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

            let monthHTML = `
                <div class="month-layout">
                    <div class="month-calendar-section">
                        <div class="month-header-row">
                            ${dayHeaders.map(d => `<div class="month-day-header">${d}</div>`).join('')}
                        </div>
                        <div class="month-grid">
            `;

            // Empty cells before first day
            for (let i = 0; i < startingDayOfWeek; i++) {
                monthHTML += '<div class="month-day-cell empty"></div>';
            }

            // Days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day);
                const dateKey = date.toISOString().split('T')[0];
                const isToday = date.toDateString() === now.toDateString();
                const dayEvents = state.calendarEvents.filter(e => e.date === dateKey);

                monthHTML += `
                    <div class="month-day-cell ${isToday ? 'today' : ''}" data-date="${dateKey}" onclick="window.selectCalendarDay('${dateKey}', ${day}, '${dayHeaders[date.getDay()]}')">
                        <div class="month-day-number">${day}</div>
                        ${dayEvents.length > 0 ? `
                            <div class="month-events-indicator">
                                ${dayEvents.slice(0, 2).map(e => `
                                    <div class="month-event-dot" title="${e.time} - ${e.title}"></div>
                                `).join('')}
                                ${dayEvents.length > 2 ? `<span class="more-events">+${dayEvents.length - 2}</span>` : ''}
                            </div>
                        ` : ''}
                    </div>
                `;
            }

            // Get today's events for initial sidebar
            const todayKey = now.toISOString().split('T')[0];
            const todayEvents = state.calendarEvents.filter(e => e.date === todayKey);
            const todayDayName = dayHeaders[now.getDay()];

            monthHTML += `
                        </div>
                    </div>
                    <div class="month-sidebar" id="month-sidebar">
                        <div class="sidebar-day-display">
                            <div class="sidebar-day-name">${todayDayName}</div>
                            <div class="sidebar-day-number">${now.getDate()}</div>
                            <div class="sidebar-month-year">${monthNames[month]} ${year}</div>
                        </div>
                        <div class="sidebar-events-list" id="sidebar-events-list">
                            ${todayEvents.length > 0 ? `
                                <h4 class="events-list-title">Actividades del día</h4>
                                ${todayEvents.map(e => `
                                    <div class="sidebar-event-item">
                                        <div class="event-time-badge">${e.time}</div>
                                        <div class="event-details">
                                            <div class="event-title-text">${e.title}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            ` : '<div class="no-events-message">No hay actividades programadas</div>'}
                        </div>
                    </div>
                </div>
            `;

            grid.innerHTML = monthHTML;

            // Add click handler for day selection
            window.selectCalendarDay = (dateKey, dayNum, dayName) => {
                const events = state.calendarEvents.filter(e => e.date === dateKey);
                const sidebar = document.getElementById('month-sidebar');
                const eventsList = document.getElementById('sidebar-events-list');

                // Update sidebar day display
                const selectedDate = new Date(dateKey);
                sidebar.querySelector('.sidebar-day-name').textContent = dayName;
                sidebar.querySelector('.sidebar-day-number').textContent = dayNum;
                sidebar.querySelector('.sidebar-month-year').textContent = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

                // Update events list
                eventsList.innerHTML = events.length > 0 ? `
                    <h4 class="events-list-title">Actividades del día</h4>
                    ${events.map(e => `
                        <div class="sidebar-event-item">
                            <div class="event-time-badge">${e.time}</div>
                            <div class="event-details">
                                <div class="event-title-text">${e.title}</div>
                            </div>
                        </div>
                    `).join('')}
                ` : '<div class="no-events-message">No hay actividades programadas</div>';

                // Highlight selected day
                document.querySelectorAll('.month-day-cell').forEach(cell => cell.classList.remove('selected'));
                document.querySelector(`[data-date="${dateKey}"]`)?.classList.add('selected');
            };
        }
    };

    if (viewWeek) viewWeek.onclick = () => { currentView = 'week'; viewWeek.classList.add('active'); viewMonth.classList.remove('active'); render(); };
    if (viewMonth) viewMonth.onclick = () => { currentView = 'month'; viewMonth.classList.add('active'); viewWeek.classList.remove('active'); render(); };

    if (addBtn) addBtn.onclick = () => modal.style.display = 'flex';
    if (cancelBtn) cancelBtn.onclick = () => modal.style.display = 'none';

    if (saveBtn) saveBtn.onclick = () => {
        const title = document.getElementById('event-title').value;
        const date = document.getElementById('event-date').value;
        const time = document.getElementById('event-time').value;

        if (title && date && time) {
            state.calendarEvents.push({ id: Date.now(), title, date, time, type: 'meeting' });
            logActivity(`Evento agendado: ${title}`, 'calendar');
            saveState();
            modal.style.display = 'none';
            render();
        }
    };

    render();
}

export function renderSettings(container) {
    container.innerHTML = `
        <section class="settings-container">
            <div class="card">
                <h3><i data-lucide="cloud"></i> Estado de Sincronización</h3>
                <div id="sync-indicator" class="sync-badge" style="display:inline-flex; margin-top:12px;">
                    <i data-lucide="cloud-check"></i>
                    <span id="sync-text">Sincronizado</span>
                </div>
                <p style="font-size:0.85rem; color:var(--text-dim); margin-top:12px;">
                    Tus datos se sincronizan automáticamente con Supabase cada 10 segundos.
                </p>
            </div>
            
            <div class="card">
                <h3><i data-lucide="bell"></i> Notificaciones</h3>
                <p style="font-size:0.85rem; color:var(--text-dim); margin-bottom:12px;">
                    Recibe alertas 15 y 5 minutos antes de tus eventos importantes.
                </p>
                <div id="notification-status">
                    ${state.notificationPermission
            ? '<div class="sync-badge" style="color:#4ade80; display:inline-flex;"><i data-lucide="check"></i> Activadas</div>'
            : '<button id="btn-notifications" class="btn-primary">Activar Alertas</button>'
        }
                </div>
            </div>

            <div class="card">
                <h3><i data-lucide="database"></i> Backup & Restore</h3>
                <button id="btn-export" class="btn-primary">Exportar JSON</button>
                <button id="btn-reset" class="btn-danger" style="margin-top:10px;">Reset Total</button>
            </div>
        </section>
    `;
}

export function setupSettings() {
    document.getElementById('btn-export').onclick = () => alert("Exportando...");
    document.getElementById('btn-reset').onclick = () => {
        if (confirm("¿Borrar todo?")) { localStorage.clear(); location.reload(); }
    };

    const btnNotif = document.getElementById('btn-notifications');
    if (btnNotif) {
        btnNotif.onclick = async () => {
            const granted = await requestNotificationPermission();
            if (granted) {
                // Refresh view to show active status
                const container = document.getElementById('view-container');
                renderSettings(container);
                setupSettings(); // Re-attach listeners
                if (window.lucide) window.lucide.createIcons();
            }
        };
    }
}

export function setupConcierge() {
    const input = document.getElementById('concierge-input');
    const sendBtn = document.getElementById('send-btn');
    const pills = document.querySelectorAll('.action-pill');

    const handleSend = async () => {
        const text = input.value.trim();
        if (!text) return;

        appendMessage('user', text);
        input.value = '';

        // Comandos rápidos locales
        const command = detectCommand(text);
        if (command) {
            if (command.type === 'quote') {
                const quote = generateQuote(command.serviceId, command.clientName, 1, command.customPrice);
                appendMessage('system', quote, true);
                return;
            }
            if (command.type === 'whatsapp') {
                const ws = generateWhatsApp(command.templateType, command.clientName, state.whatsappTemplates);
                appendMessage('system', ws, true);
                return;
            }
            if (command.type === 'services') {
                const srvs = listAllServices().map(s => `• **${s.name}**: ${s.price}`).join('\n');
                appendMessage('system', `Servicios Disponibles:\n${srvs}`, true);
                return;
            }
        }

        // Si no es comando local, va a la IA
        appendMessage('system', '...', false); // Placeholder
        const messagesContainer = document.getElementById('concierge-messages');
        const lastMsg = messagesContainer.lastElementChild;

        // Guardar en historial local el mensaje del usuario
        state.chatHistory.push({ role: 'user', content: text });

        const response = await sendMessageToAI(text, state);
        if (response.error) {
            lastMsg.textContent = "Error: " + response.error;
        } else {
            // ESTRATEGIA DEFINITIVA: Regex flexible para capturar bloques y limpiar.
            // Flags: g (global), m (multiline), s (dotAll) - pero JS no soporta siempre s en regex literal antiguo, usamos [\s\S]

            const actionRegex = /```(?:json)?\s*([\s\S]*?)\s*```/g;
            let cleanContent = response.content.replace(actionRegex, '').trim();

            // Fallback: Si no hay backticks pero hay objeto JSON claro al final
            // Esto es peligroso si el texto habla de JSON, pero asumimos que la IA lo pone al final
            const looseJsonRegex = /\{\s*"action"\s*:\s*"[\w_]+".*?\}/gs;
            cleanContent = cleanContent.replace(looseJsonRegex, '').trim();

            lastMsg.innerHTML = cleanContent.replace(/\n/g, '<br>');

            // Guardar en historial SOLO el contenido limpio para no confundir a la IA después
            state.chatHistory.push({ role: 'assistant', content: cleanContent });
            saveState();

            // 1. Intentar capturar bloques con backticks
            let match;
            // Reiniciamos regex
            const blockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/g;
            while ((match = blockRegex.exec(response.content)) !== null) {
                try {
                    const data = JSON.parse(match[1]);
                    console.log("Acción IA detectada (Block):", data);
                    processAIAction(data);
                } catch (e) {
                    console.error("Error parsing block JSON", e);
                }
            }

            // 2. Intentar capturar objetos sueltos si no hubo bloques (o asumiendo mix)
            // Usamos un regex que busque estructuras que parecen acciones
            // Nota: matchAll o exec loop
            const looseMatcher = /\{\s*"action"\s*:\s*"[\w_]+"(?:[^{}]|{[^{}]*})*\}/g;
            while ((match = looseMatcher.exec(response.content)) !== null) {
                // Solo procesar si NO estaba dentro de un bloque ya procesado (difícil de saber simple, 
                // pero si la IA sigue instrucciones, usará backticks. Esto es por si falla).
                // Para evitar duplicados, podríamos trackear IDs, pero por ahora confiamos en el prompt.
                try {
                    const data = JSON.parse(match[0]);
                    console.log("Acción IA detectada (Loose):", data);
                    processAIAction(data);
                } catch (e) {
                    // Ignorar falsos positivos
                }
            }
        }
    }
};

if (sendBtn) sendBtn.onclick = handleSend;
if (input) {
    input.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };
}

pills.forEach(pill => {
    pill.onclick = () => {
        const cmd = pill.dataset.cmd;
        if (cmd) {
            input.value = cmd;
            input.focus();
        }
    };
});

// WhatsApp Menu Logic
const wsBtn = document.getElementById('whatsapp-selector-btn');
const wsMenu = document.getElementById('whatsapp-templates-menu');

if (wsBtn && wsMenu) {
    // Always populate templates on load
    const templates = {
        'seguimiento': 'Seguimiento',
        'vencimiento': 'Vencimiento',
        'cierre': 'Cierre',
        'reunion': 'Reunión',
        'reactivacion': 'Reactivación',
        'gracias': 'Gracias',
        'bienvenida': 'Bienvenida'
    };

    wsMenu.innerHTML = Object.keys(templates).map(key => `
            <div class="template-option" onclick="window.sendWS('${key}')" style="padding:12px 16px; cursor:pointer; border-bottom:1px solid #eee; transition: background 0.2s;">
                ${templates[key]}
            </div>
        `).join('');

    wsBtn.onclick = (e) => {
        e.stopPropagation();
        const isOpen = wsMenu.style.display === 'block';
        wsMenu.style.display = isOpen ? 'none' : 'block';
        console.log('WhatsApp menu toggled. Display:', wsMenu.style.display);
    };

    document.addEventListener('click', (e) => {
        if (wsMenu && !wsMenu.contains(e.target) && e.target !== wsBtn) {
            wsMenu.style.display = 'none';
        }
    });

    window.sendWS = (type) => {
        if (input) {
            input.value = `/whatsapp ${type} `;
            input.focus();
            if (wsMenu) wsMenu.style.display = 'none';
        }
    };
} // Fin if (wsBtn && wsMenu)

function processAIAction(data) {
    if (data.action === 'create_lead') {
        const newLead = {
            id: Date.now(),
            name: data.name,
            interest: data.interest || 'Por definir',
            status: 'cold',
            brandDNA: data.brandDNA || {}
        };
        state.leads.push(newLead);
        logActivity(`IA creó prospecto: ${data.name}`, 'user-plus');
        saveState();
        refreshCurrentView();
    } else if (data.action === 'update_lead') {
        const index = state.leads.findIndex(l => l.id == data.id);
        if (index !== -1) {
            state.leads[index].status = data.status;
            logActivity(`IA actualizó prospecto ID ${data.id} a ${data.status}`, 'edit');
            saveState();
            refreshCurrentView();
        }
    } else if (data.action === 'delete_lead') {
        state.leads = state.leads.filter(l => l.id != data.id);
        logActivity(`IA eliminó prospecto ID ${data.id}`, 'trash-2');
        saveState();
        refreshCurrentView();
    } else if (data.action === 'schedule_event') {
        const newEvent = {
            id: Date.now(),
            title: data.title,
            date: data.date,
            time: data.time,
            type: 'meeting'
        };
        state.calendarEvents.push(newEvent);
        logActivity(`IA programó evento: ${data.title}`, 'calendar');
        saveState();
        refreshCurrentView();
    } else if (data.action === 'delete_event') {
        state.calendarEvents = state.calendarEvents.filter(e => e.id != data.id);
        logActivity(`IA eliminó evento ID ${data.id}`, 'calendar-x');
        saveState();
        refreshCurrentView();
    } else if (data.action === 'delete_events_for_day') {
        const initialCount = state.calendarEvents.length;
        state.calendarEvents = state.calendarEvents.filter(e => e.date !== data.date);
        const deletedCount = initialCount - state.calendarEvents.length;
        logActivity(`IA eliminó ${deletedCount} eventos del día ${data.date}`, 'calendar-x');
        saveState();
        refreshCurrentView();
    } else if (data.action === 'clear_calendar') {
        state.calendarEvents = [];
        logActivity(`IA limpió el calendario`, 'trash-2');
        saveState();
        refreshCurrentView();
    } else if (data.action === 'add_task') {
        const newTask = {
            id: Date.now(),
            text: data.text,
            completed: false
        };
        state.tasks.push(newTask);
        logActivity(`IA agregó tarea: ${data.text}`, 'check-square');
        saveState();
        refreshCurrentView();
    } else if (data.action === 'create_template') {
        state.whatsappTemplates.push({
            name: data.name,
            text: data.text
        });
        logActivity(`IA creó plantilla: ${data.name}`, 'message-square');
        saveState();
    }
}

function refreshCurrentView() {
    const container = document.getElementById('view-container');
    if (!container) return;

    // Refresh the view if it's one of the persistent ones
    if (state.currentView === 'nav-dashboard') renderView('nav-dashboard');
    else if (state.currentView === 'nav-leads') renderView('nav-leads');
    else if (state.currentView === 'nav-calendar') renderView('nav-calendar');
}

export function appendMessage(role, text, isHtml = false) {
    const chatDisplay = document.getElementById('concierge-messages');
    if (!chatDisplay) return;
    const div = document.createElement('div');
    div.className = `message ${role}`;
    if (isHtml) div.innerHTML = text.replace(/\n/g, '<br>');
    else div.textContent = text;
    chatDisplay.appendChild(div);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
}
