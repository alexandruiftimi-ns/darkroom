# Handoff: the evidence pack (stage 5, checkpoint C)

Assemble `.darkroom/HANDOFF.md` from evidence that matches the **current build revision** (`darkroom state` lists stale captures; re-capture first):

1. What exists and works: sections, interactions, with capture paths (the sheets for desktop / phone / reduced motion, and any film strip).
2. Audit: date, URL, remaining highs and mediums with reasons; which findings were **measured**, **heuristic** or **manual**, and what the manual ones still need.
3. Compliance (`commands/comply.md`): status, items for a lawyer. Disclosures present.
4. Assets: production vs `TEMP`, rights and credits (`darkroom assets credits`), pending generations, the open asks.
5. Performance: **measured** numbers only, with device/network/date (LCP, INP, CLS, bytes), otherwise "not measured". The audit does not measure vitals; do not quote any from it. Page weight from `study`/`audit` is a lower bound.
6. Robustness checked: keyboard path, 200 % zoom, reduced motion, font failure, media failure (text readable with images blocked), narrow phones (375), scroll restoration, console errors.
7. Platform (`commands/platform.md`, step 5): preview and deploy steps in plain words, sign-ups the user needs, the platform validator's result, the docs-check date, and whether the **quick** or **full** check ran (never imply full coverage from a quick check).
8. Run, build and test commands (including `node tests/run-evals.mjs` (in the Darkroom repository) if the skill itself was changed).
9. Known gaps and the single next action.

Present the pack to the user with the three or four things that need their taste or a decision. Never call a planned asset or motion "done".
