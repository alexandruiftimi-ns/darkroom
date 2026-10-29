# Fernwave · a three-day music festival in a forest
<!-- Darkroom example 054 · fictional event · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `astro` | landing | `artsy` + `bold` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a loud, colourful site for our forest music festival: the line-up as huge type in different sizes by billing, each day with its own colour, tickets with tiers, and practical info (camping, getting there). It should feel like the poster.

## Build spec

### Brief & signature
Fernwave is 6,000 people in a pine forest in Brandenburg over three days in July; indie, electronic, folk. Visitors are fans checking the line-up and buying tickets. Feeling: joyful, loud, outdoors. **Signature:** the line-up set as the poster: each day is a full-width colour block (Fri moss, Sat magenta, Sun sun-yellow) with artist names in one condensed face at three sizes by billing (headliners 10vw, second line 5vw, the rest 2.4vw, separated by dots), filling the width edge to edge. **Supporting:** a ticker of the dates, tickets with sold-out states, a quiet practical section.

### Stack & files
Astro; `src/data/lineup.json` (day, tier, artist, link), `src/components/DayBlock.astro`, `src/components/Tickets.astro`; tickets link to the ticket provider (ask which).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Big Shoulders Display | 900 | line-up, headings |
| Text | Rubik | 400, 500 | info |

### Tokens
```css
:root { --ink: #111111; --paper: #fff7e6; --moss: #2f6b3a; --magenta: #e2337c; --sun: #ffd23f; --line: #11111126;
  --display: "Big Shoulders Display", Impact, sans-serif; --text: "Rubik", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```
Colour mode `expressive` (one dominant colour per viewport; text contrast checked on each block: paper on moss, ink on magenta, ink on sun).

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| forest stage | last year's photo (NEEDS 1) | `<img>` 2400 px, duotone via CSS (`filter` + a magenta overlay with `mix-blend-mode: multiply`) | cover | static | magenta block | the main stage between pines at dusk, crowd from behind |

### Nav
64 px on paper: "FERNWAVE" Display 900 24 px; Line-up · Tickets · Camping · Getting there; CTA "Tickets" ink fill, sun text, radius 0.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | FERNWAVE 2027 | Display 900, 19vw | 0.8 / −0.02em | ink | full width, top 10 vh | rises 8 % in a mask |
| Dates | 9–11 July · Wald bei Lychen · 6,000 people | Display 900, clamp(24px, 3vw, 44px) | 1 | ink | under H1, left | fade |
| Photo | duotone stage | — | — | — | below, full width, 46 vh | none |
| Ticker | TICKETS ON SALE · 9–11 JULY · CAMPING INCLUDED · | Display 900, 28 px | 1 | sun on ink | across the photo's bottom | 30 s loop, pause button |

### Sections
1. **Line-up:** three DayBlocks. Each: day label (Display 900 32 px), headliners 10vw (2 per day), second line 5vw (4–6), the rest 2.4vw separated by `·`, all centred, `text-wrap: balance`. Artist names link to their pages. All names TEMP until announced.
2. **Tickets:** three tiers (Early · Regular · Late), price incl. fees and VAT, "Sold out" struck through with a 4 px ink line.
3. **Practical:** camping, getting there (train + shuttle), accessibility, code of conduct, FAQ.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| H1 | load | 0 | 900 ms | `--ease-out` | translateY(8%) in mask → 0 |
| Day blocks | in view | 0 | 700 ms | `--ease-out` | headliner line rises 40 px |
| Ticker | always | — | 30 s | linear | translateX(0 → −50 %) |
Reduced motion: no rises, ticker static.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Headliners | 14vw | 11vw | 10vw | 9vw |
| Rest of the bill | 5vw, wrapping freely with dots | 3vw | 2.4vw | 2.4vw |
| Tickets | stacked | 3 columns | 3 columns | — |

### Acceptance
**First viewport:** at 1440 × 900 a cream page with FERNWAVE 2027 in tall black letters across the whole width, dates beneath, and a magenta-toned photo of a forest stage with a yellow ticker. Scrolling turns the page moss, then magenta, then yellow, each day's names filling the width like a poster. At 390 × 844 the name still spans the width, headliners on their own lines.
**Do not:** announce artists that are not confirmed; use more than one display face; let a block fail contrast; autoplay sound.
