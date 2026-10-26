# Bible: the design document (written at the slice)

Goal: `DESIGN_BIBLE.md` at the project root (from `templates/DESIGN_BIBLE.md`), or the adopted blueprint. It is a **working contract**: concise, in tables, written so a different designer or agent could continue without asking. Write it when the direction is chosen; finalise it from the accepted slice. It needs no separate approval: the user approves the *look* at checkpoints A and B.

## Inputs

BRIEF, the chosen direction and its coded comp, the style pack(s), approved references. Load `references/typography.md`, `references/color.md`, `references/reading-paths.md`, `references/surfaces.md`, and the library entries for the packs.

## Fill (tight)

1. **Thesis**: one sentence the whole page proves.
2. **Audience and use scene**: device, light, mood → light/dark, density.
3. **Palette**: UI tokens with roles, shares, colour mode, pairs that pass (state the ratios); media palette kept separate.
4. **Type system**: families (≤ budget), roles, weights, a 5–6 step `clamp()` scale, leading, tracking, measure 45–75ch, one emphasis device.
5. **Grid and spacing**: columns, gutters per breakpoint, spacing scale, the constant **copy anchor**, safe zones.
6. **Reading path**: max zones per viewport, order, CTA placement.
7. **Convention switches**: from the pack, ON / SPARING / OFF with the reason.
8. **Imagery and materials**: subject, light, lens, grade, crops, never shown; silhouette lock for a product.
9. **Motion grammar**: signature move, easings, durations, max simultaneous motions (default 1), techniques, reduced motion.
10. **Components**: one primary button, nav, links, forms, focus ring, selection.
11. **Copy voice**: tone, sentence length, banned words, CTA verbs, word budgets.
12. **Compliance baseline**: markets, WCAG level, consent, price display, disclosures.
13. **Do / Don't**: 6–10 concrete lines each. **Exceptions log**: where the project knowingly breaks the pack.

The `darkroom` JSON block at the top holds the audit settings: `surface`, `colorMode`, `fontBudget`, `maxZones`, `wordBudgets`, `disclosure`, `currency`, `markets`. Keep it valid JSON; `darkroom audit` prints which file it read.

## Adopting a blueprint

If the project has `PROJECT_BLUEPRINT.md` or `DESIGN.md`, use it as the bible. `darkroom init` records it in `project.json` and, when it has no `darkroom` block, writes `.darkroom/settings.json` with defaults without touching the document. Put real settings in the blueprint's block, or edit that file.
