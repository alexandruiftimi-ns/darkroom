---
slug: vibecurb
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: saas
packs: [modern, artsy]
techniques: [tilted-showcase, logo-marquee]
url: https://vibecurb.pages.dev/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# VibeCurb — good

**Thesis in one line:** A design-rules add-on for coding agents, sold by flying its own output (tilted landing-page cards) around a plain claim.
**Split:** design good · build mixed · technique good — clean and current; faint text and phone overlaps.

**First frame:** near-white ground; left-aligned three-line claim (x 7–34 %, y 30–46 %) in a medium grotesk; one grey sentence; a black "View on GitHub" pill; on the right, three tilted page cards (a perfume site, a loud 3D studio site, a dark editorial page) drifting in perspective, one passing behind the centred wordmark; a GitHub star count top-right. The eye goes to the perfume card, then back to the claim.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — DM Sans (display/text) · mono (install command) |
| Type scale | largest 48 px · body 16 px · 9 sizes |
| Colour mode / shares | disciplined — near-white ground 74 %, colourless UI; all colour comes from the showcase cards |
| Words (page / heaviest section) | 209 / 27 |
| Text zones, first viewport | desktop 2 · mobile 2 |
| Layout system | left hero + flying cards, a centred statement with floating tag words, install block, agent marquee, three skill cards with sample output, footer |
| Signature motion | showcase cards flying in 3D perspective; tag words drifting; agent-name marquee · libraries: WebGL canvas |
| Page weight | ≥ 1.2 MB (lower bound) |
| Mobile | squeezed — a showcase card slides over the body copy in the first screen |
| Source of values | observed |

## What works & why

- **The product's results are the hero image** (tilted sample pages) → principle: show the output, not an icon of the tool → rule: a tool that makes pages shows pages it made.
- **Colourless UI around colourful samples** → principle: one source of colour (colour.md) → rule: when the samples are loud, the chrome stays white and black.
- **Very short page, 27 words at most per section** → principle: word budget → rule: a developer tool can sell in five short sections.

## What fails & why

- **Body and nav at 40–50 % opacity** (medium; ~2.8:1) → contrast law → rule: translucent grey text fails; use a solid grey that passes.
- **Cards overlap copy on phones** (medium) — a flying card covers the sub-line in the first screen → mobile re-composition → rule: on phones, decorative cards sit above or below the text, never across it.

## Transferable rules

- Do: let tilted samples of the product's output frame a short claim.
- Don't: let moving cards cross live text on small screens.

## Never copy

Logo, sample pages, layout and copy text. Learn the principle only.

**Open question:** the earlier analysis called it bad ("sells a fix for the AI look and looks like it"); the owner marked it good: "it sells a fix but the web itself is ok". Following the owner. Confidence low.
