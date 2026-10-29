# Quay 9 · harbour-front apartments, off-plan sales
<!-- Darkroom example 057 · fictional development · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | landing | `luxury` + `cinematic` | `hero-effect` | scroll-scrubbed video (heavy) | `scrub-video.js`, `reveal.js` |

## Say this
> /darkroom a sales site for 42 apartments being built on a harbour. As you scroll, the camera rises from the water up the facade to the penthouse terrace. Then floor plans you can filter by bedrooms, and a Register interest form.

## Build spec

### Brief & signature
Quay 9 is 42 apartments (1–3 bedrooms and two penthouses) on Aarhus harbour, completion spring 2029, from DKK 3.4 m. Visitors are buyers and agents. Feeling: calm, open water, considered. **Signature:** a 220vh scrubbed rendered flight: the camera rises from water level up the brick-and-glass facade and settles on the penthouse terrace looking over the bay; three floor labels appear as it passes ("Level 1 · 2-bed from 78 m²"). **Supporting:** a filterable plan list, a sheet transition into the plans, mask reveals.

### Stack & files
Next.js App Router; `components/Rise.tsx` with `recipes/scrub-video.js` (architect's render, all-intra, 1600 px, 6 s); `app/plans/page.tsx` reading `content/units.json`; register form posts to the developer's CRM endpoint (ask).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Libre Caslon Display | 400 | headlines |
| Text | Albert Sans | 300, 500 | UI, plans |

### Tokens
```css
:root { --ground: #0e1416; --ink: 40 20% 94%; --ink-60: hsl(var(--ink) / .6); --brick: #b8664a; --line: hsl(var(--ink) / .14); --paper: #f4f1ec;
  --display: "Libre Caslon Display", Georgia, serif; --text: "Albert Sans", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| rise render | the architect's 3D model rendered as a camera path (NEEDS 1) | `<video muted playsinline preload="auto" poster>` | cover, 50 % 50 % | scrubbed | end frame (terrace view) | dusk light, start at water level, rise vertically along the facade, end on the terrace looking out; left 40 % sky or water through the whole path; marked "visualisation" |
| plans ×9 types | architect's PDFs → SVG (NEEDS 2) | inline SVG | contain | static | unit table only | line drawings, room names, m² |

### Nav
72 px: "QUAY 9" Text 500 14 px +0.24em; Residences · Plans · Location · Register; CTA "Register interest" brick 1 px border.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Live on the water's edge. | Display 400, clamp(44px, 6.8vw, 112px) | 0.98 / −0.02em | ink | left gutter, top 22 vh | fades out by 20 % |
| Floor labels ×3 | Level 1 · 2-bed from 78 m² / Level 4 · 3-bed from 112 m² / Penthouse · 210 m² terrace | Text 500, 15 px; numbers tabular | 1.3 | ink | left column at 35 %, 60 %, 88 % | 6 % windows |
| Visualisation note | Computer visualisation, subject to change | Text 300, 12 px | — | ink-60 | bottom-right, always | none |
| CTA | Register interest | brick fill, paper text | — | — | appears at 90 % | fade |

Prices and areas TEMP until the sales team supplies the price list.

### Sections
Plans (paper ground, rises over the scene as a sheet radius 48 px): filters (bedrooms 1/2/3/penthouse, floor, price) as segmented controls; units as rows (unit, beds, m², floor, price, status: available / reserved / sold); clicking a row opens its plan. Location (map illustration drawn in SVG, walking times), Register (form: name, email, phone, bedrooms wanted; consent checkbox not pre-ticked).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Rise | scroll 0–220vh | — | linear | recipe | currentTime 0 → 6 s |
| Labels | progress windows | — | 6 % | linear | opacity 0 → 1 |
| Plan rows | filter change | 0 | 200 ms | `cubic-bezier(.4,0,.2,1)` | opacity |
Reduced motion: terrace end frame with the three labels as a list.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Rise | 160vh, 960 px clip | 200vh | 220vh | 200vh |
| Plans | cards instead of rows | rows | rows | rows |

### Acceptance
**First viewport:** at 1440 × 900 harbour water at dusk with the brick facade rising on the right; the serif headline on the left; scrolling lifts the camera up the building with floor labels passing, ending on the terrace view and a Register button. At 390 × 844 a shorter rise with labels at the bottom.
**Do not:** omit the visualisation note; show prices as final; pre-tick consent; let seeking stutter (all-intra only).
