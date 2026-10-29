---
slug: irfan-xp
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: portfolio
packs: [artsy]
techniques: [gate]
url: https://irfansubasi.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Irfan Subasi XP (developer portfolio) — bad

**Thesis in one line:** A developer portfolio that boots like an old desktop operating system: logo, name, progress bar, then a fake desktop.

**Split:** design bad · build mixed · technique mixed — faithful parody, but a retro gimmick shell with nothing readable first.

**First frame:** black; a four-colour waving-flag logo centre, the owner's name in a bold sans with an orange superscript "xp", "Software Developer" under it, and a blue boot progress bar. Nothing else; no words to read, no way to skip.

## Signals

| Signal | Value |
|---|---|
| Font families | 0 web fonts in the first view (logo and name are images) |
| Type scale | not applicable — no live text at first |
| Colour mode / shares | mono black · the borrowed logo's four colours |
| Words (page / heaviest section) | 0 / 0 at first paint |
| Text zones, first viewport | desktop 1 · mobile 1 (image) |
| Layout system | centred boot screen, then an emulated desktop with windows |
| Signature motion | boot animation; looping progress bar · libraries: a DOS emulator host |
| Page weight | ≥ 1.2 MB (lower bound) |
| Mobile | same boot screen, scaled; the name runs to the screen edges |
| Source of values | observed |

## What fails & why

- **A boot screen gate before any content** (high) → gate (INDEX avoid) → rule: the first frame says who you are in live text.
- **Retro operating-system parody as the identity** (medium) — borrowed nostalgia, not the developer's own work → owner taste: modern over retro → rule: the hook must come from your work, not someone else's brand.
- **No heading, no live text, no keyboard stops** (medium) → accessibility → rule: a real h1 and links under any themed shell.

## Transferable rules

- Don't: make visitors wait through a fake loader.
- Don't: build a portfolio on another company's interface.

## Never copy

The borrowed logo, interface and copy. Learn the principle only.

**Open question:** the earlier analysis was unsure (fun craft, out of scope); the owner rated it bad. Only the boot screen was reviewed.
