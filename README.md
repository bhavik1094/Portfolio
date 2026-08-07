# 🚀 Bhavik Patel - Senior Full-Stack Engineer Portfolio

A modern, high-performance, single-page developer portfolio built for **Bhavik Patel**, Senior Full-Stack Engineer specializing in React, .NET Core, SQL Server/MongoDB, and AI-powered workflow automation.

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.38.0-0055FF?logo=framer)
![i18next](https://img.shields.io/badge/i18n-7_Languages-26A69A?logo=i18next)
![Vitest](https://img.shields.io/badge/Vitest-3.2.4-6E9F18?logo=vitest)

---

## ✨ Features

- 🎨 **Glassmorphism Dark UI**: Designed with CSS custom properties, backdrop blur, ambient gradient background animations, and custom typography.
- 🌐 **7-Language i18n Support**: Instant client-side translation across English, Hindi, Gujarati, German, French, Spanish, and Japanese using `i18next` and custom flag selection dropdowns.
- ⚡ **Optimized Vite Bundling**: Custom Rollup manual chunking for lightning-fast loads (`~6.5s` production build time).
- 🎬 **Smooth Motion & Micro-interactions**: Powered by `framer-motion` section scroll animations and modal transitions.
- 📄 **Live Resume Modal**: Interactive preview of `Bhavik M Patel Resume.pdf` with direct download capability.
- 💼 **Recruiter Case Studies**: Detailed featured project card and interactive modal views for full-stack SaaS applications.
- 📧 **Interactive Contact**: Form validation with pre-formatted `mailto:` client fallback.

---

## 🛠 Tech Stack

- **Frontend Core**: React 19, JavaScript (ES6+), HTML5, Vanilla CSS
- **Bundler & Build Tool**: Vite 6 with `@vitejs/plugin-react`
- **Animations & Graphics**: Framer Motion, Lottie React, React Icons
- **Internationalization**: `i18next`, `react-i18next`, `react-select`
- **Testing Framework**: Vitest, `@testing-library/react`, JSDOM
- **Deployment Target**: GitHub Pages (`gh-pages`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm `v9+`

### Installation

```bash
# Clone the repository
git clone https://github.com/bhavik1094/Portfolio.git

# Navigate into project directory
cd Portfolio

# Install dependencies
npm install
```

---

## 📜 Available Scripts

In the project directory, you can run:

```bash
# Start development server with Hot Module Replacement (HMR)
npm run dev

# Run Vitest unit & integration test suite
npm test

# Build production distribution bundle in dist/
npm run build

# Preview local production build
npm run preview

# Deploy production bundle to GitHub Pages
npm run deploy
```

---

## 🏗 Architecture & Code Structure

```
src/
├── App.js                  # App root, dark theme state & i18n transition wrapper
├── i18n.js                 # Language configuration & document attribute sync
├── setupTests.js           # Test setup & JSDOM mocks
├── assets/                 # Modular CSS files & design tokens (premium.css)
├── components/             # Reusable UI sections
│   ├── Navbar.js           # Header, navigation links & controls
│   ├── Hero.js             # Hero banner & primary CTAs
│   ├── Projects.js         # Case study grid & detail modals
│   ├── Experience.js       # Career history timeline
│   ├── Skills.js           # Tech toolkit grid
│   ├── Contact.js          # Form validation & direct reach-out
│   ├── ResumeModal.js      # PDF resume viewer overlay
│   └── ...                 # Additional presentation components
└── locales/                # Translation JSON key maps (en, hi, gu, de, fr, es, ja)
```

---

## 📬 Contact & Links

- **Portfolio Repository**: [github.com/bhavik1094/Portfolio](https://github.com/bhavik1094/Portfolio)
- **GitHub Profile**: [github.com/bhavik1094](https://github.com/bhavik1094)
- **LinkedIn**: [linkedin.com/in/bhavik1094](https://linkedin.com/in/bhavik1094)
- **Email**: [bmpatel1994@gmail.com](mailto:bmpatel1994@gmail.com)
