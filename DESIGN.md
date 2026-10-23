# Liquor Palace — Design Direction

## Concept: "The Curated Cellar" (Creamy White Palette)

A warm, bright, tactile boutique experience inspired by editorial food & drink flagships (*The Salad Project*, *Caractère Bois*): warm creamy white canvas, grounded by deep navy brand typography and architecture, accented with warm gold framing and red punctuation.

Instead of an all-dark or all-blue room, the site feels like an inviting daytime bottle shop with natural light, limestone and bleached wood accents, clean shelving cards, and dark glass bottles catching the eye.

## Colour System

Pulled from the logo SVG, calibrated for a light, warm canvas.

| Role        | Hex       | Usage                                          |
|-------------|-----------|------------------------------------------------|
| Cream       | `#FAF7F2` | Primary page & body background                 |
| Soft Linen  | `#F4EFE6` | Secondary section background, subtle banding   |
| Surface     | `#FFFFFF` | Card surfaces, shelf slots, contact cards      |
| Navy        | `#082041` | Primary brand headers, logos, footer anchor     |
| Slate Text  | `#232B38` | Readable body text, descriptions               |
| Muted Slate | `#5C6779` | Secondary captions, subtext, hours notes       |
| Gold        | `#C49326` | Hairline borders, accents, CTA highlights      |
| Red         | `#A81D20` | Badges, alerts, location tags                  |
| Border      | `rgba(8,32,65,0.1)` | Subtle structural separators         |

## Typography

**Display / Headlines:** Playfair Display (serif) — rich, authoritative weight of fine bottle labels. Used for H1/H2 in Deep Navy `#082041`.

**Body / UI:** Inter (sans-serif) — crisp, high-contrast, highly legible at all sizes (`#232B38`).

Font size normalization with `font-size-adjust: from-font` to eliminate layout shift during font swaps.

## Layout & Components

### Splash / Logo Reveal (hajster.com inspiration)
Page opens with a brief logo reveal centered against the warm cream canvas, smoothly scaling into the sticky header navigation bar. Disabled under `prefers-reduced-motion`.

### Sticky Navigation
Frosted creamy glass (`rgba(250, 247, 242, 0.94)` with `backdrop-filter: blur(12px)`), dark navy logo and link typography, and gold active/hover underline. Mobile drawer slides down seamlessly.

### Hero
Clean, warm cream hero section featuring the bold Playfair headline, gold dividing rule, value proposition, and two distinct action buttons: Gold Primary CTA ("Visit Store on Alma Rd") and Navy Outline CTA ("Explore Our Selection").

### Three Differentiators
Stacked vertical rhythm alternating between warm cream (`#FAF7F2`) and soft linen (`#F4EFE6`), marked by a 3px gold vertical rule.

### The Palace Collection Shelf
Cream-soft section hosting 3 white boutique card slots (Beer, Wine, Spirits) with subtle shadows, gold top-hairline reveal on hover, and responsive stacking on mobile devices.

### Location & Store Details
Clean presentation of 5951 Alma Rd, McKinney, TX, embedded lazy-loaded Google Maps iframe, and verified hours (Mon–Sat: 10am – 9pm, Sunday: Closed).

### Grounded Footer
Deep navy `#082041` anchor band at the base of the page, ensuring brand weight and clean contrast.

## Technical & Performance Rules
- Pure static HTML generation for all pages via Vite MPA and `@cloudflare/vite-plugin`.
- Pinned `cf` CLI (`0.15.0`) in `package.json`.
- Tested with `tsc --noEmit`, `cf build`, and `cf deploy --dry-run`.
