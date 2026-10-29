# Undercroft · candle-lit wine cellar tours
<!-- Darkroom example 002 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `luxury` + `restaurant` | `hero-effect` | none | `cursor-reveal.js`, `reveal.js` |

## Say this
> /darkroom a one-page site for wine cellar tours under an old town. I want the hero dark, and where your mouse goes it's like holding a lantern: the lit cellar shows through. Book a tour button.

## Build spec

### Brief & signature
Undercroft runs 75-minute tastings in a 14th-century vaulted cellar under the market square of a small Moselle town. Visitors are couples and small groups booking a weekend. Feeling: hushed, old, warm. **Signature:** the hero is the cellar in darkness; a soft 22vw circle follows the pointer and reveals the same vault lit by candles (a tap reveals it on phones). **Supporting:** reveal on scroll for the tour steps, one serif headline, a quiet bottom fade into the next section.

### Stack & files
Plain `index.html`, `styles.css`, `main.js` (ES module), `recipes/cursor-reveal.js` and `reveal.js` + `reveal.css` copied in. Fonts in `/fonts`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Cormorant | 500, 500 italic | headings only |
| Text | Work Sans | 400, 500 | body, nav, buttons |

### Tokens
```css
:root { --ground: #0a0806; --surface: #14100c; --ink: 38 33% 90%; --accent: #c9893e; --line: hsl(var(--ink) / .12);
  --display: "Cormorant", Georgia, serif; --text: "Work Sans", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| dark vault | generated still from one camera position (NEEDS 1) | base layer, `<img>` 2400 × 1350 | cover, 50 % 60 % | static | ground `#0a0806` | the vault almost black, one exit sign-free doorway glow; edges fall to `#0a0806`; empty zone top-left 40 % |
| lit vault | same camera, candles lit (NEEDS 2) | `[data-reveal-top]` layer | identical to base, pixel-aligned | revealed through the circle | the dark vault only | barrels, a long oak table, 30 candles; same framing to the pixel |
| tour photos ×3 | user's photos | `<img>` 3:2 | per photo | mask reveal | flat surface, TEMP | hands pouring, the stair, the tasting table |

Prompt lines for both stills: "single camera position, locked; edges fall off to flat #0a0806; calm negative space in the top-left 40 %; no text, no logos, no people".

### Nav
Absolute over the hero, height 72 px. Left "Undercroft" Cormorant 500 24 px. Right: Tours · Wines · Visit, Work Sans 14 px ink-60. CTA "Book a tour" accent fill, ground text, 14 px 500, padding 12 px 20 px, radius 2 px, `:active` scale .97.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Six hundred years below the square. | Display 500, clamp(44px, 6.5vw, 96px), two lines set by hand | 0.98 / −0.02em | ink-100 | top 22 vh, left gutter, max 11ch | rises 24 px, 900 ms |
| Sub | A 75-minute tasting by candlelight in the oldest cellar on the Moselle. | Text 400, 18 px | 1.5 / 0 | ink-80 | below H1, max 440 px | fade, delay 200 ms |
| CTA | Book a tour | as nav CTA, 16 px | — | — | below sub, 32 px gap | fade, delay 320 ms |
| Hint | Move to light the cellar · Tap on phones | Text 500, 12 px, +0.12em caps | 1 | ink-40 | bottom-left 32 px | fades out after first pointer move |
| Lantern | — | circle 22vw (phone 60vw), feather 30 % | — | — | follows pointer | lerp .1, closes on leave 400 ms |

Text shadow on H1 and sub: `0 2px 18px rgba(0,0,0,.42)`.

### Sections
1. **The tour:** three steps in a row (Descend · Taste · Linger), each Display 500 36 px + 30 words, a 1 px line above each. `data-reveal="up"`, stagger 100 ms.
2. **Wines:** six bottles as a list, name + vintage + one line, tabular numerals on prices ("€ 38 per guest, six wines").
3. **Visit:** address, hours, "Saturdays at 16:00 and 19:00", map as a static image linked to a map service, no embed before consent.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| H1 | load | 0 | 900 ms | `--ease-out` | translateY(24px), 0 → 0, 1 |
| Lantern | pointermove | — | per frame | lerp .1 | radius 0 → 22vw on enter (400 ms) |
| Steps | in view | `i × 100 ms` | 700 ms | `--ease-out` | 24 px, 0 → 0, 1 |
Reduced motion: the circle does not follow; a click toggles the fully lit image (recipe behaviour).

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| H1 | 40 px, top 14 vh | 64 px | 96 px | 72 px |
| Lantern | tap opens 60vw circle at the tap point | pointer | pointer | — |
| Steps | stacked | 3 columns | 3 columns | — |

### Acceptance
**First viewport:** at 1440 × 900 a nearly black vault, the headline top-left in warm ivory, the brass button below it; moving the pointer pools candlelight on barrels. At 390 × 844 the headline fills the top, the button sits above the fold line, a tap lights the cellar.
**Do not:** put text in the lit layer; let the two stills drift out of alignment; add a flat dark overlay; embed a map before consent; show a price without the "per guest" unit.
