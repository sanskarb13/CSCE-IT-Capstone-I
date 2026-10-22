# Liquor Palace — Design Direction

## Concept: "The Back-Lit Shelf"

Walk into a well-curated liquor store at dusk: dark wood shelving, warm
amber light catching glass bottles, the odd pop of a red label. That's the
feeling. The site is the store: deep navy walls, gold accent light, red
punctuation, and cream-white type that reads the way a shelf card does—
direct, helpful, no corporate blather.

This isn't a warehouse catalog. It's a shelf you trust.

## Colour System

Pulled directly from the logo SVG.

| Role        | Hex       | Usage                                          |
|-------------|-----------|------------------------------------------------|
| Navy        | `#082041` | Primary background, header, footer             |
| Deep Navy   | `#0A2A54` | Card surfaces, section alternation              |
| Cream       | `#F5F0E8` | Body text on dark, light section background     |
| Gold        | `#D3A538` | Accent — borders, highlights, hover states, CTAs|
| Red         | `#A81D20` | Punctuation — badges, alerts, active states     |
| White       | `#FEFEFD` | Headlines on dark, logo fill                    |

No gradients. Flat colour, separated by gold hairline rules.

## Typography

**Display / Headlines:** Playfair Display (serif) — has the weight and
personality of bottle labels. Used for H1/H2 only.

**Body / UI:** Inter (sans-serif) — highly legible at small sizes, excellent
on mobile, large x-height reduces CLS when falling back to system sans.

Both self-hosted as subsetted WOFF2. `font-size-adjust: from-font` on body
to keep fallback swap stable.

Font preload limited to Inter Regular only (body text, above the fold).
Playfair loaded async via @font-face swap — it only shows in large
headlines where a swap is visually acceptable.

## Layout

### Splash / Logo Reveal (hajster.com inspiration)
Page loads to a navy screen with the shield logo centered and scaled up.
After 1.2s it fades/scales down into its nav position and the page content
fades in. Pure CSS animation with `animation-fill-mode: forwards`. On
reduced-motion: skip straight to the page with no animation.

### Navigation
Minimal top bar: logo left, text links right on desktop. On mobile, the
logo centers and links collapse to a hamburger. Gold underline on hover/
active. Nav is sticky with a shrinking effect on scroll (pure CSS
scroll-driven animation where supported, static sticky fallback).

### Home
- **Hero:** Full-bleed navy section. Large Playfair headline specific to
  the business ("Hand-picked. Staff-recommended. Stocked for McKinney.")
  with a gold horizontal rule beneath. Below: one-sentence value prop and
  a CTA button ("Find Us on Alma Road") linking to the Contact page.
  No stock photo — instead, a geometric pattern of the shield repeated at
  low opacity as a texture, or a high-quality product photo if available.
- **Three Differentiators:** Not three cards. A stacked vertical rhythm:
  each differentiator is a full-width band alternating navy / deep-navy,
  with the statement left-aligned, a gold vertical rule as a divider, and
  a short description. Fade-in on scroll.
- **Category Teasers:** A horizontal strip of three "shelf slots"—Beer,
  Wine, Spirits—each a simple text link in a gold-bordered rectangle,
  no icons, no images, just the word. Hover: gold fill with navy text.
- **Map + Hours:** Embedded Google Maps iframe (lazy-loaded) plus store
  hours and address. Schema.org `LiquorStore` JSON-LD in the head.

### Beer / Wine / Spirits pages
Same structure: hero banner with category name in Playfair and a short
editorial description of the store's approach to that category. Below:
a content area from markdown with whatever product highlights or notes
the owner provides. No fake inventory or prices — just the voice.

### Contact
Address, phone, hours, Google Maps embed. A simple contact message using
`mailto:` — no backend form needed on Workers Free.

## Motion

**Principle:** Caractère Bois-inspired, scaled way back. Everything is
CSS — no GSAP, no runtime animation library. Keeps the JS minimal.

1. **Logo reveal:** CSS `@keyframes` scale + opacity, plays once on load.
2. **Scroll reveals:** CSS scroll-driven `animation-timeline: view()` for
   fade-up on sections. `@supports` gated, `prefers-reduced-motion` gated.
   Fallback: IntersectionObserver adding a `.visible` class.
3. **Nav shrink:** CSS `animation-timeline: scroll()` on the header.
   Fallback: just stays sticky.
4. **Hover states:** Gold underline grows from center on nav links.
   Category shelf slots invert on hover. All via CSS transitions.

No parallax. No pinned scroll sections. Subtle, not a showpiece.

## Responsiveness

Mobile-first CSS. Breakpoints:
- `<640px` — phone: single column, stacked sections, hamburger nav
- `640–1024px` — tablet: two-column where useful
- `>1024px` — desktop: full layout

The phone version is the primary design. Hero text sizes down gracefully
with `clamp()`. Category shelf slots stack vertically on phone.

## Technical Decisions

- **Static HTML per page** via Vite MPA (multi-page app). Each page is its
  own `index.html` entry point. No SPA routing, no client-side hydration.
- **React only** for the mobile nav hamburger menu (a single tiny island).
  Everything else is static HTML + CSS.
- **Content in `/content/` as markdown** files. At build time, Vite imports
  them and they render into the HTML templates.
- **Images:** Self-hosted, sized at 2x for retina, served as WebP with
  JPEG fallback via `<picture>`. Explicit `width`/`height` on every `<img>`.
  `fetchpriority="high"` on hero images. `loading="lazy"` on everything
  below the fold.
- **Fonts:** WOFF2 subset, self-hosted. Preload Inter Regular only.
  `font-size-adjust: from-font` to stabilize fallback swap.
- **SEO:** Unique `<title>` and `<meta description>` per page. OG tags.
  `sitemap.xml` and `robots.txt` (with noindex on staging). Schema.org
  `LiquorStore` JSON-LD on Home and Contact.
- **Accessibility:** Semantic HTML5 (`<header>`, `<nav>`, `<main>`,
  `<section>`, `<footer>`). Skip-to-content link. All images have `alt`.
  Colour contrast meets WCAG AA (cream on navy = ~12:1). Focus-visible
  styles on all interactive elements.
