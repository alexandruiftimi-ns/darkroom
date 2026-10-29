---
slug: yaven
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: saas
packs: [modern, artsy]
techniques: [wordmark-bookend]
url: https://www.yaven.us/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Yaven — bad

**Thesis in one line:** An AI product for agencies dressed in the default AI-startup kit: centred claim, lavender pill button, stock doodle crowd and gradient glass cards.

**Split:** design mixed · build bad · technique mixed — calm spacing; generic kit, heavy illustration lags phones.

**First frame:** near-white page; a centred two-line claim in a soft grotesk at about 90 px, a two-line grey sub, a lavender pill "Get started"; a crowd of black line-drawn people along the bottom edge, gap in the middle. Small logo left, three links right.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Bricolage Grotesque (display) · Satoshi (text) |
| Type scale | largest 446 px · body 16 px · 22 sizes |
| Colour mode / shares | disciplined — ground 95.5 % · lavender (hue 270°) and a blue-pink gradient as the only colour |
| Words (page / heaviest section) | 650 / 304 |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | centred hero → gradient glass cards → split columns → FAQ → black topographic footer with a giant white wordmark |
| Signature motion | card stack on scroll, smooth scroll · libraries: lenis |
| Page weight | ≥ 965 KB, plus one illustration Reddit measured at 7.5 MB |
| Mobile | re-composed — claim left-aligned, crowd kept at the bottom |
| Source of values | observed |

## What works & why

- **Giant wordmark on a black topographic footer** — a strong close after a quiet page → wordmark-bookend → rule: a single dark closing band gives a light page an ending.

## What fails & why

- **Default AI-startup hero** (medium) — centred claim + sub + lavender pill + nothing of the product → tells: centred hero, lavender accent, headline that fits any product → rule: show the product doing one task in the first frame.
- **Stock doodle crowd** (medium) — a widely used free illustration set stands in for the audience; it reads hand-made and borrowed → tells: generic imagery; maintainer taste: not quirky → rule: picture your real users or your real UI, not a stock crowd.
- **Gradient glass cards** (medium) — blue-pink blurred cards hold the feature copy → tells: glass cards, purple-pink gradients → rule: put real interface fragments on a plain ground.
- **Card scroll lags on iPhone** (high, per the thread) — traced to a multi-megabyte vector illustration → asset budget → rule: rasterise heavy SVG art and size it per breakpoint.

## Transferable rules

- Do: keep the calm spacing and the dark wordmark close.
- Don't: assemble the hero from the default AI-startup parts.

## Never copy

Logo, illustrations, exact layout, copy text. Learn the principle only.

**Open question:** the earlier analysis called it mixed, close to good (calm, well spaced); the maintainer marks it bad. Following the maintainer: the generic kit and the lag outweigh the spacing.
