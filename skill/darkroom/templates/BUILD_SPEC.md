# BUILD SPEC — <page or slice>

Written <YYYY-MM-DD> after `DESIGN_BIBLE.md`, before code. Claude's working file, not an approval gate. Build exactly what it says; when reality differs, change this file first, then the code. Rules: `references/spec-precision.md`. Density to match: the two closest entries in `examples/INDEX.md`.

## 1. Brief & signature
One paragraph: what the page sells or shows, for whom, the feeling in three words. **Signature:** the ONE thing this page is remembered for (media, interaction or type moment). **Supporting (2–4, quiet):** one entrance, one material, one type move, one reveal. Heavy techniques: at most one.

## 2. Stack & files
Platform (`platforms/<id>.md`), framework or none, file tree, libraries with pinned versions, recipes copied from `recipes/`.

## 3. Fonts
| Role | Family | Weights | Source (self-hosted file) | Fallback + metric overrides |
|---|---|---|---|---|

## 4. Tokens (from the bible)
```css
:root {
  --ground: ; --surface: ; --ink: ; --ink-80: ; --ink-60: ; --ink-40: ; --line: ; --accent: ; --focus: ;
  --display: ; --text: ; --ease-out: cubic-bezier(.22,1,.36,1); --ease-state: cubic-bezier(.4,0,.2,1);
  --gutter: clamp(20px, 4vw, 64px); --section: clamp(96px, 12vw, 176px); --max: 76rem;
}
```

## 5. Verbatim utilities
Blocks that must be exact: material class, grain, keyframes, scrim, the reduced-motion block, the no-JS fallback.

## 6. Assets
| Slot | File | Element & attributes | Fit & focal point | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
Art direction = one sentence: what the media shows, where the subject sits, where the empty zone is, the edge colour (= `--ground`) (`references/hero-media.md`). Missing files are `TEMP` rows in `ASSETS.json` and `NEEDS.md`.

## 7. Layers & z-ladder
`0 media · 1 scrim · 2 grain · 10 content · 40 nav · 60 menu overlay · 90 consent`

## 8. Nav
Position, height, padding, mark, links (copy), CTA (copy = the primary CTA), scrolled state, phone menu (type, open/close motion, focus trap, Esc, scroll lock).

## 9. Hero
| Element | Copy | Tag | Font | Size (phone → desktop) | Weight | Leading | Tracking | Colour | Box / position | Motion |
|---|---|---|---|---|---|---|---|---|---|---|

## 10. Sections
Per section: claim (one sentence), layout family, copy (real), elements with full style lines, the hook, the transition out.

## 11. Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
Stagger formulas written out (`delay = 0.3 + i × 0.08 s`). Reduced motion: what shows instead, per row.

## 12. Interaction logic
State, constants, steps, cleanup, touch fallback, what happens when JS fails.

## 13. Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | Short viewport (max-height 720px) |
|---|---|---|---|---|

## 14. Acceptance
- **First viewport:** one paragraph describing exactly what a visitor sees at 1440 × 900 and at 390 × 844 before scrolling.
- Checks: `darkroom audit` with no high, capture desktop + phone + reduced motion + early frame, the ten lenses (`references/critique-method.md`).
- **Do not:** (last, always) the list of things this page must not do.
