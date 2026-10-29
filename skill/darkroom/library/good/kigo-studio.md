---
slug: kigo-studio
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: agency
packs: [artsy, bold]
techniques: [word-swap]
url: https://kigo.studio/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Kigo Studio — good

**Thesis in one line:** A web and app studio told through Japanese ink painting: a cherry branch, misty mountains and a red kanji that changes with the promise.
**Split:** design good · build mixed · technique good — a polished illustrated hero; type count, word volume and speed lag.

**First frame:** warm white paper; a detailed ink cherry branch fills the right two-thirds; grey ink mountains behind; left (x 1–35 %, y 30–55 %) a red brush kanji above a heavy black caps headline whose last word swaps ("cool", "profitable") in a pink italic. The eye goes kanji → headline → branch.

## Signals

| Signal | Value |
|---|---|
| Font families | 6+ — Poppins (headline/UI) · Kanit · a brush face · two display faces · a haiku face |
| Type scale | largest 207 px · body 16 px · 18 sizes |
| Colour mode / shares | disciplined — paper ground 95 % · one red plus pink blossoms |
| Words (page / heaviest section) | 1,203 / 1,194 |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | left copy column over a full-bleed illustrated scene; vertical kanji used as decoration |
| Signature motion | a headline word and its kanji swap together; falling petals; layered ink scene · libraries: WebGL canvas · video 1 |
| Page weight | ≥ 2.5 MB (lower bound) |
| Mobile | re-composed — branch moves to the top, kanji and headline below |
| Source of values | observed (first screen only) |

## What works & why

- **Illustration quality is high and consistent** (ink linework, real blossom detail) → principle: a single committed art world (borrowed-art-world) → rule: one illustration style, drawn to one standard, across the page.
- **The swapping word is paired with a swapping kanji** → principle: motion with meaning (motion.md) → rule: if a headline word cycles, let one visual element change with it.
- **One red on paper** → principle: one accent with a job (colour.md) → rule: a single saturated hue on a neutral ground reads premium.

## What fails & why

- **Six type families** (medium) — Poppins caps beside brush, display, italic and haiku faces → typography.md three-family budget → rule: one display, one text, one utility.
- **About 1,200 words in one section** (medium) → word budget → rule: split long copy into chapters with their own headings.
- **Reported freezes in one browser and a cursor circle that hides text** (medium, from the thread; not verified here) → performance and cursor laws → rule: never let a custom cursor cover reading text.

## Transferable rules

- Do: pair a cycling headline word with a matching visual change.
- Don't: let a themed page pile up theme fonts.

## Never copy

Logo, illustrations, kanji artwork, layout and copy text. Learn the principle only.

**Open question:** the earlier analysis called it bad ("costume", six fonts, heavy copy); the owner marked it good. Following the owner: the hero is polished; only the first screen was reviewed, so confidence is low.
