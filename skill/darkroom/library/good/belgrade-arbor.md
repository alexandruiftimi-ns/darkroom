---
slug: belgrade-arbor
verdict: good
verdict_source: Awwwards SOTD 2026-10-17
confidence: high
category: real-estate
packs: [luxury, nature]
url: https://belgradearbor.rs/en
evidence: live study (study.json + 10 shots)
added: 2026-10-25
updated: 2026-10-25
---

# Belgrade Arbor — good

**Thesis in one line:** a facade of tree trunks, drawn in pencil, becomes a real building by the footer.

**First frame:** full-bleed pencil elevation of the facade; no headline; the eye drops straight to the trunk-shaped entrance at x 50 %, y 55 %. Only chrome: a centred dark pill nav (MENU · logo · INQUIRE).

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — editorialOld (display serif), Work Sans (text / UI caps) |
| Type scale | 240 px display · 16 px body · 9 distinct sizes |
| Colour mode / shares | disciplined — UI ground 96.5 % · accent 19 % of non-ground · fields: cream, forest green, slate navy, sand; chartreuse only on progress line + eyebrow |
| Words (page / heaviest section) | 1,207 / 379 (Location) |
| Text zones, first viewport | desktop 3 · mobile 1 (travel 0.7) |
| Layout system | full-bleed sections, copy anchored left gutter; each section a different colour field; polygon image masks |
| Signature motion | sketch → render bookend; masked image reveals · libraries: lenis, WebGL canvas |
| Page weight | 3,281 KB |
| Mobile | re-composed — one column, but reveals captured half-done (see fails) |
| Source of values | measured (study.json) · palette names estimated from images |

## What works & why

- **Pencil hero / render footer** — the same facade appears as a sketch at 0 % and as a lit dusk render with the name at 100 % → principle: one meaningful motion explains the claim (motion.md) → rule: bookend a property/product page with two states of one object so the scroll has a plot.
- **Colour-field sections** — cream → forest → navy → cream grounds change every viewport → principle: cadence hook per viewport (attention.md) → rule: take section grounds from the subject's own materials and let the field change be the hook instead of adding effects.
- **Poster-scale serif** — "YOUR ROOTS" at ~240 px spans the width, Work Sans stays ≤ 20 px → principle: few sizes, far apart (typography.md) → rule: one display line per chapter at poster scale; keep all supporting type small and quiet.
- **Shape language from the architecture** — image masks are irregular polygons echoing the branch-shaped windows → principle: replace tells with substance from the subject (tells.md) → rule: derive masks/crops from a form in the product, not from a 16 px radius.
- **Map with labels at the pins** — isometric line map, gold pins, names directly beside each → principle: related items in place (reading-paths.md rule 4) → rule: label map points in situ; no legend.

## What fails & why

- **Brochure copy** — 1,207 words; Location 379 vs 45 budget → principle: users read ~20 % (attention.md) → rule: move location/amenity detail to a sub-page; keep chapters ≤ 45 words.
- **Reveal-dependent mobile** — mobile shots show a near-blank frame at 100 % and a panel clipping copy mid-word at 50 % → principle: "reveals that fail and leave blank bands" (tells.md) → rule: content must be readable with the reveal skipped or interrupted.
- **Footer letter-wave + compliance** — running text set on a wavy per-letter baseline; 12 unnamed buttons; GTM/Facebook/DoubleClick before consent → principle: effects only on display type; EU consent → rule: never animate body text baselines; gate trackers.

## Transferable rules

- Do: show the object as idea first and as reality last.
- Do: let one form from the subject drive masks, and its materials drive section colours.
- Don't: pour a sales brochure into a cinematic shell.
- Don't: hide body copy behind reveals that can stall.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.
