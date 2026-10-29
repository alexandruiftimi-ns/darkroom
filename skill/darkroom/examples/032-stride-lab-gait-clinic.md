# Stride Lab · running gait analysis clinic
<!-- Darkroom example 032 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `trust` + `modern` (light) | `animated` | none | `reveal.js` |

## Say this
> /darkroom a light landing page for a running clinic that films your stride and fixes your form. Soft off-white, a looping video of a runner on a treadmill from the side, two little pill buttons as the navigation in the middle at the top. Book an analysis.

## Build spec

### Brief & signature
Stride Lab is a sports physio clinic in Bristol: a 60-minute gait analysis with high-speed video, a written report and a 4-week plan, £ 120. Visitors are recreational runners with a niggle. Feeling: clinical but friendly, light, quick. **Signature:** the side-view treadmill loop fills the right 60 % on an off-white ground that matches the studio wall exactly, and a thin joint-angle overlay drawn in SVG (knee 162°, ankle 94°) sits on the runner at fixed positions, labelled "example". **Supporting:** two centred pills (mark + links), calm reveals, numerals in tabular figures.

### Stack & files
`index.html`, `styles.css`, `recipes/reveal.js`, `media/stride.mp4`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Figtree | 600 | headings |
| Text | Figtree | 400, 500 | body |

### Tokens
```css
:root { --ground: #f0f0ee; --ink: 210 15% 14%; --ink-60: hsl(var(--ink) / .6); --signal: #e4572e; --line: hsl(var(--ink) / .12);
  --text: "Figtree", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| stride loop | filmed in the clinic at 240 fps, slowed (NEEDS 1, runner's consent) | `<video muted loop playsinline autoplay poster>` | cover, 72 % 50 % | loops exactly one stride cycle | poster | runner in dark kit on a treadmill, side view, wall painted `#f0f0ee`, flat soft light, locked camera; left 40 % empty wall; the loop is one full stride so it never jumps |
| angle overlay | drawn in code | inline SVG lines + labels | positioned over the knee and ankle at 70 % / 62 %, 70 % / 84 % | static | none | thin 1.5 px signal-coloured lines |

### Nav
Centred, 16 px from the top, two pills with 8 px gap: pill 1 a 44 px circle with the SL mark; pill 2 white, radius 999 px, padding 6 px 8 px: How it works · Prices · Clinicians · "Book" (signal fill, white text).

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | See your stride. Fix the ache. | Display 600, clamp(40px, 5.6vw, 88px) | 1.0 / −0.03em | ink | left gutter, top 30 vh, max 9ch | rise 20 px |
| Sub | A 60-minute gait analysis with high-speed video, a written report and a four-week plan. | Text 400, 18 px | 1.55 | ink-60 | under H1, max 380 px | delay 120 ms |
| CTA | Book an analysis · £ 120 | Text 500, 16 px, ink fill, white text, radius 999 px | — | — | under sub | delay 220 ms |
| Labels | Knee 162° · Ankle 94° · example | Text 500, 12 px tabular on white chips | — | ink | beside the SVG lines | fade, delay 600 ms |

### Sections
How it works (4 steps with durations), Prices (3 options incl. VAT, TEMP until confirmed), Clinicians (three people with their registration bodies, TEMP), FAQ, Book (a form to the clinic's booking tool link; no fake confirmation).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Hero text | load | `i × 100 ms` | 700 ms | `--ease-out` | 20 px, 0 → 0, 1 |
| Angle labels | load | 600 ms | 400 ms | `--ease-out` | opacity 0 → 1 |
| Steps | in view | `i × 80 ms` | 600 ms | `--ease-out` | 16 px, 0 → 0, 1 |
Reduced motion: poster (mid-stride), labels visible.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Video | below the copy, 4:5, focal 60 % 50 % | right 55 % | right 60 % | — |
| Overlay | hidden | shown | shown | shown |
| Nav | mark pill + Menu pill + Book | full | full | — |

### Acceptance
**First viewport:** at 1440 × 900 an off-white page with no visible edge between page and video; a runner strides on the right with two thin orange angle lines and small labels; the headline and black booking pill on the left; two pills centred at the top. At 390 × 844 headline and button first, the runner below in a tall frame.
**Do not:** imply the overlay is a measurement of the visitor; show a runner without consent; use a wall colour that differs from the ground; give medical promises.
