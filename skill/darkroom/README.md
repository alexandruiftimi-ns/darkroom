# Darkroom: autonomous, art-directed landing pages for Claude Code

**You say what you want. Darkroom tells you what it needs.** No commands, no design vocabulary: ask for "a landing page for my bakery" or "something that animates as you scroll", and it replies with the options in plain words, one recommendation, and a short list of what to provide (files, facts, decisions) with what happens if you cannot.

Describe the site you want (or type `/darkroom`). Claude decides the direction, builds the page, looks at the real browser output, and fixes what it sees. **You** supply business facts, any assets and references (all optional), generate the few images or clips it asks for from its prompts, and decide at three moments: the direction, a working slice, the final result.

Scope: single landing pages (product launches, hospitality, services, SaaS, portfolios, campaigns). Catalogs, articles and apps need different rules (`references/surfaces.md`).

## Install

Copy this folder to `~/.claude/skills/darkroom` (all projects) or `<project>/.claude/skills/darkroom` (one project). Restart Claude Code. Needs Node 18+ and Playwright (from the project, or a global install). ffmpeg and sharp are optional accelerators; the media tools fall back to headless Chromium. Darkroom does not need any other skill.

## What a run looks like

```
You:     a landing page for <business>. <what you have: copy, photos, references, can you generate images/video?>
Claude:  reads what exists, classifies the surface and your asset tier, builds two coded hero comps        → you pick / steer
Claude:  builds the slice (hero + its key motion + the next transition), QA loop on its own captures       → you review a working preview
Claude:  asks, in one batch, for the few assets that lift the result most, and keeps building meanwhile
Claude:  builds the rest, verifies (audit, captures in both motion modes, media checks, compliance)        → you do the final review
```

State survives restarts: `node scripts/darkroom.mjs state`.

## Tools

```
node scripts/darkroom.mjs init | state
node scripts/darkroom.mjs capture <url|dir|file> [--scene "#id" --steps 10] [--film] [--both] [--states file.json] [--crop css]
node scripts/darkroom.mjs audit <url|dir|file>        # measured / heuristic / manual findings, per viewport; `checks` lists them
node scripts/darkroom.mjs media inspect|derive|frames|check
node scripts/darkroom.mjs assets search|get|credits   # openly licensed images with recorded provenance
node scripts/darkroom.mjs study <url> | compare <ref> <shot>
(regression tests live in the repository, not in the installed skill)
```

## What is inside

`SKILL.md` the flow and the laws · `commands/` playbooks per stage · `references/` knowledge (surfaces, craft, motion, critique, typography, colour, attention, reading paths, tells, compliance, provenance) · `recipes/` tested scroll/motion code with demo pages · `styles/` packs and switches · `library/` written lessons from real sites (evidence, not templates) · `prompts/` image/video-model templates · `templates/` project files.

Not legal advice; `comply` is a build checklist that flags questions for a lawyer. Nothing here certifies that a page is "worth $10,000": the user's eye is the final judge.
