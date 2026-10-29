---
slug: shelby-kho
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: portfolio
packs: [artsy, bold]
techniques: [toy-scene, gate]
url: https://shelbykho.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Shelby Kho — bad

**Thesis in one line:** A designer-illustrator's portfolio as a hand-drawn desk you scroll across, in candy pink, yellow and cyan.
**Split:** design mixed · build bad · technique mixed — real personality, but quirky, slow and gated on phones.

**First frame (desktop):** a big blue condensed serif "Shelby's desk." top-left (x 17–43 %, y 13–22 %) with a one-line intro; a speech bubble from a little robot; a pile of drawn notebooks, glasses, a camera and a Rubik's cube spread over the bottom half; pill buttons in three candy colours top-right; a contact pill bar at the bottom. The eye bounces between objects.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Instrument Serif (condensed display) · Afacad (UI) · Georgia fallback |
| Type scale | largest 80 px · body 16 px · 18 sizes |
| Colour mode / shares | expressive — white/pink ground 81 % · saturated UI 30 % · four hue families |
| Words (page / heaviest section) | 134 / 134 |
| Text zones, first viewport | desktop 4 · mobile 3 |
| Layout system | one long illustrated desk; project cards pinned on it like notes; three sticker badges and an email to close |
| Signature motion | draggable desk objects, blinking stickers, a robot with rotating tips · libraries: WebGL canvas · video 1 |
| Page weight | ≥ 2.7 MB (lower bound) |
| Mobile | broken — a full-screen notice says the site is better on bigger screens, with a "continue anyway" button |
| Source of values | observed |

## What works & why

- **The work cards sit inside the illustrated world**, not in a separate grid → principle: one art world for everything (borrowed-art-world) → rule: present projects as objects in the same scene, drawn in the same line.

## What fails & why

- **Phones get a "better on desktop" gate** (high) → tells.md (gate) and mobile re-composition → rule: build a real phone layout; never ask a visitor to come back on another device.
- **Quirky hand-made look** (medium) — candy pastels, pill buttons in three colours, sticker badges: charming, but reads playful-retro rather than polished → looks.md (one bold choice) → rule: for a hiring portfolio, keep one accent and let the illustration be the personality.
- **10–20 fps scrolling and eight blinking loops under reduced motion** (medium) → performance and reduced-motion laws → rule: idle animations stop when the user asks for less motion; draw the desk once, not every frame.
- **Overlapping counter text in the header** (medium) — two lines draw on top of each other ("You are visitor #…") → motion-rest law → rule: swapping labels must never overlap at rest.

## Transferable rules

- Do: pin project cards into the illustrated scene.
- Don't: gate phone visitors or leave idle loops running.

## Never copy

Logo, illustrations, layout and copy text. Learn the principle only.

**Open question:** the earlier analysis rated it good for character, mixed build; the owner marked it bad. Following the owner's taste (polished over quirky) and the phone gate.
