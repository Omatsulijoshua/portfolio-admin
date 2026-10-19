# Omatsuli Joshua Portfolio

A modern, high-performance, and visually stunning portfolio website for **Omatsuli Joshua**, bootstrapped with **Next.js** (App Router) and powered by a hybrid **Supabase** backend. It features vibrant dark-mode aesthetics, custom micro-animations, a hybrid local/cloud datastore fallback, and a full administration control panel.

---

## 🔗 Project Links
- **Live Site:** [https://omatsuli-joshua-portfolio.vercel.app/](https://omatsuli-joshua-portfolio.vercel.app/)
- **GitHub Repository:** [https://github.com/Omatsulijoshua/portfolio-website](https://github.com/Omatsulijoshua/portfolio-website)

---

## ✨ Features

### 1. Modern Interactive UI
- **Rich Aesthetics:** Neon gradients, custom styling, dark-mode glassmorphism.
- **Interactive Elements:** Cursor follower/fluid custom cursor, page transitions, and slide animations utilizing `Framer Motion`.
- **Engagement:** Micro-interactions on buttons, grids, and cards, plus custom `canvas-confetti` fireworks upon successful contact message submission.

### 2. Full Admin Dashboard (`/admin`)
- **Protected Routing:** Admin middleware verification using cookie session authorization.
- **Overview Analytics:** System telemetry displaying counts of total projects, featured projects, categories, and inbox messages.
- **CRUD Operations:** Management dashboards to create, edit, or delete categories and projects directly from the web interface.
- **Inbox Manager:** Read client messages/inquiries directly in the dashboard and respond via one-click mailto links.
- **CV Uploader:** Admin CV upload panel to update the resume dynamically.

### 3. Dynamic PDF Resume Generator
- **CLI Utility (`scripts/generatePdf.js`):** Built-in script that utilizes `pdfkit` to compile and compile a clean, styled, print-ready PDF resume directly to `/public/joshuas-resume.pdf`.

### 4. Hybrid Database Layer
- **Resilient Fallback Design:** Configured via `lib/dbService.ts` to automatically detect if Supabase environment variables are missing or incorrect.
- If Supabase is offline/unconfigured, the system automatically falls back to browser-level `localStorage` initialized with rich mock data (`lib/mockData.ts`).
- Enables immediate out-of-the-box local development without requiring immediate database setup.

---

## 🛠 Tech Stack
- **Frontend Framework:** Next.js 16 (App Router, React 19)
- **Styling:** CSS & Tailwind CSS (v4)
- **Animations:** Framer Motion
- **Database / Backend:** Supabase (PostgreSQL)
- **PDF Generation:** PDFKit
- **Icons:** Lucide React

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js:** v18.x or higher
- **NPM / Yarn / PNPM**

### 2. Installation
Clone the repository:
```bash
git clone https://github.com/Omatsulijoshua/portfolio-website.git
cd portfolio-website
```

Install the dependencies:
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
*Note: If left blank or missing, the site will run using local mock data and localStorage.*

### 4. Database Schema Setup (Optional)
If connecting to Supabase:
1. Copy the SQL schema from [supabase/migration.sql](file:///c:/Users/Joshua/Desktop/My%20Projects/Websites/portfolio-website-master/supabase/migration.sql) into the Supabase SQL editor.
2. Alternatively, run the migration script directly via terminal:
```bash
npm run db:migrate
```

### 5. Running the Application
Start the Next.js local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 6. Compile PDF Resume
To update or regenerate the resume PDF dynamically:
```bash
node scripts/generatePdf.js
```
The output file will be written to `/public/joshuas-resume.pdf` and linked to all "Download CV" buttons.

---

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router routes & pages
│   ├── about/            # Biography and developer info
│   ├── admin/            # Dashboard routes (projects, categories, inbox messages, CV upload)
│   │   ├── categories/   # CRUD management for categories
│   │   ├── cv/           # CV uploading panel
│   │   ├── login/        # Admin sign-in screen
│   │   ├── messages/     # Visitor inbox logs
│   │   └── projects/     # CRUD management for projects
│   ├── api/              # API route handlers for uploads
│   ├── contact/          # Interactive contact form
│   ├── projects/         # Public project showcase pages
│   └── resume/           # Online resume viewer
├── components/           # Reusable UI component blocks (Navbar, Footer, Hero, TechStackGrid, etc.)
├── lib/                  # Database service adapters, local storage fallbacks, and mock datasets
│   ├── dbService.ts      # Core logic handling Supabase queries / LocalStorage fallback
│   ├── mockData.ts       # Fallback mock projects and categories datasets
│   └── supabase.ts       # Supabase client instantiation
├── public/               # Public assets (favicon, images, PDF documents)
├── scripts/              # Local server utility scripts (migration, PDF generation)
└── supabase/             # SQL migrations and row-level security (RLS) policies
```

---

## 🛡 License
This project is private and proprietary. Code samples are available on request.
© 2026 Emerald Code Studio by Omatsuli Joshua.
