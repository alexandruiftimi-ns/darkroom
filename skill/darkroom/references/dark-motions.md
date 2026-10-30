# Dark Motions: choosing motion that fits

The pieces live in `recipes/motions/` (catalogue: `recipes/motions/INDEX.md`, live demo: `recipes/motions/demo.html`). They are plain CSS, SVG and JS, written for Darkroom, with no library. The budget is the existing rule in `references/modes.md` ("One signature per page"); this file says how to pick.

## Pick in this order

1. **Motion level** (intake, `references/modes.md`). `calm`: no Dark Motions, only feedback states and the page's type or crop signature. `animated`: an entrance system + up to two accents. `hero-effect` and `story`: the signature is the hero effect or the chapters; Dark Motions only as quiet accents.
2. **Pack.** Use only pieces whose Packs column lists the page's primary pack (or a modifier). "any" fits everywhere but is never the signature on its own.
3. **A job for each piece.** Feedback (a press, a send), guiding the eye (one CTA), showing a change (a number, a state), or the one signature moment. No job, no piece.
4. **Count.** One signature, at most two accents, one entrance style used the same way on every section, feedback with one easing and one speed. At most three things moving by themselves in any screen. A recipe in `recipes/README.md` that does the same job wins over a Dark Motion (INDEX names the overlaps).
5. **Colour and pace from the bible.** Set `--dm-a` (accent role), `--dm-b`, `--dm-c` (second and third accents or `currentColor`), `--dm-ink`, `--dm-bg`, `--dm-muted` from the colour roles, and `--dm-dur` from the motion grammar (1 = normal, 0.6 = brisk, 1.4 = slow). Never ship the demo colours.

## Show and change

- Each direction in `commands/style.md` names its signature and accents from the catalogue (one line each, with the job).
- When the user dislikes a pick, say once: "Want different ones? Describe what you'd like, or say shuffle and I'll pick another set that fits." Shuffle draws again under the same pack and budget.
- When the user explicitly asks for more motion than the budget, warn once in one line, then do it and wrap the extra pieces in `data-motion-allow`: the audit reports them as info instead of flagging them. The user decides.

## Never

- Two pieces that move by themselves in the same component, or two cursor effects on one page.
- A looping piece under body text, behind a form, a price or legal text.
- Cursor pieces on touch screens (the kit only starts them for a mouse or trackpad).
- Weight effects without a variable font the site self-hosts.

The audit's `motion-budget` check counts what moves by itself per screen; `reduced-motion` and `motion-rest` check the calm and no-JavaScript paths.
