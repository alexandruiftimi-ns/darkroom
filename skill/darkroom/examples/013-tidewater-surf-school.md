# Tidewater · surf school and board hire
<!-- Darkroom example 013 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `bold` + `nature` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a one-screen hero for a surf school in Portugal with a video of waves, the headline coming in word by word, and a proper phone menu that slides up from the bottom. Book a lesson.

## Build spec

### Brief & signature
Tidewater teaches beginners and improvers at Praia do Amado, 90-minute lessons in groups of six, boards and suits included. Visitors are holidaymakers on phones. Feeling: salty, bright, confident. **Signature:** the headline arrives word by word like a set of waves (stagger 90 ms), over a sunlit wave loop with the subject on the right. **Supporting:** a bottom-sheet phone menu, sliding-fill buttons, a tide-time microcopy line.

### Stack & files
`index.html`, `styles.css`, `menu.js` (sheet: focus trap, Esc, link click and resize ≥ 768 px close it, body scroll lock, `inert` on main while open), `recipes/reveal.js` with `data-reveal="words"` on the H1.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Anybody | 800 (wdth 120) | headline, expanded |
| Text | Rubik | 400, 500 | UI |

### Tokens
```css
:root { --ground: #f4efe6; --sea: #0d3b4f; --ink: #0d3b4f; --ink-on-media: #fffaf2; --sun: #ffcf4a; --line: #0d3b4f22;
  --display: "Anybody", system-ui, sans-serif; --text: "Rubik", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); --ease-sheet: cubic-bezier(.32,.72,0,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| waves | own GoPro footage or free stock after a yes | `<video muted loop playsinline autoplay poster>` | cover, 70 % 50 % | loops | poster | a surfer small on a green wave on the right third, low sun, left half open water; no logos on boards; 8 s |

### Nav
68 px over the video, ink-on-media. "Tidewater" Display 800 22 px; Lessons · Hire · Find us; CTA "Book a lesson" sun fill, sea text. Phone: mark + "Menu" button (44 × 44 px).

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Stand up on your first morning. | Display 800, clamp(44px, 8vw, 132px) | 0.9 / −0.03em | ink-on-media | left gutter, vertically centred, max 9ch | words, 90 ms stagger |
| Sub | 90-minute lessons at Praia do Amado. Six per instructor, boards and wetsuits included. | Text 400, 18 px | 1.5 | ink-on-media 85 % | under H1, max 420 px | delay after last word |
| CTA | Book a lesson | Text 500, 16 px, sun fill | — | sea | under sub | sliding fill on hover |
| Tide line | Low tide 09:40 · Water 18° | Text 500, 13 px tabular | — | ink-on-media 70 % | bottom-left | none |

Shadows: H1 `0 16px 38px rgba(0,0,0,.32)`, sub `0 2px 18px rgba(0,0,0,.42)`. Tide values are TEMP (no live feed).

### Verbatim utilities
```css
.btn { position: relative; overflow: hidden; isolation: isolate; }
.btn::before { content: ""; position: absolute; inset: 0; background: var(--sea); transform: translateY(101%); transition: transform .45s var(--ease-out); z-index: -1; }
@media (hover: hover) { .btn:hover { color: var(--sun); } .btn:hover::before { transform: none; } }
.btn:active { transform: scale(.97); }
```

### Interaction logic
Sheet: `dialog`-like `<div role="dialog" aria-modal="true">` at the bottom, `border-radius: 24px 24px 0 0`, height auto (max 80 svh), slides from translateY(100%) in 420 ms `--ease-sheet`, closes in 280 ms; backdrop `#0d3b4f66`; links 28 px Display 800; first link focused on open; focus returns to the Menu button on close.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| H1 words | load | `0.2 + i × 0.09 s` | 700 ms | `--ease-out` | translateY(40%), 0 → 0, 1 |
| Sub, CTA | load | `0.2 + n × 0.09 + 0.1 s` | 600 ms | `--ease-out` | 12 px, 0 → 0, 1 |
| Sheet | menu button | 0 | 420 / 280 ms | `--ease-sheet` | 100 % → 0 |
Reduced motion: words appear together, sheet opens without travel (opacity 150 ms).

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Video focal | 78 % 50 % | 72 % | 70 % | — |
| H1 | 44 px, bottom 22 vh | 88 px | 132 px | 96 px |
| Nav | Menu button + sheet | links | links | — |

### Acceptance
**First viewport:** at 1440 × 900 a sunlit green wave with a small surfer on the right; the expanded headline arrives word by word on the left; the yellow button under the sub. At 390 × 844 the headline sits over open water, the Menu button opens a sheet from the bottom with four large links.
**Do not:** trap scroll when the sheet is closed; let the sheet stay open after resizing to desktop; show real tide data without a source; use stock footage with recognisable people without a release.
