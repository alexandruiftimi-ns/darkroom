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

## Loop discipline

Fix the top two to four **connected** issues per pass; keep the previous acceptable revision; recapture the same states; confirm the target improved and accepted states did not regress. Stop when acceptance is met or two passes show no material gain. At a plateau, show the best result and the one concrete trade-off as a choice.

## Human review

Claude's critique reduces the review burden; it does not replace it. The user decides identity, emotional fit, and whether the result feels worth commissioning. Record their reasons as *contextual* preferences for this project.

## Evaluating Darkroom itself (maintainer)

Track 1, correctness: `node tests/run-evals.mjs` (in the Darkroom repository) (must pass, including pages that must be clean) plus seeded visual defects the QA loop must find and fix without regressions. Track 2, taste: matched builds from the same inputs (baseline Claude vs Darkroom vs a revision), judged blind and pairwise by the user on desktop and phone captures plus a short interaction recording, with reasons; record interventions, time to first useful preview, asset handoffs and repeated questions. Small samples are directional; a rule that helps one genre and hurts another is scoped, not promoted. Test pages are single landing pages.
