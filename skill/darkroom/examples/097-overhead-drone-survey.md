# Overhead · drone surveys for construction and solar sites
<!-- Darkroom example 097 · fictional company · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | landing | `modern` + `cinematic` | `hero-effect` | scroll-scrubbed frames (heavy) | `scrub-frames.js`, `reveal.js` |

## Say this
> /darkroom a B2B landing page for our drone survey company: as you scroll, an aerial photo of a building site turns into the 3D measurement map we deliver, with contour lines and numbers appearing. Then services, accuracy, and a quote request.

## Build spec

### Brief & signature
Overhead flies RTK drones over construction and solar sites in the Netherlands and delivers orthophotos, contour maps and volume reports within 48 h. Visitors are site managers and surveyors. Feeling: exact, fast, grounded. **Signature:** a 60-frame scrubbed transition over 200vh from a real aerial photo of a site to the delivered point-cloud render of the same site (same camera), with contour lines drawing on top in SVG and three measurements appearing ("Stockpile B · 1,240 m³", "Slope 3.2 %", "Accuracy ± 2 cm"). **Supporting:** a sober grid, mono measurements, a quote form with site size.

### Stack & files
Next.js; `components/SurveyScene.tsx` with `recipes/scrub-frames.js` (frames rendered by the client's photogrammetry software as a crossfade-with-reveal sequence, `darkroom media frames … --format avif --mobile-width 900`), `components/Contours.tsx` (SVG paths with dash offsets tied to progress), `reveal.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Manrope | 600 | headings |
| Data | IBM Plex Mono | 400, 500 | measurements |

### Tokens
```css
:root { --ground: #0e1210; --ink: 120 8% 93%; --ink-60: hsl(var(--ink) / .6); --survey: #f5c518; --line: hsl(var(--ink) / .14);
  --display: "Manrope", system-ui, sans-serif; --mono: "IBM Plex Mono", ui-monospace, monospace; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| photo → map sequence | made from one of their real surveys with the client's permission (NEEDS 1) | canvas over poster | cover, 50 % 50 % | frame = progress | the final map frame | straight-down view of an earthworks site with stockpiles; frame 0 photo, frame 59 the coloured elevation render with hillshade; identical framing |
| contours | exported from the survey as simplified SVG (NEEDS 2) | inline SVG overlay | aligned | draw on progress | none | 1 px survey-yellow lines every 0.5 m |

### Nav
64 px: "OVERHEAD" Display 600 16 px +0.16em; Services · Accuracy · Sectors · Quote; CTA "Request a quote" survey fill, ground text.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Fly the site at nine. Measure it by lunch. | Display 600, clamp(40px, 6vw, 96px) | 1.0 / −0.03em | ink | left gutter, top 20 vh, max 11ch | fades out by 15 % |
| Measurements ×3 | Stockpile B · 1,240 m³ / Slope 3.2 % / Accuracy ± 2 cm (RTK) | Mono 500, 15 px on a ground chip with a 1 px survey border | 1.3 | ink | pinned near their features | appear at 55 %, 65 %, 75 % |
| Progress label | Photo → Survey | Mono 400, 12 px | — | ink-60 | bottom-left | follows |

Figures from the actual survey (TEMP until supplied); the accuracy statement must match their method statement.

### Sections
Services (orthophoto, contour map, volumes, as-built checks), Accuracy (method in plain words with RTK and ground control points), Sectors (construction, solar, quarries), Licences (operator ID, insurance), Quote (site address, area ha, deliverables, deadline).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Frames | scroll 0–200vh | — | linear | recipe | 0 → 59 |
| Contours | progress .4–.9 | — | linear | — | dashoffset 100 % → 0 |
| Chips | progress windows | — | 4 % | linear | opacity 0 → 1 |
Reduced motion: final map with contours and chips, not pinned.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Scene | 160vh, phone frames | 180vh | 200vh | 180vh |
| Chips | a list under the canvas | pinned | pinned | pinned |

### Acceptance
**First viewport:** at 1440 × 900 a straight-down aerial photo of an earthworks site with the headline on the left; scrolling turns the photo into a coloured elevation map, yellow contour lines draw across it and three mono measurements appear beside the stockpile and slope. At 390 × 844 a shorter scene with the measurements listed below.
**Do not:** fake the map with a filter; show a client's site without permission; overstate accuracy; let the contours misalign with the frames.
