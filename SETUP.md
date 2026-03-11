# Florida Pole Barn — Setup Guide

## 1. Install dependencies

```bash
cd florida-pole-barn
npm install
```

## 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
RESEND_API_KEY=re_xxxxxxxx       # Get free key at resend.com
CONTACT_EMAIL=info@floridapolebarn.com
NEXT_PUBLIC_SITE_URL=https://floridapolebarn.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # Optional — your GA4 ID
```

## 3. Add your images

Place your actual project photos in `/public/images/`:

### Required images (from your existing website):
| File path | What it shows |
|---|---|
| `/public/images/hero.jpg` | Hero background (large barn photo) |
| `/public/images/open-barn-product.jpg` | Open barn for product card |
| `/public/images/enclosed-barn-product.jpg` | Enclosed barn for product card |
| `/public/images/open-barn-hero.jpg` | Open barn page hero |
| `/public/images/enclosed-barn-hero.jpg` | Enclosed barn page hero |
| `/public/images/horse-barn-hero.jpg` | Horse barn page hero |
| `/public/images/rv-storage-hero.jpg` | RV storage page hero |
| `/public/images/equipment-barn-hero.jpg` | Equipment page hero |
| `/public/images/workshop-hero.jpg` | Workshop page hero |
| `/public/images/agricultural-hero.jpg` | Agricultural page hero |
| `/public/images/og-image.jpg` | Social share image (1200×630) |

### Gallery images (12 photos from your existing site):
Place in `/public/images/gallery/`:
- `open-barn-1.jpg`, `open-barn-2.jpg`, `open-barn-3.jpg`
- `enclosed-barn-1.jpg`, `enclosed-barn-2.jpg`
- `horse-barn-1.jpg`, `horse-barn-2.jpg`
- `equipment-barn-1.jpg`, `equipment-barn-2.jpg`
- `workshop-1.jpg`, `workshop-2.jpg`
- `rv-storage-1.jpg`

> **Tip:** Right-click images on floridapolebarn.com → Save Image As → save to the correct path.

## 4. Run locally

```bash
npm run dev
```

Open http://localhost:3000

## 5. Replace placeholder testimonials

Edit `lib/constants.ts` → `TESTIMONIALS` array with your real Google reviews.

## 6. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel and it deploys automatically on push.

Add your `.env.local` variables to Vercel's Environment Variables dashboard.

## 7. Set up Resend (email for quote forms)

1. Go to [resend.com](https://resend.com) — free tier supports 3,000 emails/month
2. Create account, verify your domain (floridapolebarn.com)
3. Create an API key
4. Add to `.env.local` as `RESEND_API_KEY`
5. Update `FROM_EMAIL` in `lib/email.ts` to match your verified Resend domain

## 8. Connect Google Analytics

1. Go to analytics.google.com
2. Create a GA4 property for floridapolebarn.com
3. Copy the Measurement ID (G-XXXXXXXXXX)
4. Add to `.env.local` as `NEXT_PUBLIC_GA_ID`

## File Structure

```
app/                    → Next.js pages (App Router)
  page.tsx              → Homepage
  quote/page.tsx        → Quote request form
  gallery/page.tsx      → Project gallery
  open-pole-barns/      → Product page
  enclosed-pole-barns/  → Product page
  horse-barns/          → Use-case SEO page
  rv-boat-storage/      → Use-case SEO page
  equipment-storage/    → Use-case SEO page
  workshop-garage/      → Use-case SEO page
  agricultural-buildings/ → Use-case SEO page
  about/                → About page
  service-area/         → Florida service area
  faq/                  → FAQ (with schema markup)
  blog/                 → Blog index + posts
  api/quote/route.ts    → Form submission API

components/
  layout/Header.tsx     → Sticky nav with dropdown menus
  layout/Footer.tsx     → Footer with CTA strip
  home/                 → Homepage section components
  forms/QuoteForm.tsx   → 3-step quote form
  gallery/GalleryGrid.tsx → Filterable gallery with lightbox
  shared/               → Reusable components

lib/
  constants.ts          → All business data (sizes, cities, FAQs, etc.)
  types.ts              → TypeScript interfaces
  email.ts              → Resend email sender
  utils.ts              → Helper functions
```
