---
slug: ribbit
verdict: good
verdict_source: Maintainer pick; motion agency (iliketoplay.dk build)
confidence: high
category: agency
packs: [artsy, bold]
techniques: [sprite-clips]
url: https://ribbit.dk/
evidence: design review
added: 2026-10-27
updated: 2026-10-27
---

# Ribbit — good

**Thesis in one line:** A motion studio whose characters are alive: short image-sequence clips play as each section enters, reverse as it leaves and idle with random pauses.

**First frame:** white ground, a 3D character on chrome fabric at left, a small nav. Then "Fullservice Motion Agency" in a large serif with characters tumbling around it.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — FKTEcho · FKGroteskNeue |
| Type scale | 3 sizes · largest 281 px |
| Colour mode / shares | ground 99.6 % · saturated UI 0 % |
| Words (page / heaviest section) | 50 / 8 |
| Text zones, first viewport | desktop 1 · mobile 3 |
| Signature motion | GSAP ticker drives per-character image-sequence clips (stacked img elements); Lottie for the intro · libraries: gsap · video 0 · canvas 0 |
| Page weight | ≥ 5098 KB (lower bound) |
| Source of values | observed |

## What works & why

- **Characters play short clips (idle / enter / leave), not one long scrub** → motion with intent (motion-craft.md) → rule: give mascots three states; play "enter" forward on arrival, the same clip reversed on exit, and an idle loop with random pauses so they feel alive.
- **Big serif statement + 3D characters** → display type and image as one object (LESSONS) → rule: let characters overlap the headline.
- **50 words and a clear "Book a meeting"** → word budgets; primary action → rule: a motion studio can be almost wordless if the CTA is obvious.

## What fails & why

_Only issues that cost visitors something (severity in brackets). Minor polish is left out on purpose._

- **No reduced-motion path for the character clips** (medium) → recipes rule 5 → rule: show each character's first frame still for reduced motion.

## Transferable rules

- Do: mascot state clips (idle/enter/leave); recipes/sprite-clips.js.
- Don't: loop characters for visitors who asked for less motion.

## Never copy

Logo, imagery, characters, footage, exact layout and copy text. Learn the principle only.
