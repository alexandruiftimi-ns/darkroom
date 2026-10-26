---
slug: twks
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: high
category: agency
packs: [modern, bold]
url: https://twks.ch/en
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# TWKS — good

**Thesis in one line:** a Swiss agency that proves "Swiss" by restraint — one grotesk, black and white, and the clients' colourful work as the only colour.

**First frame:** full-bleed showreel (black on first paint); a single nav line at ~50 % y spans the width — wordmark, four links, "swiss creative agency", contact. As the reel plays the eye goes reel → nav line; on scroll the line rises to the top and a 53 px statement with an indented first line takes over.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — GT Standard for everything (wordmark, nav, statement, captions) |
| Type scale | 53 px statement · 20 px nav/body/case titles · 16 px small · 3 sizes |
| Colour mode / shares | mono — ground 99.6 % white/black, saturated 0 % in UI; colour only from case imagery |
| Words (page / heaviest section) | 215 / 63 (What we do) |
| Text zones, first viewport | desktop 2 · mobile 1 · travel 0.52 |
| Layout system | 12-col grid, 10 px gutters; copy anchors on fixed columns (≈17 % and ≈66 % x) everywhere; cases staggered 2-up (left low, right high); 4-up articles |
| Signature motion | mid-screen nav line that becomes the sticky header; mix-blend nav over images; footer particle cloud of letters · libraries: gsap + ScrollTrigger + lenis |
| Page weight | 4,505 KB |
| Mobile | re-composed — wordmark/contact/burger, single column, statement shrinks; blend nav sometimes collides with text |
| Source of values | observed |

## What works & why

- **One family, three sizes** — hierarchy from size and position alone → principle: type budget (typography.md: fewer families, 5–6 sizes max) → rule: an agency that sells taste can prove it by withholding fonts; let the grid do the work.
- **UI is pure black/white; colour lives only in case images** → principle: separate UI and media palettes (color.md) → rule: when the portfolio is colourful, the frame must be colourless.
- **Fixed column anchors** — nav links, "What we do", case titles all start on the same two verticals → principle: copy anchor (reading-paths.md rule 1) → rule: put every label on one of two columns and never improvise a third.
- **Staggered 2-up case grid, title + one-line grey subtitle under each** → principle: related items in one column with labels (rule 4), cadence (attention.md) → rule: a stagger gives rhythm without changing card format.
- **Footer as a single 4-column directory over a letter-particle cloud** → principle: one focal point; chrome at the end → rule: give the footer one generative image, not decoration everywhere.

## What fails & why

- **Black first paint before the reel loads** — the hero is an empty screen with a nav line → principle: first frame must sell (attention.md) → rule: ship a poster frame for every hero video.
- **Mix-blend nav overlapping body text on mobile** ("contact" over the statement) → principle: chrome must not cover content (reading-paths.md rule 5) → rule: sticky chrome needs a solid ground once it crosses text.
- **Audit: 11 nameless links, no reduced-motion rule** → principle: accessibility (tells.md "Function") → rule: icon arrows and image links need names; motion needs a reduced path.

## Transferable rules

- Do: one family, three sizes, two column anchors — and keep colour for the work.
- Do: a mid-viewport nav line that rises to sticky is a cheap, memorable hero.
- Don't: ship a video hero with no poster frame.

## Never copy

Logo, case imagery, particle footer, exact layout, copy text. Learn the principle only.
