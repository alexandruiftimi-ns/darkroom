---
slug: splitleaf
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: high
category: saas
packs: [modern, bold]
techniques: [live-product]
url: https://splitleaf.eu/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Splitleaf (local CMS and site builder) — bad

**Thesis in one line:** "The CMS for the AI era, on your device": the default dark SaaS kit, one neon green, an app window under a centred claim.

**Split:** design bad · build mixed · technique mixed — readable and coherent, but nobody chose this look.

**First frame:** near-black ground; a two-line centred claim in a geometric sans (x 13–87 %, y 20–41 %), two lines of subcopy, one neon-green button, a grey price line; below, an app window with a dark editor and a repeated wordmark poster cut off by the fold. The eye goes claim → green button → app.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — DM Sans |
| Type scale | largest 101 px · body 16 px · 21 distinct sizes |
| Colour mode / shares | dark mono + one neon green (150°) — ground 94.2 % · green 21 % of UI pixels |
| Words (page / heaviest section) | 813 / 105 |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | centred hero + screenshot → product videos → one white section → stat block ($0, $129, Unlimited) → green footer band |
| Signature motion | product screen recordings, scroll reveals · libraries: GSAP, ScrollTrigger; 8 videos (some stay paused) |
| Page weight | ≥ 4.2 MB (lower bound) |
| Mobile | re-composed — clean single column, download cards per platform |
| Source of values | observed |

## What works & why

- **The site says it was built with the product** ("This site is a folder") and shows the folder tree → rule: dog-food proof is stronger than a feature list.

## What fails & why

- **Centred claim + subcopy + one button + app screenshot on dark** (high) → tells (Structure, Colour: near-black + single neon) → rule: if your hero could swap logos with ten others, change the composition or the colour, not the copy.
- **Headlines of 9–11 words at display size** (medium) → headline length → rule: eight words or fewer at display size.
- **21 font sizes in one family** (medium) → type scale → rule: five or six steps.
- **Big-number stat block** ($0, $129, Unlimited) (medium) → tells → rule: put prices in a pricing table, not a stat banner.

## Transferable rules

- Do: show the product building its own site.
- Don't: pair near-black with one neon green by default.

## Never copy

Logo, screenshots, copy. Learn the principle only.
