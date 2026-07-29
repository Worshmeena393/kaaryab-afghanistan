# 🌟 KaarYab Afghanistan

> **Opportunity Finder Platform for Afghan Youth** — A modern web application designed to help Afghan students, graduates, and young professionals discover career and educational opportunities, including jobs, internships, scholarships, remote work, online courses, training programs, and volunteer opportunities.

---

## 📌 Project Status

- ✅ Completed — Final Capstone Submission
- ✅ Fully Responsive — Mobile (375px) · Tablet (768px) · Desktop (1366px)
- ✅ End-to-End CRUD Functionality
- ✅ Dark / Light Mode with Persistent User Preferences
- ✅ Multi-language Support — English, فارسی (Dari), and پښتو (Pashto)
- ✅ Right-to-Left (RTL) Layout Support for Dari and Pashto
- ✅ Source Control — Git & GitHub Repository
- ✅ Production Deployment — Vercel

---

## 📚 Project Overview

**KaarYab Afghanistan** centralizes career-building opportunities for Afghan youth into a single, beautifully designed, accessible platform. Instead of searching across disjointed websites, Telegram channels, and social media groups, users browse a curated and filterable catalog — all in their preferred language and theme.

Built on the Next.js 15 App Router with React Server Components (RSC) by default, client components isolated to feature boundaries, a Tailwind CSS 4 utility-first design system, and a zero-dependency React Context i18n layer with automatic RTL direction switching.

---

## 🎯 Purpose & Problem Statement

### The Problem

Young Afghans face consistent barriers when searching for growth opportunities:
- Information is scattered across websites, social platforms, and private groups
- No unified way to search, filter, or sort across opportunity types
- No mechanism to bookmark or track roles of interest
- English-only listings exclude Dari and Pashto speakers from discovering opportunities

### The Solution

KaarYab Afghanistan addresses each barrier with a deliberate feature:
| Barrier | Feature |
|---|---|
| Scattered information | Unified listing of 8 opportunity categories |
| Poor discoverability | Keyword search + 5 filter dimensions + 2 sort orders |
| No bookmarking | Favorites system with LocalStorage persistence |
| Language exclusion | Full English / فارسی (Dari) / پښتو (Pashto) translations + automatic RTL |

---

## 👥 Target Users

The platform is designed for, and built with empathy toward:
- 🎓 **Students** — searching for internships, scholarships, online courses
- 🎓 **Fresh Graduates** — looking for entry-level jobs and training
- 💼 **Job Seekers** — browsing on-site and remote roles
- 👩 **Women seeking flexible work** — prioritizing remote/hybrid filters
- 📚 **Scholarship Applicants** — tracking deadlines for funding programs
- 🏢 **Organizations sharing opportunities** — submitting listings via the validated form

---

## 🛠️ Technology Stack

Every rubric-required technology is used explicitly:

| Layer | Technology | Version | Usage |
|---|---|---|---|
| **Framework** | Next.js App Router | 15.5.x | RSC-first routing, metadata, Server Components |
| **UI** | React | 19.x | Component model + hooks (useState, useEffect, useMemo, useRouter, useParams, useSearchParams) |
| **Styling** | Tailwind CSS | 4.x + PostCSS plugin | Utility-first design system, dark mode via `dark:` variants |
| **Language** | JavaScript | ES2024 | Modern syntax, optional chaining, nullish coalescing, private field conventions |
| **Forms** | React Hook Form | 7.83.x | Uncontrolled form state, minimal rerenders, inline errors via `formState.errors` |
| **Validation** | Zod | 4.4.x | Schema validation with type guards, refinement rules (deadline ≥ today, URL format) |
| **State Management** | React Context API | Built-in | `LanguageProvider` wraps the app; exposes `useTranslation()` hook |
| **Persistence** | LocalStorage API | Browser (window) | 5 storage buckets for opportunities, favorites, messages, theme, language |
| **API Layer** | Next.js API Routes | App Router `route.js` | 3 handlers: `/api/opportunities`, `/api/opportunities/[id]`, `/api/contact` |
| **Version Control** | Git + GitHub | — | Default branch `main`, repo at `Worshmeena393/kaaryab-afghanistan` |
| **Hosting/CDN** | Vercel | — | Production deploy at `kaaryab-afghanistan-theta.vercel.app` |

