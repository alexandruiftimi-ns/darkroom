# Fieldnote · foley and sound design studio
<!-- Darkroom example 004 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `cinematic` + `editorial-news` (type) | `animated` | none | `reveal.js` |

## Say this
> /darkroom a site for a small foley studio that makes sound effects for films. Warm, dark, like a film still. The video at the top should sit inside a rounded frame, not edge to edge. Then about us, and what we do.

## Build spec

### Brief & signature
Fieldnote is two foley artists in Ghent who record footsteps, cloth and props for feature films and games. Visitors are post-production supervisors. Feeling: tactile, warm, precise. **Signature:** an inset hero film (a hand dropping gravel onto a board, in slow motion) inside a frame with 16 px of ground around it, grain over it, and a waveform line drawn in code that runs along the frame's bottom edge in step with the clip. **Supporting:** film grain, mask reveals, one serif quote.

### Stack & files
`index.html`, `styles.css`, `wave.js` (canvas waveform, 120 points, redraws only while the video plays), `recipes/reveal.js`. Media in `/media`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Familjen Grotesk | 500 | headings |
| Accent | Newsreader | 400 italic | one pull quote only |
| Text | Familjen Grotesk | 400 | body |

### Tokens
```css
:root { --ground: #120f0c; --surface: #1c1814; --ink: 45 30% 86%; --accent: #f0b35b; --line: hsl(var(--ink) / .12);
  --display: "Familjen Grotesk", system-ui, sans-serif; --serif: "Newsreader", Georgia, serif; --ease-out: cubic-bezier(.16,1,.3,1); }
```

### Verbatim utilities
```css
.grain::after { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .09; mix-blend-mode: overlay;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| hero clip | studio's own footage or generated (NEEDS 1) | `<video muted loop playsinline autoplay>` in `.frame` | cover, 40 % 55 % | loops, paused off-screen | poster | macro of a hand releasing gravel onto a plank, 120 fps slowed, warm tungsten key from the left, edges fall to `#120f0c`; empty zone right 45 % |
| studio stills ×2 | own photos | `<img>` 3:2 | — | mask reveal | TEMP | the foley pit, shoes on a shelf |

### Nav
Inside the frame, top 28 px, left/right 32 px. "Fieldnote" Familjen 500 17 px. Links: Work · Studio · Contact 14 px ink-80. CTA "Send a reel" 1 px ink-40 border, radius 999 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Frame | — | — | — | — | `inset: 16px; border-radius: 28px; overflow: hidden; height: calc(100svh - 32px)` | clip-path inset(6% round 28px) → inset(0 round 28px), 1.2 s |
| H1 | Every footstep in your film was a choice. | Display 500, clamp(40px, 5.6vw, 88px) | 1.0 / −0.03em | ink-100 | right column, `right: 56px; bottom: 120px`, max 13ch | lines rise, 70 ms stagger |
| Sub | Foley for features, series and games, recorded in our Ghent pit since 2014. | Text 400, 17 px | 1.5 | ink-80 | under H1, max 400 px | fade, delay 400 ms |
| Waveform | — | canvas 100 % × 56 px | — | ink-40 line 1.5 px, accent playhead | bottom of the frame | amplitude follows a baked envelope array, synced to `currentTime` |

### Sections
1. **About:** card on `--surface`, radius 28 px, two columns: the Newsreader italic quote at 36 px "We listen to the room before we touch anything." left; 55 words right.
2. **What we do:** four rows (Footsteps · Cloth · Props · Spot effects), Display 48 px names in a list with hairlines, a credits line under each in ink-60 (titles TEMP until confirmed). Hover a row (pointer only): the row's ink goes to accent in 150 ms.
3. **Contact:** "Send us a scene." + email, studio address, booking line.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Frame | load | 0 | 1200 ms | `--ease-out` | clip-path inset(6%) → inset(0) |
| H1 lines | load | `0.3 + i × 0.07 s` | 800 ms | `--ease-out` | translateY(105%) in a mask → 0 |
| Rows | in view | `i × 80 ms` | 600 ms | `--ease-out` | opacity 0 → 1, 16 px → 0 |
Reduced motion: frame at final inset, video paused on the poster, waveform static.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Frame | inset 10px, radius 20px, height 78svh | inset 16px | inset 16px | — |
| H1 | 38 px, bottom-left | 64 px | 88 px | 64 px |
| Waveform | hidden | shown | shown | shown |

### Acceptance
**First viewport:** at 1440 × 900 a warm, grainy macro of gravel falling inside a rounded frame on a near-black page; the headline lower right; a thin waveform pulse along the frame's bottom. At 390 × 844 the frame is 78 % of the height, the headline below the falling gravel.
**Do not:** play sound automatically; list fake film credits; let the grain sit above the text; give every list row a card.
