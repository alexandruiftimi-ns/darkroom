# Quiet Harbour · counselling and therapy practice
<!-- Darkroom example 086 · fictional practice · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `wordpress` | landing | `trust` + `nature` | `calm` | none | — |

## Say this
> /darkroom a gentle WordPress site for my counselling practice: who I help, how sessions work, fees, and how to book a free 15-minute call. Calm, private, nothing flashy. Some people visiting are struggling, so it must feel safe.

## Build spec

### Brief & signature
Dr Amaka Eze is a BACP-accredited counsellor in Brighton offering in-person and online sessions for anxiety, grief and burnout; £ 65 a session, sliding scale. Visitors are people in distress, often at night. Feeling: safe, warm, unhurried. **Signature:** a "What to expect" section written as three calm steps with real details (a free 15-minute call, the first session, then weekly at the same time), and a quiet "If you need help right now" line in the header linking to crisis numbers, always reachable but never alarming. **Supporting:** soft sea-glass colours, large readable type, no animation.

### Stack & files
Block theme; `patterns/expect.php`, `patterns/fees.php`; booking via the practitioner's booking tool link; contact form with no required personal details beyond name and email, and a note on confidentiality.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Lora | 500 | headings |
| Text | Mulish | 400, 600 | body 19 px |

### Tokens
```css
:root { --ground: #f6f7f4; --seaglass: #dfeee8; --ink: #22302c; --ink-70: #22302cb3; --pine: #2f5d50; --line: #22302c1a;
  --display: "Lora", Georgia, serif; --text: "Mulish", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| room photo | own (NEEDS 1) | `<img>` 3:2 | cover | static | sea-glass field | the counselling room: two chairs angled, a plant, window light; no clinical objects |
| portrait | own (NEEDS 2) | `<img>` 4:5 | 50 % 35 % | static | none | warm, natural, looking slightly off-camera |

### Nav
72 px: "Quiet Harbour Counselling" Display 500 20 px; Who I help · How it works · Fees · About; "Book a free call" pine fill. Above it, a 32 px line on `--seaglass`: "If you need help right now: Samaritans 116 123 (free, 24 hours) · NHS 111" (check numbers for the region).

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | A calm place to talk, at your own pace. | Display 500, clamp(34px, 4.6vw, 64px) | 1.15 / 0 | ink | columns 1–6, top 22 vh | none |
| Sub | Counselling for anxiety, grief and burnout, in Brighton or online, with Dr Amaka Eze. | Text 400, 19 px | 1.6 | ink-70 | under H1, max 460 px | none |
| CTA | Book a free 15-minute call | pine fill, ground text, 56 px, radius 12 px | — | — | under sub | none |
| Reassurance | Confidential · BACP accredited · Evening sessions available | Text 600, 15 px | — | pine | under CTA | none |
| Photo | room | radius 24 px | — | — | columns 7–12 | none |

Accreditation and fees TEMP until confirmed.

### Sections
Who I help (four areas, 40 words each), What to expect (three steps), Fees (session £ 65, sliding scale explained, cancellation policy), About (portrait, training, approach in plain words), Contact (form + email; "I reply within two working days").

### Motion
None beyond 150 ms colour changes on hover and focus: `calm` by design for this audience.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Help line | wraps to two lines, numbers as tap links | one line | one line | one line |
| Photo | after the reassurance line | right | right | right |

### Acceptance
**First viewport:** at 1440 × 900 a soft grey-green page; a quiet line of crisis numbers at the very top; a gentle serif headline, a short plain sub, a pine booking button and three reassurances on the left; a calm photo of two chairs on the right. At 390 × 844 the help line, headline and button visible without scrolling.
**Do not:** use animation, pop-ups or chat widgets; show stock photos of people in distress; require phone numbers in forms; promise outcomes.
