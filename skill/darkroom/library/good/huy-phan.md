---
slug: huy-phan
verdict: good
verdict_source: Awwwards SOTD + Developer Award + No-code Honors
confidence: medium
category: portfolio
packs: [artsy, modern]
url: https://huyml.co/
evidence: live study (study.json + 10 shots; one fixed viewport, 3 mobile shots are the intro loader)
added: 2026-10-25
updated: 2026-10-25
---

# Huy Phan (HUYML) — good

**Thesis in one line:** a portfolio as a single control surface — scroll turns a ribbon of tilted project images and every label updates in place.

**First frame:** pale grey ground; vertical HUYML© wordmark top-left; nav stacked at ~14 % x / 10 % y; active project image centred (~48 % x / 52 % y) with skewed neighbours sliding out top and bottom; role/launch/recognition table left; project-name list right with only the active name dark; huge index "02 /19" bottom-left. Eye: image → name on the right → numeral.

## Signals

| Signal | Value |
|---|---|
| Font families | 4 measured — BT Grotesk Medium/Regular (UI), BT Glyphius (project names), F37 Bolton (numerals) |
| Type scale | 180 px index numeral · 19–23 px names/nav · 10–16 px labels (5 sizes) |
| Colour mode / shares | monochrome — grey ground 95.5 %; colour only in project media and a 3-swatch palette chip per project |
| Words (page / heaviest section) | 1,265 / 1,262 (all 19 project blurbs in DOM) |
| Text zones, first viewport | desktop 3 measured (visibly ~6 incl. corners) · mobile 4 |
| Layout system | fixed viewport; left meta table · centre image · right name list; scroll changes state, not position |
| Signature motion | WebGL image ribbon that bends and skews with scroll velocity; illustrated self-portrait pushes the intro wall open · libraries: WebGL canvas (Framer) |
| Page weight | 3,155 KB |
| Mobile | re-composed into a bare ribbon — logo + burger + curved images; no project names or meta visible |
| Source of values | measured (study.json); font roles estimated from shots |

## What works & why

- **List as progress bar** — inactive project names at ~15 % grey, active one full black, aligned beside the image → principle: one focal point per viewport (reading-paths.md rule 7); related items in one column (rule 4) → rule: in a scroll-driven index, fade the inactive items and keep the active one at full contrast in a fixed slot.
- **Fixed slots for meta** — role, launch, recognition always in the same left table; numeral always bottom-left → principle: copy anchor (reading-paths.md rule 1) → rule: when content swaps in place, every field keeps its position so the eye learns where to look once.
- **One signature move** — the ribbon bends with scroll speed; nothing else animates → principle: cadence through a single motion (attention.md) → rule: give a portfolio one physical, velocity-linked motion instead of fade-ups everywhere.
- **Personality in the loader** — an illustrated self-portrait shoves a wall to reveal the name → principle: one bold choice (tells.md "why removal isn't enough") → rule: spend whimsy once, at the threshold, then let the work lead.

## What fails & why

- **4 families, 3 rendered sizes of grotesk plus serif names plus display numerals** → principle: 2 families + utility (typography.md) → rule: numerals can use the display face; don't add a fourth for labels.
- **Faded names fail contrast** — inactive items ~1.2:1 by audit, still readable links → principle: text ≥ 4.5:1 (color.md) → rule: inactive but selectable items are still text and links: keep them at 4.5:1 (3:1 only for large text) and keyboard-reachable with their names; if a fade is the device, fade by size or position, not contrast. Hiding them from assistive technology is acceptable only when an equivalent list view carries the same names and actions, and it does not fix the visible contrast.
- **Mobile drops the information** — ribbon only, no names, roles or dates → principle: mobile is one column in reading order, side zones move into the flow (reading-paths.md rule 8) → rule: on phones, put the active project's name and role under the image.

## Transferable rules

- Do: fixed slots for every field when content swaps in place.
- Do: one velocity-linked motion as the signature.
- Don't: let mobile lose the text that makes the work identifiable.

## Never copy

Logo, illustration, photography, exact layout, copy text. Learn the principle only.

**Open question:** scroll-state capture shows one project on desktop and the loader on mobile; the full ribbon behaviour is inferred from two states — confidence medium.
