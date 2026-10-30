# Atlas Bell Foundry · church and carillon bells cast by hand
<!-- Darkroom example 037 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing (story) | `cinematic` | `story` | scroll-scrubbed frames (heavy) | `scrub-frames.js`, `scene-progress.js`, `reveal.js` |

## Say this
> /darkroom a scroll story for a bell foundry: as you scroll, the casting happens: the mould, molten bronze pouring, the bell lifted out glowing. The video should follow the scroll exactly, with short captions in frosted chips appearing at each stage.

## Build spec

### Brief & signature
Atlas casts bells from 20 kg to 4 tonnes in a Dutch foundry founded in 1873; tuning is done by hand on a lathe. Visitors are parish councils, carillonneurs and architects. Feeling: fire, weight, centuries. **Signature:** a 400vh pinned scene where 120 frames of a casting follow the scroll: clay mould → bronze pour → glowing bell lifted from the pit; three captions on small frosted chips arrive at 15 %, 50 % and 85 %. **Supporting:** text shadows instead of boxes, a warm ground that cools as the bell cools, reveals after the story.

### Stack & files
`index.html`, `styles.css`, `recipes/scrub-frames.js` (frames from `darkroom media frames casting.mp4 --out frames --fps 24 --format avif` plus `--mobile-width 900`), `recipes/scene-progress.js` for the captions and the ground, `reveal.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Cormorant Garamond | 500 | headings |
| Text | Mulish | 400, 600 | captions and UI |

### Tokens
```css
:root { --hot: #1a0d06; --cold: #0c0d0f; --ground: color-mix(in oklab, var(--hot), var(--cold) calc(var(--p, 0) * 100%));
  --ink: 35 30% 93%; --bronze: #d38b45; --chip: hsl(0 0% 100% / .08); --display: "Cormorant Garamond", Georgia, serif; --text: "Mulish", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| casting sequence | the foundry films a casting on a tripod (NEEDS 1), 5 s per stage, cut to 15 s | `<canvas>` over a poster `<img>` | cover, 55 % 55 % | frame = scroll progress | poster (the finished bell) | locked camera across all three stages; mould at frame 1, pour midway, glowing bell lifted at the end; edges fall to near-black; the left 40 % stays dark for captions |

### Nav
64 px: "Atlas" Cormorant 500 24 px; Bells · Carillons · Restoration · Visit; CTA "Commission a bell" bronze 1 px border, bronze text.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 (before the scene) | Every bell is poured once. | Display 500, clamp(44px, 7vw, 116px) | 0.95 / −0.02em | ink | left gutter, top 30 vh, max 10ch | fades out by `--p` .08 |
| Chip 1 | 1 · The mould is built from loam, horse hair and a profile board. | Text 600, 15 px on `.chip` (blur 10 px, radius 999 px, padding 10 px 16 px) | 1.4 | ink | left gutter, 60 vh | visible `--p` .12–.32 |
| Chip 2 | 2 · Bronze at 1,100 °C fills it in under a minute. | same | same | ink | same | `--p` .45–.62 |
| Chip 3 | 3 · Two days later, the bell comes out of the pit. | same | same | ink | same | `--p` .8–1 |
| Progress | 1 · 2 · 3 | Text 600, 12 px | — | ink 40 % / bronze | right edge | active follows `--p` |

Shadows: H1 `0 16px 38px rgba(0,0,0,.32)`, chips `0 2px 18px rgba(0,0,0,.42)` on the text. Temperatures and materials TEMP until the foundry confirms.

### Sections
After the scene: Bells (sizes and notes, a table), Carillons (two installations), Restoration, Visit (tours on Fridays), footer. A "Skip the casting" link before the scene.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Frames | scroll (`--p`) | — | linear | recipe | frame 0 → 119 |
| Chips | `--p` windows | — | 5 % of scene | linear | opacity 0 → 1, 12 px → 0 |
| Ground | `--p` | — | linear | — | hot → cold |
Reduced motion: the scene is not pinned; three stills (frames 1, 60, 120) with the three captions under each.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Scene length | 300vh, phone frame set | 360vh | 400vh | 360vh |
| Chips | bottom band over a ground scrim | left | left | left |
| H1 | 40 px | 76 px | 116 px | 84 px |

### Acceptance
**First viewport:** at 1440 × 900 a dark foundry floor with a clay mould on the right, the serif headline on the left; scrolling runs the casting forwards (and backwards on the way up) with no blank frames, and three small frosted captions appear one at a time. At 390 × 844 a shorter scene with captions along the bottom.
**Do not:** exceed 400vh; capture or smooth the wheel; generate the casting with AI (it is the foundry's craft); show a temperature the foundry did not supply; hold all 120 frames decoded at once.
