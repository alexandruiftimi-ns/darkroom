# Aural One · open-back headphones launch
<!-- Darkroom example 064 · fictional product · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing (product) | `cinematic` | `hero-effect` | scroll-scrubbed frames (heavy) | `scrub-frames.js`, `reveal.js` |

## Say this
> /darkroom a product launch page for our open-back headphones: as you scroll, the headphones come apart into their parts (driver, grille, pads, headband) floating in space, then come back together. Black background, very precise. Pre-order.

## Build spec

### Brief & signature
Aural One is a € 549 open-back headphone with planar drivers, made in Lyon. Visitors are audio enthusiasts reading reviews. Feeling: precise, airy, crafted. **Signature:** an exploded view scrubbed by scroll: 96 rendered frames take the headphone apart along one axis (pads, grille, driver, frame, headband), hold it apart while four part labels appear, then reassemble. **Supporting:** hairline label leaders drawn in SVG from each label to its part (positions fixed per frame range), spec table in tabular figures.

### Stack & files
`index.html`, `styles.css`, `recipes/scrub-frames.js` with frames from `darkroom media frames explode.mp4 --out frames --fps 24 --format avif --mobile-width 900` (96 frames), `labels.js` (shows labels by progress), `reveal.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Sora | 300, 500 | headings |
| Labels | IBM Plex Mono | 400 | part labels, specs |

### Tokens
```css
html, body { background: #060606; }
:root { --ground: #060606; --ink: 0 0% 94%; --ink-60: hsl(var(--ink) / .6); --anodised: #b9a27a; --line: hsl(var(--ink) / .2);
  --display: "Sora", system-ui, sans-serif; --mono: "IBM Plex Mono", ui-monospace, monospace; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| exploded render | rendered from the CAD model (NEEDS 1, 4 s at 24 fps, locked camera) | canvas over poster | contain, centred | frame = progress | poster (assembled, three-quarter) | the headphone three-quarter view; parts separate along the ear-cup axis and return; black void falling to `#060606`; one soft top light, anodised gold edges |

### Nav
60 px: "AURAL" Display 500 16 px +0.2em; One · Sound · Specs · Reviews; CTA "Pre-order · € 549" anodised 1 px border.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Hear the air around the note. | Display 300, clamp(40px, 6vw, 100px) | 1.0 / −0.03em | ink | centred above the product, top 12 vh | fades by 10 % |
| Labels ×4 | 01 Planar driver, 90 mm · 02 Steel grille, 41 % open · 03 Lambskin pads · 04 Spring-steel band, 312 g total | Mono 400, 13 px; leader 1 px line | 1.4 | ink, numbers anodised | around the exploded parts | each fades in between 40 % and 55 %, out after 80 % |
| Progress | Assembled · Apart · Assembled | Mono 11 px | — | ink-60 | bottom-centre | follows scene |

All figures TEMP until the spec sheet is supplied. Scene length 300vh, pinned.

### Sections
Sound (frequency response chart drawn from the supplied measurement CSV, with source), Specs (table), Reviews (quotes only with publication and link), Pre-order (terms, delivery window, refund policy).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Frames | scroll 0–300vh | — | linear | recipe | 0 → 95 |
| Labels | progress .4–.8 | `i × 2 %` | 4 % | linear | opacity 0 → 1 → 0 |
| Leaders | with labels | — | 300 ms | ease-out | stroke-dashoffset 100 % → 0 |
Reduced motion: a single exploded still (frame 48) with all four labels, not pinned.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Scene | 220vh, phone frames | 260vh | 300vh | 260vh |
| Labels | list under the canvas, numbered to match small dots on parts | around parts | around parts | around parts |

### Acceptance
**First viewport:** at 1440 × 900 a black void, the headphone three-quarter in the centre catching gold edge light, a light headline above. Scrolling separates it into parts with four numbered mono labels and thin leaders, then rejoins it, smoothly both ways. At 390 × 844 a shorter scene with numbered labels listed below.
**Do not:** show quotes without their source; draw a frequency chart from made-up data; let labels overlap parts; hold all frames decoded.
