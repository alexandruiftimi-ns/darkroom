---
slug: integrity-index
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: dashboard
packs: [cyberpunk, trust]
techniques: [logo-marquee]
url: https://www.integrityindex.us/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Integrity Index — bad

**Thesis in one line:** a political-integrity tracker dressed as a neon trading terminal: tickers, glowing cards and grades before any explanation.
**Split:** design bad · build mixed · technique mixed — hex-map idea is good; neon dashboard density buries it.

**First frame:** near-black; a logo and search bar; a green pill nav; a scrolling ticker of politicians' stock trades; four stat cards (one solid neon green); a glowing-bordered carousel of race cards with headshots and letter grades; the pledge headline in a pixel display font only at 80 % y.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Orbitron (headings) · JetBrains Mono (data) · Jersey 25 (pixel display) |
| Type scale | largest 30 px · smallest 10 px · 9 sizes |
| Colour mode / shares | neon on black — ground 55 % · accent 12 % (green ~150°) plus red/blue party colours |
| Words (page / heaviest section) | 1,237 / 563 |
| Text zones, first viewport | desktop 4 · mobile 3 |
| Layout system | dashboard: ticker, stat row, card carousel, hex map, two ranked lists, footer link wall |
| Signature motion | the trade ticker; glowing card borders · libraries: none detected |
| Page weight | ≥ 1 MB |
| Mobile | re-composed — app-style bottom tab bar, stacked cards |
| Source of values | observed |

## What works & why

- **A hex map of states, green by pledges** → one chart that explains the whole idea → rule: when the data has a shape, lead with that shape.

## What fails & why

- **No plain line saying what this is in the first screen** (high) → no who/what in the first frame → rule: one sentence before any number.
- **Neon green glow, Orbitron and a pixel font on a civic subject** (medium) → tone mismatch (generic "tech" palette) → rule: civic data needs calm, trustworthy type, not a game HUD.
- **Hex labels and pledge counts at 1.2–2:1 contrast** (high) → contrast law → rule: labels on coloured tiles ≥ 4.5:1.
- **1,237 words and four dense zones** (medium) → word and zone budgets → rule: a landing explains; the dashboard sits one click deeper.

## Transferable rules

- Do: lead with the one picture of the data.
- Don't: borrow trading-terminal neon for a trust subject.

## Never copy

Logo, data, headshots, layout and copy text. Learn the principle only.

**Open question:** the earlier analysis called it mixed and out of landing scope; the owner marks it bad.
