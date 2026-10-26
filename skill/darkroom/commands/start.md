# Intake: brief, surface, asset tier (stage 0)

How to *talk* to the user during intake (plain words, recommended defaults, the "what I need from you" card) is `commands/concierge.md`; read it first. This file is what you decide and record.

Goal: a confirmed `.darkroom/BRIEF.md` in **at most two question rounds**, then straight on to direction. Fifteen minutes, not a workshop.

## 1. Set up and read what exists

1. `node <skill>/scripts/darkroom.mjs init` (creates `.darkroom/` and `project.json`; adopts an existing `PROJECT_BLUEPRINT.md` / `DESIGN.md`; never overwrites).
2. `darkroom state` to see whether this is a resume.
3. If the request names their current site (a URL or a folder), run the listing first and follow `commands/import.md` (ownership, what to bring over, which pages, what it is built with) and read `.darkroom/import/CONTENT.md` before anything else. "Built with" decides the platform default (stay where they are) and, on WordPress, whether to restyle the current theme (`platforms/wordpress.md`).
4. Read everything the user already gave: brief text, `CLAUDE.md`, any blueprint, existing code (`package.json`, stack), the assets folder (`darkroom media inspect <dir>`), reference images (open each: a filename is not an inspection), copy documents. Extract answers before asking anything.

## 2. Classify (decide these yourself; state them in one line each)

- **Platform:** where the site will live (`platforms/README.md`): static, php, astro, nextjs, hugo, jekyll, wordpress, woocommerce, shopify or ghost. Read its profile, run the live-docs check and add its "Ask before building" questions to the question round (`commands/platform.md`). `darkroom state --set platform=<id>`. Closed builders (Wix, Squarespace, Webflow, Framer) get a design kit (`platforms/builders.md`).
- **Surface:** `landing` (default), `catalog` (shops), `editorial` (blogs, publications) or several (a shop has a landing home page and catalog templates); say which rules change (`references/surfaces.md`). Set `surface` in `project.json` and the bible's `darkroom` block.
- **Colour choice** (`references/color.md`, "Asking about colour"): own palette, suggested, 60-30-10, creative or monochrome. `--set palette=…`.
- **Assets: own or prompts** (`references/asset-tools.md`), and which tools the user has.
- **Build scope:** `home` (build and approve the home page, then the rest), `page:/<path>` (one named page first) or `all` (the whole site now). Multi-page sites only; a one-page site is `all`. The user decides; it is their usage. `--set scope=…`.
- **Check depth:** `quick` (home page + the page that earns money, desktop + phone) or `full` (every template, every viewport, motion on and off). It limits the checking, never the building. The user decides; it is their usage. `--set verify=…`.
- **Asset tier** (what is actually available, which sets the achievable visual ceiling):
  - **A: own photography / footage / product renders / 3D exist** → design around them; process them with `darkroom media`.
  - **B: some assets** (logo, a few photos, a short clip, UI screenshots) → build the strongest page those carry; list the 3–5 assets that would lift it most.
  - **C: nothing but words** → type-led composition, real UI built in code, drawn-in-code graphics, openly licensed archival/found imagery with provenance (`commands/plates.md`), and generated plates if the user can make them. Say plainly what this tier can and cannot reach.
  - Ask once: can the user generate images (which tool), video (which tool, budget), 3D? Their answer changes the motion plan, so it comes before direction, not after the storyboard.
- **Look and motion level** (`references/modes.md`): the look is a style pack or `like:<brand>` (then follow `commands/lookalike.md`); the motion level is `calm` / `animated` / `hero-effect` / `story`. Pick the cheapest convincing technique for the assets in hand (`references/motion.md`, `references/motion-toolkit.md`). Record: `darkroom state --set mode=<level>,look=<pack:name|like:brand>`.
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

At most two `AskUserQuestion` rounds, ≤ 4 questions each, each with 2–4 options and a recommended default, in the order of `commands/concierge.md`: round 1 platform, feeling, colours, assets; round 2 the platform's own questions, conversion, tools, check depth. If the brief is complete, ask nothing: write the brief, state your reading in one line, and go to direction.

## 5. Write

Fill `templates/BRIEF.md`, set `stage=direction` (`darkroom state --set stage=direction`), and continue. Log pre-approval ("just go") if given.

## Anti-patterns

Twelve questions at once · asking for what is in the folder · waiting for an image anchor · accepting adjectives ("premium, modern") without converting them to decisions (`references/myths-and-facts.md`, "adjectives → decisions") · planning motion around assets that do not exist.
