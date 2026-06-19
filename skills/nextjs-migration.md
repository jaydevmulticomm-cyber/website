# Next.js Migration Guidelines

This guide describes the migration strategy from the current static HTML site to a modern Next.js application.
The target stack is Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and optimized export behavior.

## Goals

- Create a scalable architecture.
- Convert static pages into composable React components.
- Use data-driven page generation rather than repeating markup.
- Maintain SEO-friendly metadata and structured content.

## Project Structure

Recommended folder layout:

- `app/`
  - `layout.tsx`
  - `page.tsx` (home)
  - `products/page.tsx`
  - `industries/page.tsx`
  - `markets/page.tsx`
  - `quality/page.tsx`
  - `quote/page.tsx`
  - `globals.css`
- `components/`
  - `Header.tsx`
  - `Footer.tsx`
  - `SectionHero.tsx`
  - `ProductCard.tsx`
  - `MarketCard.tsx`
  - `IndustryCard.tsx`
  - `QualityFeature.tsx`
  - `QuoteForm.tsx`
- `lib/`
  - `content.ts`
  - `metadata.ts`
- `public/`
  - `images/`

## Migration Principles

- Use `app` router pages for canonical routes.
- Export static content using incremental static generation or static HTML export.
- Use TypeScript for props, data shapes, and component interfaces.
- Move duplicate page content into `lib/content.ts` or JSON-like modules.
- Keep components small, semantic, and reusable.
- Use `next/image` for optimized images and `next/link` for internal navigation.
- Implement page-specific metadata using `generateMetadata`.

## Component Guidelines

- `Header.tsx`
  - Responsive nav with hamburger menu on mobile
  - Pre-built link list for all major pages
  - Branding and contact action
- `Footer.tsx`
  - Company details, quick links, trust / compliance badges
  - WhatsApp and email CTAs
- `SectionHero.tsx`
  - Support hero title, description, and primary CTA
  - Use motion transitions for entrance
- `ProductCard.tsx`
  - Display product name, grade, summary, and action buttons
  - Support optional tags and packaging specs
- `QuoteForm.tsx`
  - Fully functional form with client-side validation
  - Placeholder server integration for future API

## Styling Approach

- Use Tailwind CSS utility classes for fast layout.
- Define custom theme tokens in `tailwind.config.js` for brand colors.
- Keep CSS modules minimal; prefer shared Tailwind classes.
- Use Framer Motion for subtle hero, card, and scroll reveal animations.
- Create a consistent design system with spacing, typography, and card styles.

## SEO and Metadata

- Set `title`, `description`, and Open Graph metadata for each route.
- Include canonical URLs and locale metadata.
- Add structured JSON-LD for organization, breadcrumbs, and product categories.
- Use semantic HTML with headings in logical order.

## Build and Export

- Configure Next.js for static export and optimized image loading.
- Keep HTTP caching and preload strategies in mind.
- Verify `npm run build` and `npm run export` if using static export.
- Ensure the final site is production-ready on a static hosting provider.

## Implementation Notes

- Do not hard-code page text in multiple components.
- Keep route labels consistent across nav and page metadata.
- Ensure accessibility: keyboard nav, ARIA labels, visible focus states.
- Use `use client` only where motion or interactive behavior is required.
