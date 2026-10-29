# Direction: the idea and two coded comps (stage 1, checkpoint A)

Goal: the user picks or steers **one** direction by looking at real, coded hero comps, not at descriptions. One round; a second only if both miss. Skip the checkpoint when the brief already fixes the look (an adopted blueprint, a brand guide, "make it like X with Y").

## 1. Subject inventory, then the idea

List 8–12 things that belong to this client and to no competitor: the name and what it means, the place (street, light, materials, tiles, signs), the numbers in the brief, the constraint it lives with, its rituals and hours, its materials and colours, the printed things of its world (a ticket, a label, a timetable), what it produces.

Write: **"On this page, [something that belongs to the subject] becomes [the layout device / motion]."** Competitor test: put the nearest competitor in the sentence; if it still works, the idea belongs to the category. "Clean and modern" is not an idea. The page's signature primitive (one repeated layout device) comes from here.

## 2. Shortlist packs and read the library

`styles/README.md`: choose one primary pack (owns layout and type) + up to two modifiers (palette, imagery, motion only). Offer the user's named pack plus one adjacent alternative and one deliberate contrast. Read `library/INDEX.md` and `library/LESSONS.md`; load ≤ 4 good + ≤ 2 bad matching entries, matched first by the **technique** the motion level calls for (INDEX **By technique**; "like ScrollTide" or "scroll animation with frames" means `frame-scrub` or `pinned-chapters`), then by category, then by pack. A good entry's minor flaws don't disqualify it; borrow its idea and avoid only its medium-or-worse failures. Entries are evidence, not templates; only lessons marked **promoted** are rules, **candidate** ones are prompts to think.

## 3. Build two comps in code

Two genuinely different directions (different idea and composition, not different colours), built where `commands/platform.md` §3 says (HTML comps in `.darkroom/comps/` only when the table says HTML; otherwise two front-page variants in the theme or project): the real hero with real copy, real fonts (self-hosted OFL), the palette, the first-frame composition, the CTA, at 1440 and 390 (`darkroom capture .darkroom/comps/a.html --viewports desktop-1440,mobile-390 --reduce`). Placeholders for missing imagery are flat fields with the focal object's position marked `TEMP`. A coded comp tests type, spacing, responsiveness and legibility, which a generated mockup cannot.

Use a generated image only to settle imagery you cannot code: write one prompt (`commands/imagine.md`), ask the user to generate it, and continue with the rest meanwhile.

For each direction write ≤ 8 lines: name + idea + **signature in one line** a non-designer can picture ("A: the film scrubs as you scroll; B: the name is the image");  type (display + text, weights, H1 size); palette (4–6 named hex with roles, colour mode); motion signature (the one move); switches on/off; risk.

## 4. Show

`AskUserQuestion`: one question, options = the directions, with the capture paths and the 8 lines. Recommend one and say why. Log: `darkroom state --approve direction --note "<choice; why the other lost>"`.

## Rules

- Never deal two dark-neon options because the category "is tech", or cream + terracotta + serif because "premium" (`references/tells.md`).
- If the user says "colourful", set colour mode `expressive`; do not fall back to dark minimal.
- A direction that needs assets that cannot exist at this tier is not a direction; say so and substitute.
