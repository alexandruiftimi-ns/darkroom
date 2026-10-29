# Gleam Garage · mobile car detailing and ceramic coating
<!-- Darkroom example 069 · fictional business · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `php` | landing | `bold` + `cinematic` (light) | `hero-effect` | none | — (a range input drives the split) |

## Say this
> /darkroom a site for my car detailing business on PHP hosting. I want a before/after slider on the hero (dirty paint vs polished), three packages with prices, the areas I cover, and a quote form with car size and photos.

## Build spec

### Brief & signature
Gleam Garage is one detailer with a van serving south Manchester; three packages from £ 79 to £ 649. Visitors are car owners comparing quotes on phones. Feeling: glossy, confident, local. **Signature:** a before/after split on the hero: the same bonnet photographed before and after a paint correction, with a draggable vertical handle (keyboard: arrow keys move 5 %), the line catching a white highlight. **Supporting:** packages as three tall cards with what is included, a postcode area list, a quote form with photo upload.

### Stack & files
`darkroom platform scaffold php`: `index.php`, `quote.php` (POST, CSRF, file upload ≤ 10 MB × 4, server-side checks, mails the owner), `assets/js/compare.js` (an `<input type="range">` drives `clip-path` on the after image; accessible by default), `assets/css/site.css`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Archivo | 800 (wdth 112) | headings |
| Text | Archivo | 400, 600 | body |

### Tokens
```css
:root { --ground: #f2f3f5; --ink: #0f1115; --ink-60: #0f111599; --cobalt: #1f4fd8; --white: #ffffff; --line: #0f11151a;
  --display: "Archivo", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| before / after | the owner's own photos of one job, tripod, same light (NEEDS 1, 2) | two `<img>` 2000 px stacked | cover, identical crop | range-driven clip | the after photo only | a dark blue bonnet in shade: swirls and water spots before, a mirror reflection of trees after; same camera position to the pixel |

### Nav
64 px: "GLEAM GARAGE" Display 800 18 px; Packages · Areas · Reviews · Quote; phone "07700 900123" (TEMP); CTA "Get a quote" cobalt fill.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Compare | before / after | — | — | — | right 60 %, radius 16 px, 4:3 | handle starts at 50 %, nudges to 40 % and back once on load (800 ms) |
| Handle | ‹ › | 44 px white circle, 2 px line full height | — | ink | at the split | drag / arrow keys |
| Labels | Before · After | Text 600, 12 px caps on dark pills | — | white | top corners of the image | none |
| H1 | Showroom shine, on your drive. | Display 800, clamp(38px, 5.4vw, 84px) | 0.95 / −0.02em | ink | left 40 %, top 24 vh | rise 16 px |
| Sub | Mobile detailing and ceramic coating across south Manchester. I bring the water and power. | Text 400, 18 px | 1.5 | ink-60 | under H1 | delay 100 ms |
| CTA | Get a quote in 2 minutes | cobalt fill, white text, 54 px | — | — | under sub | delay 200 ms |

### Sections
Packages (Wash & seal £ 79 · Deep clean £ 189 · Paint correction + coating from £ 649; included items ticked; prices TEMP), Areas (postcodes as a list), Reviews (only real ones, linked to the review platform), Quote form (car make/model, size, package, postcode, photos, preferred date).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Handle hint | load, once | 600 ms | 800 ms | `--ease-out` | 50 % → 40 % → 50 % |
| Compare | input | — | immediate | — | clip-path inset(0 0 0 X%) |
Reduced motion: no hint nudge.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Compare | full width above the H1, 4:3, handle 52 px | above | right | right |
| Packages | stacked | 3 columns | 3 | 3 |

### Acceptance
**First viewport:** at 1440 × 900 a cool grey page; a bold headline and a blue quote button on the left; on the right a bonnet photo split down the middle, swirled on the left and mirror-bright on the right, with a white handle that nudges once to invite dragging. At 390 × 844 the comparison first, full width, then the headline.
**Do not:** use photos from different cars or lights for before and after; invent reviews; accept uploads without size and type checks; say "eco" without facts.
