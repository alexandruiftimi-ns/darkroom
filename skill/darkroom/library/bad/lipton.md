---
slug: lipton
verdict: bad
verdict_source: colorlib
confidence: medium
category: food-drink
packs: [catalog, bold]
url: https://www.lipton.com/us/en/home.html
evidence: live study (study.json + 10 shots)
added: 2026-10-25
updated: 2026-10-25
---

# Lipton (US) — bad

**Thesis in one line:** A global tea brand whose home page never says anything in a headline: a paragraph, a carousel of shadowed caps and a sign-up modal.

**First frame:** desktop — white nav over a hero image that didn't render in the capture; the only text is a 41-word paragraph at ~70 % x / 85 % y with SHOP NOW cut off by the fold. Mobile — a packshot collage with no text at all. The eye finds no claim.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — Arpona (display caps, body, nav) |
| Type scale | 100 px largest · body 18–22 px · 10 distinct sizes |
| Colour mode / shares | disciplined — ground 85 % (white/warm grey) · yellow brand bar + black pill CTAs · UI hue 60° only |
| Words (page / heaviest section) | 736 / 598 (product carousel blurb) |
| Text zones, first viewport | desktop 2 · mobile 1 · travel 0.35 |
| Layout system | centred logo nav; hero copy pinned bottom-right; 3-up recipe carousel; image-left/copy-right product carousel |
| Signature motion | carousels · libraries: none detected |
| Page weight | 209 KB at capture (images largely not loaded) |
| Mobile | squeezed — one column, but recipe tiles become blank white bands with floating white titles |
| Source of values | measured (study.json); first-frame reading from shots |

## What works & why

- **Single family, single brand hue** — Arpona everywhere, yellow as the only UI colour → principle: 2-family budget, one accent (typography.md, color.md) → rule: a strong brand colour can carry the whole chrome when nothing else competes with it.

## What fails & why

- **No headline in the hero** — first text is a 41-word paragraph ("Find your sweet spot!…") placed bottom-right → principle: headline ≤ 8 words that states the offer, hero body ≤ 30 (attention.md); copy anchor (reading-paths.md rule 1) → rule: the hero opens with one short claim, then ≤ 30 words, then the CTA directly under it, all above the fold.
- **White shadowed caps titles over recipe photos** — when the photos lag (as in capture) they are white on white; audit flags 2.19:1 on section text → principle: large text ≥ 3:1, separate UI from media palette (color.md) → rule: text over imagery needs its own scrim or ground so it survives a missing image.
- **"Join our tea club" modal** covers the lower half of the viewport at every scroll point from 25 % onward → principle: one focal point per viewport (reading-paths.md rule 7) → rule: no interstitial on first visit scroll; offer sign-up inline at the end.
- **598-word product blurb + 41-word hero** → principle: word budgets, 20 % read rate (attention.md) → rule: product cards carry a name, one line and a price/CTA; brewing instructions live on the product page.
- **Weak footer and unnamed controls** — footer links 1.84:1, 7 links/buttons without accessible name, Clarity trackers before consent → principle: WCAG 1.4.3, 4.1.2; consent-gate third parties → rule: contrast and names are checked on chrome too, and analytics wait for consent.
- **Colorlib's reason** — "poor-quality product and stock images" → principle: tells.md "real pictures" over generic imagery → rule: a food brand's photography is the product; shoot it, don't stock it.

## Transferable rules

- Do: headline → ≤ 30 words → CTA as one zone on the copy anchor.
- Do: give text over photos a guaranteed ground.
- Don't: open a modal while the visitor is still reading the home page.
- **The one change that would fix most of it:** a 5-word headline over a scrimmed hero packshot, with SHOP NOW directly beneath, and the modal removed.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** desktop hero and recipe images did not load in the capture (lazy-load), so the first-frame judgement is partly about a failure state; confidence medium.
