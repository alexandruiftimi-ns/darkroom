# Prompt for an AI builder (`prompt`)

Checked on: 2026-10-28 against the docs below. Lovable's docs said that day that apps created from 13 May 2026 use **TanStack Start** (older apps React + Vite); v0 and Bolt name no fixed default stack. Re-check before writing: these tools change monthly.

## Choose it when
The user builds in **Lovable, Bolt, v0, Cursor, Replit, Manus, Google AI Studio or Kimi** and wants a prompt to paste, not files. Darkroom still does the design (direction, bible, build spec); the deliverable is `PROMPT.md`, the build spec rewritten for that tool. Not when the user wants Darkroom to build and host the site: pick a real platform.

## Official docs to check before building
- https://docs.lovable.dev/introduction/faq (stack, Plan mode, reverting)
- https://v0.app/docs/text-prompting (be specific, build incrementally, queued prompts)
- https://support.bolt.new/best-practices/prompting-effectively (architecture first, one feature per prompt)

## Ask before building
- **Which tool will you paste it into?** Lovable / v0 / Bolt / Cursor or Claude Code / Replit, Manus, AI Studio or Kimi (recommended: the one they already use).
- **Where are your pictures and videos?** "Uploaded to the tool" (then name each file in the prompt) / "On my own site or storage" (exact URLs) / "None yet" (the prompt asks for a flat ground in the page colour, never stock hotlinks).
- **Hero only, or the whole page?** Builders do best with the hero first and the next two sections after (recommended for Lovable and v0).

## What Darkroom delivers
`PROMPT.md` (start from `templates/platforms/prompt/PROMPT.md`), plus the assets sized and named for upload. Structure, in this order:
1. **Tool line**: `Tool: <name>` and the opening line for it (table below).
2. **What it is** (one sentence) and the **signature** (the one thing the page is remembered for).
3. **Design tokens**: colours as hex (and HSL triplets for Tailwind/shadcn tools), fonts with weights and fallbacks, type sizes per role, spacing, radius.
4. **Sections in order**, each with exact copy (no placeholders), layout in numbers, and its motion with durations, staggers and easing.
5. **Assets**: exact file names or URLs of the user's own files. Never a third-party hotlink.
6. **Responsive**: what changes below 768 px.
7. **Do not** (always last): the constraints, one per line.

Rules: numbers, not adjectives (the `darkroom spec` rule); exact copy; constraints last; 3–15k characters is normal. If the result drifts: **one focused fix per message**, and Darkroom writes those follow-ups too.

| Tool | Opening line | Notes |
|---|---|---|
| Lovable | "Build this as a single landing page in the project's default stack (TanStack Start for new projects) with Tailwind." | Hero + next two sections first; use Plan mode to review before it builds; revert rather than argue with a bad turn |
| v0 | "Next.js App Router, TypeScript, Tailwind, shadcn/ui." | Spell out every animation (it is conservative with motion); queue follow-ups instead of one giant prompt |
| Bolt | "Stack: <the user's choice, else Vite + React + Tailwind>." | Architecture first, then one feature per prompt; numbered structure |
| Cursor / Claude Code | "Work in this repository's stack: <stack>." + the file tree | The user's own stack; point at the files to change |
| Replit, Manus, AI Studio, Kimi | "One standalone index.html with inline CSS and JS." | Every asset URL spelled out; no build step |

## Where the design goes
Inside the prompt: tokens first (so the tool writes them as variables), then each section. Recipes (`recipes/*.js`) can be pasted as code blocks for tools that accept them (Cursor, Claude Code, Bolt); for Lovable and v0 describe the behaviour in numbers instead and let the tool write it.

## Preview and capture
**The Darkroom edge:** when the builder shows a preview URL, ask for it, then `darkroom capture <url>` and `darkroom audit <url>` it like any page, and write the fix prompts from what was found (one fix per message, most visible first). Without a URL, ask for a screenshot and read it.

## Deploy and free hosting
The builder's own publish button and plans (check current pricing; most have a free tier with limits). For a custom domain or leaving the builder later, most can export to GitHub; then any `static` or `nextjs` host works.

## Gotchas
- `darkroom platform check --platform prompt <folder>` lints `PROMPT.md`: a `Tool:` line, a **Do not** block at the end, no placeholder copy, no bare adjectives, no third-party media URLs, size in range.
- Builders invent copy and stock images when the prompt leaves gaps: give every word and every file.
- Long prompts get partly ignored: hero first, then sections in follow-ups.
- The tool's stack wins over the prompt's wishes: if it insists on its stack, keep the design numbers and drop the stack line.
