---
slug: blinkee
verdict: bad
verdict_source: colorlib
confidence: medium
category: e-commerce
packs: [catalog, bold]
url: https://blinkee.com/
evidence: live study (study.json + 10 shots)
added: 2026-10-25
updated: 2026-10-25
---

# Blinkee — bad

**Thesis in one line:** A light-up party shop that shows its products well but wraps them in five competing colour systems. Colorlib: "mobile user experience is terrible", branding and colours lack a pattern.

**First frame:** rainbow neon wordmark top-left (~15 %, 5 %) competes with the glowing purple cart top-right; the eye then reads "Be Seen on Halloween" (cyan + orange, ~20 %, 30 %) and jumps right to a 6-product glass panel (~70 %, 40 %); an orange shipping band cuts across at 70 %.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 CSS (Inter) + rainbow neon logo image + glitter/script banner images in footer |
| Type scale | 72 px largest · 15–16 px body · 11 px meta · 16 distinct sizes |
| Colour mode / shares | expressive by accident — ground 37.8 %; saturated 65.2 % of non-ground UI; violet 270° dominant + orange + teal/green + cyan |
| Words (page / heaviest section) | 489 / 89 (hero, budget 30) |
| Text zones, first viewport | desktop 4 · mobile 2 |
| Layout system | contained 1320 px grid; hero split copy-left / product-panel-right; then banner, card rows, blog grid, dark footer |
| Signature motion | none observed · libraries: none detected |
| Page weight | 796 KB |
| Mobile | re-composed into one column, but the sticky header holds ~230 of 844 px and the nav strip is clipped mid-word |
| Source of values | measured (study.json) |

## What works & why

- **Six real product photos with plain labels in the hero** — the shopper sees the merchandise and the pack sizes in the first second → principle: attention.md (replace adjectives with a concrete image) → rule: in a catalog hero, show the products and their names, not a mood shot.

## What fails & why

- **Five accent systems** — rainbow logo, purple glowing cart and pill buttons, orange CTA and band, green→teal gradient banner, four differently-coloured card stripes; 65 % of UI pixels saturated → principle: color.md (one accent hue in UI; saturated colour lives in imagery) → rule: let the glowing products be the colour; chrome takes one accent.
- **16 type sizes plus baked glitter text** — Inter at 11–72 px, caps headings, and glitter/script images in the footer → principle: typography.md (5–6 sizes; images of text count as fonts) → rule: collapse to six steps and keep the novelty lettering inside product imagery.
- **"More reasons" row: four identical cards, icon square on top, coloured top stripe** — and three near-empty "poem" cards beside it → principle: tells.md (accent stripe on cards; identical feature cards) → rule: one proof fact in a sentence beats a row of interchangeable cards.
- **Hero carries 4 zones and 89 words** — eyebrow + headline + paragraph, three chip links, two CTAs, product panel → principle: reading-paths.md rule 2 (≤ 3 zones); attention.md hero ≤ 30 words → rule: claim + one CTA on the left, products on the right; drop the chips.
- **Mobile sticky header ~27 % of the screen** — logo, search, phone, cart and a clipped nav strip ("Moo…") stay fixed while content scrolls in the remaining band → principle: WCAG 2.4.11 focus not obscured; reading-paths.md rule 8 → rule: a phone header is ≤ 64 px; search and nav collapse behind icons.
- **Trackers before consent; 9 controls without accessible names** (GTM, DoubleClick) → principle: compliance.md (ePrivacy/GDPR consent; WCAG 4.1.2) → rule: consent-gate every third-party script; name every icon button.

## Transferable rules

- Do: put real product shots with names in the first frame of a shop.
- Don't: give every section its own accent, gradient or glow.
- Don't: pin a multi-row header on phones.
- **The one change that would fix most of it:** a single violet accent for all controls and a 64 px mobile header.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** the live site has been rebuilt since colorlib's listing; mobile now reflows into one column and is far better than "terrible". The colour and header faults remain, so bad stands, at medium confidence.
