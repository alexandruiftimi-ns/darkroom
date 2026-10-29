---
slug: anotequest
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: saas
packs: [artsy, nature]
techniques: [video-hero]
url: https://anotequest.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# AnoteQuest — bad

**Thesis in one line:** A note-board app hidden behind a pretty pixel-art meadow and a slogan that never says what it is.

**Split:** design bad · build mixed · technique mixed — retro pixel scene; product never shown in the first frame.

**First frame:** a hand-painted pixel landscape (cumulus clouds, a forest line, a flower meadow); a centred wordmark with a small black cat mascot (33–67 % x, 40–47 % y); "From creators, for creators."; a white and a grey button. A red bird flies at top right. Eye: clouds → wordmark → nothing that explains the product.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — system UI |
| Type scale | largest 72 px · 7 sizes |
| Colour mode / shares | expressive — sky blue, meadow green, one yellow word in the logo |
| Words (page / heaviest section) | 295 / 125 |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | centred hero over full-bleed art; product sections below |
| Signature motion | looping pixel-art clips (three autoplay videos) · libraries: none detected |
| Page weight | ≥ 1.5 MB |
| Mobile | re-composed — wordmark and full-width buttons over the same art |
| Source of values | observed |

## What fails & why

- **No who/what in the first frame** (high) → tells.md "no who/what" → rule: the h1 names the product's job ("a board for…"), the slogan can follow.
- **Retro pixel-game mood for a work tool** (medium) → owner's taste: not retro, not hand-made quirky → rule: the art direction should come from the product's use, not from a nostalgic look.
- **White subtitle and grey button on pale clouds** (medium) → contrast; text that needs the media → rule: a scrim or a darker sky band behind the copy.
- **Background clips fail to start on some browsers** (medium) → video-hero watch-for (INDEX) → rule: muted, playsinline and a still poster that already looks finished.

## Transferable rules

- Do: show the product (the board) in the first frame, the mood around it.
- Don't: let a landscape and a slogan stand in for the offer.

## Never copy

Logo, mascot, artwork, exact layout, copy text. Learn the principle only.

**Open question:** the earlier analysis and readers called it good ("creativity rare in the AI slop era"); the owner marks it bad. Followed the owner; confidence low.
