# Jaydev Design System Skill

> Living source of truth for the Jaydev Group website's visual + technical system.
> **Self-maintenance protocol:** Whenever a design token, brand decision, component
> pattern, or tech-stack choice changes during a session, update THIS file in the same
> turn. Treat it as code - stale entries are bugs. Append a dated line to the Changelog.

## Brand

- **Group**: Jaydev Group - founded by **Jitesh Vajir** (Founder & MD), HQ Rajkot, Gujarat.
- **Business units**: Jaydev Multicomm (export & import) · Jaydev Pharma & Intermediates (domestic).
- **Branches**: Rajkot (HQ), Ahmedabad, Mumbai, Lagos (Nigeria).
- **Tagline**: "Connecting Chemistry, Creating Solutions".
- **Logo (LOCKED - exact file, no recreation)**: use the PNG at
  `public/brand/logo.png` (source: `Content/Brand Images/Old Brand Images/Multicomm logo.png`)
  EVERYWHERE - header, footer, favicon (`app/icon.png`). Rendered via `<Image>` in
  `components/brand/Logo.tsx` (`<MoleculeMark>` + `<Logo>`). Do NOT substitute an SVG
  recreation, the JM monogram, or any AI-generated mark.

## Color tokens (white-first)

| Token | Hex | Use |
|-------|-----|-----|
| navy.DEFAULT | #0E2040 | primary brand, dark sections, headings |
| navy.mid | #163566 | hovers, secondary text on light |
| navy.pale | #F5F7FB | tints, chips |
| gold.DEFAULT | #C9922A | accent, CTAs, icons |
| gold.light | #E8B84B | gradients, on-navy accents |
| gold.dark | #A0751F | text on gold-bg |
| gold.bg | #FEF3E2 | soft icon plates |
| white | #FFFFFF | primary background |

White is the primary background; navy is the secondary/dark band; gold is the accent.
Bright Indian-B2B aesthetic - never make the whole site dark.

## Typography
- Headings: **Plus Jakarta Sans** (`font-jakarta`), extrabold.
- Body: **Inter** (`font-inter`).

## Iconography (NO EMOJI)
- All icons come from **lucide-react** via `components/Icon.tsx` (`<Icon name="..." />`).
- Emojis are banned everywhere (UI, data files, content). Data objects carry an `icon`
  string = a lucide component name (e.g. `'Droplets'`), never an emoji.
- When adding an icon, register it in the `MAP` inside `components/Icon.tsx`.

## Motion / 3D
- **Hero**: premium **pseudo-3D molecular network in Canvas 2D** - `components/HeroVisual.tsx`
  (perspective projection + Y/X rotation + depth shading + mouse parallax). Looks 3D, zero
  deps, cannot throw. Everything else is Framer Motion + Canvas + SVG.
- **History/why (do not regress):** A true WebGL R3F hero was attempted but `@react-three/fiber`
  threw `Cannot read properties of undefined (reading 'ReactCurrentOwner')` at runtime - a
  React 18/19 internals mismatch (Next 15 + react-reconciler). We removed three.js/R3F entirely.
  If true WebGL is ever revisited, fully align React + react-dom + react-reconciler versions
  first and test in the browser, not just the build.
- Canvas/visual components must be `dynamic(() => import(...), { ssr: false })`.
- Animated flows: `components/ProcessFlow.tsx` (scroll-driven sourcing→export journey).
  Build more of these per use-case as the site grows.

## Catalogue download
- PDF lives at `public/Jaydev-Multicomm-Catalogue.pdf` (compressed WhatsApp catalog).
- "Download Catalogue" CTA appears in: header (desktop + mobile), home hero, home final CTA,
  products CTA, footer Quick-RFQ. Uses `<a download>` + `<Icon name="Download" />`.

## Component conventions
- `.card-white` = white card on light bg (default). `.card-navy` = glass card on navy.
- Buttons: `.btn-gold` (primary), `.btn-navy`, `.btn-outline`, `.btn-ghost-white` (on navy).
- Section intro pattern: `<span className="section-label">` → extrabold navy `<h2>` → gray sub.
- Floating WhatsApp button bottom-right on key pages.

## Information architecture
- Nav: Home · Group (/about) · Products · Industries · Markets · Get Quote.
- **Industries** use PCIPL-style super-group filtering (`superGroups` in `lib/content.ts`):
  Water/Mining/Energy · Chemical Synthesis · Coatings/Adhesives/Polymers (CASE) ·
  Home & Personal Care (CARE) · Agro/Food/Pharma · Textile/Pulp/Paper.
- Each industry has `icon`, `superGroup`, `seoKeywords`, `productIds`, `additionalProducts`.
- Target: cover ALL sourceable chemicals, mapped to industries, SEO-friendly.

## Data layer (`lib/content.ts`)
- `GROUP`, `BUSINESS_UNITS`, `BRANCHES`, `IMPORT_PRODUCTS` (Zircon Sand, Lauric C12, Decanoic C10).
- `products` (export catalog), `categories`, `industryData`, `superGroups`, `marketData`.
- `IMAGE_MAP` / `INDUSTRY_IMAGE_MAP` map ids → `/images/*.webp`; unmapped → icon fallback.

