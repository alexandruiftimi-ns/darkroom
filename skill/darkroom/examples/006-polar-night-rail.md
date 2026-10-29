# Polar Night Rail · arctic sleeper train
<!-- Darkroom example 006 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `astro` | landing | `cinematic` | `hero-effect` | none (two background loops, one plays at a time) | `reveal.js` |

## Say this
> /darkroom a landing page for a sleeper train that runs above the Arctic Circle in winter. Two full-screen parts: first the train under the northern lights, then inside the cabin. Both with looping video. Book a berth.

## Build spec

### Brief & signature
A twice-weekly night train Narvik → Kiruna → Luleå, December to March, with glass-roof lounge cars. Visitors plan a once-in-a-lifetime trip. Feeling: silent, cold, warm inside. **Signature:** two full-height chapters, each a slow loop; scrolling from the first (train under aurora) to the second (cabin with frost on the window) crossfades the films over 1 s and turns the page ground from `#060a14` to `#140d09`. **Supporting:** the manual fade loop, a blur-rise entrance, one frosted material on the booking chip only.

### Stack & files
Astro, `src/pages/index.astro`, `src/components/Chapter.astro` (props: clip, poster, ground), `src/scripts/loops.ts` (IntersectionObserver plays only the visible chapter's video, pauses the other), `recipes/reveal.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Epilogue | 300, 500 | headlines at 300 |
| Text | Epilogue | 400 | one family, three weights |

### Tokens
```css
:root { --night: #060a14; --cabin: #140d09; --ground: var(--night); --ink: 210 30% 95%; --aurora: #7ef0c4; --amber: #ffb36b;
  --display: "Epilogue", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); --ease-state: cubic-bezier(.4,0,.2,1); }
body { background: var(--ground); transition: background-color 1s var(--ease-state); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| loop A | generated (NEEDS 1) | `<video muted playsinline preload="metadata" poster>` | cover, 50 % 60 % | plays while chapter A is ≥ 50 % visible | poster | a lit train crossing a snow plain left to right at a distance, green aurora above; edges fall to `#060a14`; top 40 % calm sky for the headline; locked camera, 10 s, loopable |
| loop B | generated (NEEDS 2) | same | cover, 30 % 50 % | plays while chapter B is visible | poster | inside a wood cabin, frost on the window, a reading lamp, snow passing outside; edges fall to `#140d09`; right 45 % calm wall; locked camera |

### Nav
Fixed, 68 px. "Polar Night Rail" Epilogue 500 16 px; Route · Cabins · Season; CTA chip "Book a berth" with the frosted material: `background: hsl(0 0% 100% / .06); backdrop-filter: blur(12px); border: 1px solid hsl(0 0% 100% / .12); border-radius: 999px`.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 (A) | Sleep through the polar night. | Display 300, clamp(44px, 7vw, 112px) | 0.95 / −0.03em | ink-100 | centred, top 16 vh, max 14ch | blur 12 px → 0 + rise 20 px, 1 s |
| Sub (A) | Narvik to Luleå in fourteen hours, under a glass roof, December to March. | Display 400, 18 px | 1.5 | ink-80 | centred under H1, max 480 px | same, delay 150 ms |
| CTA | Book a berth | Display 500, 16 px, `--aurora` fill, `--night` text | — | — | under sub | delay 300 ms |
| H2 (B) | Wake up warm at minus thirty. | Display 300, clamp(36px, 5vw, 80px) | 1.0 / −0.025em | ink-100 | left, vertically centred, max 12ch | reveal up on enter |
| Facts (B) | 24 cabins · two berths each · breakfast at Kiruna | Display 400, 15 px | 1.4 | ink-60 | under H2 | reveal, delay 120 ms |

### Interaction logic
`loops.ts`: each video uses the fade loop (opacity ramps 0.6 s at start and end of `currentTime`, restart on `ended`). An IntersectionObserver at threshold .5 plays the visible chapter and pauses the other; the body's `--ground` switches to that chapter's colour. Hidden tab pauses both. If a video errors, its poster stays and nothing else changes.

### Sections
After the two chapters: **Route** (four stops as a horizontal line drawn in SVG, times in tabular numerals), **Cabins** (two cabin types, prices per person incl. VAT, TEMP until supplied), **Season** (departure dates table), footer.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Hero text A | load | `i × 0.15 s` | 1000 ms | `--ease-out` | blur(12px), 20 px, 0 → 0, 0, 1 |
| Chapter crossfade | chapter B 50 % visible | 0 | 1000 ms | `--ease-state` | video A opacity 1 → 0, B 0 → 1, ground night → cabin |
| B text | in view | `i × 0.12 s` | 800 ms | `--ease-out` | 24 px, 0 → 0, 1 |
Reduced motion: both posters as stills, no crossfade, text final.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Video A | 720 px clip, 62 % 60 % | desktop | desktop | — |
| H1 | 42 px, top 12 vh | 72 px | 112 px | 80 px |
| B text | bottom band over a ground scrim | left | left | — |

### Acceptance
**First viewport:** at 1440 × 900 a dark snow plain with a tiny lit train crossing under green light; the headline centred in the calm sky; the aurora-green button below. At 390 × 844 the train is re-aimed into the lower half, headline above it.
**Do not:** play both videos at once; add sound; put the frosted material on anything but the booking chip; state departure times or prices that were not supplied; use a stock clip with someone else's train livery.
