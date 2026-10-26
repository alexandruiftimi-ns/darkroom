# Intake: brief, surface, asset tier (stage 0)

How to *talk* to the user during intake (plain words, recommended defaults, the "what I need from you" card) is `commands/concierge.md`; read it first. This file is what you decide and record.

Goal: a confirmed `.darkroom/BRIEF.md` in **at most one question round**, then straight on to direction. Fifteen minutes, not a workshop.

## 1. Set up and read what exists

1. `node <skill>/scripts/darkroom.mjs init` (creates `.darkroom/` and `project.json`; adopts an existing `PROJECT_BLUEPRINT.md` / `DESIGN.md`; never overwrites).
2. `darkroom state` to see whether this is a resume.
3. Read everything the user already gave: brief text, `CLAUDE.md`, any blueprint, existing code (`package.json`, stack), the assets folder (`darkroom media inspect <dir>`), reference images (open each: a filename is not an inspection), copy documents. Extract answers before asking anything.

## 2. Classify (decide these yourself; state them in one line each)

- **Surface:** `landing` (default here), or note that the request is a catalog / editorial / app and which rules change (`references/surfaces.md`). Set `surface` in `project.json` and the bible's `darkroom` block.
- **Asset tier** (what is actually available, which sets the achievable visual ceiling):
  - **A: own photography / footage / product renders / 3D exist** → design around them; process them with `darkroom media`.
  - **B: some assets** (logo, a few photos, a short clip, UI screenshots) → build the strongest page those carry; list the 3–5 assets that would lift it most.
  - **C: nothing but words** → type-led composition, real UI built in code, drawn-in-code graphics, openly licensed archival/found imagery with provenance (`commands/plates.md`), and generated plates if the user can make them. Say plainly what this tier can and cannot reach.
  - Ask once: can the user generate images (which tool), video (which tool, budget), 3D? Their answer changes the motion plan, so it comes before direction, not after the storyboard.
- **Interaction ambition:** none / restrained / scroll story / pointer. Pick the cheapest convincing technique for the assets in hand (`references/motion.md`).
- **References:** record each with a role (borrow: mood / type / colour / layout / motion; not: …). Never treat "I like this site" as a request to clone it.

## 3. The ten decisions

Fill from the material; ask only for real gaps.

| # | Decision | Why |
|---|---|---|
| 1 | What is sold or shown (the one offer) | the conversion beat |
| 2 | Who, on which device, in what mood | light/dark, density, type size |
| 3 | The feeling in three words + one "not like" | the style pack |
| 4 | The first frame | hero composition |
| 5 | The visual idea taken from the subject | bespoke vs template (`commands/style.md` subject inventory) |
| 6 | The journey (seduce → explain → prove → convert, or other) | section order |
| 7 | The interaction wanted | technique and cost |
| 8 | Where conversion happens and what it is | CTA, compliance |
| 9 | References liked and disliked, with roles | direction |
| 10 | Constraints: deadline, budget, stack, markets, languages, brand, disclosures | feasibility, regulation |

Also: **colour mode** (`disciplined` · `expressive` · `monochrome`), **font budget** (default 3), **content inventory**, **asset reality**.

## 4. Ask (only if gaps remain)

One `AskUserQuestion` round, ≤ 4 questions, each with 2–4 options and a recommended default. Good ones: the feeling (pack names), the first frame, conversion, the asset question. If the brief is complete, ask nothing: write the brief, state your reading in one line, and go to direction.

## 5. Write

Fill `templates/BRIEF.md`, set `stage=direction` (`darkroom state --set stage=direction`), and continue. Log pre-approval ("just go") if given.

## Anti-patterns

Twelve questions at once · asking for what is in the folder · waiting for an image anchor · accepting adjectives ("premium, modern") without converting them to decisions (`references/myths-and-facts.md`, "adjectives → decisions") · planning motion around assets that do not exist.
