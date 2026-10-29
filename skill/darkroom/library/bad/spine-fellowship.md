---
slug: spine-fellowship
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: corporate
packs: [trust, modern]
techniques: []
url: https://spineanesthesiafellowship.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Spine Anaesthesiology Fellowship — bad

**Thesis in one line:** A hospital department page built from the default kit: badge hero, stat counters, pill tags and icon cards, with its left edge cut off.

**Split:** design mixed · build bad · technique bad — honest content; layout overflows, stock count-up parts.

**First frame:** pale mint gradient; a huge "SPINE" and green "anaesthesiology" title, a sub line, three icon chips and two buttons on the left; a round department badge on the right. A navy info strip under the nav. The whole left column starts off-screen, so the first letters of the title and the primary button are clipped.

## Signals

| Signal | Value |
|---|---|
| Font families | not measured (one clean geometric sans observed) |
| Type scale | estimated: display about 90 px · body 16 px |
| Colour mode / shares | disciplined — mint, teal-green and navy on off-white (estimated) |
| Words (page / heaviest section) | not measured; long navy text band near the end |
| Text zones, first viewport | desktop 4 · mobile 3 (estimated) |
| Layout system | stock order: badge hero → stat row → pill tags → icon cards → navy quote band → stats → footer |
| Signature motion | count-up numbers and fade-ins · libraries: none detected |
| Page weight | ≥ 4,309 KB |
| Mobile | broken — content cut on the left in every frame; the page barely scrolls |
| Source of values | estimated (observed weight and headings) |

## What works & why

- **Specific, checkable facts** — hospital, address, procedures and case counts are named → proof over adjectives → rule: say the institution and the numbers you can stand behind.

## What fails & why

- **Content clipped off the left edge** (high) — on desktop and phone the hero and sections start outside the viewport → layout overflow → rule: test the first frame at 1440 and 390 before anything else.
- **No h1** (medium) — the big title is styled text, not a heading → one live h1 → rule: the title you see is the h1.
- **Default kit throughout** (medium) — icon chips, a stat banner, a row of pill tags, identical icon cards and a navy quote band → tells: stock section order, every block the same card → rule: replace one stock block with something only this team has (an operating-room photo, a case timeline).

## Transferable rules

- Do: keep the plain, factual voice of a clinical team.
- Don't: ship a generated layout without checking it on a phone.

## Never copy

Logo, badge, exact layout, copy text. Learn the principle only.

**Open question:** the earlier analysis called it mixed (fine for its job); the maintainer marks it bad. Following the maintainer.
