# Full Table · community food bank donations
<!-- Darkroom example 053 · fictional charity · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `trust` + `family` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a donation page for our food bank. Show plainly what each amount buys, today's most-needed items, how to volunteer, and where to get help if you need food yourself. Honest, warm, no sad stock photos.

## Build spec

### Brief & signature
Full Table runs two food banks in Cardiff; 1,100 parcels a month. Visitors are donors, volunteers, and people who need food. Feeling: dignified, practical, neighbourly. **Signature:** a donation picker where each amount shows what it becomes, set as a shopping list ("£ 15 → a family's breakfasts for a week: oats, milk, bread, jam"), and a "Most needed this week" shelf that staff update with item names and a fill level bar per item. **Supporting:** a clear "Need food?" route in the header, real photos of volunteers (with consent), gentle reveals.

### Stack & files
`index.html`, `styles.css`, `needs.json` (items + level 0–100, edited by staff), `recipes/reveal.js`. Donations go to the charity's existing payment page (no card fields on this site).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Bitter | 700 | headings |
| Text | Source Sans 3 | 400, 600 | body |

### Tokens
```css
:root { --ground: #fbf9f4; --ink: #1e2a26; --ink-70: #1e2a26b3; --teal: #1d6b5f; --tomato: #d1462f; --oat: #efe6d4; --line: #1e2a261f;
  --display: "Bitter", Georgia, serif; --text: "Source Sans 3", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| volunteers | own photos with consent (NEEDS 1) | `<img>` 3:2 | 50 % 40 % | reveal | oat field, TEMP | volunteers packing parcels, laughing, daylight; no recipients' faces ever |

### Nav
72 px: "Full Table" Display 700 22 px; Donate · Volunteer · About · **Need food?** (teal pill outline, always visible, links to the help page); CTA "Donate" tomato fill.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | No one in Cardiff should skip dinner. | Display 700, clamp(36px, 5vw, 76px) | 1.08 / −0.01em | ink | columns 1–6, top 20 vh | rise 16 px |
| Sub | We packed 1,100 food parcels last month with gifts from neighbours like you. | Text 400, 19 px | 1.55 | ink-70 | under H1 | delay 100 ms |
| Picker | £ 5 · £ 15 · £ 30 · Other | Text 600, 18 px, 56 px segmented control, teal selected | — | — | columns 7–12 on an oat card radius 20 px | delay 200 ms |
| Becomes | £ 15 → a family's breakfasts for a week: oats, milk, bread, jam | Text 400, 17 px | 1.5 | ink | under the picker, updates with the choice | 200 ms crossfade |
| Donate | Donate £ 15 | tomato fill, 56 px, full card width | — | — | under the text | — |

Numbers and the "becomes" lines are TEMP until the charity confirms them; the button links to the payment page with the amount.

### Sections
1. **Most needed this week:** 8 items as rows: name + a 6 px bar (level from `needs.json`, teal; below 25 % in tomato with "very low"), drop-off addresses and hours.
2. **Volunteer:** shifts per week, a sign-up link.
3. **Need food?:** how referrals work, opening times, a phone number, plain words, linked from the header.
4. Footer: registered charity number (required), trustees' report link.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Need bars | in view | `i × 60 ms` | 800 ms | `--ease-out` | width 0 → level % |
| Becomes text | picker change | 0 | 200 ms | linear | opacity crossfade |
| Sections | in view | 0 | 700 ms | `--ease-out` | 16 px, 0 → 0, 1 |
Reduced motion: bars at their level at once.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Picker card | under the sub, full width | under | right column | right column |
| Need food? | pill in the header bar, never in the menu only | header | header | header |

### Acceptance
**First viewport:** at 1440 × 900 a warm white page; a plain headline about dinner in Cardiff; on the right an oat card where choosing £ 15 shows the breakfast list and a big tomato Donate button; "Need food?" visible in the header. At 390 × 844 the headline, the picker card and the Need food? pill without scrolling.
**Do not:** use pity imagery or recipients' faces; collect card details on this page; invent impact numbers; hide the help route in a menu.
