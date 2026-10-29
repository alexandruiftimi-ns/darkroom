# Mira Osei · documentary cinematographer
<!-- Darkroom example 012 · fictional person · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | landing | `art-gallery` + `cinematic` | `animated` | none (one showreel stream) | `reveal.js` |

## Say this
> /darkroom a portfolio for a documentary cinematographer. Her showreel plays quietly behind her name, a word in the headline swaps between her roles, then a list of films where hovering one shows a still from it.

## Build spec

### Brief & signature
Mira Osei shoots feature documentaries across West Africa and Europe. Visitors are directors and producers. Feeling: observant, warm, unhurried. **Signature:** the headline "I film people who ___" where the last word swaps every 2.6 s between *work · wait · build · return* in a fixed-width slot that never reflows the line. **Supporting:** a muted showreel at 60 % opacity, a film list where hovering a row shows a still under the cursor, mask reveals.

### Stack & files
Next.js App Router; `app/page.tsx`; `components/RoleSlot.tsx` (CSS-only slot, see below); `components/FilmList.tsx`; showreel as HLS played natively on Safari and through `hls.js@1.5` (pinned, self-hosted) elsewhere; MP4 fallback.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Libre Caslon Display | 400 | headline |
| Text | Instrument Sans | 400, 500 | body, list |

### Tokens
```css
:root { --ground: #0e0d0c; --ink: 35 20% 92%; --clay: #c7724a; --line: hsl(var(--ink) / .12);
  --display: "Libre Caslon Display", Georgia, serif; --text: "Instrument Sans", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Verbatim utilities
```css
.slot { display: inline-grid; vertical-align: bottom; overflow: hidden; height: 1em; }
.slot > span { grid-area: 1 / 1; transform: translateY(100%); transition: transform .6s var(--ease-out), opacity .6s; opacity: 0; }
.slot > span.on { transform: none; opacity: 1; }
.slot > span.out { transform: translateY(-100%); opacity: 0; }
/* the slot is as wide as its widest word because every span shares one grid cell */
@media (prefers-reduced-motion: reduce) { .slot > span { transition: none; } }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| showreel | Mira's own reel, re-cut to 40 s without titles (NEEDS 1) | `<video muted playsinline autoplay loop>` at opacity .6 | cover | pauses off-screen | poster | her own footage; no burned-in titles; grade unchanged |
| film stills ×8 | her frames | `<img>` 16:9, 960 px | — | follows cursor on hover | none | one strong frame per film |

### Nav
Height 64 px: "Mira Osei" Instrument Sans 500 16 px; Films · About · Contact; CTA "Check availability" clay text with underline.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | I film people who work. (slot word swaps) | Display 400, clamp(44px, 7vw, 120px) | 1.0 / −0.02em | ink-100; slot word clay | bottom-left, `bottom: 14vh`, max 14ch | slot every 2.6 s |
| Sub | Cinematographer for feature documentaries. Based in Accra and Rotterdam. | Text 400, 17 px | 1.5 | ink-80 | under H1 | fade |
| Scroll cue | Films ↓ | Text 500 13 px | — | ink-60 | bottom-right | none |

Text shadow on H1: `0 16px 38px rgba(0,0,0,.32)`. Bottom scrim: ground → transparent over 35 %.

### Sections
1. **Films:** a list, each row: title (Display 40 px), director, year, festival (only real ones; TEMP), hairline. Pointer devices: hovering a row shows its still 320 px wide following the cursor (lerp .14), opacity 0 → 1 in 200 ms. Touch: the still sits inline under the open row.
2. **About:** 70 words + a portrait on set.
3. **Contact:** agent email, "Available from May" with a status dot (only if true).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Slot word | interval 2600 ms | 0 | 600 ms | `--ease-out` | 100 % → 0 (in), 0 → −100 % (out) |
| Film still | row hover | 0 | 200 ms + lerp .14 | `--ease-out` | opacity 0 → 1, follows pointer |
| Rows | in view | `i × 60 ms` | 600 ms | `--ease-out` | 16 px, 0 → 0, 1 |
Reduced motion: slot shows "work" only; stills appear without following; video paused on poster.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| H1 | 40 px, two lines | 72 px | 120 px | 88 px |
| Film list | stills inline | hover still | hover still | — |

### Acceptance
**First viewport:** at 1440 × 900 her reel plays dimly; bottom-left in a warm serif, "I film people who work." with the clay word sliding to "wait" without the line moving. At 390 × 844 the same on two lines.
**Do not:** let the line reflow when the word swaps; autoplay sound; list awards that are not real; load hls.js from a CDN.
