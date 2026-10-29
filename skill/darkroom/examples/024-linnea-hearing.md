# Linnea · discreet hearing aids, fitted in-clinic
<!-- Darkroom example 024 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `php` | landing | `trust` + `modern` (light) | `calm` + one loop | none | — |

## Say this
> /darkroom a white, calm landing page for a hearing-aid clinic. A short looping video of the tiny hearing aid turning in the middle, the headline and booking info pinned to the bottom of the screen on a white fade. Book a free hearing test. It runs on our PHP hosting.

## Build spec

### Brief & signature
Linnea fits small behind-the-ear aids in three clinics in Stockholm; the first hearing test is free. Visitors are adults in their fifties and sixties and their children. Feeling: calm, clear, respectful. **Signature:** a white page where a tiny hearing aid turns slowly on a white seamless in the centre, at true-to-life scale beside a fingertip, with all copy pinned to the bottom on a white fade-up. **Supporting:** large readable type (body 19 px), big tap targets, a tag pill naming the two services.

### Stack & files
PHP 8 site from `darkroom platform scaffold php`: `index.php`, `partials/header.php`, `partials/footer.php`, `book.php` (form with CSRF token, sends to the clinic's mailbox), `assets/css/site.css`. No JavaScript needed except the video's reduced-motion pause.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Atkinson Hyperlegible | 700 | chosen for legibility |
| Text | Atkinson Hyperlegible | 400 | one family |

### Tokens
```css
:root { --ground: #ffffff; --ink: #14212b; --ink-70: #14212bb3; --fjord: #1f5f8b; --tag: #f1f4f6; --line: #14212b1f;
  --text: "Atkinson Hyperlegible", system-ui, sans-serif; --ease-state: cubic-bezier(.4,0,.2,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| aid loop | clinic films the device on a turntable (NEEDS 1) | `<video muted loop playsinline autoplay poster>` 1280 px | contain, centred at 50 % 42 % | loops | poster | the aid resting on a fingertip, then turning on a white seamless; soft shadow; edges are pure `#ffffff`; 8 s, full 360° |

### Nav
Fixed top, white: left a menu pill (ink fill, white text "Menu" 15 px with a plus icon in a white circle), then the tag pill (`--tag`, "Hearing tests · Fitting" 14 px); right "Linnea" 700 22 px; phone number link "08-123 456 70" (TEMP) 17 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Video | — | — | — | — | centred, height 56 vh | loop |
| Fade | — | `linear-gradient(to top, #fff 0%, #fff 55%, #fff0 100%)` | — | — | bottom 40 % | none |
| H1 | Hear the room again. | Text 700, clamp(38px, 5vw, 76px) | 1.05 / −0.02em | ink | bottom-left, `bottom: 56px` | none |
| Sub | Free hearing test, results explained in plain words, and aids fitted by an audiologist in Södermalm, Kista or Solna. | Text 400, 19 px | 1.55 | ink-70 | bottom-centre column, max 460 px | none |
| CTA | Book a free hearing test | Text 700, 18 px, fjord fill, white text, 56 px tall, radius 10 px | — | — | bottom-right | hover darkens 150 ms |

### Sections
1. **What happens at the test:** four numbered steps, 30 words each, 19 px body.
2. **Prices:** a table of three aid levels with price incl. VAT and what the regional subsidy covers (TEMP until the clinic confirms).
3. **Clinics:** three addresses with opening hours and step-free access notes.
4. **Book:** `book.php` form: name, phone, preferred clinic, preferred time; visible labels, `autocomplete`, a real success page.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Buttons, links | hover / focus | 0 | 150 ms | `--ease-state` | colour |
| Video | load | — | 8 s loop | — | plays muted |
Reduced motion: `<video>` paused via a 5-line script on the poster (side view on the fingertip).

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Video | top 44 vh | 52 vh | 56 vh | 46 vh |
| Bottom copy | stacked: H1, sub, full-width CTA | 2 columns | 3 columns | 3 columns, sub hidden |
| Phone link | in the menu sheet and a sticky bottom "Call" button | header | header | header |

### Acceptance
**First viewport:** at 1440 × 900 a white page with a tiny hearing aid turning in the centre; along the bottom on white, the headline left, the plain-words sub in the middle and a large blue booking button right. At 390 × 844 the aid in the top half, headline, sub and a full-width button below, with a sticky Call button.
**Do not:** use type under 17 px for body; show stock photos of smiling seniors; claim subsidies or prices not supplied; send the form without a CSRF token and real handling.
