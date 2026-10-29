# Sharp & Sons · barbershop, three generations
<!-- Darkroom example 087 · fictional business · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `bold` + `editorial-news` (type) | `animated` | none | `reveal.js` |

## Say this
> /darkroom a one-page site for our family barbershop, open since 1961: prices on a board like the one on our wall, our three barbers, walk-in times, and book online. Classic, sharp, not hipster.

## Build spec

### Brief & signature
Sharp & Sons has cut hair on the same corner in Cork since 1961; grandfather, son and granddaughter. Visitors are locals checking prices and walk-in times. Feeling: classic, proud, no-nonsense. **Signature:** a striped barber-pole band (red, white, navy diagonal stripes, CSS `repeating-linear-gradient`) as a 16 px rule between every section, sliding slowly sideways only while the section is on screen; plus the price board set as the wall sign: white condensed caps on navy with gold rules. **Supporting:** a family timeline of three barbers, a walk-in "chairs free now" note the owner can update, no other ornaments.

### Stack & files
`index.html`, `styles.css`, `status.json` (walk-in note), `recipes/reveal.js`. Booking button links to the booking app.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Oswald | 600 | board, headings |
| Text | Libre Franklin | 400, 600 | body |

### Tokens
```css
:root { --ground: #f5f1e8; --navy: #14213d; --red: #c1121f; --gold: #c9a227; --ink: #14213d; --ink-60: #14213d99; --line: #14213d1f;
  --display: "Oswald", Impact, sans-serif; --text: "Libre Franklin", system-ui, sans-serif; }
.pole { height: 16px; background: repeating-linear-gradient(-45deg, var(--red) 0 14px, #fff 14px 28px, var(--navy) 28px 42px, #fff 42px 56px); background-size: 79.2px 16px; animation: pole 6s linear infinite paused; }
.pole.on { animation-play-state: running; } @keyframes pole { to { background-position: 79.2px 0; } }
@media (prefers-reduced-motion: reduce) { .pole { animation: none; } }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| shop photo | own (NEEDS 1) | `<img>` 2000 px | cover, 50 % 50 % | static | navy field | the three chairs and the old mirror, the pole visible outside the window |
| barbers ×3 | own (NEEDS 2) | `<img>` 4:5, black and white | — | static | initials | each at their chair with scissors |

### Nav
60 px on ground: "SHARP & SONS · EST. 1961" Display 600 16 px +0.12em; Prices · Barbers · Visit; "Book a cut" red fill, white, radius 0.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Same corner. Same chairs. Since 1961. | Display 600, clamp(44px, 7vw, 112px) caps | 0.92 / 0 | navy | left, columns 1–7, top 18 vh | lines rise, 80 ms stagger |
| Walk-in | Walk-ins today until 17:00 · 2 chairs free now | Text 600, 16 px with a green dot | 1.3 | ink | under H1 | none |
| CTA | Book a cut | as nav, 18 px, 56 px | — | — | under walk-in | — |
| Photo | shop | — | — | — | columns 8–12, 70 vh | mask open |
| Pole | band | 16 px | — | — | full width at the bottom of the hero | slides while on screen |

### Sections
Prices board (navy panel, gold 1 px rules, rows "SKIN FADE ........ € 22"; prices TEMP), Barbers (three generations with years they started), Visit (hours, address, "cash and card"), footer.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Pole | on screen (IntersectionObserver) | — | 6 s loop | linear | background-position 0 → 79.2 px |
| H1 lines | load | `i × 80 ms` | 700 ms | ease-out | translateY(100%) in mask → 0 |
| Board rows | in view | `i × 40 ms` | 500 ms | ease-out | opacity |
Reduced motion: static pole, lines in place.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Photo | under the CTA, 4:3 | right | right | right |
| Board | one column | two columns | two columns | two |

### Acceptance
**First viewport:** at 1440 × 900 a warm paper page; three short lines in tall navy capitals on the left with today's walk-in status and a red Book button; the old shop interior on the right; a red, white and navy pole stripe slowly sliding along the bottom. At 390 × 844 headline, status, button, photo, stripe.
**Do not:** use a vintage-texture overlay; animate the pole off-screen; show walk-in status without the owner updating it (hide it if older than today).
