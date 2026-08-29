# HeyShaun 🚀

[![Live Website](https://img.shields.io/badge/Live-heyshaun.fr-00CEC9?style=flat-square&logo=cloudflare&logoColor=white)](https://heyshaun.fr)
[![Astro](https://img.shields.io/badge/Astro-7.x-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.x-EF4444?style=flat-square&logo=turborepo&logoColor=white)](https://turbo.build)
[![pnpm](https://img.shields.io/badge/pnpm-11.x-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

Personal developer portfolio, creative tech playground, and AI art gallery built with **Astro 7 (SSG)** in a lightweight, high-performance **Turborepo** monorepo.

🌐 **Live site**: [heyshaun.fr](https://heyshaun.fr)

---

## ✨ Features

- ⚡ **Ultra-Fast SSG**: Pre-rendered static pages with zero client runtime overhead, built for Cloudflare Pages.
- 🎨 **Modular Design Tokens**: Centralized `@heyshaun/design-tokens` package managing responsive breakpoints, dark/light theme palettes, fluid typography, and CSS cascade layers.
- 🌍 **Full i18n Localization**: Built-in routing and shared dictionary translations for English (`/en/`) and French (`/fr/`).
- 🖼️ **AI Art Gallery & Lightbox**: Interactive gallery showcase with zoomable lightbox viewer and optimized WebP asset generation via Sharp.
- 🎭 **Dynamic UI & FX**: Interactive particle canvas background, parallax wave transitions, animated skill tags, and theme switcher.
- 🤖 **SEO & AI Ready**: OpenGraph cards, dynamic sitemaps, structured semantic HTML, and `llms.txt` integration.

---

## 📂 Architecture

```
HeyShaun/
├── apps/
│   └── portfolio/          # Main Astro 7 static portfolio application (heyshaun.fr)
└── packages/
    ├── design-tokens/      # CSS design tokens (colors, typography, media queries)
    └── utils/              # Shared translation bundles (en/fr) and utility helpers
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | [Astro 7](https://astro.build/) (Static Site Generation) |
| **Monorepo** | [Turborepo](https://turbo.build/) & [pnpm](https://pnpm.io/) workspaces |
| **Styling** | Vanilla CSS, CSS Cascade Layers (`@layer`), PostCSS Custom Media |
| **Icons & Media** | [Lucide Icons](https://lucide.dev/), [Sharp](https://sharp.pixelplumbing.com/) (image optimization) |
| **Deployment** | [Cloudflare Pages](https://pages.cloudflare.com/) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 20.0.0`
- **pnpm** `>= 9.0.0`

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/shaunfischmann/HeyShaun.git
cd HeyShaun

# 2. Install dependencies
pnpm install

# 3. Start local development server
pnpm dev

# Or start only the portfolio app
pnpm dev:portfolio
```

### Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development servers across all workspace apps |
| `pnpm dev:portfolio` | Run only the portfolio Astro dev server |
| `pnpm build` | Sync translation bundles and build static production bundles |
| `pnpm preview` | Locally preview production build |

---

## 📄 License & Credits

- Code released under the [MIT License](LICENSE).
- Art & photography &copy; Shaun Fischmann.
