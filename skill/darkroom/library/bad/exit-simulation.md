---
slug: exit-simulation
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: portfolio
packs: [cyberpunk, cinematic]
techniques: [webgl-scene, conversational-hero]
url: https://www.exitsimulation.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Exit Simulation (developer portfolio) — bad

**Thesis in one line:** a developer sold as a chrome AI face that talks to you; one striking image, very little page, and it works poorly.
**Split:** design mixed · build bad · technique mixed — talking-avatar hook is fun; 16 MB and stock cyberpunk look.

**First frame:** after a near-black screen with only the nav, a glossy chrome head fills the centre, wrapped in black cables glowing coral, with violet light streaks falling behind; a chat bubble at the top asks a sarcastic question; a "type a message" field at the bottom; the cookie bar covers it. On the phone the name and "DEVELOPER X ARTIST" sit at 80 % y.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Major Mono Display (logo, nav) · Mulish (chat) |
| Type scale | largest 18 px · 3 sizes |
| Colour mode / shares | mono-dark with neon — violet streaks, coral cables, blue eyes |
| Words (page / heaviest section) | 60 / 30 |
| Text zones, first viewport | desktop 4 · mobile 1–2 |
| Layout system | one full-screen scene; portfolio, about and contact behind the menu |
| Signature motion | the avatar's head, eyes and cables react while it chats · libraries: WebGL canvas |
| Page weight | ≥ 16.5 MB |
| Mobile | re-composed — head centred, name moved low |
| Source of values | observed |

## What works & why

- **The visitor talks to the hero** → an interaction with a payoff → rule: a chat hero works when the answer teaches you something about the person.

## What fails & why

- **Owner's note: "works poorly"** (high) → smoothness and response before spectacle → rule: a heavy 3D chat must answer quickly or degrade to text.
- **No h1, no plain line saying who and what at desktop** (high) → no who/what in the first frame → rule: name and role in live text in the first view on every size.
- **Chrome face, cables and neon rain** (medium) → generic "AI cyberpunk" stock look (tells) → rule: an avatar needs a detail only this person would choose.
- **16.5 MB and a dark empty first paint** (medium) → first-frame law → rule: poster image first; stream the model.

## Transferable rules

- Do: let the visitor do one thing in the hero.
- Don't: ship the clichéd AI head as your identity.

## Never copy

Model, scene, voice and copy text. Learn the principle only.

**Open question:** the earlier analysis called it mixed (one strong image); the owner marks it bad.
