---
slug: studio-jamoora
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: agency
packs: [modern, artsy]
techniques: [webgl-scene, hero-object-metaphor]
url: https://studiojamoora.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Studio Jamoora — good

**Thesis in one line:** A brand studio whose whole pitch is one object: a spinning top on drafting paper under "It begins with a spin".
**Split:** design good · build mixed · technique good — one object carries the idea; scroll control and media loading fight touch.

**First frame:** pale drafting-grid ground; a pill nav centred at the top; a two-line red display serif centred (y 25–40 %); a 3D spinning top (wireframe red/black, one lime dot) centre (y 50–80 %) with a "hold to shift rhythm" hint beside it; a one-line promise bottom-left and a dark "View Projects" pill bottom-centre. The eye: headline → top → button.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Blazeface (display serif), Neue Haas Grotesk Display and Text (UI and body) |
| Type scale | largest 80 px · body 16 px · 15 sizes |
| Colour mode / shares | disciplined — ground 83 % · saturated 3 % · one hue family (0°, tomato red) plus black and a lime spark |
| Words (page / heaviest section) | 479 / 176 |
| Text zones, first viewport | desktop 4 · mobile 2 |
| Layout system | centred hero axis; then card grid of projects, numbered process chapters on black, contact close |
| Signature motion | a live 3D top you hold to change its spin · libraries: gsap, scrollTrigger, three, lenis |
| Page weight | ≥ 3.1 MB (lower bound) |
| Mobile | re-composed — headline over the top, cards stack, process on black |
| Source of values | observed |

## What works & why

- **One object as the brand metaphor** (a top: balance, rhythm, motion) → focal point / one idea (references/craft) → rule: let one object from the brand story be the hero and the interaction.
- **Display serif in one red, grotesk for everything else** → typography.md role split → rule: one expressive face for headlines only, in the single accent colour.
- **Drafting-grid paper ground** → material (looks.md) → rule: a construction grid says "we design systems" without a word.
- **Interaction is invited, not required** ("hold to shift") → no gate → rule: the toy sits beside the content; scrolling never waits for it.
- **Numbered process chapters on black** break the light page once → contrast of section grounds → rule: one dark band for the "how we work" story.

## What fails & why

- **Scroll speed taken over on desktop; heavy smoothing on touch** (medium) → scroll-jacking (tells.md) → rule: native scroll on touch, light smoothing at most on desktop.
- **Several case-study videos show no frame after load** (medium) → video-hero watch-for → rule: every video needs a poster image.
- **Grey body text on black in the process section** (medium) → contrast → rule: body on dark ≥ 4.5:1.

## Transferable rules

- Do: pick one object that embodies the brand and make it the only 3D on the page.
- Don't: take over scroll speed; don't ship cards whose video has no poster.

## Never copy

The top, logo, illustration, layout and copy. Learn the principle only.

**Open question:** the earlier analysis called it bad (scroll hijack, "everything moves" per the thread); the maintainer marked it good. Followed the maintainer; desktop past the first screen not reviewed, so confidence is low.
