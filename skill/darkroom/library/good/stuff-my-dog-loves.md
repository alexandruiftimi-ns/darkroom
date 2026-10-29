---
slug: stuff-my-dog-loves
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: experimental
packs: [family, artsy]
techniques: [sprite-clips]
url: https://stuffmydogloves.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Stuff My Dog Loves — good

**Thesis in one line:** A toy site that does one thing: a single card with a tiny pixel dog loop, a caption and "more".

**Split:** design good · build good · technique good — one card, one loop, 0.25 MB; right for a toy.

**First frame:** warm cream page with faint hearts; a centred two-line title between two pixel icons; one large rounded white card with a pink outline (31–69 % x, 19–64 % y) holding a pixel dog in a ghost sheet, "DOG APPROVED", the caption "Being spooky", a share icon and a like count; a yellow "back" and a pink "more" button under it. Eye: dog → caption → more.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — system UI (plus a pixel face on the buttons) |
| Type scale | largest 28 px · 6 sizes |
| Colour mode / shares | disciplined — cream ground 65 % · pink and butter-yellow accents |
| Words (page / heaviest section) | 28 / 16 |
| Text zones, first viewport | desktop 4 · mobile 4 |
| Layout system | one centred card; nothing to scroll |
| Signature motion | a looping pixel-art clip per "moment" · libraries: none |
| Page weight | ≥ 251 KB |
| Mobile | re-composed — the card fills the width, buttons stay under it |
| Source of values | observed |

## What works & why

- **One card, one loop, one next button** → one job per screen → rule: a novelty site should have exactly one interaction and make it instant.
- **The art is the content, not decoration** → sprite-clips (INDEX) → rule: short image loops work when each loop is the thing you came for.
- **0.25 MB** → page weight budget → rule: pixel art and tiny loops keep a playful page instant on any phone.
- **Two coloured buttons with clear verbs (back, more)** → one primary action → rule: the colour difference tells you which is forward.

## What fails & why

- **Faint grey caption and footer text** (medium) → contrast → rule: small text still needs 4.5:1.

## Transferable rules

- Do: for a toy, cut everything except the one moment and the "next".
- Don't: use this mood for a business page.

## Never copy

Characters, artwork, name, exact layout, copy text. Learn the principle only.

**Open question:** owner's note: "good for a toy style website". A toy-mood reference, not a landing-page model; compare bad/anotequest, where the same pixel mood decorates a work tool.
