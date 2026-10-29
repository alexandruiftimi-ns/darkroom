# Ondine · recycled-gold jewellery
<!-- Darkroom example 088 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `shopify` | landing + catalog | `like:cartier` → `luxury` | `animated` | none | `cursor-reveal.js`, `reveal.js` |

## Say this
> /darkroom a Shopify store for my recycled-gold jewellery like Cartier's calm feeling but our own identity: lots of white space, close-up photos, and when you hover a ring it shows the same ring on a hand. Engraving option on product pages.

## Build spec

### Brief & signature
Ondine makes 18 ct recycled-gold rings and necklaces in Paris; € 290–2,400; engraving free. Visitors are gift buyers and couples. Feeling: quiet, warm, intimate. The user named Cartier as a reference: take the restraint (space, small serif caps, slow pace), never its identity (no red boxes, no panther, no logo forms) (`commands/lookalike.md`). **Signature:** every product card shows the piece on ivory; hovering (tap on phones) reveals the same piece worn on a hand through a soft circle that grows from the cursor, so the visitor sees scale. **Supporting:** small tracked serif caps for navigation, a gold hairline under active items, an engraving field with a live preview line.

### Stack & files
Shopify OS 2.0; product media: image 1 = on ivory, image 2 = worn; `assets/card-reveal.js` (adapts `recipes/cursor-reveal.js` per card); engraving as a line-item property with a 20-character limit and a preview in the serif.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Cormorant SC | 500 | navigation, product names (small caps) |
| Text | Cormorant Garamond | 400 | descriptions |
| UI | Jost | 400 | prices, buttons |

### Tokens
```css
:root { --ground: #fbf9f5; --ivory: #f3eee5; --ink: #1c1a17; --ink-60: #1c1a1799; --gold: #b08d57; --line: #1c1a171a;
  --sc: "Cormorant SC", Georgia, serif; --serif: "Cormorant Garamond", Georgia, serif; --ui: "Jost", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| on ivory ×n | own macro photos (NEEDS 1) | product image 1, 4:5 | contain | base | — | the piece on `#f3eee5` linen, soft north light, gold reflections controlled |
| worn ×n | own (NEEDS 2) | product image 2 as `[data-reveal-top]` | aligned crop | revealed | none (no reveal) | the same piece on a hand at the same position and scale in frame |

### Nav
80 px: "ONDINE" SC 500 18 px +0.3em centred; left Rings · Necklaces · Bespoke; right Search · Bag; active link has a 1 px gold underline 6 px below.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Gold that has lived before. | Serif 400, clamp(40px, 5.6vw, 92px) | 1.05 / 0 | ink | centred, top 20 vh | fade 1.4 s |
| Sub | Rings and necklaces in recycled 18-carat gold, made by hand in Paris. Engraving included. | Serif 400, 20 px | 1.5 | ink-60 | centred, max 480 px | delay 300 ms |
| CTA | Discover the rings | UI 400, 13 px +0.18em caps, 1 px ink border, padding 14 px 28px | — | ink | centred | delay 400 ms |
| Hero piece | one ring on ivory | 40 vh | — | — | centred under the CTA | reveal on hover shows it worn |

### Sections
Rings (grid of 3 columns with generous 48 px gaps, card reveal, name in SC 18 px, price in UI 15 px), Bespoke (process in four steps), Atelier (one photo, 60 words), Care and sourcing (recycled gold facts with source, TEMP).
**Product page:** gallery left, details right: name, price incl. VAT, size picker with a ring-size guide, engraving field (preview line in the serif, live), Add to bag, delivery in a gift box.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Card reveal | hover / tap | 0 | radius grows 600 ms, follows lerp .1 | `cubic-bezier(.22,1,.36,1)` | circle 0 → 70 % of card |
| Hero text | load | 0 / 300 / 400 ms | 1400 ms | ease-out | opacity 0 → 1 |
| Grid | in view | `i × 100 ms` | 900 ms | ease-out | opacity |
Reduced motion: tap toggles worn/ivory without growth animation.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Grid | 2 columns, tap to toggle worn | 2 | 3 | 3 |
| Hero piece | 32 vh | 36 vh | 40 vh | 32 vh |

### Acceptance
**First viewport:** at 1440 × 900 a warm white page with small tracked serif caps for the name and menu; a quiet centred line, a sub and a thin-bordered button; one gold ring on ivory below, which shows itself worn on a hand when pointed at. At 390 × 844 the same centred column, tap to see it worn.
**Do not:** copy a reference brand's red, logo, packaging or iconic forms; claim "ethical" without the gold source; let worn and ivory photos differ in position; use more than one accent (gold).
