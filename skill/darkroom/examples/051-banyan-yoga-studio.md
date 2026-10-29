# Banyan · yoga studio with a weekly timetable
<!-- Darkroom example 051 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `nature` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a calm one-page site for our yoga studio: the weekly timetable is the most important thing, with class levels, a first-class-free offer, and a booking link to our booking app. Earthy colours, lots of space.

## Build spec

### Brief & signature
Banyan teaches 24 classes a week in a converted print works in Ghent: vinyasa, yin, prenatal. Visitors are beginners checking times on phones. Feeling: grounded, unhurried, open. **Signature:** the timetable as a 7-day grid where today's column is lifted onto a warm card and a thin line marks the current time; each class chip shows level as one, two or three small leaves. **Supporting:** one slow photo of the room with morning light, breath-length reveals (900 ms), a "first class free" line under the headline.

### Stack & files
`index.html`, `styles.css`, `timetable.js` (renders from `classes.json`, highlights today and draws the now-line in the studio's time zone), `recipes/reveal.js`. Booking links go to the studio's booking app pages.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Young Serif | 400 | headings |
| Text | Nunito Sans | 400, 600 | timetable, body |

### Tokens
```css
:root { --ground: #f4efe6; --card: #fffaf2; --ink: #2d2a24; --ink-60: #2d2a2499; --clay: #b86b48; --leaf: #6c7f4f; --line: #2d2a241a;
  --display: "Young Serif", Georgia, serif; --text: "Nunito Sans", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| room photo | own (NEEDS 1) | `<img>` 2400 px | cover, 50 % 60 % | static | clay field, TEMP | the empty studio with mats laid out, morning light from tall windows on the left, plants; top third the brick wall |

### Nav
68 px: "Banyan" Display 400 24 px; Timetable · Classes · Teachers · Prices; CTA "Book your free class" clay fill, card text, radius 999 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Come as you are. Leave a bit lighter. | Display 400, clamp(40px, 5.8vw, 88px) | 1.05 / −0.01em | ink | left gutter, top 22 vh, columns 1–6 | rise 16 px, 900 ms |
| Sub | Yoga for every body in an old print works in Ghent. Your first class is free. | Text 400, 19 px | 1.55 | ink-60 | under H1 | delay 150 ms |
| CTA | Book your free class | as nav | — | — | under sub | delay 250 ms |
| Photo | — | radius 32 px | — | — | columns 7–12, height 64 vh | mask open 1 s |

### Sections
1. **Timetable:** 7 columns (Mon–Sun), class chips (time tabular, name 600, teacher, leaves 1–3 for level), today's column on `--card` with a 1 px clay border, a 1 px clay now-line; tapping a chip opens its booking page.
2. **Classes:** six types with 30 words each and the level leaves explained.
3. **Prices:** drop-in, 10-class card, monthly; incl. VAT; TEMP.
4. **Find us:** address, bike parking, step-free entrance.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Hero text | load | `i × 150 ms` | 900 ms | `--ease-out` | 16 px, 0 → 0, 1 |
| Timetable columns | in view | `i × 60 ms` | 700 ms | `--ease-out` | opacity 0 → 1 |
| Now-line | every 60 s | — | 300 ms | linear | top position |
Reduced motion: no travel; the now-line still updates (it is information).

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Timetable | day tabs (today selected) with a vertical list | 4 days visible, scroll-snap | 7 columns | 7 columns |
| Photo | under the CTA, 4:3 | right | right | right, 56 vh |

### Acceptance
**First viewport:** at 1440 × 900 a warm sand page; a gentle serif headline and free-class line on the left with a clay button; on the right a rounded photo of the sunlit studio. Below, a week grid with today lifted on a card and a thin line at the current time. At 390 × 844 headline, button, photo, then today's classes as a list.
**Do not:** use lotus or chakra icons; show a now-line in the visitor's time zone if they are abroad (use the studio's); invent teacher bios; put prices in an image.