---

## ✨ Core Features

### 1. Opportunity Discovery

| Capability | Details |
|---|---|
| **Browse** | Responsive card grid collapses 1 col (sm) → 2 col (md) → 3 col (lg) |
| **Keyword search** | Debounced substring match against opportunity titles |
| **Filter by Category** | 8 categories: Job · Internship · Scholarship · Online Course · Remote Work · Training · Volunteer · Professional Development |
| **Filter by Location** | Dropdown list populated from all unique locations in seed + user-submitted data |
| **Filter by Work Type** | Remote · On-site · Hybrid |
| **Filter by Deadline Window** | All · This Week · This Month · Expiring Soon (≤ 7 days) |
| **Sort** | Deadline ascending (soonest first) · Deadline descending (farthest first) |

### 2. CRUD System — Create / Read / Update / Delete

| Operation | UI | Persistence | API Equivalent |
|---|---|---|---|
| **Create** | Validated form at `/add-opportunity` | `addOpportunity()` → `kaarYab-opportunities` | `POST /api/opportunities` |
| **Read (list)** | `/opportunities` grid + `/` featured cards | `getStoredOpportunities()` | `GET /api/opportunities` |
| **Read (detail)** | `/opportunities/[id]` gradient layout | `getOpportunityById()` | `GET /api/opportunities/:id` |
| **Update** | Inline edit form on detail page | `updateOpportunity()` | `PUT /api/opportunities/:id` |
| **Delete** | Glassmorphism ConfirmModal (`danger` tone) | `deleteOpportunity()` | `DELETE /api/opportunities/:id` |

Forms are powered by **React Hook Form** registered inputs and validated with a **Zod schema** (`zodResolver`). Rules:
- Title: min 3 chars
- Organization: min 2 chars
- Category: enum of 8 values
- Work Type: enum of 3 values
- Location: min 2 chars
- Deadline: string ≥ today (via `refine()`)
- Description: min 20 chars
- Apply Link: valid URL format
- Requirements + Tags: dynamic arrays

### 3. Favorites System

| Capability | Implementation |
|---|---|
| Save | Heart button on cards and detail page — `toggleFavorite(opp)` |
| Remove | Toggle again or "Remove from Favorites" button on `/favorites` |
| View | Dedicated route `/favorites` with card grid |
| Storage Bucket | `localStorage["kaarYab-favorites"]` — array of opportunity IDs |

### 4. Dashboard

All 9 dashboard requirements from the rubric are implemented as 4 layout regions:

| Region | Widgets |
|---|---|
| **Hero banner** | "Your opportunity overview" subtitle + CTA link to `/add-opportunity` |
| **6 Stat cards (grid)** | Total · Jobs · Scholarships · Internships · Favorites count · Messages count |
| **Upcoming deadlines + Insights** | Top N opportunities sorted by days-left, colored urgency tiles (red ≤ 3 d · amber ≤ 7 d · blue else) + Insights action cards for Favorites / Messages |
| **Category Distribution + Recent Submissions** | Horizontal progress-bar bar chart with category counts + scrollable table with recent 5 submissions |

### 5. Contact & Messages

| Area | Details |
|---|---|
| **Contact form fields** | Name · Email · Subject · Message |
| **Validation** | Zod in-app — API handler uses RFC-5322 regex email check |
| **Client-side storage** | `saveMessage()` writes to storage bucket |
| **Messages inbox** | Route `/messages` — list/search/single-delete/clear-all |
| **REST API** | `POST /api/contact` (validation) — `GET /api/contact` (list) |

### 6. Multi-language System

| Property | Value |
|---|---|
| **Languages** | English (`en`) LTR · Persian/Dari (`fa`) RTL · Pashto (`ps`) RTL |
| **Provider** | `LanguageProvider` at root of app tree — React Context, zero dependencies |
| **Hook** | `useTranslation()` → `{ language, setLanguage, t }` |
| **Translation files** | `locales/en.json`, `locales/fa.json`, `locales/ps.json` |
| **RTL** | Selecting FA/PS sets `<html dir="rtl">` automatically; Tailwind `text-right` patterns flow correctly |
| **Persistence** | `localStorage["kaarYab-language"]` — remembered across sessions |

### 7. Dark Mode

