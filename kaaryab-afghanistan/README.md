# KaarYab Afghanistan

> **Opportunity Finder Platform for Afghan Youth** — Built with Next.js 15, React 19, Tailwind CSS 4, React Hook Form + Zod, and LocalStorage persistence.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.5-000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Hook Form](https://img.shields.io/badge/RHF-7.83-ec5990?logo=react&logoColor=white)](https://react-hook-form.com)
[![Zod](https://img.shields.io/badge/Zod-4.4-3068b6?logo=zod&logoColor=white)](https://zod.dev)
[![License](https://img.shields.io/badge/License-MIT-brightgreen)](#license)

**EN • فارسی • پښتو** — Trilingual with RTL support

</div>

---

## 📖 Table of Contents

1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Tech Stack](#%EF%B8%8F-tech-stack)
4. [Project Structure](#-project-structure)
5. [Getting Started](#-getting-started)
6. [Pages & Routes](#-pages--routes)
7. [Reusable Components](#-reusable-components)
8. [Internationalization (i18n)](#-internationalization-i18n)
9. [Design System](#-design-system)
10. [Data Layer](#%EF%B8%8F-data-layer)
11. [Form Validation](#-form-validation)
12. [Build & Deploy](#-build--deploy)
13. [Troubleshooting](#-troubleshooting)
14. [Roadmap](#%EF%B8%8F-roadmap)
15. [License](#-license)
16. [Acknowledgments](#-acknowledgments)

---

## 🌟 Project Overview

KaarYab Afghanistan is a modern, community-focused opportunity finder platform designed specifically for Afghan students, graduates, and young professionals. It centralizes curated opportunities — jobs, internships, scholarships, remote work, volunteer roles, and skill-building programs — into a single, beautiful, accessible interface.

> **Demo project**: Uses mock data and LocalStorage. Ready to connect to real APIs.

### The Problem

Young Afghans often struggle to find relevant opportunities because:
- Opportunities are scattered across websites, Telegram, Facebook, and word-of-mouth
- No centralized filtering by category, location, work type, or deadline
- No way to bookmark or track roles of interest
- Language barriers (English-only platforms exclude Dari/Pashto speakers)

### The Solution

KaarYab Afghanistan provides:
- 🔍 Unified search + multi-dimensional filtering
- 💾 One-click saving of favorite opportunities
- 🌍 Full English / Dari / Pashto support with auto RTL
- 📊 Dashboard with stats, category distribution, and recent submissions
- ✏️ Full CRUD for community-submitted opportunities
- 🎨 Professional, accessible, dark-mode-ready UI

---

## ✨ Key Features

### Core Platform
- **Home Page** — Hero with search, category quick links (4 cards with counts), featured opportunities, 3-column "Why KaarYab?" section
- **Opportunities Listing** — Sticky sidebar filters (category, work type, deadline range, location, sort) + responsive card grid
- **Dynamic Detail Page** (`/opportunities/[id]`) — Gradient hero, description/requirements/tags sections, sidebar with deadline countdown, validated apply URL, edit/delete/favorite actions
- **Add / Edit / Delete** — Full CRUD with client-side persistence, delete confirmation via custom modal
- **Favorites Page** — Saved opportunities with local persistence
- **Dashboard** — 4 stat cards (Total / Saved / Messages / Jobs), category distribution bar chart, upcoming deadlines list, recent submissions table
- **Messages Inbox** — View messages received from contact form
- **Contact Form** — Send messages to the team (stored locally)
- **About Page** — Exactly 3 sections: Hero/Mission, Stats, CTA

### UX / DX
- **Dark & Light Mode** — Theme toggle, persisted via LocalStorage, instant transitions
- **Trilingual i18n** — English (LTR), Dari (RTL), Pashto (RTL) with automatic `<html dir>` switching
- **Fully Responsive** — Mobile-first, tested on sm/md/lg/xl breakpoints
- **Form Validation** — React Hook Form + Zod schemas with inline error messages
- **Date Picker** — Deadline field with native date input, calendar icon, `min="today"` constraint
- **Confirm Modal** — Custom glassmorphism modal (no native `confirm()`) with tone variants (danger/default)
- **Empty States** — Consistent empty-state components with clear CTAs across listing pages
- **Glassmorphism** — Backdrop blur, gradient text, subtle hover animations throughout
- **Sticky Navbar** — Transparent-blur sticky header with responsive mobile hamburger menu

---

## 🛠️ Tech Stack

| Layer | Library | Version | Purpose |
|-------|---------|---------|---------|
| **Framework** | Next.js | 15.5.20 | App Router, React Server Components |
| **UI** | React | 19.1.0 | Component model & hooks |
| **Styling** | Tailwind CSS | 4.0.0 | Utility-first CSS, dark mode, design tokens |
| **Forms** | React Hook Form | 7.83.0 | Performant form state management |
| **Validation** | Zod | 4.4.3 | Schema-based validation + TS inference |
| **Resolver** | @hookform/resolvers | 5.4.3 | Bridge RHF ↔ Zod |
| **Linting** | ESLint | 9.x + eslint-config-next | Code quality rules |
| **Persistence** | LocalStorage API | Browser | Mock CRUD, favorites, messages, theme, lang |

---

## 📁 Project Structure

```
kaaryab-afghanistan/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout (html, body, providers)
│   ├── ClientLayout.js           # Client-side Navbar/Footer wrapper
│   ├── globals.css               # Tailwind + globals
│   ├── page.js                   # Home (/)
│   ├── about/
│   │   └── page.js               # About (/about)
│   ├── opportunities/
│   │   ├── page.js               # Listing (/opportunities)
│   │   └── [id]/
│   │       └── page.js           # Detail (/opportunities/[id])
│   ├── add-opportunity/
│   │   └── page.js               # New opportunity form (/add-opportunity)
│   ├── favorites/
│   │   └── page.js               # Saved items (/favorites)
│   ├── dashboard/
│   │   └── page.js               # Stats & insights (/dashboard)
│   ├── messages/
│   │   └── page.js               # Inbox (/messages)
│   └── contact/
│       └── page.js               # Contact form (/contact)
├── components/                   # Reusable UI components
│   ├── Navbar.jsx                # Sticky header, mobile menu, theme/lang switches
│   ├── Footer.jsx                # 4-column footer with nav + lang chips
│   ├── Hero.jsx                  # (legacy) Hero component
│   ├── OpportunityCard.jsx       # Listing card w/ category badge, days-left
│   ├── OpportunityForm.jsx       # RHF+Zod form with date picker
│   ├── SearchFilter.jsx          # Sticky sidebar: category/type/deadline/sort
│   ├── DashboardCard.jsx         # Stat cards for dashboard
│   ├── EmptyState.jsx            # Reusable empty state w/ CTA
│   ├── Modal.jsx + ConfirmModal  # Glass-modal & confirm dialog w/ tones
│   ├── ThemeToggle.jsx           # Sun/moon dark-mode switch
│   └── LanguageSelector.jsx      # EN / FA / PS dropdown
├── data/
│   └── opportunities.js          # Seed / demo opportunity dataset
├── lib/
│   ├── i18n.js                   # LanguageProvider + useTranslation hook
│   └── storage.js                # LocalStorage CRUD API (opportunities, favorites, messages)
├── locales/
│   ├── en.json                   # English strings (~100 keys)
│   ├── fa.json                   # فارسی / Persian (Dari)
│   └── ps.json                   # پښتو / Pashto
├── public/                       # Static assets (SVG icons)
├── scripts/                      # Python helper scripts for data migrations
├── next.config.mjs               # Next.js config (outputFileTracingRoot)
├── postcss.config.mjs            # PostCSS (Tailwind 4 plugin)
├── eslint.config.mjs             # ESLint flat config
├── jsconfig.json                 # `@/*` → `./` alias
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.17 (LTS recommended)
- **npm** (comes with Node) or **yarn** / **pnpm**
- A modern browser (Chrome / Edge / Firefox)

### ⚠️ Windows Critical Notes

This project was built on Windows. Please read these carefully to avoid common issues:

1. **Always use `npm.cmd`** instead of bare `npm` in PowerShell to bypass execution policy restrictions.
2. **Navigate to the correct nested directory** — the repository may have extra nesting:
   ```
   kaaryab-afghanistan/
     └── kaaryab-afghanistan/
       └── kaaryab-afghanistan/   ← YOU ARE HERE (package.json lives here)
   ```
3. **Remove duplicate `package-lock.json` files** in parent directories (they confuse workspace detection):
   ```powershell
   Remove-Item "..\..\package-lock.json" -ErrorAction SilentlyContinue
   ```
4. **Dev server falls back to port 3001** if 3000 is already in use.

### Installation — Windows PowerShell

```powershell
# 1. Navigate to the innermost project directory
cd "c:\Users\DELL 7390\OneDrive\Documents\kaaryab-afghanistan\kaaryab-afghanistan\kaaryab-afghanistan"

# 2. (Optional but recommended) Remove stray parent lockfiles
Remove-Item "..\..\package-lock.json" -ErrorAction SilentlyContinue

# 3. Install dependencies
npm.cmd install

# 4. Start the development server (NODE_OPTIONS set for RAM headroom)
npm.cmd run dev
```

### Installation — macOS / Linux (bash / zsh)

```bash
cd kaaryab-afghanistan/kaaryab-afghanistan   # innermost dir
npm install
npm run dev
```

### Open the App

Visit:
- **http://localhost:3000** (default)
- **http://localhost:3001** (fallback if port 3000 is taken)

> 🔍 **Tip**: The Trae/IDE preview iframe can sometimes inject spurious `net::ERR_ABORTED` 404s. If you see those, open the URL directly in Chrome or Edge instead.

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Next.js dev server (with 4 GB heap) |
| `build` | `npm run build` | Production build + trace output |
| `start` | `npm start` | Serve the production build |
| `lint` | `npm run lint` | Run ESLint across the project |

---

## 🧭 Pages & Routes

| Route | Description | Features |
|-------|-------------|----------|
| `/` | **Home** | Hero w/ search, 4 category cards, 3 featured opportunities, Why KaarYab? |
| `/about` | **About** | Hero mission, 4-stat grid, CTA section (exactly 3 sections as per spec) |
| `/opportunities` | **Listing** | Sticky SearchFilter sidebar + responsive OpportunityCard grid + EmptyState |
| `/opportunities/[id]` | **Detail** | Gradient header, description, requirements, tags, deadline countdown, apply link, edit/delete/save |
| `/add-opportunity` | **New Opportunity** | RHF + Zod form, calendar date picker, dropdowns for category/work type |
| `/favorites` | **Favorites** | Filtered list of saved opportunities with empty-state guidance |
| `/dashboard` | **Dashboard** | 4 stat cards, category distribution bar chart, upcoming deadlines, recent submissions table |
| `/messages` | **Messages Inbox** | Received messages with sender, subject, date, read/unread |
| `/contact` | **Contact** | Contact form (name/email/subject/message) saved to LocalStorage |

---

## 🧩 Reusable Components

All components live in [components/](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/components) and are reused across pages to ensure consistency.

| Component | File | Purpose |
|-----------|------|---------|
| **Navbar** | [Navbar.jsx](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/components/Navbar.jsx) | Sticky header with active-route highlighting, responsive hamburger, theme + language toggles |
| **Footer** | [Footer.jsx](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/components/Footer.jsx) | 4-column layout: brand + 2 nav sections + copyright; glassmorphism note card |
| **OpportunityCard** | [OpportunityCard.jsx](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/components/OpportunityCard.jsx) | Listing card with gradient category badge, work-type chip, days-left countdown, heart button |
| **OpportunityForm** | [OpportunityForm.jsx](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/components/OpportunityForm.jsx) | Reusable add/edit form: RHF + Zod, native date picker with calendar SVG icon, min date constraint |
| **SearchFilter** | [SearchFilter.jsx](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/components/SearchFilter.jsx) | Sticky sidebar: keyword search, category, work type, deadline window, sort dropdown, result count |
| **DashboardCard** | [DashboardCard.jsx](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/components/DashboardCard.jsx) | Counter stat card with gradient icon tile and optional trend line |
| **EmptyState** | [EmptyState.jsx](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/components/EmptyState.jsx) | Consistent empty state: icon + heading + description + CTA button |
| **Modal** | [Modal.jsx](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/components/Modal.jsx) | Base glassmorphism modal: ESC-to-close, body-scroll lock, fade/zoom animations |
| **ConfirmModal** | [Modal.jsx](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/components/Modal.jsx#L40-L90) | Confirmation dialog (no native `alert`): supports `danger` / default tones |
| **ThemeToggle** | [ThemeToggle.jsx](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/components/ThemeToggle.jsx) | Sun/moon switcher with smooth class transitions |
| **LanguageSelector** | [LanguageSelector.jsx](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/components/LanguageSelector.jsx) | EN / فارسی / پښتو dropdown; auto-switches `dir` and `lang` |

---

## 🌍 Internationalization (i18n)

**3 Languages, Zero Dependencies** — a lightweight custom context-based solution in [lib/i18n.js](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/lib/i18n.js):

```
┌─────────────┬──────────┬─────────┐
│ Language    │ Code     │ Dir     │
├─────────────┼──────────┼─────────┤
│ English     │ `en`     │ LTR     │
│ فارسی (Dari)│ `fa`     │ RTL     │
│ پښتو (Pashto)│ `ps`    │ RTL     │
└─────────────┴──────────┴─────────┘
```

### How it works

1. **`LanguageProvider`** wraps the app in [layout.js](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/app/layout.js#L14-L16)
2. **`useTranslation()`** hook exposes `{ language, setLanguage, t }`
3. Translation files are JSON in `locales/` — keys are dot-separated: `t("nav.addOpportunity")`
4. Selecting a language:
   - Persists to `localStorage["kaarYab-language"]`
   - Sets `<html lang>` and `<html dir>` (auto RTL for FA/PS)
5. Missing keys gracefully fall back to the raw key string (no console errors)

### Example

```jsx
const { t } = useTranslation();
return <h1>{t("home.heroTitle")}</h1>;
```

---

## 🎨 Design System

### Typography

| Role | Classes | Usage |
|------|---------|-------|
| Headings | `font-extrabold text-slate-900 dark:text-white` | Page titles, section heads |
| Subtitles | `font-medium text-slate-600 dark:text-slate-300` | Descriptions, meta |
| Body | `leading-relaxed` | Paragraph text |

### Colors & Visual Effects

- **Primary palette**: Blue → Indigo → Violet gradients (brand)
- **Category gradients**:
  - Job: `from-blue-500 to-indigo-600`
  - Internship: `from-emerald-500 to-teal-600`
  - Scholarship: `from-purple-500 to-violet-600`
  - Remote work: `from-orange-500 to-amber-600`
- **Glassmorphism**: `backdrop-blur-sm` + `bg-white/10` + `border-white/20` on overlays
- **Gradient text**: `bg-clip-text text-transparent` for accent text
- **Rounded corners**: `rounded-2xl` (cards), `rounded-3xl` (sections), `rounded-full` (chips, buttons)
- **Shadows**: `shadow-lg` / `shadow-xl` on cards; `hover:shadow-2xl` + `hover:-translate-y-0.5` for micro-interactions
- **Dark mode**: Strict `dark:` variants on every color token — no unstyled surfaces

### Spacing Convention

- Top-level page containers always use `pt-8 md:pt-12` (per spec)
- Consistent `space-y-10 / gap-6 / gap-8 / gap-10` rhythm
- Cards use `p-6 sm:p-8` for inner padding

---

## 🗄️ Data Layer

### Storage API ([lib/storage.js](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/lib/storage.js))

All data is stored in the browser's `localStorage`. The library exposes:

| Function | Purpose |
|----------|---------|
| `getStoredOpportunities()` | Returns all opportunities (seeds on first run) |
| `getOpportunityById(id)` | Fetch single opportunity |
| `addOpportunity(data)` | Create new (UUID auto-generated) |
| `updateOpportunity(updated)` | Replace existing by `id` |
| `deleteOpportunity(id)` | Delete by `id` |
| `isFavorite(id)` | Check favorite status |
| `getFavorites()` | Get saved list |
| `toggleFavorite(opportunity)` | Toggle + return updated list |
| `getMessages()` / `addMessage()` | Contact form inbox |
| `getTheme()` / `saveTheme(t)` | Dark/light preference |

### Demo Dataset ([data/opportunities.js](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/data/opportunities.js))

Seeded with realistic sample opportunities covering: Job, Internship, Scholarship, Online course, Remote work, Volunteer work, Advanced Training, and Professional Development.

---

## ✅ Form Validation

All forms use **React Hook Form v7 + Zod v4** via `@hookform/resolvers/zod`.

### OpportunityForm Schema (simplified)

```ts
const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  organization: z.string().min(2, "Organization is required"),
  category: z.enum([/* 8 categories */]),
  type: z.enum(["Remote", "On-site", "Hybrid"]),
  location: z.string().min(2),
  deadline: z.string().refine(d => new Date(d) >= new Date(today),
    { message: "Deadline cannot be in the past" }),
  description: z.string().min(20),
  requirements: z.array(z.string().min(2)).default([]),
  tags: z.array(z.string().min(1)).default([]),
  applyLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});
```

Validation runs on submit + per-field onChange via RHF's `formState.errors`. The `deadline` input uses a native date picker with `min={todayStr()}` and a custom SVG calendar icon.

---

## 🚢 Build & Deploy

### Production Build

```bash
npm run build
```

Output goes to `.next/`. The config in [next.config.mjs](file:///C:/Users/DELL%207390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan/next.config.mjs) sets:

- `outputFileTracingRoot: __dirname` — ensures standalone traces use the correct root (fixes nested-repo deploy issues)
- `reactStrictMode: false` — avoids double-mount flicker for LocalStorage reads in dev

### Run Production Locally

```bash
npm start
# → http://localhost:3000
```

### Deploy to Vercel (Recommended)

1. Push the innermost `kaaryab-afghanistan` directory to GitHub/GitLab/Bitbucket
2. In Vercel, **Import Project** → point at the repo
3. Set **Root Directory** to the innermost folder (Vercel detects `package.json` automatically)
4. Click **Deploy** — zero-config (Next.js is first-class on Vercel)

### Deploy to Other Platforms

- **Netlify / Cloudflare Pages**: Use `npm run build` as build command, `.next` as output (or use their Next.js presets)
- **Docker / Self-hosted**: `next build` → `next start` behind a reverse proxy (nginx, Caddy)

---

## 🔧 Troubleshooting

### 1. `ChunkLoadError: Loading chunk app/layout failed.` + `SyntaxError: Invalid or unexpected token` + `net::ERR_ABORTED`

**Cause**: Corrupted `.next/` build cache from HMR hot-updates (very common after rapid editing).

**Fix — Windows PowerShell**:

```powershell
cd "c:\Users\DELL 7390\OneDrive\Documents\kaaryab-afghanistan\kaaryab-afghanistan\kaaryab-afghanistan"
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item -Recurse -Force .next
Remove-Item "..\..\package-lock.json" -ErrorAction SilentlyContinue
npm.cmd install
npm.cmd run dev
```

### 2. Port 3000 already in use

The dev script automatically falls back to **port 3001**. Just open `http://localhost:3001`.

### 3. PowerShell: `npm.ps1 cannot be loaded because running scripts is disabled`

Always use **`npm.cmd`** instead of `npm` in PowerShell, OR:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### 4. Translations not showing / wrong language

Check DevTools → Application → Local Storage for key `kaarYab-language`. It should be `en`, `fa`, or `ps`. Delete it and refresh to reset.

### 5. Duplicate key / workspace detection errors

Look for extra `package-lock.json` files above the project root and delete them.
```powershell
# From the project root, check 2 levels up:
Test-Path "..\package-lock.json"
Test-Path "..\..\package-lock.json"
# Remove any found
```

### 6. Styles look broken (Tailwind not applying)

Ensure `postcss.config.mjs` and Tailwind 4's `@import "tailwindcss";` in `globals.css` are intact. Run:
```powershell
npm.cmd run dev   # Restart forces PostCSS rebuild
```

---

## 🗺️ Roadmap

Short- and medium-term extensions (ready when you are):

- [ ] **Authentication** — Sign up / login (NextAuth.js / Supabase Auth)
- [ ] **User Profiles** — Applicant & organization profiles, CV upload
- [ ] **Admin Moderation Queue** — Approve/reject community submissions
- [ ] **Email/SMS Notifications** — Expiring deadlines, new matches by preference
- [ ] **Real API Integration** — Swap LocalStorage for Supabase / PostgreSQL
- [ ] **PDF CV Builder** — Generate styled CVs from profile
- [ ] **Application Tracker** — Track applied → interview → offer pipeline
- [ ] **PWA Support** — Offline mode, installable
- [ ] **Advanced Search** — Boolean queries, saved filters, alert subscriptions
- [ ] **Social Sharing** — Share cards to WhatsApp/Telegram/LinkedIn

---

## 📝 License

This project is licensed under the **MIT License** — feel free to use it for educational, non-commercial, or commercial purposes.

---

## 🙏 Acknowledgments

Built with ❤️ for the **Afghan youth community** as a capstone project.

- **Framework**: [Next.js Team](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Forms**: [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **Inspiration**: Every student and job-seeker who deserves a fair shot at their next opportunity.

---

<div align="center">

**KaarYab Afghanistan** — Opportunities for every Afghan, everywhere.

</div>
