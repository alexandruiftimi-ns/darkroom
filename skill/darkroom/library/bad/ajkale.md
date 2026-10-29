---
slug: ajkale
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: high
category: portfolio
packs: [modern]
techniques: []
url: https://ajkale.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# ajkale (backend engineer portfolio) — bad

**Thesis in one line:** A backend engineer's site in the default dark developer-portfolio kit: slash-route nav, a wall of grey tech words, small grey text everywhere.

**Split:** design bad · build mixed · technique bad — the stereotype layout; text too faint to read.

**First frame:** near-black ground; a mono nav (/about /projects /experience /contact) top-centre; a band of faint repeated tech words (python, kafka, docker…) across the top; under it a small avatar, name, role and four paragraphs of bio in a narrow centred column, two small buttons, three link chips; a handwritten "say hi" arrow in the left margin. No headline; the eye reads the word wall first.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Figtree (text) · Geist Mono (nav, labels) · Caveat (handwritten note) |
| Type scale | small: largest 30 px · body 15 px |
| Colour mode / shares | mono — ground 92.7 % near-black · no accent |
| Words (page / heaviest section) | 576 / 278 |
| Text zones, first viewport | one narrow column, no headline |
| Layout system | single centred column between dashed guide lines; card lists for projects, jobs, skills |
| Signature motion | small entrances and a sound toggle · libraries: none detected |
| Page weight | ≥ 636 KB |
| Mobile | squeezed — the same column, unchanged, with very small type |
| Source of values | observed |

## What fails & why

- **No claim, only a bio** (high) — the first screen is four paragraphs → hierarchy → rule: one line that says what you are best at, then proof.
- **Grey-on-near-black text across the page** (high) — over 100 contrast failures → contrast → rule: body text at 4.5:1 minimum, decorative word walls behind nothing.
- **The tech-word wall as decoration** (medium) — a list of tools as wallpaper → tells (Structure) → rule: show one project, not every keyword.
- **Every block the same small card** (medium) → tells → rule: give the best project a big image.

## Transferable rules

- Don't: open a portfolio with a bio and a tool cloud.
- Don't: use permanent dark mode with mid-grey text.

## Never copy

Layout, avatar, copy. Learn the principle only.
