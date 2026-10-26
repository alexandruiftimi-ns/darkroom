# DESIGN BIBLE — Halden Kiln (fictional test page)

Status: approved 2026-10-26 (user delegated direction: "fictional, my pick", "quick") · Packs: luxury (restraint) + restaurant/craft modifiers for warmth

```darkroom
{ "surface": "landing", "fontBudget": 2, "colorMode": "disciplined", "markets": ["EU"], "disclosure": "Fictional concept page. Halden Kiln does not exist; nothing here can be ordered.", "currency": "EUR",
  "wordBudgets": { "hero": 30, "feature": 45, "proof": 60, "closing": 30 }, "maxZones": 3 }
```

## 1. Thesis
A pot is only finished by the heat it survives; the page lets the visitor watch one firing.

## 2. Idea
On this page, the kiln's firing curve (20 → 1,280 °C) becomes the scroll: a vessel glows from cold clay to ember as the temperature readout climbs, then cools.
Competitor test: another studio's page cannot use this sentence without being a wood-kiln studio with a monthly firing.

## 3. Palette (disciplined, ~70/25/5)
| Token | Hex | Role |
|---|---|---|
| --ground | #121110 | page |
| --surface | #1b1917 | panels |
| --ink | #ece6dc | text (>14:1) |
| --ink-2 | #a39b8f | secondary text (>6:1) |
| --accent | #ff7a3d | the heat + the one action |
| --line | #2e2a26 | hairlines |

## 4. Type (2 families, self-hosted OFL)
Newsreader 300 + italic (display, headings) · Inter variable (body, labels, readout, tabular numerals). Emphasis device: italic serif.

## 5. Switches
eyebrow OFF · tracked-caps SPARING · index-numerals ON (temperatures only) · hairlines ON · cards OFF · glass OFF · gradients OFF (the vessel heat is the only one) · mono-labels OFF · marquee OFF · custom-cursor OFF

## 6. Motion
One signature: scroll-scrubbed heat (reversible, no library). Reduced motion / no JS: stages stacked as a list, vessel fully lit.

## 7. Exceptions log
- word-budget (high) on `firing`: five sequential scenes, one visible at a time (pinned); each is ≤ 25 words. The audit sums the section; per-scene budget is the real constraint.
- type-scale (medium): clamp() sizes at several breakpoints count as distinct; real steps are display / h2 / body / label.
- colour (medium): the glowing vessel is the one subject and is mostly ember by design; UI-only measure is 4.9% saturated.
