# Common Ground · co-working spaces in market towns
<!-- Darkroom example 038 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `family` + `modern` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a landing page for a network of co-working spaces in small towns. Text on the left, and on the right an animated drawing of rings with our town names slowly orbiting a centre. At the bottom a moving strip of all our towns. Join for a day.

## Build spec

### Brief & signature
Common Ground runs 11 co-working spaces in market towns across Shropshire and Herefordshire; one membership opens all of them. Visitors are remote workers tired of commuting. Feeling: friendly, local, connected. **Signature:** three concentric rings drawn in SVG on the right; small labelled dots for each town orbit at 40 s, 55 s and 70 s per turn; hovering a dot pauses its ring and shows the space's address. **Supporting:** a slow ticker of town names along the bottom with a pause button, warm paper ground, round buttons.

### Stack & files
`index.html`, `styles.css`, `orbits.js` (positions dots with CSS custom properties; rings rotate with CSS keyframes; dots counter-rotate so labels stay upright), `recipes/reveal.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Urbanist | 700 | headline |
| Text | Nunito Sans | 400, 600 | UI |

### Tokens
```css
:root { --ground: #f6f1e7; --ink: #1f2a24; --ink-60: #1f2a2499; --meadow: #3b7d4f; --sun: #f2b544; --line: #1f2a241f;
  --display: "Urbanist", system-ui, sans-serif; --text: "Nunito Sans", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| orbits | drawn in code | inline SVG 640 × 640 | right columns 7–12, vertically centred | rotating rings | static rings with labels | 1.5 px ink-12 rings; dots 12 px meadow with a 4 px ground ring; centre: a 64 px sun circle with "1 membership" |
| space photos ×11 | own photos | `<img>` 4:3 | — | reveal | TEMP | each space in daylight, people only with consent |

### Nav
72 px: "Common Ground" Display 700 20 px; Spaces · Membership · Events; CTA "Join for a day" meadow fill, ground text, radius 999 px, `:active` scale .97.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Work ten minutes from home. | Display 700, clamp(40px, 5.6vw, 88px) | 1.0 / −0.03em | ink | columns 1–6, top 24 vh | rise 20 px |
| Sub | Eleven co-working spaces in market towns, one membership. Desks, calls, coffee and people. | Text 400, 18 px | 1.55 | ink-60 | under H1, max 420 px | delay 100 ms |
| CTAs | Join for a day · See the spaces | primary + text link | — | — | under sub | delay 200 ms |
| Ticker | Ludlow · Bishop's Castle · Leominster · Ledbury · Church Stretton · Clun · Kington · … | Display 700, 22 px | 1 | ink-60, dots in sun | bottom 24 px, edge-fade mask 8 % | 36 s loop, pause button |

Town list and count are TEMP until the network confirms them.

### Sections
Spaces (grid of 11 cards with town, hours and a photo; cards share one radius 16 px, no shadow), Membership (two plans incl. VAT), Events (next three meet-ups), FAQ, footer.

### Interaction logic
Rings: `animation: spin 40s linear infinite` (55 s, 70 s). Each dot: `transform: rotate(var(--a)) translateX(var(--r)) rotate(calc(-1 * var(--a)))` inside the ring plus an inner counter-spin so labels stay level. Hover or focus on a dot (`<a>` to the space page): `animation-play-state: paused` on its ring, a tooltip with address 200 ms. Pause button pauses rings and ticker. Off-screen: paused (IntersectionObserver toggles a class).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Rings | always | — | 40 / 55 / 70 s per turn | linear | rotate 0 → 360° |
| Ticker | always | — | 36 s | linear | translateX(0 → −50 %) |
| Hero text | load | `i × 100 ms` | 700 ms | `--ease-out` | 20 px, 0 → 0, 1 |
Reduced motion: rings static, ticker static and wrapped.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Orbits | 320 px under the CTAs, labels on 5 dots only | 480 px | 640 px | 520 px |
| H1 | 38 px | 64 px | 88 px | 68 px |

### Acceptance
**First viewport:** at 1440 × 900 a warm paper page; the headline and two buttons on the left; on the right three thin rings turning slowly with green town dots that keep their labels upright; a ticker of town names along the bottom. At 390 × 844 the rings sit under the buttons, smaller, with five labels.
**Do not:** show logos of companies who "work here"; let labels rotate upside down; move anything after the pause button is pressed; use a stock photo of a laptop on a café table.
