# DESIGN BIBLE — <project>

Status: draft | approved <YYYY-MM-DD> · Packs: <primary> + <modifiers>

```darkroom
{ "surface": "landing", "job": "", "fontBudget": 3, "colorMode": "disciplined", "markets": ["EU"], "disclosure": "", "currency": "EUR",
  "wordBudgets": { "hero": 30, "feature": 45, "proof": 60, "closing": 30 }, "maxZones": 3, "keepTells": [] }
```

## 1. Thesis
<one sentence the whole site proves>

## 2. Audience & use scene
<who, device, light, mood → light/dark, density>

## 3. Palette (UI) — mode: <mode>
| Token | Hex | Role | Share | Contrast |
|---|---|---|---|---|
| `--ground` | | | | |
| `--surface` | | | | |
| `--ink` | | | | on ground: x:1 |
| `--ink-2` | | | | on ground: x:1 |
| `--accent` | | primary action only | | |
| `--line` | | | | |
| `--focus` | | | | ≥ 3:1 |
Media palette (imagery only): <…>

## 4. Type system (budget: n families)
| Role | Family | Weights | Size (clamp) | Leading | Tracking |
|---|---|---|---|---|---|
| Display | | | | | |
| Heading | | | | | |
| Body | | | | | |
| Label | | | | | |
Emphasis device (one): <…> · Measure: <…>ch · Losers & why: <…>

## 5. Grid & spacing
Spacing tokens (`references/craft.md`): `--space-2xs 4 · xs 8 · sm 12 · md 16 · lg 24 · xl 40 · 2xl 64 · 3xl 96 · 4xl 144`. One size per kind of gap: head to line <…> · head to content <…> · line to button <…> · card padding <…>
Columns / gutters per breakpoint · spacing scale · **copy anchor:** <where headlines live> · safe zones

## 6. Reading-path rules
Max zones per viewport: <3> · zone order · CTA placement

## 7. Convention switches
| Switch | Value | Reason |
|---|---|---|
| eyebrow | OFF | hard rule |
| tracked-caps | OFF | hard rule |
| index-numerals | | |
| hairlines | | |
| cards | | |
| glass | | |
| gradients | | |
| mono-labels | | |
| centred-layout | | |
| marquee | | |
| custom-cursor | | |
| full-bleed-imagery | | |
| script-lettering | | |

## 8. Imagery & materials
Subject · light · lens · grade · crops · never shown · **silhouette lock** (if product)

## 9. Motion grammar
**Signature** (the ONE thing this page is remembered for): <…> · **Supporting, quiet (2–4):** <entrance, material, type move, reveal> · heavy techniques: ≤ 1 · motion hooks per viewport: ≤ 3
Easings · durations · max simultaneous motions · techniques · reduced-motion

## 10. Components
Primary button · secondary · link · nav · forms · focus ring · selection · scrollbar

## 11. Copy voice
Tone · sentence length · banned words · CTA verbs · word budgets

## 12. Compliance baseline
Markets · WCAG level · consent approach · price display · disclosures · AI-content labels

## 13. Do / Don't
**Do:** 
**Don't:** 

## 14. Exceptions log
| Date | Rule broken | Where | Why | Approved by |
|---|---|---|---|---|
