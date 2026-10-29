# Pebble & Tin · hand-painted tin robot shop
<!-- Darkroom example 005 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `shopify` | landing + catalog | `artsy` + `catalog` | `hero-effect` | none | `reveal.js` |

## Say this
> /darkroom a Shopify store for my hand-painted tin robots. On the home page I want a carousel: one robot big in the middle, the others smaller to the sides and behind, and the whole background changes colour to match the robot in front.

## Build spec

### Brief & signature
Pebble & Tin sells 40 hand-painted tin wind-up robots a month from a workshop in Porto, € 68–140. Visitors are collectors and gift buyers on phones. Feeling: playful, crafted, collectible. **Signature:** a depth carousel of four robots in role slots (front, left, right, back); the page ground crossfades to the front robot's colour in 700 ms. **Supporting:** a ghost word of the robot's name behind it, press feedback on arrows, reveals on the collection grid.

### Stack & files
Shopify Online Store 2.0 theme from `darkroom platform scaffold shopify`. Section `sections/robot-carousel.liquid` with blocks (product, colour, panel colour) so the owner picks the four robots in the editor; `assets/carousel.js`, `assets/carousel.css`. Collection and product templates restyled; checkout untouched.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Bricolage Grotesque | 800 | ghost names, headings |
| Text | Outfit | 400, 600 | UI, prices |

### Tokens
```css
:root { --ground: var(--robot-bg, #f2a65a); --panel: var(--robot-panel, #f6bf86); --ink: #1b1410; --ink-60: #1b141099; --paper: #fff8ef;
  --display: "Bricolage Grotesque", system-ui, sans-serif; --text: "Outfit", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```
Robot colours (block settings, defaults): Bolt `#f2a65a`/`#f6bf86` · Juniper `#6fbf8e`/`#93d2ab` · Rosa `#e98fb8`/`#f0afcb` · Comet `#74aef0`/`#9cc6f5`. Ink `#1b1410` passes 4.5:1 on all four.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| robot cut-outs ×4 | owner's photos, background removed (NEEDS 1–4) | `<img>` WebP with alpha, 1200 px tall, ≤ 300 KB | contain, bottom-centred | role slots | product's first image on `--panel` | front three-quarter view, soft top light, same camera height for all four |
| collection | Shopify product images | theme `image_url` with widths 360/720/1080 | 4:5 | — | — | — |

### Nav
Shopify header section: logo text "Pebble & Tin" Display 800 22 px; Shop · Workshop · Care; cart count in a 22 px circle on `--ink`. Sticky, `--paper` at 92 % after scroll.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Ghost name | JUNIPER (front robot's name) | Display 800, 30vw | 0.8 / −0.05em | `--panel` | centred, top 18 vh, behind robots | crossfades with the robot, 400 ms |
| Front robot | — | height 62 vh | — | — | centre, bottom 10 vh, z 4 | scale .72 → 1, translateX ±28vw → 0 |
| Side robots | — | height 38 vh | — | — | x ±28vw, z 3, opacity .9 | — |
| Back robot | — | height 26 vh | — | — | centre, y −6 vh, z 1, opacity .45, blur 2px | — |
| H1 | Wind them up. Pass them down. | Text 600, 18 px caps +0.08em | 1.3 | ink-100 | top-left gutter | fade |
| Product line | Juniper · No. 14 of 40 · € 96 | Text 400, 16 px tabular | 1.4 | ink-80 | bottom-left | swaps with the robot |
| Arrows | Previous / Next | 56 px circles, 1.5 px ink border | — | ink | bottom-right, 12 px gap | `:active` scale .94 |
| CTA | Add Juniper to cart | Text 600, 16 px, ink fill, paper text | — | — | bottom-left under product line | — |

### Interaction logic
State `active` 0–3, `locked` boolean. Roles: front = active, left = (active+3)%4, right = (active+1)%4, back = (active+2)%4. `next()`/`prev()`: ignore while locked; lock 700 ms; update roles; set `--robot-bg` and `--robot-panel` on `:root`; update ghost name, product line and the form's variant id. Keyboard: ←/→ on the carousel region (`role="region" aria-roledescription="carousel"`), live region announces "Juniper, 14 of 40, 96 euros". Swipe on touch (threshold 40 px). Preload the four images on load. No JS: the four robots render as a static row with links.

### Sections
1. **The collection:** Shopify collection grid, 4 columns desktop / 2 phone, cards without borders on `--paper`, robot on its own colour tile, name + price, "sold out" in ink-60.
2. **Workshop:** a 3:2 photo of the bench + 45 words; "Each robot is numbered and signed".
3. **Care:** wind gently, keep dry, a lifetime repair promise (only if the owner confirms; TEMP).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Robots | next/prev | 0 | 700 ms | `--ease-out` | slot transforms (translate, scale, opacity, blur) |
| Ground | next/prev | 0 | 700 ms | linear | background-color old → new |
| Ghost name | next/prev | 150 ms | 400 ms | `--ease-out` | opacity 0, 20 px → 1, 0 |
Reduced motion: slots swap instantly, ground changes without a fade.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Front robot | 48 vh | 56 vh | 62 vh | 52 vh |
| Side robots | x ±34vw, 24 vh, opacity .6 | ±30vw | ±28vw | — |
| Arrows | 48 px, centred under robot | right | right | — |

### Acceptance
**First viewport:** at 1440 × 900 a warm orange page, a tin robot large in the centre with its name huge and pale behind it, two smaller robots to the sides and one small and blurred behind; product line and Add to cart bottom-left, arrows bottom-right. At 390 × 844 the front robot fills the middle, arrows and button stacked below, all within the screen.
**Do not:** hotlink product images (use Shopify's own CDN through Liquid filters only); put the price only in the image; change colours without checking ink contrast; claim edition sizes the owner has not confirmed; touch checkout.
