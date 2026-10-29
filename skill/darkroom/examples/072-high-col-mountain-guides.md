# High Col · mountain guides in the Écrins
<!-- Darkroom example 072 · fictional company · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `astro` | landing + trips | `nature` + `cinematic` | `story` | pinned chapters (medium) | `scene-progress.js`, `reveal.js` |

## Say this
> /darkroom a scroll story for our mountain guiding company: one classic route told day by day as you scroll, the altitude line drawing itself, and the photos of each day. Then all our trips with levels and dates. Book a trip.

## Build spec

### Brief & signature
High Col is six IFMGA guides in La Bérarde running alpine courses and summit trips (1–6 days). Visitors are fit hikers ready for their first glacier. Feeling: high, clear, serious fun. **Signature:** a 5-chapter pinned story of the "Dôme de Neige des Écrins in 3 days": an altitude profile line (SVG path from real GPX elevation) draws itself with scroll, a dot climbs it, and each day's photo crossfades in behind, with the day's height gain in big tabular numbers. **Supporting:** the sky colour shifts from valley green to dawn pink at the summit, trip cards with difficulty bars.

### Stack & files
Astro; `src/data/route.json` (elevation samples from the guides' GPX, day markers), `src/components/RouteStory.astro` with `recipes/scene-progress.js` (`--p` 0 → 1 on 500vh); `src/content/trips/*.md`; booking through the guides' booking form or email (ask).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Epilogue | 700 | headings, numbers |
| Text | Epilogue | 400 | body |

### Tokens
```css
:root { --valley: #e6efe4; --dawn: #f6d9cf; --ground: color-mix(in oklab, var(--valley), var(--dawn) calc(var(--p, 0) * 100%));
  --ink: #18221f; --ink-60: #18221f99; --rope: #e2542a; --line: #18221f26; --display: "Epilogue", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| day photos ×5 | the guides' own photos (NEEDS 1–5) | `<img>` 2000 px stacked | cover, horizon at 40 % | crossfade by chapter | ground colour | day 1 the refuge path; day 2 glacier at dawn with a rope team from behind; day 3 the summit ridge; descent; the valley; no faces |
| profile | built from GPX | inline SVG path 100 % × 30 vh | bottom of the scene | `stroke-dashoffset` = 1 − p | full line | rope-colour 2 px line, day markers as small ticks |

### Nav
64 px: "High Col" Display 700 20 px; Trips · Courses · Guides · Safety; CTA "Book a trip" rope fill, white text.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Your first 4,000 m summit, roped to a guide. | Display 700, clamp(36px, 5.6vw, 88px) | 1.0 / −0.02em | white with shadow | left gutter, top 20 vh, max 12ch | fades out by `--p` .1 |
| Day label | Day 1 · La Bérarde → Refuge du Glacier Blanc | Display 700 15 px caps +0.08em | 1 | white | top-left of each chapter | chapter windows |
| Gain | +1,140 m | Display 700, clamp(64px, 10vw, 160px) tabular | 0.9 | white | right gutter, mid | counts to the day's value as its chapter starts |
| Profile + dot | — | — | — | rope | bottom 30 vh | dot follows the path at `--p` |

Text shadows `0 16px 38px rgba(0,0,0,.32)`; bottom scrim under the profile. Altitudes and gains from the GPX; route name and refuges TEMP until confirmed.

### Sections
Skip link "Skip the route", then Trips (cards: name, days, max altitude, difficulty as 5 bars, dates, price incl. VAT), Courses, Guides (IFMGA numbers), Safety (what's included, insurance, cancellations), Book.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Profile | `--p` | — | linear | — | dash 100 % → 0 |
| Dot | `--p` | — | linear | — | along the path (`offset-path` with a JS fallback) |
| Photos | chapter changes | 0 | 800 ms | ease-in-out | crossfade |
| Gain numbers | chapter start | 0 | 900 ms | ease-out | 0 → value |
Reduced motion: unpinned; five day rows each with photo, gain and the full profile once at the top.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Scene | 350vh | 450vh | 500vh | 450vh |
| Gain | 56 px, under the day label | 120 px | 160 px | 110 px |
| Profile | 22 vh | 26 vh | 30 vh | 24 vh |

### Acceptance
**First viewport:** at 1440 × 900 a mountain path photo with the bold headline; scrolling pins the story: a red altitude line draws along the bottom, a dot climbs it, each day's photo fades in with its big height-gain number, and the sky warms to dawn pink at the summit. At 390 × 844 a shorter story, numbers under the day labels.
**Do not:** invent altitudes (use the GPX); show identifiable clients; exceed 500vh; put booking behind the story (the nav button always works).
