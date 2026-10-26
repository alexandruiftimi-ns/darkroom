---
slug: hacker-news
verdict: bad
verdict_source: colorlib
confidence: medium
category: editorial
packs: [editorial-news]
url: https://news.ycombinator.com/
evidence: live study (study.json + 10 shots)
added: 2026-10-25
updated: 2026-10-25
---

# Hacker News — bad

**Thesis in one line:** A 6 KB ranked link feed that serves insiders perfectly and tells newcomers nothing. Colorlib: "has no navigation or header to tell you more information".

**First frame:** orange header bar top (100 %, 2 %) with logo box, name and pipe-separated nav; the eye drops to row 1 and reads down a beige column of 25 identical rows (title 13 px, meta 9 px grey). No image, no h1.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — Verdana |
| Type scale | 13 px titles · 11 px domains · 9 px meta · 3 sizes |
| Colour mode / shares | monochrome + one accent — beige ground 75 %; orange (30°) header/rule only; grey meta |
| Words (page / heaviest section) | 669 / 669 (one list) |
| Text zones, first viewport | desktop 2 (header nav, list) · mobile 1 |
| Layout system | centred table ~85 % wide; one repeated two-line row; footer links + search at the end |
| Signature motion | none · libraries: none detected |
| Page weight | 6 KB |
| Mobile | re-composed — type scales up, rows reflow to one column; nav wraps to 3 lines |
| Source of values | measured (study.json) |

## What works & why

- **One row template, repeated** — rank, arrow, title, domain on line 1; points/author/time/comments on line 2; the title is always the darkest, largest element → principle: reading-paths.md rule 4 (related items in one column, labels with them) → rule: a feed is one strict row with title dominant and metadata subordinate.
- **One accent, used once, on a 6 KB page** — orange header bar and rule frame a neutral list; colour never competes with content, and the page reflows on phones → principle: color.md monochrome mode (one functional accent); WCAG 1.4.10 → rule: brand colour can live in a single bar; text feeds should be this light.

## What fails & why

- **No statement of what the site is** — header shows only name and "new | past | comments | ask…"; no h1, no about line → principle: attention.md (first frame states the offer) → rule: one line for first-time visitors costs nothing to regulars.
- **9 px grey meta line, 3.54:1 on beige** — points, author, age and comment count are hard to read and fail contrast → principle: WCAG 1.4.3; typography.md (body ≥ 16 px; ratio ≥ 1.25) → rule: secondary text ≥ 12 px and ≥ 4.5:1, tinted from the ground.
- **Tiny, crowded controls** — upvote arrows ~14×10 px, "hide" and comments links packed between pipes; 182 targets under 24 px; 31 links without accessible names → principle: WCAG 2.5.8 target size, 4.1.2 name → rule: controls get 24 px minimum and a label.
- **Search only at the very bottom, unlabelled** → principle: reading-paths.md rule 5 (tools belong in chrome) → rule: search sits in the header bar.

## Transferable rules

- Do: one strict row template for any ranked list; keep the page tiny.
- Do: confine the brand colour to one bar.
- Don't: shrink metadata below 12 px or below 4.5:1 to make the title look bigger.
- **The one change that would fix most of it:** raise meta to 12 px at 4.5:1 and enlarge the vote targets.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** deliberate insider utility with excellent audience fit; the structure is a good feed pattern, the legibility and orientation are the faults. Recorded bad per the colorlib rule.
