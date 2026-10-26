# Review returned or supplied images (references and assets)

Goal: turn images the user brings into decisions. Open **every** image at full resolution (a filename is not an inspection), and give each one a role before judging it: composition reference · mood/colour reference · motion reference · brand asset · production plate · product master · anti-reference.

## For each image, report (table)

| Check | What to look for |
|---|---|
| Role and fit | Does it do the job its role needs (a plate: clean, calm copy zone, right aspect; a master: silhouette readable from the angles needed)? |
| Thesis | Does the first second communicate the bible's thesis? |
| Focal point | One clear focal point? Position (x %, y %). |
| Reading path | Count text zones, note the order of the eye, flag jumps (`references/reading-paths.md`). |
| Type | Families visible; baked script/handwriting = a third font. |
| Colour | Dominant / secondary / accent shares vs the colour mode; any second accent. |
| Density | Word estimate vs budget; repeated blocks across frames. |
| Continuity | Product silhouette, grid, nav, grade vs the anchor: list drift precisely. |
| Baked UI | Text, buttons, logos painted into pixels (never shipped; rebuilt as DOM). |
| Brief conflicts | CTAs, prices, claims, third-party marks the brief does not allow. |
| Technical | Resolution, aspect, alpha, edges, banding, compression (`darkroom media inspect`). |
| Steal / reject | 2–3 things to keep, 2–3 to drop, with reasons. |
| Library match | Does it repeat a `library/bad/` pattern or a lesson? Name the slug. |

Measure with the image itself where possible (`darkroom compare` stacks two images).

## Then

- Decide yourself whether it is acceptable. Ask the user only when it is a taste call that changes the direction.
- Update `.darkroom/ASSETS.json` (file, role, `TEMP` / `runtime` / `reference-only`, baked UI yes/no, source, rights) and the bible's exceptions log if needed.
- If drift is large, write a corrected prompt that changes **one variable**. Two failed rounds on the same image → change the approach (a different composition, or a coded solution), do not keep rolling.
