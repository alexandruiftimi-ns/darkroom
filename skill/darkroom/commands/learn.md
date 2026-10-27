# /darkroom learn — distil the example library (maintainer only)

Turns the creator's raw examples (`library-src/`) into short written entries that ship inside the skill (`<skill>/library/`). The skill never ships screenshots of other people's sites; it ships what was learned from them.

## 0. Guard

Run only from the Darkroom source repository (it contains `skill/darkroom/`), with the raw examples in a `library-src/` folder next to the repository folder (or at a path the maintainer names; it is never committed). If either is missing, stop and say: "`learn` is for the skill's maintainer. To learn from a site for your own project, use `/darkroom study`." Write to the repo copy `skill/darkroom/library/`, never to the installed copy.

## 1. Find what's new

**Check the register first.** `library-src/CHECKED.md` lists every site ever checked, including rejected, unreachable and blocked ones. Before proposing or reviewing a site, look up its domain (`node library-src/_tools/checked-sync.mjs --has <url>`, exit 0 = already checked) and skip it unless the maintainer asks for a re-review. Every site you look at gets a row in the same pass (in the library or not, with the reason), and `checked-sync.mjs` re-syncs the library rows after entries change.

Two kinds of input (layout and categories: `library-src/README.md`):

- **Sites** — `library-src/<verdict>/sites/<slug>/notes.md` (format: `library-src/_template/notes.md`), optionally with images.
- **Images** — `library-src/<verdict>/images/<category>/`. Files sharing a prefix (`stripe-pricing-1.png`, `stripe-pricing-2.png`, `stripe-pricing.md`) are **one** example; slug = prefix. A same-prefix `.md` carries the URL and the maintainer's reasons.

An example is **new** if `skill/darkroom/library/<verdict>/<slug>.md` doesn't exist, **changed** if any of its files is newer than the entry's `updated` date. List both and confirm with the user before processing more than 10. For large batches, split into groups of ~8 and analyse them in parallel subagents (each writes its own entries only; you merge INDEX and LESSONS).

## 2. Per example

1. Read the notes completely. The maintainer's verdict and reasons outrank your taste; if you disagree, say so in the entry's `Open question` line and lower `confidence`, don't overrule. A gallery verdict (Awwwards, colorlib…) is a strong prior, not a fact: award winners have flaws, listed "bad" sites can be deliberate art.
2. If there's a URL and Playwright is available, from a folder where Playwright resolves run `node <repo>/skill/darkroom/scripts/darkroom.mjs study <url> --out <repo>/library-src/<verdict>/sites/<slug>/_study` (1440 + 390 px, five scroll points, consent banner dismissed, `study.json` with fonts, colour share, sections, words, zones, libraries, weight). Ask before installing anything. No URL / no Playwright / site down → signals are `estimated from images`.
3. Open **every** image at full resolution (a filename is not an inspection) — the study shots and any provided images. Use the `/darkroom refs` checks: thesis, focal point, reading path, type, colour, density, baked UI, mobile re-composition. Take extra shots (`shoot --selector`) only where a key moment was missed.
4. Write `skill/darkroom/library/<verdict>/<slug>.md` from `templates/LIBRARY_ENTRY.md`. Limits: ≤ 60 lines; every "works"/"fails" point names a **visible element**, a **principle** (`references/*` or a law) and a **transferable rule**. "Fails" lists only what costs visitors something, each with a severity (medium, high, critical); low-severity polish stays out, and minor flaws never turn a good design into a bad example. Tag `techniques:` from the INDEX **By technique** table and add the slug to that row (new technique: new row, with the recipe that builds it or "none yet"). Mockups (Dribbble, Behance…) record `evidence: mockup` and can't claim production qualities (speed, real content). No copied body copy beyond a 6-word quote; no image files; no code. Write it as a designer's review of the design: never mention tools, files, screenshots, capture runs or blocked visits (a page that would not open is "not reviewed").

## 3. Update the index and lessons

- Add or update the row in `library/INDEX.md` (keep rows sorted by category, then verdict).
- Re-read `library/LESSONS.md`. A pattern seen in **≥ 3 entries** (good or bad) becomes a *candidate* lesson with its evidence, **its scope** (surface, purpose, packs), and **a counter-evidence line** (entries or situations where it fails; "none found" must be stated). A single site can supply a good composition, a poor loading behaviour and an untested conversion pattern: attach observations to techniques, not verdicts to whole sites. A lesson contradicted by a newer entry gets a note, not silent deletion. Frequency is not transfer: promotion also needs a coded test on a new project or the maintainer's explicit judgement.

## 4. Propose promotions (ask, never auto-apply)

When a lesson has ≥ 3 entries of evidence and isn't already in the rules, propose — with AskUserQuestion, multiSelect — where it should land: a style pack (`styles/<pack>.md`), `references/tells.md` (bad patterns), or `references/myths-and-facts.md`. Apply only what the creator ticks. Note each promotion in `LESSONS.md` (`promoted → styles/luxury.md, <date>`).

## 5. Report and sync

Report: entries added/updated, lessons changed, promotions applied, anything skipped (unreadable image, missing notes). Then remind the creator to:
1. Review the diff in `skill/darkroom/library/`.
2. Re-copy `skill/darkroom/` to the installed skill folder (`~/.claude/skills/darkroom`) to use it locally.
3. Commit and push; users get the update when they re-copy or pull.
