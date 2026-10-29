# Ruth Okoye · ceramic artist, portfolio and studio sales
<!-- Darkroom example 071 · fictional artist · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `shopify` | landing + catalog | `art-gallery` | `hero-effect` | turntable via pointer (medium) | `pointer-tilt.js`, `reveal.js` |

## Say this
> /darkroom a Shopify site for my ceramics: a gallery feeling, each piece is one of a kind, and I want people to be able to turn a vase around on the product page by dragging. Studio sales twice a year with a waiting list.

## Build spec

### Brief & signature
Ruth Okoye makes wood-fired stoneware vessels in a London studio; 40 one-off pieces per sale, two sales a year, € 180–1,400. Visitors are collectors and gallery buyers. Feeling: quiet, tactile, unhurried. **Signature:** on each product page, 24 photos taken on a turntable let the visitor drag to turn the vessel (frames swapped by pointer or touch x, lerp .14), so the ash glaze can be seen from every side. **Supporting:** a gallery-white interface, the waiting-list sign-up as the main action between sales, mask reveals.

### Stack & files
Shopify OS 2.0; product media: 24 images per product (ordered by alt text "turn-01"…"turn-24"); `assets/turntable.js` (preloads the 24 at 1200 px, draws on drag, falls back to the normal gallery), `sections/waiting-list.liquid` (Shopify customer form with tag `waitlist`). `pointer-tilt.js` gives the home hero piece a ±3° response.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Cormorant Garamond | 400 | piece titles |
| Text | Hanken Grotesk | 300, 500 | UI |

### Tokens
```css
:root { --ground: #f7f6f3; --ink: #1d1b19; --ink-60: #1d1b1999; --ash: #8a8f7a; --line: #1d1b191a;
  --display: "Cormorant Garamond", Georgia, serif; --text: "Hanken Grotesk", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| turntable sets | Ruth shoots 24 frames per piece on a turntable (NEEDS 1; a step-by-step guide in NEEDS.md) | canvas over the first image | contain, centred | drag | first image | white seamless `#f7f6f3`, one soft key from the left, camera height at the vessel's belly, 15° steps |
| hero piece | best photo (NEEDS 2) | `<img>` with `pointer-tilt.js` | contain | ±3° | still | — |

### Nav
64 px: "Ruth Okoye" Display 400 24 px; Work · Sales · About · Stockists; cart only during sales.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Piece | one vessel | height 64 vh | — | — | centred, x 58 % | tilt ±3° on pointer |
| H1 | Wood-fired vessels by Ruth Okoye. | Display 400, clamp(32px, 4vw, 60px) | 1.1 / 0 | ink | left gutter, bottom 16 vh | fade |
| Sale line | Next studio sale: 14 March 2027 · join the waiting list | Text 500, 15 px tabular | 1.4 | ink | under H1 | fade |
| CTA | Join the waiting list | Text 500, 15 px, ink 1 px border | — | — | under sale line | — |

Date TEMP until set.

### Sections
Work (archive grid of past pieces with "sold" in ink-60), Sales (how sales work: date, time, one piece per person, waiting list), About (studio, kiln, 80 words), Stockists.
**Product page:** turntable left (7 columns), right: title, dimensions, clay and glaze, firing, price, "one of one", Add to cart (only during a sale; otherwise "Join the waiting list").

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Turntable | drag (pointer / touch) | — | per frame | lerp .14 | frame index follows x |
| Hint | first view | 600 ms | 1200 ms | `--ease-out` | auto-turns 4 frames and back once |
| Archive tiles | in view | `i × 60 ms` | 700 ms | `--ease-out` | mask open |
Reduced motion: no hint, no tilt; drag still works (user-driven).

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Turntable | full width, drag horizontally; page scroll still works vertically (`touch-action: pan-y`) | 7/5 | 7/5 | 7/5 |
| Hero piece | 48 vh | 56 vh | 64 vh | 56 vh |

### Acceptance
**First viewport:** at 1440 × 900 a gallery-white page with one ash-glazed vessel standing right of centre that leans a few degrees toward the pointer; her name and the next sale date with a waiting-list button bottom-left. On a product page, dragging turns the vessel through 24 real photos. At 390 × 844 the vessel above the text; dragging sideways turns it while vertical swipes still scroll.
**Do not:** fake rotation by mirroring a photo; block vertical scrolling on phones; show Add to cart outside sales; compress the glaze photos until the ash detail smears (check 1:1).
