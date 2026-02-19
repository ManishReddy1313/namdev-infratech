# Namdev Infratech - Website & Admin Platform

## Overview
Full production-ready website and admin CMS for Namdev Infratech, an infrastructure and fabrication company founded in 2003 by Bajrang Lal Didwania. Built with Next.js 14 (App Router), Tailwind CSS, Replit PostgreSQL, session-based authentication (bcrypt + cookies), and Framer Motion.

## Tech Stack
- **Framework**: Next.js 14 with App Router, TypeScript
- **Styling**: Tailwind CSS with custom branding colors (primary #1D2202, accent #E6E0DA, steel #1F393A)
- **Fonts**: Playfair Display (headings), Raleway (body text)
- **Database**: Replit PostgreSQL (via pg module)
- **Auth**: Session-based (bcrypt password hashing, cookie sessions, username login)
- **Animations**: Framer Motion
- **Forms**: react-hook-form + zod validation
- **Icons**: lucide-react

## Design System
- **Primary color**: #1D2202 (dark olive) - dark backgrounds, deep sections
- **Accent color**: #E6E0DA (cream/beige) - buttons, highlights, light backgrounds
- **Steel color**: #1F393A (dark teal) - text, headings, UI elements, admin sidebar
- **Buttons**: Pill-shaped (rounded-pill), primary = cream bg with teal text, secondary = teal bg with white text
- **Logo**: /public/logo.png (Namdev Infratech mark + wordmark)

## Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with Playfair Display + Raleway fonts
│   ├── page.tsx            # Homepage
│   ├── providers.tsx       # Client-side providers (AnimatePresence)
│   ├── globals.css         # Global styles + Tailwind + font imports
│   ├── products/           # Products listing + [slug] detail
│   ├── projects/           # Projects listing + [slug] detail
│   ├── blog/               # Blog listing + [slug] detail
│   ├── about/              # About page with real team and timeline
│   ├── contact/            # Contact form page
│   ├── api/                # API routes (products, projects, blogs, leads, auth)
│   └── admin/              # Admin panel
│       ├── login/          # Admin login (username/password)
│       ├── dashboard/      # Admin dashboard
│       ├── products/       # Products CMS (listing, new, edit/[id])
│       ├── projects/       # Projects CMS (listing, new, edit/[id])
│       ├── blogs/          # Blog CMS (listing, new, edit/[id])
│       └── leads/          # Leads management
├── components/
│   ├── ui/                 # Reusable UI (AnimationWrappers, ProductCard, BlogCard, SectionHeader)
│   ├── layout/             # Navbar (with logo), Footer, LayoutWrapper
│   ├── home/               # Homepage sections (HeroSlider, CompanyPositioning, etc.)
│   └── admin/              # Admin-specific components (ProductForm)
├── lib/
│   ├── db.ts               # PostgreSQL connection pool
│   ├── auth.ts             # Auth helpers (login, getSession, logout - username-based)
│   └── utils.ts            # Utility functions (cn, formatDate, generateSlug)
└── types/
    └── index.ts            # TypeScript types (Project, Blog, Lead, Product)
```

## Database Tables (Replit PostgreSQL)
- **admin_users**: id (uuid), username, email, password_hash, role, created_at
- **sessions**: id (uuid), user_id, expires_at, created_at
- **products**: id (uuid), title, slug, description, category, image, features, use_cases, variants (jsonb), faqs (jsonb), featured, sort_order, seo_title, seo_description, created_at, updated_at
- **projects**: id (uuid), title, slug, description, category, gallery, materials, client_type, featured, seo_title, seo_description, created_at, updated_at
- **blogs**: id (uuid), title, slug, content, category, featured_image, seo_title, seo_description, published, created_at, updated_at
- **leads**: id (uuid), name, phone, email, message, status (new/contacted/converted), created_at

## Product Categories (19 products)
- **Structural Steel**: MS Angle, MS Channel, MS Beam, MS Plate, MS Pipe, MS Round Bar, MS Flat Bar
- **Roofing Solutions**: Color Coated Roofing Sheet, Galvalume Roofing Sheet, Polycarbonate Sheet, Turbo Ventilator, Ridge Cap
- **Jali Products**: Expanded Metal Jali, Welded Wire Mesh, Chain Link Fencing
- **Exterior Solutions**: ACP Sheet, HPL Sheet, Cement Board, Metal Ceiling Tiles

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-set by Replit)
- `SESSION_SECRET` - Session signing secret

## Authentication
- Username + password login (bcrypt hashed)
- Session cookies (7-day expiry)
- Default admin: username=admin, password set via bcrypt hash in DB
- Roles: super_admin, editor

## Running
- Dev: `npm run dev` (port 5000)
- Build: `npm run build`
- Start: `npm run start` (port 5000)

## Features
### Public Site
- Homepage with animated hero slider, company positioning, services showcase, products showcase, process timeline, credibility section, blog preview, contact CTA
- Products catalog (19 products) with 4-category filtering and individual detail pages with features/use cases/FAQs
- Projects listing with category filtering
- Blog with category filtering and SEO-optimized slug routing
- About page with real team (Bajrang Lal, Anirudh, Nakul, Rahul Didwania), milestones, mission/vision/values
- Contact form with WhatsApp CTA
- SEO-optimized meta tags and JSON-LD structured data

### Admin Panel (/admin)
- Username/password login
- Products CMS: full CRUD with features, use cases, variants, FAQs, SEO fields
- Projects CMS: full CRUD with gallery, materials, categories
- Blog CMS: full CRUD with publish/draft status
- Leads dashboard with status management (new/contacted/converted)

## Recent Changes
- Products database seeded with 19 real products across 4 categories with original SEO descriptions
- Products listing page and detail pages built with category filtering
- Products admin CMS built with full CRUD (features, variants, FAQs, SEO)
- All homepage content rewritten with original SEO-friendly copy
- About page rewritten with original content, Didwania family team bios
- Auth switched from email-based to username-based login
- Navbar updated: Products link added, Creative Projects removed
- Footer updated: product categories links, real Faridabad address
- SEO meta tags enhanced with product-specific keywords

## User Preferences
- Replit PostgreSQL (not Supabase)
- Session-based auth with username login
- Original SEO-optimized content (not copied from old website)
- Fonts: Playfair Display for headings, Raleway for body
- Color palette: Dark olive (#1D2202), Cream (#E6E0DA), Dark teal (#1F393A)
- Pill-shaped buttons
- All content manageable from admin panel
