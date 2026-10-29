# Puppet & Pine · stop-motion animation studio
<!-- Darkroom example 014 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `artsy` | `hero-effect` | frame sequence (heavy) | `scrub-frames.js` (pointer-driven), `reveal.js` |

## Say this
> /darkroom a hero for our stop-motion studio: our felt fox puppet stands in the middle and turns its head to follow your mouse left and right. On phones you drag it. Warm, handmade colours.

## Build spec

### Brief & signature
Puppet & Pine is a four-person stop-motion studio in Bristol making commercials and short films with felt and wood puppets. Visitors are agency producers. Feeling: handmade, playful, careful. **Signature:** a 36-frame head turn of the fox puppet, shot by the studio on its own rig, driven by the pointer's x position; the frames are drawn on a canvas so each pointer step shows a real photographed pose. **Supporting:** a paper-texture ground, a hand-cut label style, gentle spring on buttons.

### Stack & files
`index.html`, `styles.css`, `fox.js` (adapts `recipes/scrub-frames.js`: progress comes from pointer x with lerp .12 instead of scroll; keeps its decode window and nearest-frame fallback), frames from `darkroom media frames fox-turn.mov --out frames --fps 12 --width 1200 --format webp` and a phone set at 720 px.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Gluten | 600 | headline, labels |
| Text | Nunito | 400, 700 | body |

### Tokens
```css
:root { --ground: #f1e3cf; --ink: #2b1d14; --ink-60: #2b1d1499; --fox: #d8622b; --pine: #2f5b3f; --line: #2b1d141f;
  --display: "Gluten", system-ui, sans-serif; --text: "Nunito", system-ui, sans-serif; --spring: cubic-bezier(.34,1.56,.64,1); }
body { background: var(--ground) url(paper.webp); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| fox head turn | studio shoots 36 stills on its rig (NEEDS 1) | `<canvas>` over a poster `<img>` | contain, centred, height 70 vh | pointer selects frame | poster (frame 18, facing forward) | fox from the waist up, head turning from far left to far right; seamless paper backdrop in exactly `#f1e3cf`; locked camera, constant light |
| paper texture | drawn in code or scanned | 512 px tile | repeat | static | flat ground | — |

### Nav
"Puppet & Pine" Display 600 24 px; Films · Studio · Hello; CTA "Start a project" pine fill, ground text, radius 14 px, hover scale 1.04 with `--spring` (playful pack allows it).

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Every blink took an afternoon. | Display 600, clamp(40px, 6vw, 96px) | 1.0 / −0.01em | ink | left gutter, top 22 vh, max 10ch | rise 20 px, 700 ms |
| Sub | Stop-motion commercials and short films, built by hand in Bristol. | Text 400, 18 px | 1.5 | ink-60 | under H1 | delay 150 ms |
| Fox | — | canvas 70 vh | — | — | x 62 %, bottom 0 | pointer |
| Label | ← he's watching you → | Display 600, 15 px, rotated −3° on a fox-colour tag | — | ground on fox | near the fox's paw | fades after the first move |

### Interaction logic
`target = clamp(0, 35, round(clientX / innerWidth × 35))`; `pos += (target − pos) × .12`; draw `round(pos)` when it changes. Touch: horizontal drag on the canvas maps the same way; release eases back to frame 18 over 600 ms. Idle 5 s on pointer devices: no motion (it stays where it was). Off-screen and hidden tab: rAF stops.

### Sections
1. **Films:** a grid of 6 posters 2:3 with titles in Display, hover lifts 4 px with `--spring`.
2. **Studio:** behind-the-scenes photos with handwritten-style labels (Display 600 14 px on tags).
3. **Hello:** "Tell us about your idea." + email.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Fox frames | pointermove | — | per frame | lerp .12 | frame index follows x |
| Buttons | hover | 0 | 300 ms | `--spring` | scale 1 → 1.04 |
| Film posters | in view | `i × 100 ms` | 700 ms | `--spring` | 24 px, 0 → 0, 1 |
Reduced motion: poster frame only, no following; hovers change colour only.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Fox | below copy, 52 vh, phone frame set | right half | x 62 % | 60 vh |
| H1 | 38 px | 64 px | 96 px | 72 px |

### Acceptance
**First viewport:** at 1440 × 900 a warm paper page, the felt fox on the right turning its head to follow the pointer pose by pose; the headline left. At 390 × 844 the fox below the headline, turning when dragged.
**Do not:** interpolate between frames (show only real photographed poses); generate the puppet with AI (it is the studio's work); exceed 36 desktop frames at 1200 px without measuring memory; put the label over the fox's face.
