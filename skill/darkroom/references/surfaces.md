# Surfaces: which rules apply where

The audit's thresholds and many style rules are **defaults for a landing page**. Identify the surface first, state it, and set it (`surface` in the bible's `darkroom` block). Darkroom's tested strength is the first row; the others are supported by adjusting the rules below, not by claiming equal mastery.

| Surface | Visitor's success | Copy and density | Motion | Type / colour | Audit setting |
|---|---|---|---|---|---|
| **landing** (campaign, product launch, hospitality, service, portfolio) | decides and acts | short; ≤ 3 zones in the first viewport; word budgets 30/45/60/30; one message per section | one meaningful motion per scene; scroll stories welcome if assets support them | 2–3 families; colour in the media, UI restrained (mode per pack) | `surface: "landing"` (default) |
| **narrative** (a scroll-told story, case study, launch film) | is taken through a sequence | longer per beat but one claim each; chapters | scrubbed scenes are the point; budget the media | as the pack | `landing`; raise `wordBudgets` for the story sections |
| **catalog** (shop, rental, directory) | finds and compares | dense is correct; comparable items share one card anatomy; price and action next to the item | instant feedback, no theatre | as the pack; legibility over mood | `read`-like: relax budgets and zones; keep contrast, targets, names |
| **editorial** (article, docs, report) | understands | long-form; structure over brevity: headings every 2–4 paragraphs, 45–75ch | almost none | one or two families; high contrast; monochrome is fine | `surface: "read"` skips word budgets and page length |
| **app / dashboard** | completes a task | scanability, consistency, native expectations; repeated panels are normal | state feedback only | quiet borders, small labels acceptable | out of scope for the landing workflow; say so |

Mixed sites use different modes per route (a landing hero over a docs index): set the surface for the page under audit.

## What does not change with the surface

Real semantic HTML, contrast, keyboard path, visible focus, reduced-motion behaviour, truthful content, no layout shift from media, a first frame that works without JS, disclosures and compliance.

## Heuristics are questions

3 zones, 60-30-10, 8-word headlines, 30-word hero budgets: each is a default drawn from a style pack and attention research, not a law. A finding that a pack or the user knowingly accepts goes in the bible's exceptions log with a reason; it is not "fixed" to satisfy the script.
