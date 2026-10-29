---
slug: notiqs
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: high
category: saas
packs: [modern]
techniques: []
url: https://notiqs.app/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Notiqs (music-theory app) — bad

**Thesis in one line:** A thoughtful music-theory product dressed in the default AI night-gradient look, so it reads like a thousand other app pages.
**Split:** design bad · build mixed · technique bad — the stock violet-glow dark kit; nothing from music in the look.

**First frame:** near-black ground with a violet glow bottom-right; an icon sidebar on the left; a mono caps eyebrow, then a heavy two-line sans headline left (x 14–55 %, y 18–33 %), a three-line grey paragraph, a violet primary and a dark secondary button; a glass card on the right showing a lesson path with mastered/current/next steps. The eye: headline → path card.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Sora (display and text), system mono (eyebrows) |
| Type scale | largest 70 px · body 16 px · 12 sizes |
| Colour mode / shares | disciplined — near-black ground 50 % plus violet glows · violet accent (270°) ~1.4 % |
| Words (page / heaviest section) | 410 / 79 |
| Text zones, first viewport | desktop 2 · mobile 2 |
| Layout system | headline left, glass card right, repeated per section; rounded dark cards for every block |
| Signature motion | slow ambient glow pulses that never stop · libraries: none detected |
| Page weight | ≥ 502 KB (lower bound) |
| Mobile | re-composed — single column, card follows the buttons |
| Source of values | observed |

## What works & why

- **The hero card shows the product's real idea** (an ordered skill path with progress states) → show the product (INDEX, product-in-scene) → rule: the hero's second element is a real piece of the product, not a mock dashboard.
- **Plain, specific copy** ("learn the theory, then play it") → headline names the offer → rule: say the outcome in the user's words.

## What fails & why

- **Violet-on-black glow kit: violet buttons, glass cards, mono eyebrows, heavy geometric sans** (high) → generated-design tells (tells.md, Colour & surface) → rule: pick ground, accent and type from the subject (paper, staves, wood, brass for music) before reaching for a dark kit.
- **Every section is the same headline-left, rounded-card-right block** (medium) → every block the same card (tells.md) → rule: vary section anatomy so the important part looks important.
- **Grey body text on near-black fails contrast** (medium) → contrast → rule: body ≥ 4.5:1.
- **Glows pulse forever, also under reduced motion** (medium) → meaningless loops (tells.md, Motion) → rule: ambient motion stops, and stops for reduced-motion users.

## Transferable rules

- Do: let the subject choose the palette; show the product's real mechanism in the hero.
- Don't: default to dark + violet glow + glass cards for any app.

## Never copy

Logo, UI, layout and copy. Learn the principle only.
