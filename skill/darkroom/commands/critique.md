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
5. **Slop and sameness check**: read the hero aloud; if it fits a competitor unchanged, rewrite it. Scan `references/tells.md` (gradient text, card stripes, badge over h1, emoji icons, placeholder strings, generic headlines are not caught by the audit).
6. **Distinctiveness question**: what is the one thing a visitor will remember? If you cannot name it, the page is not done.

Load `library/LESSONS.md` and the matching entries; a fix that echoes a `bad/` entry cites its slug. Apply fixes yourself through the QA loop. Only ask the user for a taste decision between two concrete alternatives.

Judge like a designer, not a linter: rank findings by what they cost a visitor (critical, high, medium, low). Fix critical to medium; mention low ones once at most, and never trade a striking idea for a low-severity rule. A great design with minor flaws reads as a great site.

Human preference is the only taste signal. When the user dislikes something, save it as a contextual preference for **this project** (bible Do/Don't), not as a universal ban.
