# Keel · off-site file backup for architecture practices
<!-- Darkroom example 023 · fictional product · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `astro` | landing | `modern` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a hero for backup software for architecture firms: a floating pill navigation, a big headline where each line is shifted a little to the right of the one above like stairs, over a slow video of a model of a building. Dark.

## Build spec

### Brief & signature
Keel backs up project files (Revit, CAD, renders) for practices of 5–80 people every 15 minutes to two EU data centres. Visitors are IT leads and practice partners. Feeling: solid, structural, quiet. **Signature:** a three-line headline set as a stair: each line steps 1.2em further right and enters 90 ms after the one above, echoing floor plates. **Supporting:** a slow turntable of a white card architecture model, a floating pill nav, one teal accent.

### Stack & files
Astro, `src/pages/index.astro`, plain CSS; `src/scripts/reveal.js`; media in `public/media`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Red Hat Display | 500 | headline |
| Text | Red Hat Text | 400, 500 | UI |

### Tokens
```css
:root { --ground: #0b0d0e; --ink: 190 10% 94%; --teal: #4fd1c5; --pill: #16191b; --line: hsl(var(--ink) / .1);
  --display: "Red Hat Display", system-ui, sans-serif; --text: "Red Hat Text", system-ui, sans-serif; --ease-out: cubic-bezier(.16,1,.3,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| model loop | rendered in Blender by the team or generated (NEEDS 1) | `<video muted loop playsinline autoplay poster>` | cover, 70 % 55 % | loops (end = start: a full 360° turn) | poster | a white card model of a five-storey building on a black turntable, one soft key light from the top-left; right 55 % of frame; edges fall to `#0b0d0e` |

### Nav
Two pills, 16 px from the top: left pill `--pill` 92 %, blur 10 px, radius 999 px, padding 12 px 22 px: Keel mark (SVG, 20 px) + "Keel" Display 500 17 px. Right pill: Product · Pricing · Security · Sign in (14 px ink-60) + CTA "Start a 14-day trial" teal fill, ground text, radius 999 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 line 1 | Every drawing, | Display 500, clamp(44px, 7vw, 118px) | 0.95 / −0.04em | ink | left gutter, top 24 vh | rise 100 % in mask, delay 200 ms |
| H1 line 2 | every render, | same | same | ink | indent 1.2em | delay 290 ms |
| H1 line 3 | kept twice. | same | same | teal | indent 2.4em | delay 380 ms |
| Sub | Keel backs up your whole project server every 15 minutes to two data centres in the EU. | Text 400, 18 px | 1.5 | ink-60 | under H1 at indent 2.4em, max 420 px | fade, delay 500 ms |
| CTA | Start a 14-day trial | as nav, 16 px | — | — | under sub | delay 600 ms |

Lines are separate `<span class="line">` inside one `<h1>`; `nowrap` per line from 1024 px. The data-centre and interval claims are TEMP until confirmed.

### Sections
How restores work (three steps with a drawn-in-code floor-plate diagram), File types (a list: RVT, DWG, PLN, 3DM, PSD, EXR), Pricing (per seat, incl. VAT), Security (link list to real documents, TEMP).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| H1 lines | load | `0.2 + i × 0.09 s` | 900 ms | `--ease-out` | translateY(100%) in `overflow: clip` → 0 |
| Sub, CTA | load | `0.5 + i × 0.1 s` | 600 ms | `--ease-out` | 12 px, 0 → 0, 1 |
| Video | `loadeddata` | 0 | 500 ms fade, 1.8 s settle | `--ease-out` | opacity 0 → 1, scale 1.06 → 1 |
Reduced motion: lines and video poster in place.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| H1 indents | .4em / .8em (stairs kept, smaller) | .8em / 1.6em | 1.2em / 2.4em | same |
| Video | 80 % 60 %, behind a bottom ground scrim | 74 % | 70 % | — |
| Nav | one pill: mark + Menu | two pills | two pills | — |

### Acceptance
**First viewport:** at 1440 × 900 a white architecture model turns slowly on the right of a near-black screen; on the left three headline lines step down to the right like floors, the last in teal; two floating pills at the top. At 390 × 844 the stairs are shallower and the model sits behind a scrim in the lower half.
**Do not:** stagger more than the three lines; let the turntable loop jump; claim uptime numbers; use a padlock-and-shield illustration.
