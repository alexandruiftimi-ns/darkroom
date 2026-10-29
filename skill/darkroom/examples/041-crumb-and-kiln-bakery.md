# Crumb & Kiln · neighbourhood sourdough bakery
<!-- Darkroom example 041 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `restaurant` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a one-page site for my sourdough bakery in Lisbon: what we bake each day, opening hours, where we are, and pre-order for Saturday. Warm, floury, not cutesy. Free hosting.

## Build spec

### Brief & signature
Crumb & Kiln bakes 14 loaves and pastries a day in a wood-fired oven in Arroios, Lisbon; Saturday loaves sell out by 10:00, so pre-orders matter. Visitors are locals on phones. Feeling: warm, crusty, early-morning. **Signature:** a "today's bake" board set like a chalk price board: each item's name and price in a tall condensed face on a dark flour-dusted ground, with items marked "sold out" struck through by a hand-drawn SVG line. **Supporting:** a crust close-up in the hero, mask reveals, an hours line that says "open now" when it is.

### Stack & files
`index.html`, `styles.css`, `hours.js` (computes open/closed from a small table in Lisbon time), `bake.json` (today's list, edited by the baker), `recipes/reveal.js`. Hosted on GitHub Pages or Cloudflare Pages (`platforms/static.md`).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Oswald | 500 | board items, headings |
| Text | Source Serif 4 | 400, 400 italic | body |

### Tokens
```css
:root { --ground: #f3ebdf; --board: #1f1a16; --ink: #2a211b; --ink-60: #2a211b99; --chalk: #f6f0e6; --crust: #b5652b; --line: #2a211b1f;
  --display: "Oswald", Impact, sans-serif; --text: "Source Serif 4", Georgia, serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| hero crust | the baker's phone photo (NEEDS 1) | `<img>` 2400 px AVIF/WebP | cover, 60 % 50 % | static | flat crust-colour field, TEMP | a torn loaf close-up, open crumb, morning side light from the left; left 40 % out-of-focus flour on wood |
| oven, hands ×2 | own photos | `<img>` 4:5 | — | mask reveal | TEMP | the oven mouth glowing; hands shaping |

### Nav
64 px on ground: "Crumb & Kiln" Display 500 20 px; Today · Pre-order · Find us; "Open now · until 14:00" chip (green dot) computed by `hours.js`.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Baked at five. Gone by ten. | Display 500, clamp(44px, 7vw, 112px) | 0.95 / −0.01em | chalk | left gutter over the blurred side, top 28 vh, max 9ch | rise 20 px |
| Sub | Sourdough and pastries from a wood oven in Arroios. Pre-order Saturday loaves by Friday noon. | Text 400, 19 px | 1.5 | chalk 85 % | under H1, max 400 px | delay 120 ms |
| CTA | Pre-order for Saturday | Display 500, 16 px caps +0.06em, crust fill, chalk text | — | — | under sub | delay 220 ms |

Shadow on H1 `0 16px 38px rgba(0,0,0,.32)`.

### Sections
1. **Today's bake (board):** `--board` ground, 2 columns, rows "Country loaf ........ € 5.50" with a dotted leader, Display 500 28 px chalk, prices tabular; sold-out rows get an SVG strike drawn over 400 ms when in view.
2. **Pre-order:** a short form (name, phone, loaves, pickup time), sending to the baker's form service; real confirmation text from that service.
3. **Find us:** address, hours table, a static map image linked out.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Hero text | load | `i × 120 ms` | 700 ms | `--ease-out` | 20 px, 0 → 0, 1 |
| Board rows | in view | `i × 60 ms` | 500 ms | `--ease-out` | opacity 0 → 1 |
| Strike | in view | 300 ms | 400 ms | ease-in-out | stroke-dashoffset 100 % → 0 |
Reduced motion: strikes drawn, rows visible.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Hero image | 4:5 crop under the headline on ground | cover | cover | cover |
| Board | 1 column | 2 | 2 | 2 |

### Acceptance
**First viewport:** at 1440 × 900 a warm close-up of torn sourdough fills the screen, the condensed headline in cream on the soft left side, a rust pre-order button below; the nav says "Open now". At 390 × 844 headline and button on cream ground, the loaf photo below.
**Do not:** use a script or handwriting font for prices; show prices as an image; say "open now" when the table says closed; use cream + terracotta + serif as the whole idea (the board is the idea).
