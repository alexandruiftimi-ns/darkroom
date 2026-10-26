---
slug: the-tie-break
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: low
category: experimental
packs: [bold, artsy]
url: https://thetiebreak.merci-michel.com/
evidence: design review (preloader only)
added: 2026-10-25
updated: 2026-10-25
---

# The Tie Break (New Balance × Miu Miu) — good

**Thesis in one line:** a co-branded tennis game whose loading screen already plays — a line-drawn ball bouncing under the stacked logos.

**First frame:** flat navy ground; white co-brand lockup top-centre (~50 % x, 8 % y); a white outline tennis ball bouncing on the centre axis with a soft shadow; nothing else. Desktop and mobile, at every scroll point, show this preloader — the game itself was not reviewed.

## Signals

| Signal | Value |
|---|---|
| Font families | 0 rendered when viewed — logos are artwork |
| Type scale | n/a (no live text visible) |
| Colour mode / shares | monochrome — navy ground, white marks |
| Words (page / heaviest section) | 0 visible (a second run's DOM held ~2,500 hidden words — likely game/legal strings) |
| Text zones, first viewport | desktop 0 · mobile 0 |
| Layout system | centred axis: lockup top, loader centre |
| Signature motion | bouncing ball with squash and shadow (loader) · libraries: none detected before the game loads |
| Page weight | ~349 KB shell when viewed |
| Mobile | same centred loader, re-scaled |
| Source of values | estimated (only the preloader was seen) |

## What works & why

- **On-theme loader** — the ball squashes on contact and casts a shadow; the wait already shows the subject → principle: motion explains the claim, no meaningless loops (motion.md; tells.md Motion) → rule: if a wait is unavoidable, make the loader a preview of the experience.
- **Co-brand lockup alone on one flat colour** → principle: one focal point; monochrome mode (reading-paths.md rule 7; color.md) → rule: a collaboration opens with the two marks stacked and nothing competing.
- **Tiny shell first** (~349 KB before the scene) → principle: posters/shell before heavy media (motion.md) → rule: ship a light shell immediately and stream the heavy scene after.

## What fails & why

- **The page never left the loader** at any scroll point or viewport, with no visible text, h1 or skip → principle: WCAG 1.1.1 / 1.3.1; least-complex fallback (motion.md) → rule: a WebGL-only campaign needs a skip link and an HTML fallback that states what it is and how to play.

## Transferable rules

- Do: make the loader a miniature of the main interaction.
- Do: open a collaboration with just the two marks on one colour.
- Don't: gate all content behind a scene that may never load for some visitors.

## Never copy

Logos, ball illustration, game, copy text. Learn the principle only.

**Open question:** the visit showed only the preloader, so the award-winning game was not inspected; look again with a long wait before trusting this entry — confidence low.
