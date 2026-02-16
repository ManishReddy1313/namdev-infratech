# Namdev Infratech - Website & Admin Platform

## Overview
Full production-ready website and admin CMS for Namdev Infratech, an infrastructure and fabrication company. Built with Next.js 14 (App Router), Tailwind CSS, Supabase (PostgreSQL + Auth + Storage), and Framer Motion.

## Tech Stack
- **Framework**: Next.js 14 with App Router, TypeScript
- **Styling**: Tailwind CSS with custom industrial color palette (primary/accent/steel)
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth (email/password, role-based: super_admin, editor)
- **Storage**: Supabase Storage (project-images, blog-images buckets)
- **Animations**: Framer Motion
- **Forms**: react-hook-form + zod validation
- **Icons**: lucide-react

## Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── providers.tsx       # Client-side providers (AnimatePresence)
│   ├── globals.css         # Global styles + Tailwind
│   ├── projects/           # Projects listing + [slug] detail
│   ├── creative-projects/  # Creative projects landing page
│   ├── blog/               # Blog listing + [slug] detail
│   ├── about/              # About page
│   ├── contact/            # Contact form page
│   └── admin/              # Admin panel
│       ├── login/          # Admin login
│       ├── dashboard/      # Admin dashboard
│       ├── projects/       # Projects CMS (new, edit/[id])
│       ├── blogs/          # Blog CMS (new, edit/[id])
│       └── leads/          # Leads management
├── components/
│   ├── ui/                 # Reusable UI (AnimationWrappers, ProjectCard, BlogCard, SectionHeader)
│   ├── layout/             # Navbar, Footer, LayoutWrapper
│   ├── home/               # Homepage sections (HeroSlider, CompanyPositioning, etc.)
│   └── admin/              # Admin-specific components
├── lib/
│   ├── supabase.ts         # Supabase client configuration
│   ├── auth.ts             # Auth helper functions
│   ├── utils.ts            # Utility functions (cn, formatDate, generateSlug)
│   └── seo.ts              # SEO schema generators
└── types/
    └── database.ts         # TypeScript types for database tables
```

## Database Tables (Supabase)
- **projects**: id, title, slug, description, category, gallery, materials, client_type, featured, seo_title, seo_description, created_at, updated_at
- **blogs**: id, title, slug, content, category, featured_image, seo_title, seo_description, published, created_at, updated_at
- **leads**: id, name, phone, email, message, status (new/contacted/converted), created_at

## Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-side only)
- `NEXT_PUBLIC_SITE_URL` - Production site URL (for sitemap/SEO)

## Supabase Setup Required
1. Create tables: projects, blogs, leads (schema in src/types/database.ts)
2. Create storage buckets: project-images, blog-images (set public access)
3. Create admin user via Supabase Auth dashboard
4. Set user metadata: { app_role: 'super_admin' }

## Running
- Dev: `npm run dev` (port 5000)
- Build: `npm run build` (includes sitemap generation)
- Start: `npm run start` (port 5000)

## Features
### Public Site
- Homepage with animated hero slider, company positioning, featured projects, process timeline, credibility section, blog preview, contact CTA
- Projects listing with Industrial/Creative category filtering
- Creative Projects premium storytelling landing page
- Blog with category filtering and SEO-optimized slug routing
- About page with company timeline and capabilities
- Contact form with WhatsApp CTA

### Admin Panel
- Secure login with Supabase Auth
- Role-based access (super_admin, editor)
- Projects CMS with gallery image upload
- Blog CMS with content editor
- Leads dashboard with status management (new/contacted/converted)

## Recent Changes
- Initial build: Full website and admin platform created
- All public pages with Framer Motion animations
- Admin panel with full CRUD operations
- SEO infrastructure (meta tags, JSON-LD, sitemap config, robots.txt)
- Supabase integration for database, auth, and storage

## User Preferences
- Platform-independent architecture (Supabase over Replit services)
- Production-scalable design
- Premium modern startup aesthetic
- Industrial color palette (grays, blacks, orange accent)
