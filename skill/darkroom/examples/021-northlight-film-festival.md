# Northlight · a winter documentary film festival
<!-- Darkroom example 021 · fictional event · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing (single viewport) | `cinematic` | `hero-effect` | none | — |

## Say this
> /darkroom one full screen for a documentary film festival: the trailer loops behind everything, and instead of darkening it, the bottom of the screen gets blurry so the dates and ticket buttons are readable. No scrolling on the first screen.

## Build spec

### Brief & signature
Northlight shows 48 documentaries over five days in February in Tromsø's old cinema. Visitors want dates, the programme and tickets. Feeling: nocturnal, curious, communal. **Signature:** a progressive blur at the bottom of the trailer loop (masked `backdrop-filter`, strongest at the bottom edge, gone by 45 % of the height) so the ticket bar sits on blurred film instead of a dark gradient. **Supporting:** one large date set, a frosted material only on the two ticket buttons.

### Stack & files
`index.html`, `styles.css`, `main.js` (pauses the trailer in hidden tabs, fade loop), the trailer re-cut silent to 20 s by the festival.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Unbounded | 500 | dates, festival name |
| Text | Hanken Grotesk | 400, 600 | UI |

### Tokens
```css
html, body { background: #05070a; }
:root { --ground: #05070a; --ink: 0 0% 98%; --ink-80: hsl(var(--ink) / .8); --frost: #b9e3ff; --line: hsl(var(--ink) / .16);
  --display: "Unbounded", system-ui, sans-serif; --text: "Hanken Grotesk", system-ui, sans-serif; }
```

### Verbatim utilities
```css
.blur-floor { position: fixed; inset: 0; pointer-events: none; z-index: 1;
  backdrop-filter: blur(28px) saturate(1.1); -webkit-backdrop-filter: blur(28px) saturate(1.1);
  mask-image: linear-gradient(to top, #000 0%, #000 12%, transparent 45%); -webkit-mask-image: linear-gradient(to top, #000 0%, #000 12%, transparent 45%); }
@supports not (backdrop-filter: blur(1px)) { .blur-floor { background: linear-gradient(to top, #05070acc, transparent 45%); } }
.frost { background: hsl(0 0% 100% / .08); border: 1px solid hsl(0 0% 100% / .18); backdrop-filter: blur(10px); border-radius: 999px; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| trailer | festival's own trailer, re-cut silent, no burned-in text (NEEDS 1) | `<video muted loop playsinline autoplay poster>` fixed, cover | 50 % 40 % | fade loop | poster | real festival films; cut slowly (≥ 3 s per shot) so the loop never flashes; no title cards |

### Nav
Top row 72 px: "Northlight" Display 500 18 px; Programme · Venues · Passes; "EN / NO" toggle 13 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Edition | 12th edition · Tromsø | Text 600, 13 px +0.14em caps | 1 | ink-80 | above dates | none |
| Dates | 4–8 Feb 2027 | Display 500, clamp(56px, 10vw, 168px), tabular | 0.9 / −0.04em | ink | left gutter, bottom 22 vh | blur 10 px → 0, 1 s |
| Line | 48 documentaries in the old Verdensteatret cinema, with the people who made them. | Text 400, 18 px | 1.5 | ink-80 | under dates, max 520 px | fade, delay 200 ms |
| Ticket bar | Buy a festival pass · See the programme | Text 600, 16 px, two `.frost` buttons 52 px tall | — | ink | bottom 32 px, left gutter | fade, delay 300 ms |
| Countdown | 98 days to go | Text 600, 13 px tabular | — | frost | bottom-right | none |

Dates and edition are TEMP until the festival confirms them.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Dates | load | 0 | 1000 ms | `cubic-bezier(.22,1,.36,1)` | blur(10px), 0 → blur(0), 1 |
| Line, buttons | load | `0.2 + i × 0.1 s` | 600 ms | same | 12 px, 0 → 0, 1 |
| Trailer | loop | — | 500 ms fades | linear | opacity at ends |
Reduced motion: poster still, everything final.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Dates | 52 px, two lines (4–8 / Feb 2027) | 120 px | 168 px | 110 px |
| Ticket bar | stacked full-width buttons | row | row | row |
| Blur floor | to 55 % | 45 % | 45 % | 50 % |

### Acceptance
**First viewport:** at 1440 × 900 the trailer fills the screen, sharp at the top, melting into a soft blur toward the bottom where huge dates and two frosted ticket buttons sit; no dark wash anywhere. At 390 × 844 the same, with the dates on two lines and full-width buttons.
**Do not:** darken the film with a gradient (only the fallback may); use a trailer with title cards; play sound; claim films or guests not yet announced.
