---
slug: palettt
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: saas
packs: [modern, trust]
techniques: [logo-marquee]
url: https://palettt.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Palettt — good

**Thesis in one line:** A colour and design-system tool sold as a calm, neutral developer product: one long claim, a ring of platform icons, a feature ribbon.
**Split:** design good · build mixed · technique good — tidy, clear SaaS; contrast and copy volume slip lower down.

**First frame:** warm off-white ground; a pill label then a bold three-line black headline left (x 10–57 %, y 22–38 %); one sentence; a black and a white button; on the right a loose ring of grey platform icons around the colourful logo; a sliding row of feature pills under the hero. The eye goes headline → buttons → the coloured logo in the ring.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Geist Sans (display/text) · mono (code and terminal) |
| Type scale | largest 48 px · body 16 px · 11 sizes |
| Colour mode / shares | disciplined — off-white ground 90 % · saturated 0.5 % · orange only on "Go Pro" |
| Words (page / heaviest section) | 906 / 148 |
| Text zones, first viewport | desktop 3 · mobile 1 |
| Layout system | left hero + icon ring, tool cards, a numbered CLI walkthrough beside a dark terminal, comparison, pricing, blog, contact form, black footer |
| Signature motion | the feature-pill ribbon slides; icons pulse gently · libraries: none detected |
| Page weight | ≥ 681 KB (lower bound) |
| Mobile | re-composed — icon ring above the headline, buttons full width |
| Source of values | observed |

## What works & why

- **Neutral chrome for a colour tool** — the only colour is the logo and the user's palettes → principle: the content is the palette (colour.md) → rule: tools about colour keep the UI grey so the user's colours read true.
- **Feature ribbon instead of a feature grid** — exports, plugins and CLI named in one sliding line → principle: one line of scannable proof (logo-marquee) → rule: a pill ribbon can replace three feature cards.
- **A real terminal next to numbered steps** → principle: show the product working (product-in-scene) → rule: for developer tools, show the command and its output.

## What fails & why

- **Faint grey copy across the page** (medium) — many paragraphs at ~4.3:1 and "Coming Soon…" at 2:1 → contrast law → rule: body grey must clear 4.5:1 on an off-white ground.
- **Two h1s and 100–150-word sections** (medium) → semantics and word budget → rule: one h1; trim each section to its one point.

## Transferable rules

- Do: keep interface colour neutral when the product is about colour.
- Don't: drop body grey below 4.5:1 for a softer look.

## Never copy

Logo, icons, layout and copy text. Learn the principle only.

**Open question:** the earlier analysis and Reddit called it corporate and soulless (bad-leaning mixed); the owner marked it good. Following the owner: template-like is not a minus. Confidence low.
