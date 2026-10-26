---
slug: esr-bespoke
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: medium
category: corporate
packs: [cinematic, modern]
url: https://www.esrbespoke.au/
evidence: live study (study.json + 10 shots)
added: 2026-10-25
updated: 2026-10-25
---

# ESR Bespoke — good

**Thesis in one line:** A collision-repair group sold like a car film — a Porsche in a shadowed street, then factory-grade credentials in a strict two-anchor grid.

**First frame:** full-bleed dark street video; large headline left (x ~15 %, y 50 %); tracked-caps strap right (x ~70 %, y 46 %) beside the car; nav split across columns at the top, UNMUTE bottom-left, OUR STORY bottom-right. Eye goes headline → car → strap.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — grotesk (display and statements) · squarish tracked-caps face (labels, nav, data) |
| Type scale | 92 px display · 14 px caps labels · 5 sizes (14 / 20 / 40 / 62 / 92) |
| Colour mode / shares | mono — black and white section fields, UI saturated 0 %; colour only from photography |
| Words (page / heaviest section) | 327 / 75 (services paragraph) |
| Text zones, first viewport | desktop 6 · mobile 6 · travel 2.45 · corners BL, TL, TR |
| Layout system | statements always at column 1 (x 32 px), labels/meta always at x ~960 px; black/white fields alternate |
| Signature motion | muted hero video with UNMUTE; marques list where the active name turns black beside its image tile · libraries: lenis |
| Page weight | 55,850 KB |
| Mobile | re-composed — logo + CONTACT pill, numbered hairline services list, giant wordmark footer; hero video black in capture |
| Source of values | measured (study.json) |

## What works & why

- **Two fixed anchors** — statements at column 1, labels at x ~960 in hero, marques, services and footer → principle: one copy anchor kept constant (reading-paths.md rule 1) → rule: choose a statement column and a meta column once and never move them.
- **Marques list as a selector** — 12 names in pale grey, the active one black with a matching image tile → principle: one focal point; related items in one column (reading-paths.md rules 4, 7) → rule: a long list of names becomes navigable by highlighting one item and pairing it with one image.
- **Black/white fields, no UI accent** → principle: mono mode; colour-field change as cadence (color.md; attention.md) → rule: in a mono system, alternate the ground per chapter instead of adding an accent.
- **Five sizes, far apart; giant wordmark ending** → principle: 5–6 sizes, ratio ≥ 1.25 (typography.md); one focal point → rule: end on the brand mark at display scale.

## What fails & why

- **Hero has 6 zones in 3 corners** → principle: ≤ 3 zones, corners are chrome (reading-paths.md rules 2, 5) → rule: move the strap under the headline and put OUR STORY / UNMUTE in one quiet bottom row.
- **62- and 75-word paragraphs set at ~40 px** → principle: chapter body ≤ 45 words; display sizes carry ≤ 8 words (attention.md; typography.md) → rule: display-size text is a sentence, not a paragraph.
- **55.9 MB, Vimeo before consent, 17 images without alt** → principle: Core Web Vitals; consent-gate embeds; WCAG 1.1.1 (compliance.md) → rule: poster first, video after consent or interaction, alt on every content image.

## Transferable rules

- Do: two fixed anchors across every section; black/white fields as the only "colour".
- Do: turn a brand list into a highlight-one selector with one image.
- Don't: set paragraphs at display size or spread the hero into four corners.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.
