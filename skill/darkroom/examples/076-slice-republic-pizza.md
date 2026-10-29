# Slice Republic · pizza by the slice, order for collection
<!-- Darkroom example 076 · fictional shop · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `php` | landing + order | `bold` + `restaurant` | `animated` | none | — |

## Say this
> /darkroom a fast phone-first site for our pizza-by-the-slice shop on our PHP hosting: today's slices with prices, order for collection in 15 minutes, opening hours. Big, bright, simple. It must work great on cheap phones.

## Build spec

### Brief & signature
Slice Republic sells eight slices a day in Leeds city centre, £ 3–4.50 a slice; most orders are students at lunch. Visitors are on phones with weak signal. Feeling: hot, quick, cheerful. **Signature:** a menu of slices as big tappable tiles with a + / − counter right on each tile and a sticky bottom bar that grows ("3 slices · £ 10.50 · Collect at 12:45 →"); the whole page weighs under 150 KB before photos. **Supporting:** tomato-red and mozzarella-white blocks, one photo per slice at 480 px, CSS-only transitions.

### Stack & files
`darkroom platform scaffold php`: `index.php` (reads `data/today.json`), `order.php` (POST, CSRF, validates against today's list and stock, writes to the shop's order email or printer service, real confirmation page with a pickup number), `assets/css/site.css` (≤ 20 KB), `assets/js/cart.js` (≤ 6 KB, progressive: without JS each tile has a quantity `<select>` and the form posts normally).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Bricolage Grotesque | 800 | one woff2 subset ≤ 30 KB |
| Text | system-ui | 400, 600 | no download for body text |

### Tokens
```css
:root { --ground: #fff8ef; --tomato: #e23b2e; --basil: #2f7d3b; --ink: #1c1410; --ink-60: #1c141099; --line: #1c14101f;
  --display: "Bricolage Grotesque", system-ui, sans-serif; --text: system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| slice photos ×8 | the shop's phone photos on the counter (NEEDS 1) | `<img>` 480 px WebP ≤ 25 KB each, `loading="lazy"` after the first two | 1:1 | static | tomato tile with the name | each slice from above on the same steel counter |

### Nav
56 px: "SLICE REPUBLIC" Display 800 18 px; "Open now · until 21:00" (computed in PHP); a basket count in a 28 px circle.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Hot slices, ready in 15 minutes. | Display 800, clamp(34px, 8vw, 72px) | 0.95 / −0.02em | ink | top, full width | none |
| Sub | Order now, collect at 23 Call Lane. No account needed. | Text 400, 17 px | 1.45 | ink-60 | under H1 | none |
| Tiles ×8 | "Margherita · £ 3.00" etc. | name Display 800 22 px, price Text 600 18 px tabular | — | ink | 2-column grid, gap 10 px | tap feedback |
| Counter | − 0 + | 44 × 44 px buttons, tomato | — | white | bottom of each tile | `:active` scale .94 |
| Sticky bar | 3 slices · £ 10.50 · Collect at 12:45 → | Text 600, 17 px | — | white on tomato | fixed bottom, 64 px + safe area | slides up 250 ms when the first slice is added |

Slices, prices and the address are TEMP until `today.json` is filled.

### Sections
Opening hours (table), Allergens (per slice, EU list), Find us (address, a static map image), footer.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Sticky bar | first add | 0 | 250 ms | `cubic-bezier(.32,.72,0,1)` | translateY(100%) → 0 |
| Count change | +/− | 0 | 150 ms | ease-out | number scales 1.2 → 1 |
Reduced motion: bar appears without sliding.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Tiles | 2 columns | 3 | 4 | 4 |
| Sticky bar | full width | full width | right-aligned card 360 px | — |

### Acceptance
**First viewport:** at 390 × 844 (the main case) a cream page with a bold red-and-black headline, the address line, then four slice tiles with + / − buttons; adding one slides up a red bar with the total and pickup time. The page loads under 150 KB before photos on a throttled connection (measure). At 1440 × 900 the tiles in four columns with a floating basket card.
**Do not:** require an account; load a web font for body text; take payment on this page without a payment provider's own form; show slices that are sold out as orderable.
