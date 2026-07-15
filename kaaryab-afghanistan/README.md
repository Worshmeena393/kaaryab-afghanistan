 # KaarYab Afghanistan

 KaarYab Afghanistan is an opportunity finder platform built with Next.js, React, and Tailwind CSS. It helps Afghan youth discover jobs, internships, scholarships, remote work, and skill-building opportunities in one place.

 ## Problem It Solves

 Many learners and job seekers in Afghanistan struggle to find meaningful opportunities because information is scattered across multiple websites, social media, and community groups. KaarYab brings those opportunities together with search, filter, save, and contact capabilities.

 ## Features

 - Home page with featured opportunity cards and clear calls to action
 - Opportunities listing with search, sorting, and saved items
 - Opportunity detail page with full opportunity information
 - Add opportunity form with localStorage persistence
 - Saved opportunities page with search, sort, and clear-all functionality
 - Dashboard with opportunity stats, saved count, messages count, and deadline insights
 - Messages inbox page with search, sort, delete, and clear-all controls
 - Contact form that saves messages locally for review
 - Dark mode support with theme toggle
 - Responsive design for mobile, tablet, and desktop

 ## Technologies Used

 - Next.js App Router
 - React
 - Tailwind CSS
 - LocalStorage for data persistence
 - Client-side state and reusable components

 ## How to Run Locally

 1. Install dependencies:

 ```bash
 npm install
 ```

 2. Start development server:

 ```bash
 npm run dev
 ```

 3. Open http://localhost:3000 in your browser.

 ## Build for Production

 ```bash
 npm run build
 ```

 ## App Pages

 - `/` — Home
 - `/about` — About
 - `/opportunities` — Opportunity list
 - `/opportunities/[id]` — Opportunity details
 - `/add-opportunity` — Add opportunity
 - `/favorites` — Saved opportunities
 - `/dashboard` — Dashboard
 - `/messages` — Message inbox
 - `/contact` — Contact form

 ## Notes

 - The app passes Next.js production build.
 - Saved opportunities and messages are persisted in the browser using localStorage.
 - The design is optimized for dark mode and responsive layouts.
