const app = {
    user: {
        name: "",
        email: "",
        age: 25,
        weight: 70,
        height: 175,
        goal: "massa",
        level: "principiante",
        days: 3,
        subscription: "free"
    },

    init() {
        this.setupEventListeners();
        this.loadUser();
    },

    setupEventListeners() {
        // Start App buttons
        document.querySelectorAll('.start-app-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchView('app'));
        });

        // Onboarding navigation
        document.querySelectorAll('.next-step').forEach(btn => {
            btn.addEventListener('click', () => this.changeStep(1));
        });
        document.querySelectorAll('.prev-step').forEach(btn => {
            btn.addEventListener('click', () => this.changeStep(-1));
        });

        // Dashboard Navigation
        document.getElementById('nav-coach')?.addEventListener('click', () => this.showSection('coach'));
        document.getElementById('nav-workout')?.addEventListener('click', () => this.showSection('workout'));
        document.getElementById('nav-diet')?.addEventListener('click', () => this.showSection('diet'));
        document.getElementById('nav-pros')?.addEventListener('click', () => this.showSection('professionals'));

        document.querySelectorAll('.back-to-dash').forEach(btn => {
            btn.addEventListener('click', () => this.showSection('dashboard'));
        });

        // Range input for days
        const daysInput = document.getElementById('user-days');
        const daysVal = document.getElementById('days-val');
        if (daysInput && daysVal) {
            daysInput.addEventListener('input', (e) => {
                daysVal.textContent = e.target.value + ' giorni';
            });
        }

        // Chat Form
        document.getElementById('chat-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleChat();
        });

        // Plan Generators
        document.getElementById('generate-workout')?.addEventListener('click', () => this.generateWorkout());
        document.getElementById('generate-diet')?.addEventListener('click', () => this.generateDiet());

        // Modals
        document.querySelector('.close-modal')?.addEventListener('click', () => {
            document.getElementById('paywall-modal').style.display = 'none';
        });
    },

    switchView(view) {
        if (view === 'app') {
            document.getElementById('landing-view').style.display = 'none';
            document.getElementById('app-view').style.display = 'block';
            document.getElementById('main-footer').style.display = 'none';
        } else {
            document.getElementById('landing-view').style.display = 'block';
            document.getElementById('app-view').style.display = 'none';
            document.getElementById('main-footer').style.display = 'block';
        }
        window.scrollTo(0, 0);
    },

    changeStep(n) {
        const steps = document.querySelectorAll('.onboarding-step');
        let current = 0;
        steps.forEach((step, idx) => {
            if (step.classList.contains('active')) current = idx;
        });

        const next = current + n;

        if (next >= steps.length) {
            this.finishOnboarding();
            return;
        }

        if (next >= 0) {
            steps[current].classList.remove('active');
            steps[next].classList.add('active');
        }
    },

    finishOnboarding() {
        // Collect data
        this.user.name = document.getElementById('user-name').value || "Utente";
        this.user.email = document.getElementById('user-email').value;
        this.user.age = document.getElementById('user-age').value;
        this.user.weight = document.getElementById('user-weight').value;
        this.user.height = document.getElementById('user-height').value;
        this.user.goal = document.getElementById('user-goal').value;
        this.user.level = document.getElementById('user-level').value;
        this.user.days = document.getElementById('user-days').value;

        document.getElementById('display-name').textContent = this.user.name;
        this.showSection('dashboard');
        this.saveUser();
    },

    showSection(id) {
        document.querySelectorAll('.app-section').forEach(sec => sec.style.display = 'none');
        document.getElementById(id).style.display = 'block';
        window.scrollTo(0, 0);
    },

    handleChat() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;

        this.appendMessage('user', text);
        input.value = '';

        // Fake AI response based on user profile
        setTimeout(() => {
            let response = "Interessante! ";
            if (text.toLowerCase().includes('allenamento')) {
                response += `Dato che il tuo obiettivo è ${this.user.goal}, ti consiglio di concentrarti su esercizi multiarticolari per almeno ${this.user.days} volte a settimana.`;
            } else if (text.toLowerCase().includes('dieta') || text.toLowerCase().includes('mangiare')) {
                response += `Per il tuo peso di ${this.user.weight}kg, dovresti mirare a circa ${this.user.weight * 2}g di proteine al giorno per supportare il tuo obiettivo di ${this.user.goal}.`;
            } else {
                response += `Come posso aiutarti a raggiungere il tuo livello ${this.user.level} oggi?`;
            }
            this.appendMessage('ai', response);
        }, 800);
    },

    appendMessage(type, text) {
        const chat = document.getElementById('chat-messages');
        const msg = document.createElement('div');
        msg.className = `message ${type}-message`;
        msg.textContent = text;
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;
    },

    generateWorkout() {
        const content = document.getElementById('workout-content');
        content.innerHTML = '<p>Generazione intelligente in corso...</p>';

        setTimeout(() => {
            const exercises = [
                { name: "Squat", sets: 3, reps: "10-12", rest: "90s" },
                { name: "Panca Piana", sets: 4, reps: "8", rest: "2min" },
                { name: "Trazioni", sets: 3, reps: "Max", rest: "90s" }
            ];

            let html = `<h3>Scheda ${this.user.goal.toUpperCase()} - ${this.user.level}</h3>`;
            exercises.forEach(ex => {
                html += `<div class="workout-item">
                    <strong>${ex.name}</strong>: ${ex.sets}x${ex.reps} | Riposo: ${ex.rest}
                </div>`;
            });
            content.innerHTML = html;
        }, 1500);
    },

    generateDiet() {
        const content = document.getElementById('diet-content');
        content.innerHTML = '<p>Calcolo macros personalizzati...</p>';

        setTimeout(() => {
            const calories = this.user.goal === 'massa' ? 2800 : 1800;
            let html = `<h3>Piano Giornaliero (~${calories} kcal)</h3>`;
            html += `<div class="meal-item"><strong>Colazione</strong>: Porridge con avena e frutta secca</div>`;
            html += `<div class="meal-item"><strong>Pranzo</strong>: Riso integrale, pollo ai ferri e broccoli</div>`;
            html += `<div class="meal-item"><strong>Cena</strong>: Salmone al forno con patate dolci</div>`;
            content.innerHTML = html;
        }, 1500);
    },

    showPremium(feature) {
        const modal = document.getElementById('paywall-modal');
        modal.querySelector('h2').textContent = feature;
        modal.style.display = 'flex';
    },

    saveUser() {
        localStorage.setItem('ws_user', JSON.stringify(this.user));
    },

    loadUser() {
        const saved = localStorage.getItem('ws_user');
        if (saved) {
            // Optional: Auto-login logic could go here
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // ---- Keep existing Landing Page stuff ----
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn?.querySelector('i');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (currentTheme === 'dark') { document.body.setAttribute('data-theme', 'dark'); if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun'); }

    themeToggleBtn?.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        document.body.toggleAttribute('data-theme', !isDark);
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        themeIcon?.classList.replace(isDark ? 'fa-sun' : 'fa-moon', isDark ? 'fa-moon' : 'fa-sun');
    });

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const mobileIcon = mobileMenuToggle?.querySelector('i');
    mobileMenuToggle?.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        mobileIcon?.classList.replace(isExpanded ? 'fa-xmark' : 'fa-bars', isExpanded ? 'fa-bars' : 'fa-xmark');
    });

    // FAQ Accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', !isExpanded);
            content.style.maxHeight = isExpanded ? null : content.scrollHeight + 'px';
        });
    });

    // Scroll Observer
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-up').forEach(el => scrollObserver.observe(el));

    // Initialize App Logic
    app.init();
});

