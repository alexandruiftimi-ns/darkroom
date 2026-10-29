# Ember Room · twelve-seat tasting-menu restaurant
<!-- Darkroom example 075 · fictional restaurant · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `luxury` + `restaurant` | `hero-effect` | none | `reveal.js` |

## Say this
> /darkroom a dark, intimate site for our twelve-seat counter restaurant: one tasting menu cooked over fire, seasonal courses listed, booking opens monthly. A slow video of embers at the top. Very few words.

## Build spec

### Brief & signature
Ember Room serves one 11-course menu over a wood fire at a twelve-seat counter in Copenhagen; € 195; bookings open on the 1st for the next month. Visitors are diners planning a special night. Feeling: hushed, glowing, precise. **Signature:** the menu as a single vertical line of eleven courses, each just one word (Oyster · Ember · Rye · Turbot …) at display size, with the ingredients in tiny caps beside it; the line glows warmer (ink → ember colour) course by course as it scrolls past the middle, like coals catching. **Supporting:** a slow embers loop, the booking-opens date as the main CTA, extreme restraint.

### Stack & files
`index.html`, `styles.css`, `menu.js` (IntersectionObserver with a middle band sets `.lit` per course), `recipes/reveal.js`, `media/embers.mp4`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Bodoni Moda | 400 | course words |
| Text | Jost | 400 | caps labels |

### Tokens
```css
:root { --ground: #0b0807; --ink: 30 20% 88%; --ink-40: hsl(var(--ink) / .4); --ember: #ff8a3d; --line: hsl(var(--ink) / .12);
  --display: "Bodoni Moda", Didot, serif; --text: "Jost", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| embers | filmed at the hearth (NEEDS 1) | `<video muted loop playsinline autoplay poster>` | cover, 50 % 70 % | fade loop | poster | macro of embers breathing orange in black ash, slow, nothing moving fast, no flames leaping; top 50 % near black falling to `#0b0807` |

### Nav
56 px: "EMBER ROOM" Text 400 12 px +0.3em; Menu · Counter · Book.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Eleven courses. One fire. Twelve seats. | Display 400, clamp(36px, 5.4vw, 88px) | 1.05 / −0.01em | ink | centred, top 26 vh, three lines by hand | fade 1.4 s |
| Booking line | Bookings for December open 1 November at 10:00 | Text 400, 13 px +0.16em caps, tabular | 1.4 | ember | centred under H1 | fade, delay 600 ms |
| CTA | Book the counter | Text 400, 13 px caps +0.2em, ember 1 px border, padding 14 px 24 px | — | ember | under the line | delay 700 ms |

### Sections
1. **Menu:** 11 rows: course word Display 400 clamp(40px, 7vw, 120px), ingredients Text 400 11 px +0.16em caps ink-40 to the right ("Oyster · fermented gooseberry · smoked butter"). `.lit` → word colour ember, transition 800 ms. All courses TEMP (seasonal).
2. **The counter:** one photo of the counter, 40 words.
3. **Book:** price per person incl. service, drinks pairing, dietary note, booking link; cancellation policy.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| H1 | load | 200 ms | 1400 ms | ease-out | opacity 0 → 1 |
| Course lit | middle band (40–60 % of viewport) | 0 | 800 ms | `cubic-bezier(.4,0,.2,1)` | ink-40 → ember (stays lit) |
| Embers | loop | — | 800 ms fades | linear | opacity at ends |
Reduced motion: poster; all courses shown lit; no fades.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Course words | 13vw, ingredients under each | 9vw | 7vw | 6vw |
| H1 | 34 px | 60 px | 88 px | 64 px |

### Acceptance
**First viewport:** at 1440 × 900 black ash with embers breathing at the bottom; three short centred lines of fine serif; a small orange line about when bookings open and a thin-bordered button. Scrolling the menu, each one-word course turns ember-orange as it reaches the middle and stays lit. At 390 × 844 the same, courses stacked with ingredients beneath.
**Do not:** add a newsletter pop-up; show more than 40 words above the fold; use flame clipart; list a menu as final when it is seasonal.
