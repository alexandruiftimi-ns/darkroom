---
slug: zia-restaurant
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: food-drink
packs: [restaurant, luxury]
techniques: [infinite-loop-scroll, scroll-jacking, wordmark-bookend]
url: https://ziarestaurant.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Zia (restaurant, Rome) — bad

**Thesis in one line:** A refined restaurant identity trapped in a scroll that loops forever, so the page has no end, no footer and no place to stop.
**Split:** design mixed · build bad · technique bad — handsome stills; endless loop and pinned consent ruin it.

**First frame:** a terracotta wall with the restaurant's door plaque and a framed painting, full-bleed; a translucent nav bar across the top with menu links and "Prenota" (book) and "Gift card" boxes on the right; no headline. A consent panel covers the bottom-right quarter. The eye goes painting → plaque, then looks for a claim that isn't there.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — a high-contrast display serif (titles, nav), Host Grotesk (body) |
| Type scale | largest 56 px · body 15 px · 5 sizes |
| Colour mode / shares | disciplined — deep green-black ground 97 % · photos carry the colour |
| Words (page / heaviest section) | 93 / short blocks per section |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | small floating photos around a left text column per section (menu, gift card, chef, hours); giant stencil wordmark as the loop point |
| Signature motion | infinite looping scroll: the page wraps back to the top · libraries: gsap, scrollTrigger |
| Page weight | ≥ 3.0 MB (lower bound) |
| Mobile | stacked — text and photos in one column; consent covers the lower half of every screen |
| Source of values | observed |

## What works & why

- **One dark green ground, one serif, real food and room photography** → restraint (references/colour) → rule: a restaurant can look expensive with one ground and photographs that carry all the colour.
- **Booking and gift card as boxed actions in the nav** → task first → rule: put the two money actions in the header, always visible.

## What fails & why

- **The scroll never ends** (high) → scroll-jacking (tells.md) → rule: a page needs a bottom; visitors use the end to know they have seen everything, and hours and address live there.
- **No h1 and no "what this is" in the first frame** (high) → no who/what (tells.md) → rule: say "Italian restaurant, Rome" in the first screen.
- **Consent panel stays over every screen, on phones half the viewport** (high) → stacked overlays → rule: consent ≤ 25 % of the phone viewport, gone after one choice.
- **Dark first paint, then a pale wall photo** (medium) → first-paint law → rule: paint the ground the first image will sit on.

## Transferable rules

- Do: keep booking in the header; let photos bring the colour on a dark ground.
- Don't: loop the scroll; don't open a restaurant page without saying it is one.

## Never copy

Logo, photography, artwork, layout and copy. Learn the principle only.
