# Fernhollow · forest cabins with switchable moods
<!-- Darkroom example 016 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `astro` | landing | `nature` + `luxury` | `hero-effect` | none (one clip plays at a time) | `reveal.js` |

## Say this
> /darkroom a booking site for forest cabins. In the hero you can switch the view between four moods (morning mist, rain, snow, firelight), the videos crossfade, and the cabin window frame stays in front of them. Book a stay.

## Build spec

### Brief & signature
Fernhollow rents six timber cabins in a Black Forest valley, each with a picture window. Visitors are couples choosing dates. Feeling: sheltered, seasonal, slow. **Signature:** the view through a cabin window: four looping moods crossfade behind a fixed cut-out window frame (a transparent image of the timber frame and sill), switched by four labelled buttons. **Supporting:** the text colour adapts per mood, a 3 s gentle bob on the frame (±4 px) to feel like breathing, nothing else moves.

### Stack & files
Astro; `src/components/MoodWindow.astro` + `mood.ts`; 4 clips × (desktop 1600 px, phone 900 px) H.264, 8 s each, no audio; `frame.webp` with alpha. Only the active clip plays; the others are paused at frame 0 and preloaded `metadata`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Spectral | 300, 300 italic | headline |
| Text | Lexend | 400, 500 | buttons, body |

### Tokens
```css
:root { --ground: #11140f; --ink: 60 15% 94%; --moss: #8aa66a; --ember: #f0a35e; --line: hsl(var(--ink) / .14);
  --display: "Spectral", Georgia, serif; --text: "Lexend", system-ui, sans-serif; --ease-state: cubic-bezier(.4,0,.2,1); }
[data-mood="snow"] { --ink: 220 20% 12%; } /* dark text on the bright snow clip */
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| mist, rain, snow, firelight | filmed from cabin 3's window on a tripod (NEEDS 1–4) | 4 `<video muted loop playsinline>` stacked | cover, 50 % 50 % | active one at opacity 1 | each clip's poster | same tripod position for all four; the valley and pines; firelight = the room's reflection in the glass at night; no people |
| window frame | photo of the real frame, background removed (NEEDS 5) | `<img>` WebP alpha, `inset: -3%` | cover | bob ±4 px over 3 s | a CSS border frame in `#2a1d14` | timber frame and sill photographed straight on, sharp |

### Nav
Over the frame's top rail: "Fernhollow" Spectral 300 italic 26 px; Cabins · The valley · Getting here; CTA "Check dates" moss fill, ground text, radius 6 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Pick the weather. We'll light the stove. | Display 300, clamp(40px, 5.6vw, 90px) | 1.0 / −0.02em | ink-100 (adapts) | inside the window, upper-left pane, max 12ch | colour 600 ms on switch |
| Mood switch | Mist · Rain · Snow · Firelight | Text 500, 14 px | 1 | ink-80, active ink-100 with a 2 px moss underline | on the sill, centred | underline slides 300 ms |
| CTA | Check dates | as nav | — | — | right of the switch | — |

`aria-pressed` on the four buttons; the group is labelled "View from the window".

### Interaction logic
`setMood(id)`: play the new clip from 0, crossfade opacity 1 s, pause the old one after the fade, set `data-mood` on the hero for text colour. Auto-advance off by default. Keyboard: arrow keys move between moods. If a clip fails, its poster crossfades instead.

### Sections
Cabins (six cards: name, sleeps, window faces, price per night incl. VAT TEMP), The valley (map illustration drawn in SVG, three walks), Getting here, footer.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Clip crossfade | mood button | 0 | 1000 ms | `--ease-state` | opacity 0 → 1 / 1 → 0 |
| Frame bob | always | — | 3 s loop | sine in-out | translateY(0 → −4px), scale 1.03 fixed |
| Text colour | mood change | 0 | 600 ms | `--ease-state` | ink old → new |
Reduced motion: no bob, mood changes swap posters without fades, no autoplay.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Frame | portrait crop of the frame, phone clips | full | full | — |
| H1 | 36 px, bottom pane | 64 px | 90 px | 70 px |
| Switch | 2 × 2 grid of 44 px buttons | row | row | row |

### Acceptance
**First viewport:** at 1440 × 900 the screen is a timber window looking onto misty pines; the serif headline in the upper pane; four mood words on the sill. Pressing Snow fades to falling snow and the text turns dark. At 390 × 844 a tall window crop, the switch as four big buttons.
**Do not:** play more than one clip at a time; let the frame edges show during the bob (keep scale 1.03); use clips from different camera positions; invent prices.
