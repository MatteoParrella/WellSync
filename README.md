# 🌿 WellSync

> **La piattaforma AI per il benessere personale — cross-platform, intelligente, completa.**

![WellSync Banner](https://img.shields.io/badge/WellSync-Wellness%20AI-4a7c59?style=for-the-badge&logo=leaf)
![React](https://img.shields.io/badge/React-Native-61DAFB?style=for-the-badge&logo=react)
![AI Powered](https://img.shields.io/badge/AI-Powered-gold?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📖 Descrizione

WellSync è un'applicazione wellness full-stack che combina intelligenza artificiale, tracking della salute e connessione con professionisti certificati. Disponibile su **iOS**, **Android** e **Web**, offre un'esperienza personalizzata basata sul profilo fisico dell'utente.

---

## ✨ Funzionalità

### 🔐 Onboarding & Autenticazione
- Registrazione e login sicuro
- Configurazione corporea iniziale (età, peso, altezza, obiettivi)
- Selezione livello fitness e muscoli target

### 🏠 Dashboard
- Panoramica giornaliera (calorie, passi, acqua, sonno)
- Progressi settimanali e mensili
- Notifiche e reminder intelligenti

### 🤖 AI Coach
- Chat contestuale basata sul profilo utente
- Risposte personalizzate su nutrizione, allenamento e benessere
- Storico conversazioni e suggerimenti proattivi

### 🏋️ Scheda Palestra AI
- Generata automaticamente in base a:
  - Livello (principiante / intermedio / avanzato)
  - Obiettivo (massa / dimagrimento / forza / definizione)
  - Giorni disponibili a settimana
- Ogni esercizio con serie, reps e tempi di recupero
- Progressione automatica nel tempo

### 🥗 Piano Alimentare
- Calcolo calorie target e macronutrienti
- Piani giornalieri e settimanali personalizzati
- Diario alimentare con tracking in tempo reale

### 👨‍⚕️ Professionisti
- Lista nutrizionisti, trainer e coach certificati
- Prenotazione sessioni in-app
- Chat diretta con i professionisti

### 💳 Abbonamenti
| Piano | Prezzo | Accesso |
|-------|--------|---------|
| **Free** | €0/mese | Funzioni base, 5 msg AI/giorno |
| **Premium** | €12,99/mese | AI illimitata, scheda palestra, piani completi |
| **Pro** | €29,99/mese | Tutto Premium + professionisti + analytics avanzate |

> ⚠️ Ogni funzione bloccata mostra un paywall chiaro — nessuna pagina vuota o errore.

---

## 🛠️ Stack Tecnologico

```
Frontend:    React Native (iOS + Android) / React (Web)
Backend:     Node.js + Express
Database:    PostgreSQL + Redis (cache)
AI:          Claude API (Anthropic) / OpenAI GPT-4
Auth:        JWT + Supabase Auth
Pagamenti:   Stripe
Storage:     AWS S3
Deploy:      Vercel (Web) + Expo (Mobile)
```

---

## 🚀 Installazione

### Prerequisiti
- Node.js >= 18.x
- npm o yarn
- Expo CLI (per mobile)
- PostgreSQL

### Setup

```bash
# Clona il repository
git clone https://github.com/tuousername/wellsync.git
cd wellsync

# Installa dipendenze
npm install

# Copia il file di configurazione
cp .env.example .env
```

### Variabili d'ambiente

```env
# API Keys
ANTHROPIC_API_KEY=your_claude_api_key
OPENAI_API_KEY=your_openai_key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/wellsync

# Auth
JWT_SECRET=your_jwt_secret
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# Pagamenti
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Storage
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=wellsync-assets
```

### Avvio

```bash
# Web
npm run dev

# Mobile (iOS)
npx expo run:ios

# Mobile (Android)
npx expo run:android

# Backend
npm run server
```

---

## 📁 Struttura del Progetto

```
wellsync/
├── src/
│   ├── screens/
│   │   ├── Auth/           # Login, Registrazione, Onboarding
│   │   ├── Dashboard/      # Home e panoramica
│   │   ├── AICoach/        # Chat AI
│   │   ├── GymPlan/        # Scheda palestra
│   │   ├── NutritionPlan/  # Piano alimentare
│   │   ├── Professionals/  # Lista e prenotazioni
│   │   └── Settings/       # Profilo e abbonamento
│   ├── components/         # Componenti riutilizzabili
│   ├── services/
│   │   ├── ai.service.js   # Integrazione Claude API
│   │   ├── auth.service.js # Autenticazione
│   │   └── stripe.service.js # Pagamenti
│   ├── store/              # Stato globale (Zustand/Redux)
│   ├── hooks/              # Custom hooks
│   └── utils/              # Helper e costanti
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middleware/
├── assets/                 # Immagini, font, icone
├── app.json
├── package.json
└── README.md
```

---

## 🗺️ Roadmap

- [x] MVP — Onboarding + Dashboard + AI Coach base
- [x] Scheda palestra AI personalizzata
- [x] Sistema abbonamenti Stripe
- [ ] Video sessioni con professionisti
- [ ] Wearable integration (Apple Watch, Fitbit)
- [ ] Gamification e sfide tra utenti
- [ ] White-label per palestre e cliniche
- [ ] Supporto multilingua

---

## 🤝 Contribuire

Le contribuzioni sono benvenute! Per favore:

1. Fai un fork del progetto
2. Crea un branch (`git checkout -b feature/nuova-funzione`)
3. Commit delle modifiche (`git commit -m 'Aggiunge nuova funzione'`)
4. Push del branch (`git push origin feature/nuova-funzione`)
5. Apri una Pull Request

---

## 📄 Licenza

Distribuito sotto licenza MIT. Vedi `LICENSE` per maggiori informazioni.

---

## 📬 Contatti

**WellSync Team** — [info@wellsync.app](mailto:info@wellsync.app)

🌐 [wellsync.app](https://wellsync.app) · 🐦 [@wellsync](https://twitter.com/wellsync) · 💼 [LinkedIn](https://linkedin.com/company/wellsync)

---

<p align="center">
  Fatto con ❤️ per chi vuole stare meglio ogni giorno.
</p>
