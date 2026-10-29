# Hush Paper · handmade paper mill
<!-- Darkroom example 007 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `woocommerce` | landing + catalog | `luxury` (light) | `animated` | none | `reveal.js` |

## Say this
> /darkroom a light, quiet home page for my handmade paper mill on WooCommerce. A video of pulp moving in water should sit in the lower part of the screen and blend into the white page, with the headline above it.

## Build spec

### Brief & signature
Hush makes cotton-rag paper by hand in a Normandy mill: sheets, notebooks, wedding stationery. Visitors are designers, calligraphers and couples. Feeling: soft, slow, tactile. **Signature:** a light page whose lower 62 % is a slow overhead clip of white pulp swirling in a vat, fading into the paper-white ground at its top and bottom so it has no edges at all. **Supporting:** a centred serif headline, reveal on the product rows, deckle-edge dividers drawn in SVG.

### Stack & files
WordPress block theme from `darkroom platform scaffold woocommerce` (overlay on the WordPress starter). Front page template `templates/front-page.html` with a custom pattern `patterns/hero-pulp.php`; video registered in `theme.json`-free markup inside the pattern; WooCommerce product collection block for the shop rows. `assets/reveal.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Gloock | 400 | headings, registered in `theme.json` `fontFamilies` with local files |
| Text | Schibsted Grotesk | 400, 500 | body, product cards |

### Tokens
```css
:root { --ground: #f7f5f0; --ink: 30 10% 14%; --ink-60: hsl(var(--ink) / .6); --accent: #2f4a3a; --line: hsl(var(--ink) / .12);
  --display: "Gloock", Georgia, serif; --text: "Schibsted Grotesk", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```
In `theme.json`: palette slugs `ground`, `ink`, `accent`, `line` so the owner edits them in Styles.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| pulp clip | filmed at the mill or generated (NEEDS 1) | `<video muted loop playsinline autoplay poster>` | cover, 50 % 50 %, positioned `inset: 38vh 0 0 0` | fade loop | poster | overhead, white cotton pulp turning slowly in grey water; lightest areas near `#f7f5f0`; no hands, no tools, nothing entering; 8 s loopable |
| products | WooCommerce images | product collection block | 1:1 on `--ground` | — | — | sheets photographed flat, raking light from the left |

### Nav
WordPress header template part: site title "Hush" Gloock 28 px left; Paper · Notebooks · Weddings · Visit right in Schibsted 15 px ink-60; mini-cart block. Height 80 px, no background.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Paper you can hear. | Display 400, clamp(48px, 8vw, 128px) | 0.95 / −0.02em | ink-100 | centred, top 14 vh | words rise, 70 ms stagger |
| Sub | Cotton-rag sheets made one at a time in a Normandy mill, since 1962. | Text 400, 19 px | 1.5 | ink-60 | centred, max 460 px | fade, delay 300 ms |
| CTA primary | Shop the paper | Text 500, 16 px, `--accent` fill, ground text, radius 2 px | — | — | centred | fade, delay 400 ms |
| CTA secondary | Visit the mill | Text 500, 16 px, underline offset 4 px | — | ink | beside primary, 24 px gap | — |
| Video | — | — | — | — | `top: 38vh; bottom: 0` | wrapper opacity 0 → 1 on `loadeddata` |
| Blend | — | `linear-gradient(to bottom, var(--ground) 0%, transparent 28%, transparent 78%, var(--ground) 100%)` over the video | — | — | inset 0 | none |

### Sections
1. **Three papers:** product collection block, 3 products, name in Gloock 28 px, weight in gsm and price incl. VAT, "Add to basket" text button.
2. **The mill:** two photos (vat, drying lofts) + 50 words; a deckle-edge SVG divider between sections (ink-12 stroke).
3. **Weddings:** a short paragraph and a link to the enquiry page (WordPress page, editable).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| H1 words | load | `i × 70 ms` | 800 ms | `--ease-out` | 20 px, 0 → 0, 1 |
| Video wrapper | `loadeddata` | 0 | 500 ms | linear | 0 → 1 |
| Product cards | in view | `i × 100 ms` | 700 ms | `--ease-out` | 24 px, 0 → 0, 1 |
Reduced motion: poster still, no word split.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Video top | 52vh | 42vh | 38vh | 44vh |
| H1 | 46 px | 80 px | 128 px | 88 px |
| CTAs | stacked, full width | inline | inline | inline |

### Acceptance
**First viewport:** at 1440 × 900 a warm white page, the four-word serif headline centred near the top, two buttons below, and the lower part of the screen alive with slowly turning pulp that dissolves into the page at both edges. At 390 × 844 the headline and buttons fill the top half, pulp below.
**Do not:** let the video show a hard edge; put a dark overlay on it; hard-code prices in the pattern (they come from WooCommerce); ship the front page as theme content (pages stay editable in WordPress, `platforms/wordpress-content.md`).