| Property | Value |
|---|---|
| Modes | Light (default) + Dark |
| Implementation | Tailwind `class` strategy — `dark:` prefix on every color token |
| Toggle | Sun/moon `ThemeToggle` component in Navbar |
| Persistence | `localStorage["kaarYab-theme"]` |

---

## 🧩 Reusable Components

All 12 components are extracted, typed via JSDoc convention, and reused across multiple pages:

| Component | File | Reuse locations |
|---|---|---|
| **Navbar** | `components/Navbar.jsx` | Every page (ClientLayout) |
| **Footer** | `components/Footer.jsx` | Every page (ClientLayout) |
| **Hero** | `components/Hero.jsx` | Home page + About CTA |
| **OpportunityCard** | `components/OpportunityCard.jsx` | Home · Opportunities · Favorites · Dashboard featured |
| **OpportunityForm** | `components/OpportunityForm.jsx` | Add route · Detail edit mode |
| **SearchFilter** | `components/SearchFilter.jsx` | Opportunities page sticky sidebar |
| **DashboardCard** | `components/DashboardCard.jsx` | Dashboard 6 stat tiles + Insights cards |
| **EmptyState** | `components/EmptyState.jsx` | Opportunities · Favorites · Messages · Dashboard variants |
| **Modal** | `components/Modal.jsx` | Base dialog primitive with ESC-to-close, scroll-lock |
| **ConfirmModal** | `components/ConfirmModal.jsx` | Delete confirmations (danger tone) + general confirm (default tone) |
| **ThemeToggle** | `components/ThemeToggle.jsx` | Navbar |
| **LanguageSelector** | `components/LanguageSelector.jsx` | Navbar · Footer language chips |

---

## 🧭 Pages & Routes

### Application Routes

| Route | Page Name | Purpose |
|---|---|---|
| `/` | **Home** | Hero with search · 4 category stat cards · 3 featured opportunities · 3-column "Why KaarYab?" section · CTA |
| `/about` | **About** | Mission statement · 4-stat grid · Dual CTA buttons — exactly 3 sections per project constraint |
| `/opportunities` | **Opportunities Listing** | Sticky SearchFilter + responsive card grid · sort · filter · result-count header · EmptyState |
| `/opportunities/[id]` | **Opportunity Detail** | Gradient hero · Description · Requirements · Tags · Sidebar deadline countdown · Edit/Delete/Save actions · Validated Apply Link · 404 for bad IDs |
| `/add-opportunity` | **Add / Edit Form** | Reusable OpportunityForm · RHF + Zod · Calendar date picker · Category/work-type selects · Cancel |
| `/favorites` | **Favorites / Saved** | Heart-filled cards · EmptyState with "Browse Opportunities" CTA |
| `/dashboard` | **Analytics Dashboard** | Stat cards · upcoming deadlines · category chart · recent table · Insights cards · Favorites/Messages tiles |
| `/contact` | **Contact Form** | 4-field validated form · Success confirmation · writes to Messages bucket |
| `/messages` | **Messages Inbox** | Table of submissions · search · per-row delete · clear-all action · EmptyState |

### API Routes

| Route | Methods | Behavior |
|---|---|---|
| `/api/opportunities` | **GET** · **POST** | GET returns `{ count, data, meta }` · POST validates payload → `201 Created` |
| `/api/opportunities/[id]` | **GET** · **PUT** · **DELETE** | GET detail (404 if missing) · PUT updates (404 if missing) · DELETE returns deletedId |
| `/api/contact` | **GET** · **POST** | GET returns `{ count, data }` · POST validates email regex + required → `201 Created` with thank-you message |

---

## 📂 Project Structure


