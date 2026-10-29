# Driftwell · sleep soundscapes app (the opt-in glass-cinema look)
<!-- Darkroom example 026 · fictional product · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing (single viewport) | `glass-cinema` (on request) | `hero-effect` | none | — |

## Say this
> /darkroom I want that glassy, dark, cinematic AI-startup look you see everywhere: video background, frosted buttons, a big quiet headline with one serif word. It's for our sleep sounds app. Download on the App Store.

## Build spec

### Brief & signature
Driftwell plays generative rain, sea and train soundscapes that fade out as you fall asleep. Visitors are app-store browsers on phones. The user asked for this look by name; Darkroom records it in the exceptions log ("pack glass-cinema switches on badge, glass, serif accent and centred layout at the user's request"). **Signature:** a slow night-sea loop: a single small boat light far away, the horizon low, the headline centred in the calm sky. **Supporting:** one frosted material on the nav, the badge and the secondary button; a blur-rise entrance; the fade loop.

### Stack & files
`index.html`, `styles.css`, `main.js` (fade loop and the fail-safe entrance), media in `/media`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Hanken Grotesk | 300 | headline |
| Accent | Newsreader | 400 italic | one word, muted |
| Text | Hanken Grotesk | 400, 500 | UI |

### Tokens
```css
html, body { background: #06080c; }
:root { --ground: #06080c; --ink: 220 20% 96%; --ink-60: hsl(var(--ink) / .6); --line: hsl(var(--ink) / .12);
  --display: "Hanken Grotesk", system-ui, sans-serif; --serif: "Newsreader", Georgia, serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Verbatim utilities
```css
.glass { background: hsl(0 0% 100% / .04); backdrop-filter: blur(14px) saturate(1.2); -webkit-backdrop-filter: blur(14px) saturate(1.2);
  border: 1px solid hsl(0 0% 100% / .10); box-shadow: inset 0 1px 0 hsl(0 0% 100% / .14); border-radius: 999px; }
@supports not (backdrop-filter: blur(1px)) { .glass { background: hsl(220 20% 8% / .82); } }
.enter { opacity: 0; filter: blur(10px); transform: translateY(16px); }
.entered .enter { opacity: 1; filter: none; transform: none; transition: opacity .9s var(--ease-out), filter .9s var(--ease-out), transform .9s var(--ease-out); }
.no-js .enter, .reduce .enter { opacity: 1; filter: none; transform: none; }
```
`main.js` adds `.entered` after two animation frames and removes the transforms 1.6 s later so hovers are not affected.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| night sea | generated (NEEDS 1) | `<video muted playsinline autoplay poster>` | cover, 50 % 70 % | fade loop | poster | a dark calm sea at night under a faint blue sky, one tiny warm boat light far away on the left third, low horizon at 70 %; top 55 % calm sky; edges fall to `#06080c`; slow drift, 10 s, loopable |

### Nav
Glass pill centred 20 px from the top, 52 px tall: "Driftwell" 500 16 px; Sounds · How it works · Reviews (14 px ink-60); the store button sits outside the pill on the right.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Badge | New · Night train soundscape | Text 500, 13 px; inner chip "New" ink fill, ground text | 1 | ink-80 | above H1, `.glass` | enter, delay 0 |
| H1 | Fall asleep *somewhere* quieter. | Display 300, clamp(44px, 7.5vw, 120px); "somewhere" in serif italic at ink-60 | 0.95 / −0.03em | ink | centred, top 20 vh, max 12ch | enter, delay 120 ms |
| Sub | Soundscapes that drift, change and fade out as you fall asleep. | Text 400, 18 px | 1.5 | ink-60 | centred, max 420 px | delay 240 ms |
| Primary | Download on the App Store | official store badge (supplied artwork), 54 px tall | — | — | centred | delay 360 ms |
| Secondary | Hear a sample | Text 500, 15 px, `.glass`, 54 px | — | ink | beside primary | delay 360 ms |

Text shadow on H1 `0 16px 38px rgba(0,0,0,.32)`. No proof row: the reviews link goes to the store page.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Entrance | 2 frames after load | `i × 120 ms` | 900 ms | `--ease-out` | blur(10px), 16 px, 0 → none, 0, 1 |
| Video | `loadeddata` | 0 | 500 ms fade; 1.8 s settle | `--ease-out` | opacity 0 → 1, scale 1.06 → 1 |
| Loop | 0.6 s before the end | — | 600 ms | linear | opacity 1 → 0, restart, 0 → 1 |
| Sample | click | — | — | — | plays a 20 s sample with a visible pause button |
Reduced motion: poster, entrance final, sample still allowed (user-started).

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| H1 | 42 px, top 16 vh | 80 px | 120 px | 88 px |
| Buttons | stacked, full width | row | row | row |
| Video focal | 40 % 70 % | 50 % | 50 % | — |

### Acceptance
**First viewport:** at 1440 × 900 a dark sea at night with one small warm light; a frosted pill nav at the top; the badge, then the large light headline with one muted serif word, the sub and two buttons, all centred in the sky. At 390 × 844 the same stack, buttons full width.
**Do not:** add purple gradients or glow orbs; invent ratings, avatars or "loved by" counts; put glass on more than nav, badge and secondary button; autoplay sound; use more than one badge.
