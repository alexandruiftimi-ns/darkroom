# Parcel · a shared inbox for small medical practices
<!-- Darkroom example 020 · fictional product · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | landing | `modern` + `trust` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a landing page for our shared inbox software for small clinics. Show the real product in the hero as a working inbox built in the page (not a screenshot), calm colours, no gradients or glowing stuff. Start a free trial.

## Build spec

### Brief & signature
Parcel lets a practice of 3–20 people share one patient inbox: assign a message, see who is replying, close it. Visitors are practice managers. Feeling: calm, competent, quick. **Signature:** an inbox window built in real DOM in the hero: five messages, and every 4 s one of them is assigned to a colleague (avatar initials slide in), marked "replying…", then moves to Done; hovering pauses the loop. **Supporting:** a quiet product palette, tabular counts, reveals on feature rows.

### Stack & files
Next.js App Router, `app/page.tsx`, `components/InboxDemo.tsx` (client), CSS modules. The demo is `aria-hidden="true"` with a text description next to it for screen readers; no real data.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Geologica | 500 | headlines |
| Text | Geologica | 400 | UI, body |
| Figures | Geologica | 400 tabular | counts |

### Tokens
```css
:root { --ground: #f6f7f5; --surface: #ffffff; --ink: 200 18% 14%; --ink-60: hsl(var(--ink) / .6); --sage: #3f6f60; --sage-wash: #e7efeb; --amber: #b86b1d; --line: hsl(var(--ink) / .1);
  --display: "Geologica", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); --ease-state: cubic-bezier(.4,0,.2,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| inbox demo | built in code | `<div class="window">` 760 × 480, radius 14 px, 1 px line, `box-shadow: 0 24px 60px -30px hsl(var(--ink) / .25)` | right columns 6–12 | loop below | static five rows | messages use invented first names and generic subjects ("Repeat prescription", "Moving my appointment"); no real patient data |

### Nav
64 px, ground: "Parcel" Geologica 500 18 px; Product · Pricing · Security · Log in; CTA "Start a free trial" sage fill, white text, radius 8 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Every patient message has one owner. | Display 500, clamp(38px, 4.6vw, 72px) | 1.05 / −0.03em | ink | columns 1–5, top 20 vh | rise 16 px, 700 ms |
| Sub | Parcel gives your practice one shared inbox: assign, reply, close, and see who is on it. | Text 400, 18 px | 1.55 | ink-60 | under H1, max 420 px | delay 100 ms |
| CTA | Start a free trial | Text 500, 16 px | — | — | under sub | delay 200 ms |
| Note | 30 days, no card. GDPR-compliant hosting in the EU. | Text 400, 13 px | — | ink-60 | under CTA | delay 250 ms |
| Window | — | — | — | — | columns 6–12, top aligned with H1 | fades up 24 px, delay 300 ms |

Hosting and compliance claims are TEMP until the company confirms them.

### Interaction logic
State: five rows `{ from, subject, owner, status }`. Every 4000 ms (paused on hover, focus inside, hidden tab, or off-screen): pick the oldest unassigned row; step 1 owner initials slide in from the right (300 ms); step 2 status "replying…" with a 3-dot pulse for 1.2 s; step 3 row slides to the Done tab (counter +1, tabular) in 400 ms. After all five, reset with a 600 ms crossfade. Reduced motion: static window showing three assigned, one replying, one open.

### Sections
1. **Three jobs:** Assign · Reply together · Close the loop: rows that alternate copy left / small DOM detail right (an assignment chip, a collision warning "Sanne is replying", a done count).
2. **Security:** short paragraph + a checklist, each item linked to the real policy page (TEMP).
3. **Pricing:** per-seat price incl. VAT, one plan.
4. **Close:** "Try it with your team on Monday." + CTA.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Hero text | load | `i × 100 ms` | 700 ms | `--ease-out` | 16 px, 0 → 0, 1 |
| Demo steps | 4 s interval | — | 300 / 1200 / 400 ms | `--ease-state` | as interaction logic |
| Feature rows | in view | 0 | 700 ms | `--ease-out` | 24 px, 0 → 0, 1 |

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Window | below copy, scaled to 100 % width, three rows visible | below copy | right | right, 420 px tall |
| H1 | 36 px | 56 px | 72 px | 60 px |

### Acceptance
**First viewport:** at 1440 × 900 a soft grey-green page, the headline left, and on the right a white inbox where a message quietly gets an owner, a "replying…" state, and moves to Done; it stops when hovered. At 390 × 844 headline and button, then the inbox below.
**Do not:** use a screenshot; use gradient text, glows or a purple accent; show real patient data; claim certifications not confirmed; auto-advance while the visitor hovers.
