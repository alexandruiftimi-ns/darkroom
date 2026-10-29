---
slug: forty-news
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: editorial
packs: [editorial-news]
techniques: [document-format]
url: https://forty.news/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Forty News — bad

**Thesis in one line:** A clever idea (today's news from forty years ago) set as a plain blog in newspaper costume, with no design idea beyond the masthead.

**Split:** design bad · build mixed · technique mixed — great concept; stock serif-blog look; overlays interrupt reading.

**First frame:** off-white page; a small tagline top-left, Subscribe top-right; a centred Playfair masthead (39–61 % x, 9–16 % y) with two explanatory lines; a rule; a date; a two-line serif headline; a photo; a drop-cap justified paragraph. Eye: masthead → headline → photo.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Playfair Display (masthead, headlines) · Inter (text) |
| Type scale | largest 60 px · 6 sizes |
| Colour mode / shares | mono — off-white ground 94 % · ink only |
| Words (page / heaviest section) | 10,731 / 10,731 (one endless feed) |
| Text zones, first viewport | desktop 2 · mobile 2 |
| Layout system | centred single column on top, then a three-column card feed of stories |
| Signature motion | none |
| Page weight | ≥ 300 KB (lower bound) |
| Mobile | re-composed — one column, but a "Just in" popup and a newsletter box interrupt the feed |
| Source of values | observed |

## What works & why

- **The masthead says the whole idea in two lines** → who/what in the first frame → rule: an unusual concept needs one plain explanatory line under the name.

## What fails & why

- **A stock pairing (Playfair + Inter) standing in for a newspaper** (medium) → tells.md stock "designed" pairings; document-format done half-way → rule: if you borrow a document, borrow its grid, rules and column widths too, not just a serif.
- **Justified narrow columns with rivers, 10,000+ words on one page** (medium) → typography.md; page length → rule: ragged-right text at a readable measure; paginate by day.
- **A "Just in" popup and a newsletter panel over the reading flow on phones** (medium) → tells.md stacked overlays → rule: one overlay at a time, never over the text being read.

## Transferable rules

- Do: let a strong concept carry a quiet page, but give it a real typographic system.
- Don't: interrupt reading with popups.

## Never copy

Name, masthead, photographs, exact layout, copy text. Learn the principle only.

**Open question:** the earlier analysis called it good (concept-led, light); the owner marks it bad. Followed the owner: the idea is strong, the design is not polished or modern enough. Confidence low.
