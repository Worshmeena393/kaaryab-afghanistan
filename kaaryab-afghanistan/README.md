# KaarYab Afghanistan

### Opportunity Finder Platform for Afghan Youth

---

## Project Overview

KaarYab Afghanistan is a modern, community-focused opportunity finder platform built with **Next.js**, **React**, and **Tailwind CSS**. It helps students, graduates, and young professionals discover curated opportunities in one centralized place—including jobs, internships, scholarships, remote work, and skill-building programs.

> **Note**: This project uses demo data for educational purposes.

---

## Problem It Solves

Many Afghan youth face barriers when searching for career and learning opportunities. Information is often scattered across websites, social media, and community groups, making it difficult to stay updated on relevant roles. KaarYab Afghanistan addresses this by:
- Bringing together diverse opportunities in a single, easy-to-use interface
- Enabling search, filtering, and sorting to find roles quickly
- Allowing users to save favorite opportunities for later
- Providing a simple way to submit new opportunities to the community

---

## Features

### Core Features
- **Home Page**: Clean hero section + featured opportunities
- **Opportunities Listing**: Search, filter by category/location/type/deadline, and sort
- **Dynamic Details Page**: Full opportunity information with apply button
- **Save Opportunities**: Bookmark roles and access them in favorites page
- **Add/Edit/Delete Opportunities**: Full CRUD functionality (persisted to localStorage)
- **Dashboard**: Stats overview, upcoming deadlines, and community insights
- **Messages & Contact**: Inbox for user messages + contact form

### UI/UX Features
- **Dark & Light Mode**: Theme toggle with local persistence
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Clean cards, smooth transitions, and intuitive navigation

---

## Technologies Used

| Tech | Purpose |
|------|---------|
| Next.js 15 | App Router, SSR/CSR |
| React 19 | Component library & state |
| Tailwind CSS 4 | Modern styling & dark mode |
| LocalStorage | Data persistence for opportunities, favorites, and messages |
| React Hooks | useState, useEffect for client-side logic |

---

## How to Run Locally

Follow these steps to set up and run KaarYab Afghanistan locally:

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd kaaryab-afghanistan
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open the app in your browser**:
   Visit [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal)

---

## Build & Deploy

### Build for Production
Create an optimized production build:
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
This project is ready to deploy to Vercel—just connect your Git repository!

---

## App Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with featured opportunities |
| `/about` | About KaarYab Afghanistan & our mission |
| `/opportunities` | Full opportunity listing with search & filters |
| `/opportunities/[id]` | Dynamic opportunity details page |
| `/add-opportunity` | Form to submit a new opportunity |
| `/favorites` | Saved/favorited opportunities |
| `/dashboard` | Stats & insights dashboard |
| `/messages` | Inbox for contact form messages |
| `/contact` | Contact form to reach the team |

---

## Future Improvements

Some ideas to expand the platform:
- User authentication & profiles
- Admin approval system for new opportunities
- Email notifications for expiring deadlines
- Multi-language support (English, Dari, Pashto)
- PDF CV builder
- Integration with real opportunity APIs

---

## License & Credits

Built as a capstone project with ❤️ for the Afghan youth community.
