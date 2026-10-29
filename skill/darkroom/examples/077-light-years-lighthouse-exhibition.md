# Light Years · an exhibition about lighthouse keepers
<!-- Darkroom example 077 · fictional exhibition · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `astro` | landing (story) | `art-gallery` + `cinematic` | `story` | none (CSS scenes) | `scene-progress.js`, `reveal.js` |

## Say this
> /darkroom a microsite for a museum exhibition about lighthouse keepers. As you scroll, a lighthouse beam sweeps across the dark page and lights up objects from the exhibition one by one, with a short label for each. Then dates, tickets and the audio guide.

## Build spec

### Brief & signature
"Light Years" runs October to March at a maritime museum: 60 objects from keepers' lives (logbooks, a kettle, a lamp lens). Visitors decide whether to go and book a time slot. Feeling: night sea, solitude, warmth. **Signature:** a pinned 400vh scene on near-black: a soft beam (a conic-gradient mask) rotates from the left edge with scroll progress and, as it passes each of five object photos, the object lights up from 8 % to 100 % brightness and its label appears; behind the beam a faint lighthouse silhouette. **Supporting:** a slow rotation step, museum-label typography, a calm ticket section.

### Stack & files
Astro; `src/components/Beam.astro` with `recipes/scene-progress.js` (`--p` on `#beam`); objects positioned on a 12-column grid inside the scene; `reveal.js` for the info sections. All CSS, no WebGL.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Spectral | 300, 300 italic | headings |
| Labels | Inter Tight | 500 | museum labels |

### Tokens
```css
:root { --ground: #05070b; --ink: 45 30% 92%; --ink-60: hsl(var(--ink) / .6); --lamp: #ffd98a; --line: hsl(var(--ink) / .14);
  --display: "Spectral", Georgia, serif; --label: "Inter Tight", system-ui, sans-serif; }
.beam { position: absolute; inset: -50%; background: conic-gradient(from calc(-40deg + var(--p) * 220deg) at 0% 50%, #ffd98a40 0deg, #ffd98a14 18deg, transparent 26deg); pointer-events: none; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| objects ×5 | the museum's object photography, cleared for web (NEEDS 1–5) | `<img>` WebP with alpha, 900 px | contain | brightness 0.08 → 1 when the beam passes | lit versions | each object cut out, front light, consistent scale ruler noted in the label |
| silhouette | drawn in SVG | 1 px ink-12 outline | left edge | static | — | a tower and gallery, minimal |

### Nav
60 px: museum mark (supplied) + "Light Years"; Exhibition · Visit · Audio guide · Tickets.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Light Years. The keepers of the lamp. | Display 300, clamp(40px, 6vw, 100px); "The keepers of the lamp." italic | 1.0 / −0.01em | ink | left gutter, top 24 vh | fades by `--p` .08 |
| Dates | 4 October 2027 – 30 March 2028 · Gallery 3 | Label 500, 13 px +0.12em caps, tabular | 1.3 | lamp | under H1 | fade |
| Object labels ×5 | e.g. "Logbook, Bishop Rock, 1912 · Ink on paper · The night the lamp failed" | Label 500, 12 px caps title + Display 300 italic 18 px line | 1.4 | ink | beside each object | appear when lit |

Object names and dates TEMP until the museum supplies the label texts.

### Sections
After the scene (skip link before it): Visit (time slots, prices incl. concessions, accessibility: step-free, BSL tours), Audio guide (free, on your phone), Tickets (to the museum's ticketing), Programme (talks).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Beam | `--p` | — | linear | — | rotation −40° → 180° |
| Object light | beam passes (progress windows) | — | 6 % of scene | linear | `filter: brightness(.08)` → 1 |
| Labels | with object | — | 4 % | linear | opacity 0 → 1 |
Reduced motion: not pinned; all objects lit in a grid with labels.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Scene | 300vh, objects in one column, beam from the top | 350vh | 400vh | 350vh |
| H1 | 36 px | 68 px | 100 px | 76 px |

### Acceptance
**First viewport:** at 1440 × 900 a night-dark page with a faint lighthouse outline at the left, the serif title and dates in lamp yellow. Scrolling sweeps a warm beam across the dark and five objects light up one by one with museum labels. At 390 × 844 the beam sweeps downward over a single column.
**Do not:** use photos without clearance; capture the scroll; make the beam brighter than the label text; put ticket prices only in the story.
