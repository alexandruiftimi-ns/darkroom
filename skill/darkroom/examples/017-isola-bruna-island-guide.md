# Isola Bruna · a car-free island, told in three scenes
<!-- Darkroom example 017 · fictional place · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing (story) | `nature` + `editorial-news` (type) | `story` | layered parallax (pinned, medium) | `scene-progress.js`, `reveal.js` |

## Say this
> /darkroom a scroll story for a small car-free island's tourist office: three screens where layers of the picture (sea, hills, houses, boats) move at different speeds as you scroll, then cards for the sights with little pin icons. Elegant serif, sunny.

## Build spec

### Brief & signature
Isola Bruna is a 3 km island in the Adriatic reached by a 25-minute ferry; the tourist office wants day-trippers to stay a night. Feeling: sunlit, slow, layered. **Signature:** one pinned 300vh scene built from five cut-out layers of a painted panorama (sky, far sea, hills, town, harbour boats); scroll progress `--p` moves each layer at its own rate and the caption changes three times (Arrive · Climb · Stay). **Supporting:** sight cards with small cut-out pin icons, a warm ground shift from morning to evening across the story.

### Stack & files
`index.html`, `styles.css`, `recipes/scene-progress.js` (sets `--p` 0 → 1 on `#story`), `recipes/reveal.js` for the cards. Layers in `/layers`, each a WebP with alpha.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Playfair Display | 500, 500 italic | captions |
| Text | Karla | 400, 600 | body, cards |

### Tokens
```css
:root { --morning: #f4ead7; --evening: #f0c9a4; --ground: color-mix(in oklab, var(--morning), var(--evening) calc(var(--p, 0) * 100%));
  --ink: #23303a; --sea: #2c6f8f; --line: #23303a1f; --display: "Playfair Display", Georgia, serif; --text: "Karla", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| 5 layers | one painted panorama, separated into layers (NEEDS 1) | `<img>` per layer, absolutely stacked | width 120 %, bottom-aligned | translate by `--p` | the flattened panorama | gouache-style painting; low horizon; the town of pastel houses climbing a hill; layers cut cleanly, no halos; sky fades to `#f4ead7` at the top |
| pins ×6 | drawn as small cut-outs (NEEDS 2) | `<img>` 48 px | — | static | an emoji-free CSS dot | lighthouse, church, cove, olive press, market, ferry |

### Nav
Fixed 60 px, transparent: "Isola Bruna" Playfair 500 italic 20 px; Getting here · Stay · Sights; CTA "Plan a night" sea fill, ground text.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Caption 1 | Arrive by boat. | Display 500, clamp(44px, 7vw, 112px) | 1.0 / −0.02em | ink | top 16 vh, centred | visible at `--p` 0–.3 |
| Caption 2 | Climb to the lighthouse. | same | same | ink | same | `--p` .33–.63 |
| Caption 3 | Stay for the evening ferry home. | same, italic on "evening" | same | ink | same | `--p` .66–1 |
| Sub | 25 minutes from Zadar. No cars, 400 residents, one bakery. | Text 400, 18 px | 1.5 | ink at 70 % | under caption 1 only | fades out by `--p` .2 |
| Progress | three dots | 8 px circles | — | ink 30 % / ink | right edge, vertically centred | active dot follows the caption |

Layer travel per full scene: sky 0 px, far sea −40 px, hills −120 px, town −220 px, boats −360 px (translateY), plus boats translateX −6 %. Captions cross-fade over 6 % of progress.

### Sections
After the story: **Sights** (six cards, 3 × 2: pin, name in Display 28 px, 25 words, walk time), **Stay** (three guesthouses, link out), **Getting here** (ferry table, tabular times, TEMP until the timetable is supplied). A skip link "Skip the story" before the scene.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Layers | scroll (`--p`) | — | linear mapping | none | translate per layer table |
| Captions | `--p` windows | — | 6 % of scene | linear | opacity 0 ↔ 1 |
| Ground | `--p` | — | linear | — | morning → evening |
| Cards | in view | `i × 90 ms` | 700 ms | `cubic-bezier(.22,1,.36,1)` | 24 px, 0 → 0, 1 |
Reduced motion: the scene is not pinned; the flattened panorama shows with the three captions stacked as a list.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Scene length | 220vh, travel × .6 | 260vh | 300vh | 260vh |
| Layers | width 180 %, x centred on the town | 140 % | 120 % | — |
| Captions | 36 px, top 12 vh | 64 px | 112 px | 80 px |

### Acceptance
**First viewport:** at 1440 × 900 a painted island in morning light, "Arrive by boat." centred over the sky; scrolling slides the boats and town faster than the hills, the caption changes twice and the ground warms toward evening. At 390 × 844 the town is centred, the captions fit in two lines.
**Do not:** capture the wheel or add scroll smoothing; hotlink the layers; let a layer's edge show at any progress; run the scene longer than 300vh; claim ferry times without a timetable.
