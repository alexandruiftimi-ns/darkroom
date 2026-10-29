---
slug: pacifio-ui
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: saas
packs: [modern]
techniques: [logo-marquee]
url: https://ui.pacifio.dev/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Atlas UI kit (pacifio) — bad

**Thesis in one line:** A component kit for agent interfaces whose landing page is its own docs shell, so it sells nothing a default kit doesn't.
**Split:** design bad · build mixed · technique bad — stock docs layout; phone opens with the sidebar covering the page.

**First frame:** white docs shell: a left sidebar of 30 component links, a version eyebrow and a centred heavy-sans headline (y 15–25 %), a three-line grey paragraph, black and outline pill buttons, a mono caps marquee of feature words, then a grey panel with a three-line stacked claim and small stat cards. The eye: headline → buttons → the sidebar pulls it back left.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Inter (display and text), JetBrains Mono (labels, marquee) |
| Type scale | largest 72 px · body 15 px · 13 sizes |
| Colour mode / shares | mono — white ground 93 % · near-zero colour, tiny blue and orange status chips |
| Words (page / heaviest section) | 1,001 / 604 |
| Text zones, first viewport | desktop 2 · mobile 2 |
| Layout system | documentation layout (sidebar + centred column) used as the landing |
| Signature motion | feature-word marquee, dot pulses and shimmer, running forever · libraries: none detected |
| Page weight | ≥ 687 KB (lower bound) |
| Mobile | broken — the sidebar opens over the hero on load and covers two-thirds of the screen |
| Source of values | observed |

## What fails & why

- **Phone opens with the navigation drawer covering the headline** (high) → first frame law → rule: drawers start closed below the desktop breakpoint.
- **Centred Inter headline, pill buttons, mono marquee, stat cards** (high) → generated-design tells (tells.md: four or more together) → rule: a design-system product must show a look of its own, not the kit default.
- **Docs shell as the landing** (medium) → one job per page → rule: the landing sells one outcome; the docs sidebar belongs one click deeper.
- **Marquee and pulses never stop, also under reduced motion** (medium) → logo-marquee watch-for (WCAG 2.2.2) → rule: a pause control and a still state.
- **Unlabelled form controls in the demos** (medium) → labels → rule: every input has a label, even in a showcase.

## Transferable rules

- Do: give a UI-kit landing one hero example in a distinct visual voice.
- Don't: ship the docs shell as the front door; never open a drawer on load.

## Never copy

Logo, UI, layout and copy. Learn the principle only.

**Open question:** the earlier analysis called it mixed (clean, plain); the maintainer marked it bad. Followed the maintainer; only the first screen was reviewed, so confidence is low.
