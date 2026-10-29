# Granite · bouldering hall
<!-- Darkroom example 031 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `bold` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a one-screen hero for a bouldering gym: all text uppercase and bold with wide letter spacing, a video of someone climbing, three numbers on the right side, and opening hours and a Day pass button at the bottom.

## Build spec

### Brief & signature
Granite is a 1,600 m² bouldering hall in a former tram depot in Leipzig; 400 problems reset every week. Visitors are climbers and first-timers. Feeling: physical, chalky, direct. **Signature:** three stacked numbers on the right edge (400 · 14 · 6:30) in heavy tracked caps, each with a tiny label, set like route grades on a wall; they count up once. **Supporting:** a full-bleed climbing loop, one chalk-yellow accent, bottom info strip.

### Stack & files
`index.html`, `styles.css`, `recipes/count-up.js` (final values in HTML, `tabular-nums`), `recipes/reveal.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Archivo | 800 (wdth 100) | numbers, H1 |
| Text | Archivo | 600 | everything in caps |

### Tokens
```css
:root { --ground: #121212; --ink: #f4f1ea; --ink-70: #f4f1eab3; --chalk: #e8ff47; --line: #f4f1ea26;
  --display: "Archivo", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
body { text-transform: uppercase; letter-spacing: .08em; font-weight: 600; }
```
Caps are switched ON for this page (bold pack, tracked-caps ON); the exceptions log records "all-caps UI by the brief".

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| climb loop | filmed in the hall (NEEDS 1, with the climber's written consent) | `<video muted loop playsinline autoplay poster>` | cover, 35 % 50 % | loops | poster | a climber on an overhang at the left third, chalk dust in a side light, the right 40 % a dark grey wall; locked camera; 8 s |

### Nav
64 px: "GRANITE" Display 800 18 px +0.2em; HOURS · PRICES · COURSES · FIND US (12 px +0.14em ink-70); CTA "DAY PASS" chalk fill, ground text, radius 0, padding 12 px 20 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Climb the old tram depot. | Display 800, clamp(40px, 6vw, 96px) | 0.95 / 0 (caps, no extra tracking at display size) | ink | left gutter, bottom 18 vh, max 9ch | rise 24 px |
| Numbers | 400 / 14 / 6:30 | Display 800, clamp(48px, 6vw, 96px), tabular | 0.9 / 0 | ink; the unit labels chalk | right gutter, vertically centred, right-aligned, 28 px gaps | count up 1.6 s, 150 ms stagger |
| Labels | PROBLEMS · RESET WEEKLY / METRES HIGH · NO ROPES / OPENS AT · EVERY DAY | Text 600, 11 px +0.16em | 1.3 | chalk | under each number | fade |
| Strip | MON–FRI 6:30–23:00 · SAT–SUN 8:00–22:00 · DAY PASS € 14 · SHOES € 4 | Text 600, 12 px +0.12em, tabular | 1 | ink-70 | bottom 24 px, full width, hairline above | none |
| CTA | DAY PASS | as nav, 15 px | — | — | bottom-right above the strip | — |

Hours and prices are TEMP until the hall confirms them.

### Sections
Prices (a table), Courses (three: first time, technique, kids), Find us (address, tram line, bike parking), footer.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Numbers | load, once | `i × 150 ms` | 1600 ms | ease-out | 0 → value |
| H1 | load | 0 | 800 ms | `--ease-out` | 24 px, 0 → 0, 1 |
| Section rows | in view | `i × 80 ms` | 600 ms | `--ease-out` | 16 px, 0 → 0, 1 |
Reduced motion: numbers final, poster.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Numbers | a row of three at 36 px under the H1 | right stack | right stack | right stack at 64 px |
| Strip | two lines | one line | one line | one line |
| Video focal | 30 % 50 % | 34 % | 35 % | — |

### Acceptance
**First viewport:** at 1440 × 900 a climber pulls through an overhang on the left in a cloud of chalk; on the right three big numbers with small yellow labels; the uppercase headline bottom-left; a thin strip of hours and prices along the bottom with a yellow day-pass button. At 390 × 844 the numbers sit in one row under the headline.
**Do not:** track the display-size words (only small caps get tracking); count up more than once; film climbers without consent; use a purple accent.
