# Southpaw · community boxing club
<!-- Darkroom example 063 · fictional club · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `bold` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a punchy one-page site for our community boxing club: classes for kids, women-only and adults, a timetable, prices, and "first session free". Black, white and one strong colour. Our coaches' photos are great.

## Build spec

### Brief & signature
Southpaw is a not-for-profit boxing club under a railway arch in Glasgow; 300 members, ages 8 to 70. Visitors are parents, women looking for a safe class, and adults wanting fitness. Feeling: tough, welcoming, alive. **Signature:** the three audiences as three tall poster panels side by side (Kids · Women only · Adults), each a black-and-white coach photo with the class name in huge condensed type and one red stripe; hovering a panel widens it from 33 % to 46 % (flex-grow), tapping on phones opens it. **Supporting:** a timetable in a strict grid, a red count of "sessions this week".

### Stack & files
`index.html`, `styles.css`, `recipes/reveal.js`. Panels are `<a>` elements to the class sections; flex-grow transition in CSS.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Big Shoulders Display | 900 | panel names, headings |
| Text | Barlow | 400, 600 | body |

### Tokens
```css
:root { --ground: #0c0c0c; --ink: #f5f5f2; --ink-70: #f5f5f2b3; --red: #e4002b; --paper: #f5f5f2; --line: #f5f5f226;
  --display: "Big Shoulders Display", Impact, sans-serif; --text: "Barlow", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| coach photos ×3 | own, black-and-white (NEEDS 1–3, consent; for kids: coach only, no children's faces) | `<img>` 3:5, 1200 px tall, `filter: grayscale(1)` if colour | cover, 50 % 30 % | panel widen | black panel with the name | each coach mid-movement with pads, hard side light under the arch |

### Nav
60 px: "SOUTHPAW" Display 900 22 px; Classes · Timetable · Prices · Find us; CTA "First session free" red fill, paper text, radius 0.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Everyone's welcome under the arch. | Display 900, clamp(36px, 5vw, 80px) | 0.92 / 0 | ink | top band, left gutter | rise 16 px |
| Panels ×3 | KIDS 8–15 · WOMEN ONLY · ADULTS | Display 900, clamp(48px, 6.4vw, 104px), vertical stack bottom-left of each panel | 0.85 | ink | full width row under the H1, height 72 vh | flex-grow 1 → 1.4 on hover, 500 ms |
| Stripe | — | 8 px red bar | — | red | top of each panel | none |
| Line under each name | Mon & Wed 17:00 · £ 3 / Tue & Thu 19:00 · £ 5 / every night 18:30 · £ 6 | Text 600, 15 px tabular | 1.3 | ink-70 | under the name | none |

Times and prices TEMP until the club confirms.

### Sections
Timetable (7 × 3 grid: day × class; cells with time and coach), Prices (pay per session or monthly; concessions), Coaches (with qualifications), Safeguarding (welfare officer contact: required for the kids' class), Find us.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Panel widen | hover / focus (pointer) | 0 | 500 ms | `--ease-out` | flex-grow 1 → 1.4, others 1 → .8 |
| Panel name | in view | `i × 100 ms` | 700 ms | `--ease-out` | translateY(30%) in mask → 0 |
| Timetable cells | in view | `col × 40 ms` | 400 ms | ease-out | opacity |
Reduced motion: no widening; names in place.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Panels | stacked, 40 vh each, tap to expand info | 3 in a row, 60 vh | 72 vh | 64 vh |
| Timetable | list per day | grid | grid | grid |

### Acceptance
**First viewport:** at 1440 × 900 a black page; a short headline; then three tall black-and-white coach photos side by side with KIDS 8–15, WOMEN ONLY and ADULTS in huge white letters and a red stripe on top; pointing at one widens it. At 390 × 844 the panels stack, the first-session-free button in the nav.
**Do not:** show children's faces; use fight-promotion imagery (blood, aggression); hide safeguarding contacts; animate more than the panel widening.
