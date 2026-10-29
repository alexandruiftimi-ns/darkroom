# Fathom · dive computers for technical divers
<!-- Darkroom example 035 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | landing | `cyberpunk` (restrained) + `modern` | `animated` | none (loops only) | `reveal.js` |

## Say this
> /darkroom a black landing page for our dive computer, all text in a monospace font, a huge faded word behind the product, then sections with numbers like max depth and battery, each over its own underwater video. Buy now.

## Build spec

### Brief & signature
Fathom T2 is a wrist computer for trimix divers: 4 gases, 300 m rated, 40 hours battery, € 1,190. Visitors are technical divers and instructors. Feeling: deep, technical, trustworthy. **Signature:** the word DEPTH as a 30vw watermark in a condensed display face at 6 % ink behind the product photo, and every number on the page set in mono tabular figures like the device's own screen. **Supporting:** three full-height sections over slow underwater loops, a depth gauge in the margin that tracks scroll (0 → 300 m), monospace everywhere else.

### Stack & files
Next.js App Router, `app/page.tsx`, `components/DepthGauge.tsx` (reads scroll progress of the page, writes a value, `aria-hidden`), `reveal.js` client module; videos in `public/media`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Watermark | Anton | 400 | watermark only |
| Everything | Space Mono | 400, 700 | all UI and copy |

### Tokens
```css
html, body { background: #020406; }
:root { --ground: #020406; --ink: 180 10% 92%; --ink-60: hsl(var(--ink) / .6); --cyan: #49e3d4; --line: hsl(var(--ink) / .12);
  --mono: "Space Mono", ui-monospace, monospace; --mark: "Anton", Impact, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| product | studio render or photo with alpha (NEEDS 1) | `<img>` WebP alpha 1200 px | contain, centred | static | silhouette TEMP | the computer face-on, screen showing "142 m · 18/45" in its own UI, cyan backlight |
| loops ×3 | the brand's dive footage (NEEDS 2–4) | `<video muted loop playsinline preload="metadata" poster>` per section | cover | plays while visible | posters | 1: a diver's torch beam in black water; 2: a wreck rail in blue-black; 3: slow bubbles rising; edges fall to `#020406`; no faces, no logos |

### Nav
60 px: "FATHOM" Mono 700 15 px +0.1em; T2 · Specs · Dealers · Support (12 px ink-60); CTA "Buy T2 · € 1,190" cyan 1 px border, cyan text.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Watermark | DEPTH | Mark 400, 30vw | 0.8 / −0.04em | ink at 6 % | centred, behind product | none |
| Product | — | height 64 vh | — | — | centred | fade 600 ms, scale 1.04 → 1 |
| H1 | Fathom T2. Four gases, three hundred metres. | Mono 700, clamp(22px, 2.4vw, 36px) | 1.3 / 0 | ink | bottom-left, max 22ch | fade, delay 200 ms |
| Price line | € 1,190 incl. VAT · ships in 5 days | Mono 400, 14 px tabular | 1.4 | ink-60 | under H1 | delay 300 ms |
| CTA | Buy T2 | Mono 700, 15 px, cyan fill, ground text, radius 2 px | — | — | bottom-right | delay 300 ms |

### Sections
Three full-height sections, each over its loop with a bottom scrim (ground → transparent 40 %):
1. **300 m** · "Rated to 300 metres, tested to 360." + 30 words.
2. **4 gases** · "Trimix, nitrox, oxygen, air. Switch underwater with one button."
3. **40 h** · "Forty hours on a charge. Charges by USB-C in two."
The number is Mono 700 clamp(80px, 14vw, 220px) tabular cyan; the line Mono 400 18 px. Then Specs (full table), Dealers (list), footer. All figures TEMP until confirmed by the manufacturer's data sheet.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Section numbers | in view | 0 | 800 ms | `--ease-out` | 24 px, 0 → 0, 1 |
| Depth gauge | scroll | — | per frame | none | `0 m` → `300 m` (text only, 12 px cyan, right edge) |
| Loops | IntersectionObserver .5 | — | — | — | play visible, pause others |
Reduced motion: posters; gauge hidden.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Watermark | 44vw | 34vw | 30vw | 26vw |
| Product | 46 vh | 56 vh | 64 vh | 54 vh |
| Gauge | hidden | shown | shown | shown |

### Acceptance
**First viewport:** at 1440 × 900 near-black; the dive computer glowing cyan in the centre with DEPTH faint and huge behind it; a mono headline and price bottom-left, a cyan Buy button bottom-right. At 390 × 844 the product fills the middle, headline and button below.
**Do not:** use a second display font beyond the watermark; show depth or battery figures not on the data sheet; glow the UI; let more than one loop play at a time.
