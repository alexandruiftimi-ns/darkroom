# Mosaic Tile Works · encaustic cement tiles made to order
<!-- Darkroom example 025 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `woocommerce` | landing + catalog | `catalog` + `nature` (palette) | `animated` | none | `reveal.js` |

## Say this
> /darkroom a light home page for our cement tile workshop on WooCommerce. The hero should be a big white card with rounded corners floating on a grey page, with a video of a tile being pressed inside it, and the headline in the top-left of the card.

## Build spec

### Brief & signature
Mosaic Tile Works presses encaustic cement tiles by hand in Valencia in 40 patterns and any colour from a 24-pigment card; samples ship in 3 days. Visitors are architects, interior designers and renovators. Feeling: crafted, ordered, sunny. **Signature:** the hero is an inset card (radius 48 px, 600 px tall at desktop) on a pale grey page; inside, a looping overhead clip of a brass divider being lifted from a freshly poured tile, revealing the pattern; the headline sits in the card's top-left over the empty grey concrete. **Supporting:** a tile-pattern grid that reveals row by row, pigment swatches as real colour chips, quiet reveals.

### Stack & files
WordPress block theme with the WooCommerce overlay; pattern `patterns/hero-card.php` (group block with a video), product collection block for "Bestselling patterns", a "Pigments" pattern with 24 swatches from `theme.json` palette.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Outfit | 500 | headings |
| Text | Inter Tight | 400, 500 | body and shop UI |

### Tokens
```css
:root { --page: #eeeeeb; --card: #ffffff; --ink: 20 12% 13%; --ink-60: hsl(var(--ink) / .6); --terracotta: #b5532f; --line: hsl(var(--ink) / .1);
  --display: "Outfit", system-ui, sans-serif; --text: "Inter Tight", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| press loop | filmed overhead at the workshop (NEEDS 1) | `<video muted loop playsinline autoplay poster>` inside the card | cover, 70 % 55 % | loops | poster | top-down: a brass divider lifts off a wet tile, revealing a blue-and-ochre pattern; mould on grey concrete; the left 45 % of frame plain concrete; 7 s, end matches start |
| pattern tiles | product images | WooCommerce, 1:1 | — | reveal | — | every tile shot flat in the same daylight |

### Nav
Above the card on the grey page, 72 px: "Mosaic" Outfit 500 22 px; Patterns · Colours · Samples · Trade; mini-cart; CTA "Order samples" terracotta fill, white text, radius 999 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Card | — | `--card`, radius 48 px, 1 px `--line`, `box-shadow: 0 40px 100px -20px #0000000a` | — | — | max-width 1400 px, margin 0 auto, height 600 px | rises 20 px, 800 ms |
| H1 | Pressed by hand. Laid for a century. | Display 500, clamp(36px, 4.6vw, 72px) | 1.02 / −0.03em | ink | card top-left, padding 64 px, max 11ch | rise 16 px, delay 150 ms |
| Sub | Encaustic cement tiles in 40 patterns and 24 pigments, made to order in Valencia. | Text 400, 18 px | 1.5 | ink-60 | under H1, max 360 px | delay 250 ms |
| CTAs | Order samples · Browse patterns | Text 500, 16 px; second as text link with arrow | — | — | under sub | delay 350 ms |
| Lead time | Samples ship in 3 days | Text 500, 13 px with a terracotta dot | — | ink-60 | card bottom-left 32 px | none |

### Sections
1. **Bestselling patterns:** product collection block, 4 × 2, square tiles with pattern name and price per m² incl. VAT.
2. **Colours:** 24 swatches in a 12 × 2 grid, each a 72 px rounded square with the pigment name and code (tabular) under it.
3. **Trade:** for architects: samples, BIM files, lead times; 60 words + a link.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Card | load | 0 | 800 ms | `--ease-out` | 20 px, 0 → 0, 1 |
| Hero text | load | `0.15 + i × 0.1 s` | 700 ms | `--ease-out` | 16 px, 0 → 0, 1 |
| Product rows | in view | `row × 120 ms` | 700 ms | `--ease-out` | 20 px, 0 → 0, 1 |
| Swatches | in view | `i × 30 ms` (cap 24) | 400 ms | `--ease-out` | scale .96, 0 → 1, 1 |
Reduced motion: poster, everything final.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Card | radius 28 px, height auto: copy on top, video 4:5 below | radius 40 px, 520 px | 600 px | 480 px |
| H1 | 34 px | 56 px | 72 px | 56 px |
| Swatches | 6 × 4 | 8 × 3 | 12 × 2 | — |

### Acceptance
**First viewport:** at 1440 × 900 a pale grey page with a large white rounded card; in its right half a brass mould lifts to reveal a patterned tile; the headline top-left on plain concrete, terracotta button below. At 390 × 844 the card holds the copy above a tall clip.
**Do not:** put a shadow heavier than 4 % on the card; hard-code prices; show colours as hex lists without swatches; edit the WooCommerce checkout.
