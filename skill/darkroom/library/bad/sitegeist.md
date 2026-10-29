---
slug: sitegeist
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: experimental
packs: [editorial-news, modern]
techniques: []
url: https://sitegeist.kian.im/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Sitegeist (AI website benchmark) — bad

**Thesis in one line:** "Can AI create without repeating itself?" — a serif question over a wall of 100 AI-made homepages per model.
**Split:** design mixed · build good · technique bad — tidy frame, but the wall shows each model's house style.

**First frame:** cream ground; a huge centred Garamond question (≈ 98 px) at 20–30 % y; a two-line sans subline; two pills (repo, author); then a dark rounded panel "The benchmark." with model tabs and the first row of three browser-framed site previews.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — EB Garamond (display) · Inter (text) · monospace (labels) |
| Type scale | largest 98 px · smallest 6 px · 9 sizes |
| Colour mode / shares | disciplined frame — cream then near-black ground 44 %; the previews bring all the colour |
| Words (page / heaviest section) | 125 / 101 |
| Text zones, first viewport | desktop 4 · mobile 3 |
| Layout system | centred question, then an endless three-column grid of framed previews with index numbers and category labels |
| Signature motion | none beyond tab switching · libraries: none detected |
| Page weight | ≥ 0.6 MB |
| Mobile | re-composed — single column of previews |
| Source of values | observed |

## What fails & why

- **The previews repeat one recipe** — cream or near-black ground, a serif headline with one italic word, tiny spaced caps labels, a circle or orb behind the product (medium) → tells.md, generated-design tells → rule: never default to italic-word serif heroes, orb backdrops and caps micro-labels together.
- **An endless grid with no point of view** (medium) → a page must conclude → rule: a benchmark page should show findings, not only the pile.
- **Faint index numbers and domain labels (≈ 3.7:1)** (medium) → contrast law → rule: labels ≥ 4.5:1.

## Transferable rules

- Do: use this page as a checklist of AI defaults to avoid.
- Don't: ship a hero that could sit in this grid unnoticed.

## Never copy

Previews, layout and copy text. Learn the principle only.

**Open question:** the frame itself is tidy and the earlier analysis was unsure; the owner marks it bad. Value as evidence for the AI-look rules, not as a page model.
