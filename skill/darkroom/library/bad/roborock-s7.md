---
slug: roborock-s7
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: e-commerce
packs: [modern, catalog]
techniques: [scroll-jacking]
url: https://de.roborock.com/pages/roborock-s7-max-ultra
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Roborock (S7 MaxV Ultra link, German shop) — bad

**Thesis in one line:** a robot-vacuum shop whose first frame is three overlays deep before you see a single product claim.
**Split:** design mixed · build bad · technique bad — clean product photos buried under popups; scroll forced through animations.

**First frame:** a region bar across the top, a cookie panel bottom-left and a centred newsletter modal (lifestyle photo + "subscribe for 5 %") over a grey-dimmed hero whose title "Saros 2…" is cut off behind it. On the phone the modal and the cookie bar cover the whole screen at every scroll depth.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 family rendered as 4 named cuts (Proxima Nova) |
| Type scale | largest 48 px · smallest 11 px · 12 sizes |
| Colour mode / shares | disciplined — ground 55 % · accent < 1 % (brand red on the Shop button) |
| Words (page / heaviest section) | 786 / 191 |
| Text zones, first viewport | desktop 5 · mobile 3 |
| Layout system | shop home: carousel hero, product rows, value props, reviews, newsletter |
| Signature motion | forced scroll animations on the product page (Reddit) · libraries: none detected, 1 canvas |
| Page weight | ≥ 6.7 MB |
| Mobile | broken — overlays fill the screen |
| Source of values | observed |

## What fails & why

- **Stacked overlays on the first frame** (critical) → tells.md, stacked overlays → rule: one overlay at a time, never over the opening screen; newsletter offers wait for intent.
- **The product link no longer opens the product** (high) → the promise in the link must be what loads → rule: keep campaign URLs alive or redirect to the closest product page.
- **Scroll hijacked to force animations** (high, per the thread: "terrible website, even worse on mobile") → scroll-jacking (INDEX, avoid) → rule: animations follow native scroll, never set its speed.
- **Five text zones in the first viewport and 150–190-word blocks** (medium) → reading-zone budget → rule: ≤ 3 zones; long copy goes to spec tables.
- **"!!!" urgency copy** (medium) → honest urgency only → rule: only real, dated deadlines.

## Transferable rules

- Do: let the product photo and one claim own the first screen.
- Don't: stack region, cookie and newsletter layers over it.

## Never copy

Logo, product photography, layout and copy text. Learn the principle only.

**Open question:** the page the thread criticised now redirects to the shop home; the verdict holds for both.
