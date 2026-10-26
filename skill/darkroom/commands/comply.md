# /darkroom comply — regulation pass

Not legal advice; a design-and-build checklist that catches what websites most often get wrong. Load `references/compliance.md` for the rules and sources. Markets come from the BRIEF.

## Run

1. `node <skill>/scripts/darkroom.mjs audit <url>` — reuse its a11y, third-party-request and price findings.
2. Walk the checklist below against the built pages; mark each PASS / FAIL / N/A with evidence (selector, screenshot, URL).

## Checklist

**Accessibility (EU EAA → EN 301 549 → WCAG 2.1 AA; target WCAG 2.2 AA; US ADA practice uses WCAG 2.1/2.2 AA)**
- Contrast 4.5:1 body / 3:1 large & UI; focus visible and not obscured by sticky UI (2.4.11); targets ≥ 24 px (2.5.8); keyboard-only path through every flow; no drag-only actions (2.5.7); captions/alt; reduced-motion; no content flashing > 3×/s; auto-moving content > 5 s pausable (2.2.2); zoom 200 % and 320 px reflow; form labels and errors in text; `lang`.
- An accessibility statement page if EU-market commerce/services.

**Privacy & consent (GDPR + ePrivacy; UK PECR; US state laws)**
- No non-essential cookies/trackers/third-party embeds before consent; "Reject all" as easy and as prominent as "Accept all" on the first layer; no pre-ticked boxes; withdraw as easy as give.
- Self-host fonts (remote Google Fonts transmitted IPs → German court damages, 2022). Video embeds via click-to-load.
- Privacy notice + imprint/legal notice where required (e.g. DE/AT Impressum).

**Prices & commerce (EU)**
- Consumer prices shown as final price incl. VAT and taxes; extra fees stated before checkout; unit price where required.
- Any "was/now" discount shows the lowest price of the prior 30 days (Omnibus Art. 6a).
- No fake urgency/scarcity (countdowns that reset, invented stock), no confirmshaming, no hidden subscription, cancellation as easy as sign-up (UCPD, DSA Art. 25 for platforms, national rules).

**Content honesty & IP**
- No invented testimonials, reviews, ratings, client logos or stats.
- Rights for every image, font (licence allows web embedding), video, music; third-party trademarks only with permission or clear nominative/fan-concept disclosure.
- AI-generated or manipulated imagery of realistic people/events that could be taken as real: visibly disclosed (EU AI Act Art. 50, applies from 2 Aug 2026). Product renders presented as photos of a product that doesn't exist: disclose.
- Fictional/concept projects: visible disclaimer; no real payment or data capture.

## Output

Table of FAILs with fix + owner, and items needing a lawyer (flag, don't decide). Log sign-off in APPROVALS.md.
