---
slug: meer-mohsin
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: low
category: portfolio
packs: [bold, artsy]
url: https://www.meermohsin.me/
evidence: live study (study.json + 10 shots)
added: 2026-10-25
updated: 2026-10-25
---

# Meer Mohsin — good

**Thesis in one line:** a solo designer branded as a dark-fantasy album cover — red-to-black gradients, a tribal glyph masked over the eyes, script marquees.

**First frame:** a face portrait fills the height at centre; a red tribal glyph sits over the eyes; a white ~190 px marquee crosses the face at ~50 % y; intro paragraph top-left, 6-link nav + 3 socials top-right, role list mid-right, a Let's Connect card bottom-right, a TENSION / IMMERSION / IMPACT rail along the bottom. The eye hits the glyph/eyes, reads the marquee, then orbits the corners.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — grotesk (regular + light files) · "ruthie" script for display marquees |
| Type scale | 228 px → 10 px · 15 distinct sizes |
| Colour mode / shares | expressive — one hue (red, 0°) 64 % of UI pixels, black ground, white ink |
| Words (page / heaviest section) | 572 / 168 (process); lorem ipsum shipped in two sections |
| Text zones, first viewport | desktop 7 · mobile 6 · travel 2.28 |
| Layout system | full-bleed scenes with corner chrome and a fixed bottom chapter rail; each section a different composition (line-grid, stacked gallery, journal, red finale) |
| Signature motion | glyph mask on the portrait; script marquees; red wireframe perspective grid · libraries: lenis, WebGL canvas |
| Page weight | 3,063 KB |
| Mobile | squeezed — intro text sits on the face; journal titles collide with the logo; AWARDS heading runs into the bottom rail |
| Source of values | measured (study.json) |

## What works & why

- **One hue owns every scene** — red at varying darkness from hero to finale → principle: expressive mode, one dominant per viewport (color.md) → rule: if you go expressive with a single hue, vary its value, not the hue.
- **The glyph recurs at three scales** — logo, hero mask, closing graphic → principle: one focal point per viewport, repeated as a motif (reading-paths.md rule 7; attention.md cadence) → rule: one personal mark used as logo, hero and finale ties a long, varied scroll together.
- **Fixed three-word chapter rail** → principle: cadence and orientation; labels 1–4 words (attention.md) → rule: a persistent short chapter rail tells the visitor where they are when sections look unlike each other.

## What fails & why

- **7 text zones, all four corners used** → principle: ≤ 3 zones; corners are for chrome (reading-paths.md rules 2, 5) → rule: move the intro and role list into one hero cluster; corners hold nav only.
- **Shipped placeholders** — lorem ipsum in two sections, a typo in the awards heading, 15 h1s → principle: tells.md (Copy); WCAG 1.3.1 headings → rule: no placeholder or unreviewed copy ships; one h1.
- **Script as display text + text over the face** — marquee and journal copy measured ~2.35:1 over media; red titles on black → principle: script never as UI text (typography.md); WCAG 1.4.3 → rule: keep script inside artwork; text on calm ground.
- **Mobile collisions** → principle: mobile is one column in reading order (reading-paths.md rule 8) → rule: fixed rails need reserved space; test every section at 390 px.

## Transferable rules

- Do: a single hue and a single personal mark can carry an expressive portfolio.
- Do: give a varied scroll a fixed chapter rail.
- Don't: ship lorem ipsum; don't spread text into all four corners; don't set UI text in script.

## Never copy

Logo glyph, portrait, exact layout, copy text. Learn the principle only.

**Open question:** I disagree in part with the verdict — the art direction is strong, but placeholder copy, 3 families, 7 zones and mobile collisions are real craft failures; confidence low.
