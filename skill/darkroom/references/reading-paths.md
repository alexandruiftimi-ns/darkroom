# Reading paths — no scavenger hunts

The complaint this file exists for: *text placed randomly, so the user looks left, right, up, centre, mid just to read three products.*

## Rules

1. **Copy anchor.** Pick one place where headlines live (e.g. left column at the gutter, or centred top) and keep it constant across sections. Break it once, on purpose, for a signature moment.
2. **≤ 3 text zones per viewport** (a zone = a cluster of text read as one unit: nav excluded). Typical: (1) headline+body+CTA, (2) one supporting cluster, (3) a quiet footer line. Four+ zones in the first viewport is a defect.
3. **Zone order = reading order = DOM order.** Top-left → down → right (LTR). The eye should never travel back up to find the next item.
4. **Related items in one line or one column.** Three products are read in a row or a column, never scattered at three corners. Their labels sit directly with them, same alignment.
5. **Corners are for chrome**, not content. Content in all four corners makes the eye orbit.
6. **The CTA sits on the path**, immediately after the claim it acts on.
7. **One focal point per viewport.** Either the image's focal point and the text zone are separate areas that don't compete (text over the subject's face/product = defect), **or** the display word and the image form one object: the image cuts into, sits inside or interlocks with the headline (library: good/colonia-zacamil, good/jil-sander-concept-lain). The word stays live text and fully legible — if the image hides letters, it's a defect (good/realevate).
8. **Mobile is re-composed, not shrunk.** One column in reading order; side zones move into the flow or are cut. Spatial devices (3D rings, horizontal strips, multi-column grids) become a single column with the **same labels**; the active item's name and role sit under its image — phones never get imagery without the identifying text (library: good/jesper-landberg, good/cominvi vs bad/tag-team-signs, bad/drudge-report; flawed: good/huy-phan). Test at 390 px first.

## Measuring (what `darkroom.mjs audit` does)

- Collects visible text blocks in the first viewport, clusters boxes within ~48 px into zones, counts zones (nav/header excluded).
- Orders zones by DOM order and sums the centre-to-centre path length divided by the viewport diagonal: **> 2.0 = zig-zag** (eye crosses the screen twice).
- Flags zones in 3+ corners.

## Case: NorthShutter references

Each concept frame had 7–9 clusters: nav, eyebrow, headline+body, CTA pair, partner logos, a 3-column feature strip bottom-left, launch date bottom-right, scroll cue, sometimes script lettering top-right. Beautiful still, but the eye visits all four corners. The build kept one copy column + one bottom row aligned to a shared baseline, and moved the feature strip to one section only.
