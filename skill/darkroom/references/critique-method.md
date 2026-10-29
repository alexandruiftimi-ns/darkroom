# Critique method: operational, not a score

The same model that built a page tends to repeat its own blind spots, and a number such as "premium 8.5" is not evidence. Use this method to make the model's review specific and to keep the user's taste as the only taste signal.

## Evidence, two tracks that never merge

- **Engineering evidence** (measured): build, console, overflow, computed names, keyboard path, contrast from pixels, reduced-motion behaviour, media failure, requests and bytes. These can establish a defect or a bounded pass; automated accessibility checking is partial.
- **Visual evidence** (looked at): first-frame hierarchy, type, spacing rhythm, subject scale and crop, image quality, identity consistency, section rhythm, transitions, phone composition, motion quality.

## How to look

1. Same viewport and state when comparing. Capture, then read the contact sheet for rhythm, then open individual states, then 1:1 crops of the first frame's text, the product edge, the CTA.
2. Squint test: blur it mentally; is there one focal point and a visible reading order?
3. Read the copy aloud: could it describe the nearest competitor?
4. Walk the scroll at ~1 viewport per 3–6 s on the film strip: does something change each time?
5. Break it: the worst copy at 375 px, images blocked, fonts failing, reduced motion, 200 % zoom.

## Defect record (the unit of critique)

```
State:    hero / mobile-390 / default motion
Observed: the visor is cropped through its defining edge; the heading overlaps its brightest reflection
Impact:   product recognition and text hierarchy both weaken
Change:   portrait crop; move copy below the subject; keep the desktop composition
Re-check: phone initial state, nearby widths, long heading, image-load failure
```

Name the visible element, the principle (a law, a reference file, a library entry), and the fix. "Feels premium" is not a defect and not a pass.

## The ten lenses (the finish line, without numbers)

Judge each lens **pass / weak / fail** from the captures; every weak or fail gets a defect record.

1. **First glance:** the 3-second test; one focal point; who and what is clear.
2. **Signature:** the one memorable thing is there and nothing competes with it (`references/modes.md`).
3. **Typography:** roles, sizes, leading, tracking per the Values tables; line breaks chosen.
4. **Composition and space:** anchor pattern, empty zone respected, rhythm between sections.
5. **Colour and light:** ground = media edge, one accent with one job, contrast on the worst frame.
6. **Media integration:** no seam, no flash, subject not colliding with copy, loop invisible.
7. **Motion:** purposeful, quiet, interruptible, reduced-motion path composed.
8. **Mobile:** re-composed, not stacked: re-cropped, rescaled, signature kept.
9. **Copy:** specific, short, fits nobody else (`references/attention.md`, "Shapes that work").
10. **Polish:** states, focus, metadata, nothing placeholder (`references/craft.md`).

**The bar:** no fail, at most two weak, and every blocking defect fixed: console errors, failed assets, phone overflow, a white flash at first paint, unreadable text, fonts not loaded, broken layout, placeholder copy.

**A fix pass** takes the three weakest lenses and writes each change **in values**, into `BUILD_SPEC.md` first: "H1 from 64 px to `clamp(56px,8vw,128px)`, tracking −0.035em"; "a ground-to-transparent gradient over the bottom 30 % of the video at 40 %".

**Fixes that usually move a weak lens:**
- Looks generic → bigger type, fewer words, a stronger signature, remove something.
- Looks busy → remove decoration, one radius everywhere, +1 spacing step, palette cut to ground / ink / muted / accent.
- Looks flat → depth from a media layer, a scrim, grain or light fall-off; never from ornaments.
- Text fights the video → move the text into the empty zone, add an edge scrim, or choose a calmer clip.
- Phone broken → re-aim `object-position`, `clamp()` display type, hide secondary nav.

## Loop discipline

Fix the top two to four **connected** issues per pass; keep the previous acceptable revision; recapture the same states; confirm the target improved and accepted states did not regress. Stop when acceptance is met or two passes show no material gain. At a plateau, show the best result and the one concrete trade-off as a choice.

## Human review

Claude's critique reduces the review burden; it does not replace it. The user decides identity, emotional fit, and whether the result feels worth commissioning. Record their reasons as *contextual* preferences for this project.

## Evaluating Darkroom itself (maintainer)

Track 1, correctness: `node tests/run-evals.mjs` (in the Darkroom repository) (must pass, including pages that must be clean) plus seeded visual defects the QA loop must find and fix without regressions. Track 2, taste: matched builds from the same inputs (baseline Claude vs Darkroom vs a revision), judged blind and pairwise by the user on desktop and phone captures plus a short interaction recording, with reasons; record interventions, time to first useful preview, asset handoffs and repeated questions. Small samples are directional; a rule that helps one genre and hurts another is scoped, not promoted. Test pages are single landing pages.
