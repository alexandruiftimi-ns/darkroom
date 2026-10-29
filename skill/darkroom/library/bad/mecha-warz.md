---
slug: mecha-warz
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: high
category: experimental
packs: [cinematic, bold]
techniques: [hud-labels, gate]
url: https://coaxnim.github.io/mecha-warz-arena/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Mecha Warz Arena — bad

**Thesis in one line:** A game page that is one generated mech inside a cockpit HUD, and the HUD never moves out of the way.
**Split:** design bad · build bad · technique mixed — busy cockpit frame, no message; heavy; scroll changes nothing visible.

**First frame:** a cockpit frame (angled dark panels top and bottom, a glowing V of struts) around a moor landscape; a blue-white mech stands right of centre inside red target brackets; HUD cards with reactor, ammo and weapon readouts in 5–9 px mono on both sides and the bottom; "move cursor to acquire target" at the top. The eye ricochets between six readouts and never finds a claim.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — Cascadia Mono for every word, plus an image logo |
| Type scale | largest 14 px · smallest 5 px · 7 sizes |
| Colour mode / shares | disciplined — dark navy frame 47 % · cyan and red HUD accents ~2 % |
| Words (page / heaviest section) | 11 / under 10 |
| Text zones, first viewport | desktop 6 · mobile 7 |
| Layout system | one fixed cockpit overlay; six named sections that do not visibly change the frame |
| Signature motion | cursor-aim target game over a looping video · libraries: none detected |
| Page weight | ≥ 6.9 MB (lower bound) |
| Mobile | squeezed — same cockpit cropped tall, readouts unreadable |
| Source of values | observed |

## What works & why

- **The generated mech and landscape share one cold light** → one art world → rule: if imagery is generated, light every asset the same way.

## What fails & why

- **The page is a game frame, not a page** (high) → gate (tells.md) → rule: the game can sit over a page; it can't be the page.
- **Scrolling changes nothing visible** (high) → scroll needs a consequence → rule: if sections exist, each must look different.
- **Six readouts and 5–9 px type in the first screen** (high) → reading zones ≤ 3; type floor → rule: HUD labels are a garnish around one readable claim, never the whole text.
- **No h1, no genre, no release, no store link** (high) → no who/what → rule: name the game, the platform and the action in the first frame.
- **Nearly 7 MB with video under the HUD** (medium) → weight budget → rule: a poster frame first, video after.

## Transferable rules

- Do: keep HUD labels for flavour at the frame edges.
- Don't: wrap the first screen in a permanent overlay; don't ship sections that look identical.

## Never copy

Mech, logo, HUD design, layout. Learn the principle only.
