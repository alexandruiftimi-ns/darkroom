# Volta Cargo · electric cargo bike product launch
<!-- Darkroom example 055 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | landing (product story) | `cinematic` + `modern` | `story` | scroll-scrubbed frames (heavy) | `scrub-frames.js`, `scene-progress.js`, `reveal.js` |

## Say this
> /darkroom an Apple-style product page for our electric cargo bike: as you scroll the bike turns, then the box opens, then the battery slides out, with short facts appearing next to each part. Pre-order with a deposit. We can generate the footage from our product photos.

## Build spec

### Brief & signature
Volta Cargo V2 is a front-box cargo bike for two children, 100 km range, € 4,690, pre-orders with a € 200 refundable deposit. Visitors are parents replacing a second car. Feeling: capable, friendly, engineered. **Signature:** three pinned chapters of scroll-scrubbed frames from one locked camera: (1) the bike turns 120° to side view, (2) the box's rain cover opens and two child seats fold up, (3) the battery slides out of the frame. Facts arrive beside the part being shown. **Supporting:** a chapter progress indicator, a skip link, a plain spec table after the story.

### Stack & files
Next.js App Router; `components/Chapter.tsx` wraps `recipes/scrub-frames.js` (one frame set per chapter: 72 frames, full-size AVIF + 900 px phone set via `darkroom media frames --format avif --mobile-width 900`); `recipes/scene-progress.js` for fact timing; `reveal.js` for the rest.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Manrope | 600 | headings |
| Text | Manrope | 400 | body |
| Figures | Manrope | 600 tabular | specs |

### Tokens
```css
:root { --ground: #0d0f10; --ink: 200 10% 95%; --ink-60: hsl(var(--ink) / .6); --volt: #c6f432; --line: hsl(var(--ink) / .12);
  --display: "Manrope", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| ch1 turn | image-to-video from the product photo, first and last frame fixed (NEEDS 1, `prompts/video-clip.md`) | canvas over poster | contain, x 60 % | frame = progress | poster | locked camera, studio cyc in `#0d0f10`, bike turns from front three-quarter to side; geometry and logo identical; no cuts |
| ch2 box | first/last frame clip (NEEDS 2) | same | same | same | poster | rain cover lifts, two seats unfold; same camera |
| ch3 battery | first/last frame clip (NEEDS 3) | same | same | same | poster | battery slides out of the down tube 15 cm; same camera |
Prompt lines for all three: "edges fall off to flat #0d0f10; empty negative space in the left 40 % for the full clip; single continuous shot; nothing enters or leaves the frame".

### Nav
64 px: "Volta" Display 600 18 px; V2 · Specs · Test ride · Dealers; CTA "Pre-order · € 200 deposit" volt fill, ground text.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | The second car, retired. | Display 600, clamp(44px, 7vw, 116px) | 0.95 / −0.035em | ink | left gutter, top 26 vh, max 9ch | fades out by ch1 25 % |
| Ch1 facts | 100 km range · 2 children · 180 kg payload | Display 600 40 px tabular + Text 15 px labels | 1.1 | ink / ink-60 | left column, at 30 %, 55 %, 80 % of ch1 | opacity windows of 8 % |
| Ch2 facts | Rain cover in 4 seconds · seats with 5-point belts | same | same | same | beside the box | same |
| Ch3 facts | 1,000 Wh battery · charges in 4.5 h · lockable | same | same | same | beside the battery | same |
| Progress | Turn · Box · Battery | Text 600, 12 px | — | ink-60, active volt | right edge | follows chapters |

All figures TEMP until the engineering spec sheet is supplied.

### Sections
Skip link "Skip to specs" before chapter 1; after: Specs table (40 rows in hairline groups), Test ride (dealer finder link), Pre-order (deposit terms in plain words, refundable, delivery window), FAQ.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Frames | scroll per chapter (≤ 250vh each) | — | linear | recipe | frame 0 → 71 |
| Facts | `--p` windows | — | 8 % of chapter | linear | opacity 0 → 1, 12 px → 0 |
| Spec rows | in view | `i × 30 ms` | 400 ms | `--ease-out` | opacity |
Reduced motion: chapters unpinned, each shows its end frame with its facts listed.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Chapter length | 180vh, phone frames | 220vh | 250vh | 220vh |
| Facts | bottom band over a ground scrim | left | left | left |

### Acceptance
**First viewport:** at 1440 × 900 a dark studio, the cargo bike front three-quarter on the right, the four-word headline on the left; scrolling turns it, opens the box and slides out the battery, each with facts appearing beside the part, and everything reverses on the way up with no blank frames. At 390 × 844 shorter chapters with facts along the bottom.
**Do not:** let generated footage change the bike's geometry or logo between frames (inspect frame by frame); exceed 250vh per chapter; hold more than the recipe's decode window; take card details on this page; claim range figures not on the spec sheet.