## Positioning tagline
- "Your Single-Source Supply Partner for Industrial Chemicals, Minerals, Solvents, Acids,
  Alkalis, Water Treatment Chemicals & Specialty Raw Materials." Used on: home tagline strip
  (below stats), products page header, footer blurb. Reuse where it fits.

## Stock imagery (sourcing method)
- When local photos run out, source from **Wikimedia Commons API** (license-safe):
  `commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=filetype:bitmap+<q>&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=1000&format=json`.
  Filter results whose file title contains the keyword to avoid junk, then download the
  thumburl. Verified images live in `public/images/` (fertilizer, paint, plastic, plant,
  zircon). Always eyeball each before committing - top search hits are often off-topic.

## World map (Export Reach)
- `components/TradeRouteMap.tsx` draws real land from `public/world-land.json` (Natural Earth
  110m land, simplified to ~67KB) under animated trade arcs, region-cropped to India↔Africa↔
  GCC↔SE Asia. Fetched at runtime, not bundled.

## SEO
- Standalone industry pages at `/industries/[slug]` (SSG) with per-page `generateMetadata`
  (title, description, keywords from `seoKeywords`, canonical) + Service JSON-LD + internal
  cross-links. Listed in `sitemap.ts`. Home tiles link straight to these.

## Buttons (premium)
- `.btn-gold` = molten-gold gradient with engraved dark text + inset highlights + gold glow.
  `.btn-navy` = deep navy gradient. `.btn-ghost-white` = frosted glass (backdrop-blur) for dark
  bg. `.btn-outline` = crisp on light. All share a hover sheen sweep + spring lift. Defined in
  `globals.css`. Keep this premium feel for any new buttons.

## Product images
- ~35 products have unique real photos in `public/images/products/<id>.jpg` (sourced via
  Wikimedia API, each visually verified). Mapped in `IMAGE_MAP`. Remaining commodities fall
  back to `CATEGORY_IMAGE` (some intra-category repeats - replace as real photos are found).
  Never auto-trust a Commons title; structure diagrams & wrong chemicals slip through.

## Exporter conventions (benchmarked vs aljabalglobal.com)
- **Top utility bar** in Header (address · email · WhatsApp · LinkedIn), collapses on scroll.
- **Hero** = full-bleed industrial port photo (`/images/logistics-port.png`) + molecule canvas
  (mix-blend-screen) + navy gradients. Combine "real exporter" imagery with the chemistry signature.
- **Trade & Payment Terms** section on home: LC 100% at sight via Dubai / 30%+70%; incoterms;
  documentation; MOQ & packing; lead times. Payment terms are a key B2B-exporter trust signal.
- Still worth adding (from competitor): Past-Shipments gallery (use EXIM data files), Today's
  indicative price / "request price", Articles/Blog, Chairman's message, fixed social rail.

## Blog, FAQ, bundling & CTA policy
- **Blog/Insights**: `lib/articles.ts` → `/articles` (listing) + `/articles/[slug]` (SSG, Article
  JSON-LD). Add posts to the array. **FAQ**: `lib/faqs.ts` → `/faq` with FAQPage JSON-LD (AEO).
- **Product bundling**: variant forms (flakes/lye/prills) live on ONE product via the `variants`
  field (e.g. `caustic-soda`, `caustic-potash`). Don't split forms into separate products.
- **CTA policy (targeted, not everywhere)**: each section gets ONE primary forward action.
  Catalogue lives in header + hero + footer only. WhatsApp = global floating button + social
  rail + header (not repeated inline in every section). Product detail = "Request Today's Price"
  (WhatsApp) + "Get CIF Quote" (form). Don't re-add removed duplicate buttons.
- **Today's price**: per-product "Request Today's Price" widget (WhatsApp, prefilled) in
  ProductDetailClient sidebar.
- **Social rail**: `components/SocialRail.tsx` fixed left edge (LinkedIn/WhatsApp/Email), global.
- **Founder's message**: signed block on the Group page (AboutClient).

## Card CTA pattern (industries & markets)
- Do NOT put identical full button pairs on every card. Use the editorial pattern:
  one directional text-CTA ("Request a quote for {X}" with a circular arrow that fills on
  hover) + a compact icon-only WhatsApp circle. Lighter, less templated.

## Catalogue scale
- 103 products across 9 categories (added `surfactants` + `minerals`). New products use
  CATEGORY_IMAGE fallbacks (no unique photos). 139 total static pages. Keep expanding the
  `products` array; each entry auto-generates an SSG page + sitemap entry.

## Product display (image-free, formula-led)
- Products listing, product detail hero, related products, and industry-page product cards
  use a **navy formula badge** (the chemical formula in gold mono) as the visual identity -
  NOT photos. Reason: most commodities only had generic/duplicate fallback images. Keep this.
- Home featured products keep their (good, unique) photos. Don't strip those.
- Products page has **two filter axes**: By Category + By Industry (reverse map built from
  `industryData.productIds`). All new products are mapped into industries so the filter works.
