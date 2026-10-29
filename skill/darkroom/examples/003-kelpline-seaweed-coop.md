# Kelpline · seaweed farming cooperative
<!-- Darkroom example 003 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `nature` | `hero-effect` | none (one background loop) | `reveal.js` |

## Say this
> /darkroom a landing page for a seaweed farming co-op in Brittany. Underwater video of kelp swaying behind the headline, calm and green, then what they grow, how to buy a share, and who they are.

## Build spec

### Brief & signature
Kelpline is 14 fishing families farming sugar kelp in the Rade de Brest; they sell harvest shares to restaurants and households. Feeling: cold water, patient, hopeful. **Signature:** a slow underwater loop of kelp blades rising toward the surface light, the headline bottom-anchored over its dark lower band. **Supporting:** a manual loop with rAF opacity fades (no visible seam), a bottom edge scrim into the page ground, word-group reveals below.

### Stack & files
`index.html`, `styles.css`, `recipes/video-layer.js` + `video-layer.css` and `recipes/video-loop.js` (loop below), `recipes/reveal.js` + `reveal.css`. `media/hero.mp4` (1920 px, 8 s, H.264, no audio, ≤ 7 MB), `media/hero-mobile.mp4` (960 px), `media/poster.webp`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Fraunces | 400 (opsz 96, SOFT 50) | headlines |
| Text | Figtree | 400, 600 | everything else |

### Tokens
```css
:root { --ground: #06201d; --surface: #0b2a26; --ink: 150 20% 93%; --accent: #d7f26b; --line: hsl(var(--ink) / .14);
  --display: "Fraunces", Georgia, serif; --text: "Figtree", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Verbatim utilities
```html
<section class="hero vl" data-video-layer style="--vl-ground:#06201d; --vl-focus:50% 40%">
  <div class="vl-media"><img class="vl-poster" src="media/poster.webp" alt="">
    <video muted playsinline preload="none" data-src="media/hero.mp4" data-src-phone="media/hero-mobile.mp4" data-video-loop data-loop-fade="0.6"></video></div>
  …copy…
</section>
<script type="module">import { videoLayer } from './js/video-layer.js'; import { videoLoop } from './js/video-loop.js'; videoLayer(); videoLoop();</script>
```
From `recipes/video-layer.js` + `video-loop.js`: the wrapper fades in on the first frame (500 ms) and settles 1.06 → 1 over 1.8 s; the clip dips to the ground over its last 0.6 s and restarts; paused off screen and in hidden tabs; reduced motion: poster only.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| hero loop | generated or filmed (NEEDS 1) | `<video data-video-loop muted playsinline>` in a `data-video-layer` | cover, 50 % 40 % | fade loop | poster + ground | kelp blades rise from the lower left toward surface light; the bottom 40 % falls off to flat `#06201d`; one continuous shot, slow drift right, no fish entering |
| harvest photos ×3 | co-op's own | `<img>` 4:5 | per photo | mask reveal | TEMP tiles | lines on the boat, blades on racks, a chef's plate |

### Nav
Height 72 px, transparent. Left "Kelpline" Figtree 600 18 px. Links: Harvest · Shares · The farm, 14 px ink-60. CTA "Buy a share" `--accent` fill, `--ground` text, radius 999 px, padding 11 px 18 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Eyebrow | Rade de Brest · harvest from March | Text 600, 12 px, +0.16em caps | 1 | ink-60 | above H1 | fade 600 ms |
| H1 | Grown by the tide. Cut by hand. | Display 400, clamp(44px, 7vw, 108px) | 0.95 / −0.025em | ink-100 | `bottom: clamp(48px, 9vh, 96px); left: var(--gutter)`, max 12ch | rises 28 px, 900 ms, delay 120 ms |
| Sub | Fourteen fishing families farm sugar kelp in clean Breton water and sell each harvest in shares. | Text 400, 18 px | 1.5 | ink-80 | right column, bottom aligned with H1 baseline, max 380 px | fade, delay 300 ms |
| CTA | Buy a share | nav CTA at 16 px | — | — | under sub | fade, delay 400 ms |

Scrim: `linear-gradient(to top, #06201d 0%, #06201dcc 22%, transparent 45%)` over the bottom of the video. Display shadow `0 16px 38px rgba(0,0,0,.32)`.

### Sections
1. **What we grow:** sugar kelp, dulse, sea lettuce: three columns, Display 36 px name, 30 words each, a 3:4 photo above.
2. **Shares:** two offers in a 2-column table (Household · Restaurant), price per share incl. VAT, what arrives and when; button "Reserve for March".
3. **The farm:** 50-word paragraph + a map-like drawn-in-code line of the bay (SVG, ink-40 strokes).
Section transition: each section rises over the last with `border-radius: 48px 48px 0 0; margin-top: -48px`.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Video wrapper | `loadeddata` | 0 | 500 ms | linear | opacity 0 → 1 |
| Video settle | `loadeddata` | 0 | 1800 ms | `--ease-out` | scale 1.06 → 1 |
| Hero text | load | `0.12 + i × 0.1 s` | 900 ms | `--ease-out` | 28 px, 0 → 0, 1 |
| Section cards | in view | `i × 100 ms` | 700 ms | `--ease-out` | 24 px, 0 → 0, 1 |
Reduced motion: poster still, all text final.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Video | mobile clip, 60 % 50 % | desktop clip | desktop clip | — |
| Sub | below H1, full width | right column | right column | hidden, shown under fold |
| H1 | 44 px | 72 px | 108 px | 80 px |

### Acceptance
**First viewport:** at 1440 × 900 green-gold kelp rises through dark water; the two-sentence headline sits bottom-left over the darkest band, the sub and lime button bottom-right. At 390 × 844 the kelp fills the top two thirds, headline and button below it, no overlap with bright blades.
**Do not:** use a CSS transition on the `<video>` element itself; add a flat dark wash; show fish or divers; claim certifications the co-op has not given; loop with a visible jump.
