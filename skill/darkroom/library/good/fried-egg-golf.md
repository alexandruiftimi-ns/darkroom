---
slug: fried-egg-golf
verdict: good
verdict_source: Awwwards nominee / HM (exact listing unverified)
confidence: medium
category: editorial
packs: [editorial-news, bold]
url: https://www.thefriedegg.com/
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# The Fried Egg — good

**Thesis in one line:** golf journalism with a clubhouse personality — egg-yolk yellow, a blobby script wordmark and a doodled golfer instead of a sports-portal grid.

**First frame (mobile, the complete one):** full-bleed golfer photo; yellow condensed headline + deck bottom-left (~5 %, 60–75 %); oval "Read" stamp; 5 story thumbnails across the bottom; yellow "Join the club" top-right. Desktop: hero photo not yet loaded when viewed — yellow headline over a pale grey gradient.

| Signal | Value |
|---|---|
| Font families | 1 CSS family (Grey, several widths) + script wordmark as artwork |
| Type scale | ~48 px hero · 20–26 px card heads · 14 px meta · 12 sizes |
| Colour mode / shares | disciplined — white/cream ground; yellow the one brand accent (chips, CTA, footer band), oxblood secondary tag |
| Words (page / heaviest section) | 2,011 / 848 |
| Text zones, first viewport | desktop 1 · mobile 0 (text over media) |
| Signature motion | hero story switcher with thumbnails · libraries: gsap + ScrollTrigger · weight 899 KB |
| Mobile | re-composed — hero headline over photo, rails swipe, footer becomes a mark + doodle |
| Source of values | observed |

## What works & why
- **Yellow used only for category chips, the club CTA and the footer band** → principle: one accent hue, CTAs share it (color.md) → rule: a loud brand colour stays loud by marking only categories and the primary action.
- **Article cards: photo, two tag chips, 2-line headline, read time + date in fixed positions** → principle: related items in one row, labels fixed (reading-paths.md rule 4); layer-cake scanning (attention.md) → rule: news cards show topic, headline and cost-to-read in the same slots every time.
- **Trips as postage-stamp illustrations over course photos; doodled golfer in the footer** → principle: tells.md "Why removal isn't enough" — an idea from the subject → rule: one hand-made, subject-specific device beats generic icons.

## Transferable rules
- Do: let an editorial home be a Read surface (attention.md) but give every rail the same card anatomy.
- Don't: rely on a hero photo for headline contrast without a ground colour — the unloaded desktop hero left yellow type on pale grey (color.md: large text ≥ 3:1).

**Open question:** 12 sizes and a hero that fails without its image keep confidence at medium; the length suits a media home.
