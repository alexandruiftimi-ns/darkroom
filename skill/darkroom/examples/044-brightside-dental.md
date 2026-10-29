# Brightside Dental · family dental practice
<!-- Darkroom example 044 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `php` | landing | `trust` + `family` | `calm` | none | — |

## Say this
> /darkroom a website for our dental practice on our PHP hosting. Calm, reassuring, not clinical-cold. New patients should find prices, the emergency number and the booking form fast. We have photos of the team and the rooms.

## Build spec

### Brief & signature
Brightside is a 6-chair NHS and private dental practice in Leeds; nervous patients are a focus. Visitors are new patients, parents, and people in pain looking for an emergency slot. Feeling: gentle, clear, competent. **Signature:** a "What happens at your first visit" timeline in five steps with real durations and the name of who you meet at each step, so a nervous patient can picture the hour. **Supporting:** a top bar with the emergency number always visible, a price table in plain words, soft colour blocks.

### Stack & files
`darkroom platform scaffold php`: `index.php`, `prices.php`, `book.php` (POST with CSRF token, server validation, sends to the practice inbox, real thank-you page), `partials/`, `assets/css/site.css`. No JavaScript required.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Lexend | 600 | headings |
| Text | Lexend | 400 | body 18 px |

### Tokens
```css
:root { --ground: #fbfaf7; --mint: #dff1ea; --sky: #e3eef8; --ink: #1d2b33; --ink-70: #1d2b33b3; --action: #13734f; --alert: #b3261e; --line: #1d2b331f;
  --text: "Lexend", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| team photo | the practice's photo (NEEDS 1) | `<img>` 2000 px | cover, 50 % 35 % | static | mint field with the practice name, TEMP | the team of 9 in the reception in daylight, relaxed, uniforms, consent signed |
| room photos ×2 | own | `<img>` 3:2 | — | static | TEMP | a treatment room with the chair, window light |

### Nav
Top bar 40 px, alert colour text on `#fdecea`: "Dental emergency? Call 0113 496 0000 (8:00–18:00)" (TEMP). Header 72 px: "Brightside Dental" 600 20 px; New patients · Treatments · Prices · Find us; button "Book an appointment" action fill, white text, radius 10 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Gentle dentistry for nervous patients and busy families. | Display 600, clamp(34px, 4.4vw, 60px) | 1.12 / −0.01em | ink | left column on `--mint` panel, padding 56 px | none |
| Sub | NHS and private care in Headingley. Evening appointments on Tuesdays and Thursdays. | Text 400, 19 px | 1.55 | ink-70 | under H1 | none |
| CTAs | Book an appointment · See our prices | action fill / underlined link | — | — | under sub | none |
| Facts | Accepting NHS patients for children · Free parking | Text 400, 16 px with check icons | — | ink | under CTAs | none |
| Photo | — | — | — | — | right 50 %, radius 24 px | none |

NHS acceptance and hours are TEMP until the practice confirms them.

### Sections
1. **First visit timeline:** 5 steps: Welcome (5 min, reception) · Talk first (10 min, your dentist, no instruments) · Check-up (20 min) · X-rays if needed (10 min) · Plan and price (15 min, written). Each step: number in a 40 px circle, title 22 px, 25 words.
2. **Prices:** NHS bands and private prices in a table with plain descriptions ("Band 1: check-up, X-rays, advice").
3. **Team:** 9 people with role and one line.
4. **Find us:** address, bus routes, step-free access.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Buttons, links | hover / focus | 0 | 150 ms | `cubic-bezier(.4,0,.2,1)` | colour |
Calm: nothing moves on its own.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Hero | photo first, then mint panel | stacked | split | split |
| Emergency bar | number as a tap-to-call link | full text | full text | full text |
| Timeline | vertical | vertical | horizontal 5 columns | — |

### Acceptance
**First viewport:** at 1440 × 900 a red-tinted emergency bar at the top, then a soft mint panel with the reassuring headline and a green booking button beside a friendly team photo. At 390 × 844 the emergency number is one tap, the team photo, then the headline and button.
**Do not:** use stock photos of perfect smiles; show before/after photos without consent and context; hide prices; send the form without CSRF and server-side handling; claim NHS availability not confirmed.
