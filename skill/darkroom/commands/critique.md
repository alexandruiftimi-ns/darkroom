# Critique: look hard at what was built (feeds the auto-QA loop and checkpoint prep)

Premium cannot be certified by a score, least of all by the model that made the page. Do not produce "8.5/10". Produce **specific, checkable observations** and fixes, then let the user judge the taste.

Method: `references/critique-method.md`. In short:

1. **Capture first** (`darkroom capture --both`, scene progress for scrubbed parts, `--film` for cadence, 1:1 crops of the first frame and the text zone). Read the sheets, then the crops.
2. **Four separate questions**, answered separately:
   - *Technical correctness*: from the audit and console (measured findings; heuristics as questions).
   - *Brief fidelity*: does it sell the offer, serve the audience, respect the constraints and the disclosures?
   - *Reference fidelity*: composition vs the approved comp or reference, regional, same state and viewport.
   - *Craft*: hierarchy, type, spacing rhythm, crop and subject scale, image quality, identity consistency, section rhythm and transitions, phone composition, motion quality (does it serve the claim; reversible; calm).
3. **Defect records**, not adjectives: State / Observed / Impact / Change / Re-check. Top 3–5 by impact.
4. **Keep list**: 3 things that work and must survive edits.
5. **Slop and sameness check**: `audit --quick` now blocks the visible reflexes (`gradient-text`, `ai-gradient`, `card-stripe`, `eyebrow`, `accent-word`, `emoji-icon`, `fake-chrome`, `template-punct`, `stock-cta`, `css-motion`, `proof`, `placeholder`) and counts them (`slop-count`, high at 3 or more kinds). Every `proof` item is either removed (invented) or given its source in the markup (real, from the brief). Then judge what it cannot see (`references/tells.md`, "What audit measures vs what needs eyes"): read the hero aloud, and if it fits a competitor unchanged, rewrite it; check the anatomy against the visitor's job (`references/anatomy.md`) and the mirror test; look for the fake product, the stock close, the echo, decoration text; submit every form and watch the network: a "Thanks" with no request behind it is a floor failure. A reflex the design keeps goes into the bible's `keepTells` with its reason.
6. **Distinctiveness question**: what is the one thing a visitor will remember? If you cannot name it, the page is not done.

Before the final handoff the critique ends with the finish review by a fresh-context reviewer (`references/fresh-review.md`): you are the weakest judge of what you built.

Load `library/LESSONS.md` and the matching entries; a fix that echoes a `bad/` entry cites its slug. Apply fixes yourself through the QA loop. Only ask the user for a taste decision between two concrete alternatives.

Judge like a designer, not a linter: rank findings by what they cost a visitor (critical, high, medium, low). Fix critical to medium; mention low ones once at most, and never trade a striking idea for a low-severity rule. A great design with minor flaws reads as a great site.

Human preference is the only taste signal. When the user dislikes something, save it as a contextual preference for **this project** (bible Do/Don't), not as a universal ban.
