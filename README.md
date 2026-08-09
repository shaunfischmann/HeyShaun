# Portfolio Monorepo

A modern monorepo for personal projects (portfolio, wedding site, etc.) using **Astro**, **Turborepo**, and **pnpm**.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v20.0.0 or higher)
- **pnpm** (v9.15.9 or higher)

### Setup

1. Clone the repository:
  ```bash
   git clone https://github.com/shaunfischmann/HeyShaun.git
   cd HeyShaun
  ```
2. Install dependencies:
  ```bash
   pnpm install
  ```

---

## 🛠 Scripts


| Script               | Description                         |
| -------------------- | ----------------------------------- |
| `pnpm dev`           | Start all apps in development mode. |
| `pnpm dev:portfolio` | Start only the portfolio app.       |
| `pnpm build`         | Build all apps for production.      |
| `pnpm preview`       | Preview the production build.       |


---

## 📂 Project Structure

```
my-portfolio-monorepo/
├── apps/
│   ├── portfolio/     → Main portfolio app
│   └── wedding/       → Wedding site (future)
├── packages/
│   ├── ui/            → Shared UI components
│   └── design-tokens/ → Design tokens (colors, typography)
```

---

## 📦 Tech Stack

- **Astro**: Static site generator for performance and SEO.
- **Turborepo**: Optimized build pipeline.
- **pnpm**: Efficient package management.

---

## 🔧 Notes

- Each app in `apps/` is standalone.
- Shared code lives in `packages/`.
- Run `pnpm dev` to start all apps or target a specific app (e.g., `pnpm dev:portfolio`).