- Founder/team photos: `GROUP.founderImage` + `COMPANY.team[].image` → render `<Image>` when
  present, else initials. Jitesh's photo path: `public/brand/jitesh-vajir.jpg`.

## Integrity note - EXIM data is NOT our shipments
- The `Exim data/*.xlsx` files are purchased MARKET trade-intelligence (other exporters'
  shipments; seller column ≠ Jaydev). NEVER present them as Jaydev's own past shipments.
  A real Past-Shipments gallery needs the client's own invoices/BLs. Do not fabricate.

## Founder photo
- `GROUP.founderImage` = `/brand/jitesh-vajir.jpg`; also on COMPANY.team[0].image. The file
  must be placed at `public/brand/jitesh-vajir.jpg` (user-supplied portrait). Renders in the
  founder card, founder's-message block, and team grid (AboutClient).

## Products page (final form)
- Single smart filter: search (name/CAS/formula/use) + ONE category dropdown. No industry
  filter (Industries is its own page). Cards are editorial: large faint watermark formula,
  category accent dot, inline formula·CAS, no navy "token" badges, no photos. Detail pages &
  industry product lists also use formula-led layout, not stock photos.

## Hero (restructured - premium molecular centerpiece, NO stock photo)
- Deep-navy `#0A1730` hero: layered radial glows + `.hero-grid` dot pattern. Left = eyebrow,
  gradient headline, sub, 2 CTAs, trust chips. Right (lg) = `HeroVisual` honeycomb molecule
  inside a glowing containment with two dashed orbit rings (`animate-jd-spin` / `-rev`) + two
  floating glass intel cards (`animate-jd-float`). Integrated glass stats bar at the bottom
  (replaced the old separate white stats section). Hero ≈ 1011px (one viewport).
- **HeroVisual canvas gotcha (fixed):** ResizeObserver re-fires after first paint and
  `canvas.width=` CLEARS the canvas; if rAF is throttled the molecule vanishes. Fix: `resize()`
  bails when dimensions are unchanged AND calls `paint()` once so a frame survives. Keep this.
- Verified via Claude Preview at 1440px: molecule glows, cards positioned, stats integrated.

## Hero refinements (keep)
- NO hard circle outlines behind the molecule — only soft blurred gold + blue halos
  (`bg-gold/[0.08] blur-[110px]`). The user disliked the bright ring; do not re-add solid/dashed
  rings around `HeroVisual`.
- Left column is intentionally lean: uppercase eyebrow tagline, tight headline, ONE concise
  sub-sentence (no founder bio in hero — that's on /about), 2 CTAs, 3 trust chips under a
  hairline divider. Don't pad it back into a long paragraph.
- Preview-tool caveat: the Claude Preview headless capture throttles rAF + framer-motion mount
  animations, so home screenshots often come back blank/white even though the DOM is correct.
  Verify via `preview_inspect`/`preview_eval` (check h1 + section bg), not just screenshots.

## Changelog
- 2026-06-18: White-first redesign locked. Molecular-square logo locked. Group-hub scope
  locked. Emojis removed → lucide icon system. Industries expanded to 12 across 6 super-groups.
  Import portfolio added.
- 2026-06-18 (later): Removed WebGL R3F hero after runtime ReactCurrentOwner crash; replaced
  with bulletproof Canvas pseudo-3D `HeroVisual.tsx`. Uninstalled three/@react-three/*.
  Added catalogue PDF download across header, hero, CTAs, products, footer.
- 2026-06-18 (later 2): Logo switched to exact PNG (`public/brand/logo.png`) everywhere, no
  SVG/AI recreation. Fixed StatCounter (animation was cancelled by a stale dep → showed 0).
  Every product/industry now gets a photo via `productImage()` + `CATEGORY_IMAGE` +
  `INDUSTRY_IMAGE_MAP` (all 12). Buttons forced single-line (`whitespace-nowrap`). Markets
  cards equalised (flex h-full, CTA mt-auto). Team contacts: Meet→mailto marketing@, Darsh→
  WhatsApp with prefilled enquiry.
- 2026-06-18 (later 4): Real world-map backdrop in TradeRouteMap (world-land.json). Standalone
  SEO industry pages with metadata + JSON-LD + sitemap. Sourced real stock images (fertilizer,
  paint, plastic-pellets, refinery, zircon) via Wikimedia API; remapped agro/paints/plastics/
  intermediates. Market grid min-height bumped to 17.5rem so all card sections align. Removed
  dead BUSINESS_UNITS href field.
- 2026-06-18 (later 3): Hero molecule redesigned as structured honeycomb/graphene lattice
  (`HeroVisual.tsx`) - reads as a real chemical structure. TradeRouteMap rebuilt: responsive
  DPR canvas, dotted-grid backdrop, region-zoomed projection, glowing animated arcs,
  de-collided labels. Markets card sections aligned via min-heights. Positioning tagline added.
  Global `FloatingWhatsApp` (was home-only). `.no-scrollbar` utility added. Quote form now
  prefills from `?industry=` and `?market=` params.
