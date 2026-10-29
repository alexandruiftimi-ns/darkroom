# Glyphwell · independent type foundry
<!-- Darkroom example 096 · fictional foundry · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing + catalog | `art-gallery` + `modern` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a website for our small type foundry: each typeface gets a big type tester where you can type your own words and change size and weight, a specimen page, and licence prices for desktop and web. Typography is the whole design.

## Build spec

### Brief & signature
Glyphwell sells four families (a grotesk, a serif, a mono, a display) from Copenhagen; licences from € 40. Visitors are designers testing faces for a project. Feeling: exact, playful, confident. **Signature:** a live type tester per family as the first screen: an editable line (`contenteditable` with a plain-text paste handler) set at 12vw, with a size slider (24–400 px), a weight slider on the variable axis (100–900), and a features toggle row (ss01, tnum, case), all reflecting instantly; the default text changes per family to show its character. **Supporting:** a glyph grid on hover, a licence calculator, monochrome UI so the type is the only image.

### Stack & files
`index.html`, `fonts/*.html` (one specimen each), `styles.css`, `tester.js` (sliders write CSS variables; paste is sanitised to text; Esc resets), `licence.js` (seats/pageviews → price table), the foundry's own fonts as trial WOFF2 (subset, watermarked if they wish) for the tester only.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| UI | Glyphwell Grotesk (the foundry's own) | variable | everything; fallback system-ui |
| Testers | each family's variable trial file | full axis | loaded per tester when it scrolls near |

### Tokens
```css
:root { --ground: #f2f1ee; --ink: #111111; --ink-60: #11111199; --mark: #2b59ff; --line: #11111122; --size: 12vw; --wght: 500;
  --ui: "Glyphwell Grotesk", system-ui, sans-serif; }
.tester { font-size: var(--size); font-variation-settings: "wght" var(--wght); line-height: .95; letter-spacing: -.03em; }
```
Scoped tracking exception: −0.03em at display sizes, never tighter for the tester's default.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| fonts | the foundry's files (NEEDS 1) | `@font-face` WOFF2 | — | lazy per tester | system fonts with a "loading" note | — |

### Nav
56 px: "Glyphwell" UI 600 16 px; Typefaces · In use · Licences · Trial fonts · Cart.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Family name | Halde Grotesk · 9 weights + italics | UI 500, 14 px | 1 | ink-60 | top-left | none |
| Tester line | Fjord light at 4 am (editable) | the family at `--size`, `--wght` | 0.95 / −0.03em | ink | full width | none |
| Controls | Size 24–400 · Weight 100–900 · ss01 · tnum · case | range inputs with visible labels and values (tabular) | — | ink / mark | below the line | instant |
| CTA | Buy licence from € 40 · Download trial | mark fill / underline | — | — | right of the controls | — |

### Sections
Four family testers in sequence (each with its own default sentence), In use (photos of real projects with credit), Licences (calculator: desktop seats, web pageviews, app; price table incl. VAT), Trial fonts (download after agreeing to the trial EULA), Info (glyph sets, languages supported).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Slider changes | input | — | immediate | — | CSS variables |
| Family names | in view | 0 | 600 ms | ease-out | opacity 0 → 1 |
| Glyph cells | hover | 0 | 150 ms | linear | cell enlarges glyph 1 → 1.6 |
Reduced motion: no fades; sliders unchanged (user-driven).

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Tester | 16vw default, size slider max 160 px | 14vw | 12vw | 10vw |
| Controls | stacked, 44 px thumbs | two rows | one row | one row |

### Acceptance
**First viewport:** at 1440 × 900 a pale grey page whose whole first screen is one huge line of type the visitor can click into and rewrite, with size and weight sliders and feature toggles under it, and a blue licence button. At 390 × 844 the line wraps to two or three lines and the sliders stack.
**Do not:** let pasted HTML into the tester; ship the full retail fonts to the browser for testing; show the tester in a fallback font without saying so; use any image as decoration.
