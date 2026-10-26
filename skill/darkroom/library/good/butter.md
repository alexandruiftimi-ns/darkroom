---
slug: butter
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: medium
category: saas
packs: [modern, artsy]
url: https://www.butter.video/
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Butter — good

**Thesis in one line:** a video editor sold as a toy box — a chrome 3D keyring of brand charms above a plain, very large grotesk claim.

**First frame:** floating pill nav (script logo + six links) top-left, Login / Try for free pill top-right; 3D keyring cluster centred at the top (~50 % x, 20 % y); one-line H1 across ~75 % of the width at ~45 % y; one-line subhead; one black Get Started button at ~64 % y; lower third an empty grey-to-white gradient. The eye drops straight down: charms → H1 → subhead → button.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 measured — DieGrotesk · ABC Diatype; mono-style labels seen (likely a Diatype sibling — estimated); script logo is artwork |
| Type scale | 108 px H1 · 60 / 45 / 42 section heads · 16–24 px text · 9 sizes |
| Colour mode / shares | disciplined UI — light grey/white ground, black ink and buttons, saturated UI 0.25 %; expressive colour only inside 3D/media (orange, magenta, green, iridescent) |
| Words (page / heaviest section) | 898 / 763 (features + templates block) |
| Text zones, first viewport | desktop 2 · mobile 2 |
| Layout system | centred hero axis; then split sections (copy left, dark product panel right); nav collapses to logo + overflow dots |
| Signature motion | 3D charms; per-word blur/fade statement text on scroll; iridescent liquid wordmark footer · libraries: lenis, WebGL canvas |
| Page weight | 1,700 KB |
| Mobile | re-composed but blocked — consent sheet covers ~70 % of the phone views |
| Source of values | observed; label face estimated by eye |

## What works & why

- **One vertical axis in the hero** — object, claim, one-line subhead, one button, nothing else → principle: zone order = reading order; CTA on the path (reading-paths.md rules 3, 6) → rule: a centred hero works when it has three elements and a single action.
- **Colour lives in the object, chrome stays grey/black** → principle: separate UI palette from media palette; disciplined mode (color.md) → rule: let the 3D brand object be the only saturated thing in the viewport.
- **Feature "blocks" shown as their output** (Inflate, Glow, Focus, Halftone tiles) with one-word labels → principle: replace adjectives with an image; labels 1–4 words (attention.md) → rule: name a feature in one word and show what it produces.
- **Footer ends on the wordmark at display scale** → principle: one focal point per viewport → rule: close on the brand mark, not another link block.

## What fails & why

- **Consent wall** — ~40 % of desktop and ~70 % of mobile viewports at every scroll point; GTM, Facebook, DoubleClick, Clarity load before consent → principle: consent before non-essential trackers, equal Reject (compliance.md); WCAG 2.4.11 focus not obscured → rule: compact first layer, nothing loaded before the choice.
- **Collapsing nav goes transparent** — nav links measured 1.26:1; footer links show through the nav pill at the page end → principle: WCAG 1.4.3; corners are for chrome, not for collisions (reading-paths.md rule 5) → rule: sticky chrome gets an opaque surface.
- **763 words in one section** with genre words (all-in-one, elevate, cutting-edge) → principle: chapter budget ≤ 45 words; kill genre verbs (attention.md) → rule: split long feature blocks into one-claim sections or move detail to a docs page.

## Transferable rules

- Do: put the brand's colour into one hero object and keep UI neutral.
- Do: show each feature by its output with a one-word label.
- Don't: let a consent sheet or a transparent sticky nav cover content.

## Never copy

Logo, 3D charms, wordmark, exact layout, copy text. Learn the principle only.

**Open question:** the consent wall hid most mobile content in view, so mobile reading quality is only partly verified — confidence medium.
