---
slug: astral-logistic
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: high
category: corporate
packs: [trust, modern]
techniques: [wordmark-bookend, logo-marquee]
url: https://astral-logistic.vercel.app/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Astral Logistics — good

**Thesis in one line:** A freight company sold with one real port photograph, a plain promise and a yellow "get a quote" button that never leaves.

**Split:** design good · build mixed · technique mixed — clear structure; white-on-photo contrast, stock motion.

**First frame:** full-bleed aerial photo of a container yard; a two-line white claim centred at about 80 px; bottom-left a three-line explanation with a yellow "Get a Quotation" and a white secondary button; bottom-right a small services card with thumbnails. Stacked white wordmark top-left, the same yellow button top-right.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — Satoshi (everything) |
| Type scale | largest 88 px · body 16 px · 9 sizes |
| Colour mode / shares | disciplined — ground 90.6 % · one safety yellow (hue 60°) for actions · navy and pale blue for sections |
| Words (page / heaviest section) | 517 / 169 |
| Text zones, first viewport | desktop 4 · mobile 2 |
| Layout system | photo hero → value list beside a crane photo → service cards → logo row → testimonials → navy wordmark footer |
| Signature motion | smooth scroll, logo marquee, fade-ins · libraries: lenis |
| Page weight | ≥ 832 KB |
| Mobile | re-composed — claim centred over the photo, both buttons in the first screen, menu as a yellow pill |
| Source of values | observed |

## What works & why

- **One real photograph of the work** — a working port, not a stock handshake → the subject is the image → rule: show the operation itself in the hero.
- **One action colour** — yellow appears only on quote buttons, top and bottom → colour by job → rule: give the main action a colour nothing else uses.
- **Giant wordmark closes the page** — "ASTRAL LOGISTICS" in navy fills the footer → wordmark-bookend → rule: end on the name, large and alone.
- **Light at 832 KB** — the page stays quick while photo-led → asset budget → rule: one big photo, the rest small.

## What fails & why

- **White text over a busy photo** (medium) — small white copy and nav sit over containers and asphalt; many labels fail contrast → copy gets its own ground or scrim → rule: scrim the photo under every white line.
- **Claim hidden until scripts run** (medium) — the h1 fades in and is invisible without scripts → live h1 at rest → rule: animate from visible, never to visible only.

## Transferable rules

- Do: one real photo, one action colour, one name at the end.
- Don't: lay small white copy straight on a photograph.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.
