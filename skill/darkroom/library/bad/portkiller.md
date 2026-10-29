---
slug: portkiller
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: app-marketing
packs: [cyberpunk, bold]
techniques: [hud-labels, glitch-text]
url: https://portkiller.app/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# PortKiller — bad

**Thesis in one line:** a menu-bar tool for killing stuck ports sold as a terminal crime scene: error message as headline, violent jokes, orange mono everywhere.
**Split:** design bad · build mixed · technique bad — on-topic joke, but glitch text and HUD clutter read generic.

**First frame:** dark blue-black with a giant ghosted "PORTKILLER" behind; top-left a boxed PK logo and three orange status tags ("TARGET LOCKED: LOCALHOST"); a large grotesk headline "Address already in use" at 8–48 % x, 28–42 % y with a glitching orange error code under it; a mono paragraph; an orange "Download for macOS" button; right, a terminal window with the app's port list floating over it; a "PORTS TERMINATED: 0" counter top-right; a small port icon flying at the top-left edge.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Space Grotesk (display) · JetBrains Mono (everything else) |
| Type scale | largest 288 px (ghost word) · smallest 10 px · 13 sizes |
| Colour mode / shares | dark — ground 23 % · accent 3 % orange (~30°) · blue links |
| Words (page / heaviest section) | 448 / 131 |
| Text zones, first viewport | desktop 1 large cluster (logo, 3 tags, headline, error, copy, CTA, terminal, counter) · mobile 1 |
| Layout system | split hero, then fake log files, feature cards, bracketed testimonials, "[ END THE SUFFERING ]" closer |
| Signature motion | glitching error code, flying port icon, counter · libraries: none detected |
| Page weight | ≥ 0.1 MB |
| Mobile | re-composed — stacked, readable |
| Source of values | observed |

## What works & why

- **The headline is the error the user just saw** → name the pain in the user's own words → rule: quote the exact moment of need.

## What fails & why

- **Glitch effect on the one line that explains the problem** (medium) → motion must not hurt reading → rule: never distort the key line.
- **Status tags, ghost word, counter and flying icon around one hero** (medium) → too many devices (tells.md, motion) → rule: one HUD device per screen, with real data.
- **Orange-on-black mono at 2.7–3.5:1, including the download button** (high) → contrast law → rule: the primary CTA must pass 4.5:1.
- **The flying port icon** (medium, per the thread: annoying) → motion without a job → rule: nothing moves on its own unless it shows the product working.

## Transferable rules

- Do: put the user's error message in the headline.
- Don't: pile glitch, HUD tags and joke copy on a tiny utility.

## Never copy

Logo, copy jokes, layout. Learn the principle only.

**Open question:** the earlier analysis leaned good for a dev audience (light, funny); the owner marks it bad.
