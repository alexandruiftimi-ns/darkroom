# Direction: the idea and two coded comps (stage 1, checkpoint A)

Goal: the user picks or steers **one** direction by looking at real, coded hero comps, not at descriptions. One round; a second only if both miss. Skip the checkpoint when the brief already fixes the look (an adopted blueprint, a brand guide, "make it like X with Y").

**Read `references/design-reasoning.md` first.** The order is meaning, world, device, material, then pack. Never let an adjective choose the style.

## 1. Subject inventory, then the idea

List 8–12 things that belong to this client and to no competitor: the name and what it means, the place (street, light, materials, tiles, signs), the numbers in the brief, the constraint it lives with, its rituals and hours, its materials and colours, the printed things of its world (a ticket, a label, a timetable), what it produces.

Write: **"On this page, [something that belongs to the subject] becomes [the layout device / motion]."** Competitor test: put the nearest competitor in the sentence; if it still works, the idea belongs to the category. "Clean and modern" is not an idea. The page's signature primitive (one repeated layout device) comes from here.

## 2. Shortlist packs and read the library

**Deal before you shortlist.** Name the meaning (`references/design-reasoning.md`), run `darkroom builds`, then `darkroom deal --meaning <one or two> --job <job> --assets <what exists>`. Choose your two directions from the three cards; one of the two is the less obvious card. Going outside the deal needs a one-line reason (the user's own words, or a real asset). Record it: `darkroom state --set device=<id>,meaning=<meaning>`. Colour comes from the subject: name the material or place each main colour is taken from, in the direction's 8 lines.

`styles/README.md`: now choose the pack that dresses each device: one primary pack (type and switches) + up to two modifiers (palette, imagery, motion only). The pack never chooses the device. Read `library/INDEX.md` and `library/LESSONS.md`; load ≤ 4 good + ≤ 2 bad matching entries, matched first by the **technique** the motion level calls for (INDEX **By technique**; "like ScrollTide" or "scroll animation with frames" means `frame-scrub` or `pinned-chapters`), then by category, then by pack. A good entry's minor flaws don't disqualify it; borrow its idea and avoid only its medium-or-worse failures. Entries are evidence, not templates; only lessons marked **promoted** are rules, **candidate** ones are prompts to think.

## 3. Build two comps in code

Two genuinely different directions, differing on at least three of: device, ground, colour source, type voice, motion verb, ending, built where `commands/platform.md` §3 says (HTML comps in `.darkroom/comps/` only when the table says HTML; otherwise two front-page variants in the theme or project): the real hero with real copy, real fonts (self-hosted OFL), the palette, the first-frame composition, the CTA, at 1440 and 390 (`darkroom capture .darkroom/comps/a.html --viewports desktop-1440,mobile-390 --reduce`). Placeholders for missing imagery are flat fields with the focal object's position marked `TEMP`. A coded comp tests type, spacing, responsiveness and legibility, which a generated mockup cannot.

Use a generated image only to settle imagery you cannot code: write one prompt (`commands/imagine.md`), ask the user to generate it, and continue with the rest meanwhile.

For each direction write ≤ 8 lines: name + idea + **signature in one line** a non-designer can picture ("A: the film scrubs as you scroll; B: the name is the image");  type (display + text, weights, H1 size); palette (4–6 named hex with roles, colour mode); motion signature (the one move) and up to two accents, each from `recipes/` or the Dark Motions catalogue (`recipes/motions/INDEX.md`, filtered by the pack; `references/dark-motions.md`) with its job in a few words; switches on/off; risk.

## 4. Show

First say the three lines (`references/design-reasoning.md`, step 7): what you think they mean, what you took from the subject, why this and not the obvious. Then `AskUserQuestion`: one question, options = the directions, with the capture paths and the 8 lines. Recommend one and say why. Log: `darkroom state --approve direction --note "<choice; why the other lost>"`.

## Rules

- Never deal two dark-neon options because the category "is tech", or near-black + gold or cream + terracotta + serif because "premium" (`references/tells.md`, audit `stock-palette` and `sameness`).
- If the user says "colourful", set colour mode `expressive`; do not fall back to dark minimal.
- A direction that needs assets that cannot exist at this tier is not a direction; say so and substitute.
- When the user dislikes a motion pick: "Want different ones? Describe what you'd like, or say shuffle and I'll pick another set that fits." Shuffle stays within the pack and the budget.
