# Handoff: the evidence pack (stage 5, checkpoint C)

Assemble `.darkroom/HANDOFF.md` from evidence that matches the **current build revision** (`darkroom state` lists stale captures; re-capture first):

1. What exists and works: sections, interactions, with capture paths (the sheets for desktop / phone / reduced motion, and any film strip). For a site: the page list, each page marked built, merged or left out, against the old site's addresses when it was imported.
2. Quick check: date, URL, no high left (any rule lifted, with the user's words). Say in one line that the full audit was not run and that `/darkroom audit` runs it. If the user ran it, give its date and findings.
3. Compliance (`commands/comply.md`): status, items for a lawyer. Disclosures present.
4. Assets: production vs `TEMP`, rights and credits (`darkroom assets credits`), pending generations, the open asks.
5. Performance: **measured** numbers only, with device/network/date (LCP, INP, CLS, bytes), otherwise "not measured". The audit does not measure field vitals; do not quote any from it. Page weight from `study`/`audit` is a lower bound.
6. Robustness checked: keyboard path, 200 % zoom, reduced motion, font failure, media failure (text readable with images blocked), narrow phones (375), scroll restoration, console errors.
7. Platform (`commands/platform.md`, step 5): preview and deploy steps in plain words, sign-ups the user needs, the platform validator's result, the docs-check date, and whether the **quick** or **full** check ran (never imply full coverage from a quick check).
8. Run, build and test commands (and, if the skill itself was changed, a note that the maintainer's regression suite must be run; it is not shipped with the skill).
9. Known gaps and the single next action.

Present the pack to the user with the three or four things that need their taste or a decision. Never call a planned asset or motion "done".
