# Quarry & Co. · landscape architects
<!-- Darkroom example 027 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `astro` | landing | `nature` + `editorial-news` (type) | `animated` | none | `reveal.js` |

## Say this
> /darkroom two full-screen sections for a landscape architecture studio: first a video of one of our gardens with the studio name, then a second screen with a different video behind a list of what we do. Text fades in softly with a little blur. Earthy and calm.

## Build spec

### Brief & signature
Quarry & Co. designs public gardens, school yards and rooftop meadows in Copenhagen; 18 people. Visitors are city planners, developers and juries. Feeling: grounded, seasonal, exact. **Signature:** section two is a capabilities list set as a planting schedule: six services in a table with Latin-style labels (`01 Public parks · Parkanlæg`) over a slow loop of grasses moving in wind, each row blurring in as it arrives. **Supporting:** a hero loop of a finished garden at golden hour, blur-fade reveals, a moss accent.

### Stack & files
Astro; `src/pages/index.astro` with `Hero.astro`, `Capabilities.astro`; `reveal.js` with a custom `data-reveal="blur"` variant added to `reveal.css` (opacity 0 + blur 8 px + 12 px rise).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Fraunces | 300 (opsz 144) | headings |
| Text | Hanken Grotesk | 400, 500 | body, table |
| Labels | IBM Plex Mono | 400 | indices |

### Tokens
```css
:root { --ground: #0f120d; --ink: 70 15% 92%; --moss: #a9b77d; --line: hsl(var(--ink) / .14);
  --display: "Fraunces", Georgia, serif; --text: "Hanken Grotesk", system-ui, sans-serif; --mono: "IBM Plex Mono", ui-monospace, monospace; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| garden loop | studio's drone or gimbal footage (NEEDS 1) | `<video muted loop playsinline autoplay poster>` | cover, 60 % 60 % | plays while visible | poster | a stone path through a meadow garden at golden hour, slow push-in, 10 s; top 35 % soft sky |
| grasses loop | filmed close (NEEDS 2) | same, section 2 | cover | plays while visible | poster | close tall grasses moving in wind against dark shade; even, calm texture; nothing entering |

### Nav
64 px: "Quarry & Co." Fraunces 300 22 px; Projects · Studio · Contact; CTA "Start a project" moss text, 1 px moss border, radius 999 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Gardens for the next hundred winters. | Display 300, clamp(44px, 6.8vw, 112px) | 0.98 / −0.025em | ink | bottom-left, `bottom: 12vh`, max 12ch | blur reveal |
| Sub | Landscape architecture for parks, schools and rooftops in Copenhagen. | Text 400, 18 px | 1.5 | ink-80 | bottom-right, max 360 px | delay 150 ms |
| Scrim | — | ground → transparent over the bottom 40 % | — | — | — | none |

### Sections
**Capabilities (section 2, 100svh):**
| # | Service | Danish | Note |
|---|---|---|---|
| 01 | Public parks | Parkanlæg | from 1 to 40 hectares |
| 02 | School yards | Skolegårde | play, shade, rainwater |
| 03 | Rooftop meadows | Tagenge | seeded for pollinators |
| 04 | Streets and squares | Gader og pladser | trees in hard ground |
| 05 | Rain gardens | Regnbede | cloudburst ready |
| 06 | Long-term care plans | Plejeplaner | ten-year schedules |
Index in mono 12 px moss; service Display 300 40 px; Danish Text 400 15 px ink-60 italic; note Text 400 15 px ink-60; hairlines between rows. (Check the Danish words with the studio; TEMP.)
Then: Projects (6 tiles), Studio (team photo + 60 words), Contact.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Hero text | load | `i × 150 ms` | 1000 ms | `--ease-out` | blur(8px), 12 px, 0 → 0, 0, 1 |
| Capability rows | in view | `i × 80 ms` | 800 ms | `--ease-out` | same |
| Videos | IntersectionObserver .4 | — | — | — | play visible, pause hidden |
Reduced motion: posters, text final.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Table | stacked rows: index + service, then Danish and note | 3 columns | 4 columns | 4 columns, 32 px names |
| H1 | 42 px | 76 px | 112 px | 84 px |

### Acceptance
**First viewport:** at 1440 × 900 a golden meadow garden slowly approached along a stone path, the serif headline bottom-left, the sub bottom-right. The second screen shows grasses moving behind a planting-schedule table whose rows blur into focus. At 390 × 844 both screens stack their copy at the bottom.
**Do not:** use glass cards; blur more than one group at a time; play both videos when neither is visible; translate Danish labels without the studio's check.
