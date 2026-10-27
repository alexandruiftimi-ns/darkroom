# Storyboard: sections, beats and budgets (an internal plan, not an approval)

Goal: `.darkroom/STORYBOARD.json` (schema in `templates/STORYBOARD.json`) plus a short table you keep current. You write it after the direction and during the slice; the user sees it only as part of checkpoint B if they want to.

## 1. Write the argument first

List the page as **claims with proof**, one line each. A section exists only if it carries a claim. Order by the journey in the BRIEF (default: seduce → explain → prove → convert). Delete sections with no claim: that is the cure for the brochure page.

## 2. Per section

| Field | Rule |
|---|---|
| `claim` | One sentence. Two sentences means two sections or a cut. |
| `hook` | What catches the eye (object, scale change, reveal, colour field, motion). Every viewport-height of scroll has one; a change of scale or light counts. |
| `focal` | The focal point and position (x %, y %). |
| `zones` | Text zones in reading order (≤ 3). |
| `words` | Body budget (`references/attention.md`: hero ≤ 30, feature ≤ 45, proof ≤ 60, closing ≤ 30). Headline ≤ 8 words. |
| `cta` | none / secondary / primary, where the journey allows it. |
| `motion` | The one motion (or none), trigger, range, reduced-motion fallback. |
| `technique` | DOM/CSS · SVG · layers · canvas sequence · seeked video · WebGL: the least complex convincing one (`references/motion.md`). For `hero-effect` and `story` pages, pick it from **By technique** in `library/INDEX.md` (frame-scrub, sprite-clips, pinned-chapters, layered-parallax, cursor-reveal…), read 1–2 of its good examples and build from the recipe the row names. |
| `ground` | The chapter's background colour or time of day. A `story` page plans these as an arc across chapters (dawn → dusk, one colour per chapter), not one ground throughout (`library/LESSONS.md`). |
| `assets` | Needed imagery: exists / to find / to generate / to build in code, and the interim placeholder. |
| `mobile` | What changes on a phone. |
| `status` | one of `planned` · `building` · `built` · `verified` · `blocked`. |

## 3. Cadence check

Walk it at about one viewport per 3–6 s. Something changes in each viewport; two consecutive viewports of the same layout family is a flag; the same block repeated in 3+ sections (a feature strip) is a defect. Run the check again on the *built* page with `capture --film`.
