# Okafor & Lind · employment law for employees
<!-- Darkroom example 045 · fictional firm · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `wordpress` | landing + editorial | `trust` + `editorial-news` | `calm` | none | — |

## Say this
> /darkroom a WordPress site for our small employment-law firm. We act for employees, not companies. People arrive stressed after being dismissed; they need to know quickly if we can help, what it costs, and how to contact us. Serious but human.

## Build spec

### Brief & signature
Okafor & Lind are four solicitors in Manchester acting for employees: unfair dismissal, discrimination, settlement agreements. Visitors are people in a crisis, often on a phone late at night. Feeling: steady, plain-spoken, on your side. **Signature:** a three-question "Can we help?" block in the hero (What happened? · When? · Are you still employed?) as large radio buttons that lead to the right advice page, with the time-limit warning ("You usually have 3 months less one day to start a claim") stated plainly. **Supporting:** fixed-fee prices in a table, editorial typography for guides, no stock gavels.

### Stack & files
Block theme; `patterns/can-we-help.php` (a form of radio groups, submits by GET to the matching guide page; works without JS), `patterns/fees.php`, guides as WordPress posts in a "Guides" category with a long-read template. Content stays in WordPress.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Source Serif 4 | 600 | headings |
| Text | Source Sans 3 | 400, 600 | body and UI |

### Tokens
```css
:root { --ground: #fafaf8; --ink: #1b1f24; --ink-70: #1b1f24b3; --navy: #1f3a5f; --gold: #c39a3d; --line: #1b1f241f;
  --display: "Source Serif 4", Georgia, serif; --text: "Source Sans 3", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| portraits ×4 | own photos (NEEDS 1–4) | `<img>` 4:5 | 50 % 30 % | static | initials in navy circles, TEMP | each solicitor at a desk by a window, no arms crossed |
| hero | none | — | — | — | — | type-led first screen by choice |

### Nav
72 px: "Okafor & Lind" Display 600 22 px + "Employment solicitors" Text 14 px ink-70; Dismissal · Discrimination · Settlements · Fees · Guides; phone link "0161 496 0123" (TEMP); button "Free 15-minute call" navy fill.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Dismissed, pushed out or treated unfairly at work? | Display 600, clamp(34px, 4.6vw, 64px) | 1.1 / −0.01em | ink | columns 1–7, top 18 vh | none |
| Sub | We act only for employees. Tell us what happened and we'll tell you, free and in 15 minutes, whether you have a case. | Text 400, 20 px | 1.55 | ink-70 | under H1, max 560 px | none |
| Can we help? | three radio groups, 56 px tall options, navy 2 px focus ring | Text 600, 17 px | — | ink | columns 8–12, white card radius 12 px, 1 px line | none |
| Warning | You usually have 3 months less one day from the dismissal to start a claim. | Text 600, 16 px, gold left rule 3 px | 1.5 | ink | under the sub | none |

Limitation wording is TEMP until the firm checks it.

### Sections
1. **What we do:** three areas, each a heading, 40 words, "Read the guide".
2. **Fees:** fixed fees table (settlement agreement review: often paid by the employer; first call free).
3. **People:** four solicitors with SRA numbers (TEMP).
4. **Guides:** latest five posts, long-read template at 70ch, 19 px/1.65.
5. Footer: SRA regulation statement and number (required), complaints procedure link.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Radio options | hover / focus / checked | 0 | 150 ms | `cubic-bezier(.4,0,.2,1)` | border and background |
Nothing else moves.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Can we help? | under the warning, full width | under | right column | right column |
| Phone | sticky "Call us" bar at the bottom | header | header | header |

### Acceptance
**First viewport:** at 1440 × 900 a quiet off-white page; a direct serif question on the left with a plain promise and a gold-ruled time-limit warning; on the right a white card asking three simple questions with large options. At 390 × 844 the question, the promise, the warning, then the card, with a sticky call bar.
**Do not:** use gavel, scales or handshake imagery; promise outcomes; hide fees; drop the SRA statement; require JavaScript for the questions.
