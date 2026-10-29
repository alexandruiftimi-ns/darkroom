---
slug: flowspark-zoom
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: experimental
packs: [modern]
techniques: []
url: https://www.flowspark.co/animations/image-background-zoom
evidence: published verdict only; design not reviewed
added: 2026-10-29
updated: 2026-10-29
---

# Flowspark — background zoom demo — bad

**Thesis in one line:** A zoom-on-scroll background component demo that no longer exists; the link now leads to an unstyled "Page not Found".
**Split:** design bad · build bad · technique mixed — the page is gone; the zoom idea itself was not seen.

**First frame:** not reviewed as a design: the address now shows a broken not-found page with icons blown up to full screen and no styling.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — Instrument Sans (not-found page) |
| Words (page / heaviest section) | 155 / 155 |
| Signature motion | not seen · libraries: gsap, scrollTrigger |
| Page weight | ≥ 327 KB (lower bound) |
| Source of values | observed (not-found page only) |

## What fails & why

- **A shared demo link that now 404s with unstyled icons** (high) → function law (no dead links) → rule: when a component page moves, redirect it; a not-found page must still load its styles.

## Transferable rules

- Don't: cite a component demo as a reference without checking it still opens.

## Never copy

Logo, layout and copy text. Learn the principle only.

**Open question:** the Reddit thread discussed a background image that zooms with scroll and asked about reduced motion; that effect was not reviewed. The earlier analysis suggested dropping the entry; the owner kept it as bad.
