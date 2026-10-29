---
slug: curllmooha
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: portfolio
packs: [artsy, nature]
techniques: [webgl-scene, gate]
url: https://curllmooha.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# curllmooha — bad

**Thesis in one line:** A creative developer's 3D portfolio that opens on one dandelion in a soft sky and asks you to blow on it before anything else appears.
**Split:** design mixed · build bad · technique mixed — a lovely image held behind an interaction gate and heavy 3D.

**First frame:** for the first moment, an empty blurred sky with one small line bottom-left ("the dandelion is listening"); then a single dandelion centred (x 40–60 %, y 26–100 %) and a cream pill at the bottom: "blow the dandelion · click". No name, no h1, no work.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Inter Tight · Nunito |
| Type scale | largest 128 px · body 16 px · 11 sizes |
| Colour mode / shares | expressive — sky blue nearly 100 % of the frame, cream UI pill |
| Words (page / heaviest section) | 3 visible on arrival |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | one full-screen 3D scene; portfolio sections live behind the interaction |
| Signature motion | real-time dandelion whose seeds blow away on click, mic or tap · libraries: gsap, three, WebGL canvas |
| Page weight | ≥ 2 MB (lower bound) |
| Mobile | same scene, "tap" instead of "click"; nothing else on screen |
| Source of values | observed (opening scene only) |

## What works & why

- **One calm, specific image** (a dandelion against sky) is memorable and gentle → principle: one focal object (hero-media.md) → rule: a single quiet object can carry a personal brand.

## What fails & why

- **Gate before content** (high) — nothing scrolls or reads until you blow the dandelion → tells.md "a gate in front of the content" → rule: the portfolio must scroll and show its owner with no click; the toy sits over it, never instead of it.
- **No name or h1 on arrival** (high) — headings stay hidden after load; the only words are an instruction → tells.md "no who/what in the first frame" → rule: one live line naming the person and what they do, in the first frame.
- **Heavy, laggy 3D** (medium) — the thread reported rough performance and "nothing works" → performance budget → rule: stream the scene after a designed first paint; offer a lighter path on weak devices.
- **Trackers load before consent** (medium) → consent law → rule: no analytics before the visitor answers.

## Transferable rules

- Do: keep the gentle single-object opening, with the name live over it.
- Don't: make visitors perform an action before they can see who you are.

## Never copy

Logo, 3D scene, layout and copy text. Learn the principle only.

**Open question:** the earlier analysis called it mixed ("lovely idea, the build lets it down"); the owner marked it bad. Agreed: the gate and missing name are high-severity.