```text
kaaryab-afghanistan/                 ← repo root (github.com/Worshmeena393/kaaryab-afghanistan)
│
├── app/                             # Next.js App Router
│   ├── layout.js                    # Root layout, metadata, providers
│   ├── ClientLayout.js              # Client-side Navbar/Footer wrapper
│   ├── globals.css                  # Tailwind 4 @import + CSS custom properties
│   ├── page.js                      # Home                      /
│   ├── about/
│   │   └── page.js                  # About                     /about
│   ├── opportunities/
│   │   ├── page.js                  # Listing                   /opportunities
│   │   └── [id]/
│   │       └── page.js              # Dynamic detail (R)        /opportunities/[id]
│   ├── add-opportunity/
│   │   └── page.js                  # C reate / U pdate form    /add-opportunity
│   ├── favorites/
│   │   └── page.js                  # Saved items               /favorites
│   ├── dashboard/
│   │   └── page.js                  # Analytics                 /dashboard
│   ├── messages/
│   │   └── page.js                  # Inbox D elete             /messages
│   ├── contact/
│   │   └── page.js                  # Contact form C reate      /contact
│   └── api/
│       ├── opportunities/
│       │   ├── route.js             # GET list / POST create
│       │   └── [id]/
│       │       └── route.js         # GET detail / PUT update / DELETE remove
│       └── contact/
│           └── route.js             # GET inbox / POST message
│
├── components/                      # 12 reusable UI components
│   ├── Navbar.jsx                   # Sticky header + mobile hamburger + theme/lang toggles
│   ├── Footer.jsx                   # 4-column footer: brand · 2 nav sections · quick links · copyright
│   ├── Hero.jsx                     # Reusable gradient hero block
│   ├── OpportunityCard.jsx          # Listing card w/ category gradient, work-type chip, days badge, heart toggle
│   ├── OpportunityForm.jsx          # RHF + Zod add/edit form w/ calendar date picker
│   ├── SearchFilter.jsx             # 5 filters + 1 sort + result count sticky sidebar
│   ├── DashboardCard.jsx            # Stat counter with gradient icon tile + optional trend
│   ├── EmptyState.jsx               # Reusable icon + heading + description + CTA
│   ├── Modal.jsx                    # Base glassmorphism, ESC close, scroll lock, animate
│   ├── ConfirmModal.jsx             # Confirm dialog (danger / default tones) w/ trash/check SVG icons
│   ├── ThemeToggle.jsx              # Sun → moon SVG swap, smooth class transitions
│   └── LanguageSelector.jsx         # EN / FA / PS dropdown, persists, flips <html dir>
│
├── data/
│   └── opportunities.js             # 14 seed demo opportunities, dynamic deadlines via addDays(n)
│
├── lib/
│   ├── i18n.js                      # LanguageProvider, useTranslation(), translations JSON
│   └── storage.js                   # LocalStorage CRUD API: 14 functions, try/catch safe, ID normalized
│
├── locales/
│   ├── en.json                      # English strings
│   ├── fa.json                      # فارسی / Dari strings
│   └── ps.json                      # پښتو / Pashto strings
│
├── public/                          # Static SVG assets, icons, screenshots
├── scripts/                         # Python helper scripts (data migrations / tooling)
│
├── next.config.mjs                  # Next.js config (outputFileTracingRoot, reactStrictMode)
├── postcss.config.mjs               # PostCSS + Tailwind 4 plugin
├── eslint.config.mjs                # ESLint 9 flat config — eslint-config-next
├── jsconfig.json                    # `@/*` import alias → `./`
├── package.json                     # Dependencies, scripts
└── README.md                        # ← This file
```

---

## 📱 Responsive Design

Breakpoints follow Tailwind defaults plus an explicit project rule: layouts collapse from sidebar+content at **≥ 1024 px (lg)** to stacked/single-column below.

| Tier | Width | Grid behavior | Corner radius |
|---|---|---|---|
| 📱 **Mobile** | 375 px (iPhone SE baseline) | 1-col cards · 2-col stats · stacked filters · hamburger menu | `rounded-[1.5rem]` / `rounded-2xl` to avoid clipping |
| 📋 **Tablet / iPad** | 768 px | 2-col cards · 2-col stats · horizontal search + filter row | `rounded-[2rem]` / `rounded-3xl` |
| 💻 **Laptop / Desktop** | 1366 px (and up) | 3-col cards · 3-col stat tiles · 2-col dashboard region · sticky sidebar filters | `rounded-[2.5rem]` / `rounded-3xl` |

Coverage verified against the codebase: **591 responsive Tailwind classes** in `app/` and **129** in `components/`. All interactive elements use `min-h-[44px]` / `min-w-[44px]` WCAG touch-target minimums on mobile.

---

## 💾 LocalStorage Data Layer

Every read/write is wrapped in `try/catch` inside `lib/storage.js` — corrupt storage or Safari private mode won't crash the app. IDs are normalized to strings to match URL `params.id` (always a string).

| Storage Bucket (`localStorage[…]`) | Shape | Used by |
|---|---|---|
| `kaarYab-opportunities` | `Opportunity[]` (seeds merged with custom submissions, deadline refresh for seed IDs 1–14) | Listing · Detail · CRUD forms · Dashboard stats · Dashboard upcoming |
| `kaarYab-favorites` | `opportunityId[]` | OpportunityCard heart toggle · Favorites page · Dashboard stats tile |
| `kaarYab-messages` | `Message[]` (from contact form) | `/messages` inbox · Dashboard stats tile · `GET /api/contact` |
| `kaarYab-theme` | `"light"` \| `"dark"` | ThemeToggle · initial `<html class>` class list on layout hydration |
| `kaarYab-language` | `"en"` \| `"fa"` \| `"ps"` | LanguageSelector · `<html lang>`, `<html dir>` · `useTranslation()` |

---
## 🚀 Getting Started

### Prerequisites

Before running the project, make sure you have:

- **Node.js ≥ 18.17 LTS**
- **npm 9+** (included with Node.js)
- A modern browser (Chrome, Edge, or Firefox ≥ 120)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Worshmeena393/kaaryab-afghanistan.git
```

### 2. Navigate to Project Folder

```bash
cd kaaryab-afghanistan
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Open Application

Visit:

```
http://localhost:3000
```

If port 3000 is unavailable, Next.js will automatically use another available port.

---

### Available Scripts

| Script | Command | Description |
|---|---|---|
| Development Server | `npm run dev` | Starts development mode with hot reload |
| Production Build | `npm run build` | Creates optimized production build |
| Start Production | `npm start` | Runs production server |
| Lint | `npm run lint` | Checks code quality |

---

### Production Verification

✅ Production build completed successfully  
✅ Next.js routes generated successfully  
✅ API routes tested successfully  
✅ ESLint checks passed



## 🧪 Testing the API Routes

After `npm run dev`, paste any of these URLs directly in your browser to see live JSON responses:

| Endpoint | Method | Expected Response |
|---|---|---|
| `http://localhost:3000/api/opportunities` | `GET` | `{ count: 14, data: Array<Opportunity>, meta: { source, timestamp } }` |
| `http://localhost:3000/api/opportunities/1` | `GET` | Single opportunity `{ data, meta }` (404 if not found) |
| `http://localhost:3000/api/contact` | `GET` | `{ count, data: Array<Message>, meta }` |

For POST/PUT/DELETE routes, use cURL, Postman, or the frontend form pages.

---

## 🚢 Deployment

### GitHub (Source Control)

- **Repository:** https://github.com/Worshmeena393/kaaryab-afghanistan
- **Default Branch:** `main`

Clone repository:

```bash
git clone https://github.com/Worshmeena393/kaaryab-afghanistan.git
```

---

### Vercel (Production Hosting)

**Production Website:**

https://kaaryab-afghanistan-six.vercel.app/

The application is deployed using Vercel with automatic Next.js optimization and production builds.

### Deployment Process

1. Push the project repository to GitHub.
2. Connect the GitHub repository to Vercel.
3. Select Next.js as the framework preset.
4. Deploy the application.

No environment variables are required because the application uses LocalStorage-based persistence.

### Deployment Verification

✅ GitHub repository connected successfully  
✅ Production deployment completed on Vercel  
✅ Next.js production build verified  
✅ Responsive application available across devices

## 📸 Screenshots

The following screenshots demonstrate the main features, responsive layouts, and user experience of KaarYab Afghanistan across different devices and themes.

### Screenshot Coverage

| Device | Resolution | Included Screenshots |
| ---------------- | ---------- | -------------------- |
| 📱 Mobile | 375px | Home, About, Opportunities, Detail, Add Opportunity Form, Favorites, Dashboard, Contact |
| 📋 Tablet | 768px | Home, Dashboard, Opportunities with responsive layouts |
| 💻 Desktop | 1366px | Home, About, Detail, Dashboard, Form, Contact |
| 🌙 Dark Mode | All devices | Theme switching and dark interface examples |
| 🌐 Localization | Various | English, فارسی (Dari), پښتو (Pashto), RTL layout examples |
| 📝 Form Features | Various | Validation messages, CRUD operations, and confirmation dialogs |

### Screenshot Highlights

The screenshots demonstrate:

- ✅ Responsive design across mobile, tablet, and desktop
- ✅ Light and dark mode interfaces
- ✅ Multi-language support with RTL layouts
- ✅ Opportunity search and filtering
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Dashboard analytics and statistics
- ✅ Contact form and message management
- ✅ Form validation and user feedback
### Submission Zip Checklist

1. Home Page — hero + category cards + featured
2. About Page — 3 sections, mission + stats + CTA
3. Opportunities Page — sidebar 5 filters + card grid + sort dropdown open
4. Opportunity Detail — gradient hero, sidebar deadline tile, Edit/Delete/Save buttons
5. Add Opportunity Form — showing inline Zod validation errors for Title/Deadline
6. Favorites Page — 3+ heart-filled cards + EmptyState fallback
7. Dashboard — 6 stat tiles + upcoming deadlines urgency colors + category chart + recent table
8. Contact Form — after-success "Message sent ✓" banner
9. Messages Page — full inbox table with delete/clear-all actions
10. Dark Mode — Dashboard (laptop), ideally with theme toggle clicked
11. Mobile — Home + Dashboard (iPhone SE 375 px)
12. Tablet — Opportunities (iPad mini 768 px)

---

## 📚 Demo Data Notice

This project uses demo/sample opportunity data for educational purposes. The displayed listings are not real company openings or live programs. A footer banner is rendered on every page of the app:

> 📚 **Note**: This website uses Demo Data for educational purposes.

---

## 🔮 Future Improvements

A 10-item medium-term roadmap:

1. 🔐 **Authentication** — sign-up / login with email + OAuth (Google/GitHub) via NextAuth or Supabase Auth
2. 🏢 **Organization accounts** — verified profiles, logo upload, branded opportunity listings, apply analytics
3. 🧑‍💼 **Admin approval queue** — moderator dashboard to approve/reject community-submitted opportunities
4. 🗄️ **Real database integration** — replace LocalStorage with Supabase PostgreSQL / MongoDB Atlas via route handlers
5. 📧 **Notifications** — deadline reminders, new matches by saved preferences (email + optional SMS)
6. 🤖 **AI opportunity recommendations** — semantic vector search + collaborative filtering
7. 📄 **CV / Résumé builder** — styled PDF generation from applicant profile fields
8. 🚦 **Application tracker** — pipeline: Saved → Applied → Interview → Offer
9. 📱 **Progressive Web App** — installable, offline-capable, push notifications
10. 🔍 **Advanced boolean search** — `remote AND scholarship OR internship`, saved filter alerts

---

## 🎓 Learning Outcomes

Through this 6-week capstone, I mastered:
- Building production apps with the **Next.js 15 App Router** — RSC boundaries, Server Components, metadata, route handlers, dynamic `[id]` segments
- Architecting 12 **reusable React components** with clean prop contracts — Navbar through to LanguageSelector
- Designing pixel-perfect, WCAG-compliant interfaces with **Tailwind CSS 4** across Mobile / Tablet / Desktop breakpoints
- Building an end-to-end **CRUD system** with UI forms, a safe storage layer, and corresponding REST API route handlers
- Writing robust **Next.js API Routes** with proper HTTP verbs, status codes, validation, and 404 handling
- Validating forms end-to-end with **React Hook Form + Zod** — schema-driven error UX
- Centralizing state for i18n with the **React Context API** + zero-dependency translation hook
- Implementing a resilient LocalStorage persistence layer with **try/catch wrappers** + ID normalization
- Executing a correct **Git + GitHub workflow** — atomic commits, `main` default branch, clean remote structure
- Debugging and deploying a real-world app on **Vercel** — handling nested `outputFileTracingRoot` and port conflicts

---

---

## 👩‍💻 Developer

### Worshmeena Qayoumi

**Full-Stack Web Developer | Code to Inspire (CTI)**

KaarYab Afghanistan was developed as a final capstone project to create a meaningful digital solution for Afghan youth by improving access to career, education, and professional development opportunities.

---

## 📄 License


MIT License — free for educational and commercial use.

---

# 🌟 KaarYab Afghanistan — 2026 

Built with ❤️ to empower Afghan youth through accessible technology and opportunity discovery.

Thank you for exploring KaarYab Afghanistan!
