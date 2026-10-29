# Penny Jar · a savings account for children
<!-- Darkroom example 039 · fictional product · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | landing | `family` + `trust` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a landing page for a children's savings account from a small bank. Light grey background, friendly but trustworthy, a jar that fills up with coins in the hero drawn in code, the interest rate clearly shown, and the legal small print done properly. Open an account.

## Build spec

### Brief & signature
Penny Jar is a savings account for under-16s from a regional mutual bank: parents open it, children see their jar fill in an app. Visitors are parents. Feeling: warm, safe, honest. **Signature:** an SVG jar on the right that fills with coin discs once on load (12 coins, 90 ms apart) to a level marked "€ 240 saved", with the interest rate printed on the jar's label. **Supporting:** rounded soft surfaces, a clear rate box with representative example, plain-word FAQ.

### Stack & files
Next.js App Router; `components/Jar.tsx` (SVG; coins are `<circle>`s animated with CSS, final state in the markup); `app/page.tsx`; `reveal.js` client module.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Fredoka | 600 | headline only |
| Text | Lexend | 400, 500 | body, legal |

### Tokens
```css
:root { --ground: #f5f5f5; --card: #ffffff; --ink: #172026; --ink-60: #17202699; --mint: #2f8f6b; --coin: #e9b949; --line: #1720261a;
  --display: "Fredoka", system-ui, sans-serif; --text: "Lexend", system-ui, sans-serif; --spring: cubic-bezier(.34,1.56,.64,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| jar | drawn in code | inline SVG 420 × 520 | right columns 7–12 | coins drop once | full jar static | glass jar outline 3 px ink, a paper label with the rate; coins as flat discs with a 2 px darker rim |
| app screen | the bank's real app screenshot (NEEDS 1) | `<img>` 1170 × 2532 in a device outline | contain | reveal | TEMP grey screen with "App screen" | the child's jar view with fictional numbers |

### Nav
72 px on ground: "Penny Jar" Fredoka 600 22 px + "by Weald Mutual" Lexend 400 13 px ink-60; How it works · Rates · For parents · Help; CTA "Open an account" mint fill, white text, radius 14 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Watch their savings grow, coin by coin. | Display 600, clamp(38px, 5vw, 76px) | 1.05 / −0.01em | ink | columns 1–6, top 24 vh | rise 16 px |
| Sub | A savings account for under-16s. You stay in control; they see their jar fill in the app. | Text 400, 18 px | 1.55 | ink-60 | under H1, max 440 px | delay 100 ms |
| Rate box | 3.10 % AER variable on balances up to € 5,000 | Text 500, 16 px; rate in Display 600 40 px tabular | 1.3 | ink | white card radius 16 px, padding 20 px, under sub | delay 200 ms |
| CTA | Open an account | as nav, 17 px, 54 px tall | — | — | beside the rate box | delay 200 ms |
| Jar label | 3.10 % AER | Display 600, 22 px | — | ink on `#fffaf0` | on the jar | none |

The rate and limit are TEMP until the bank's compliance team supplies the exact wording; the representative example and the deposit-guarantee line are required in the rate box's footnote (`references/compliance.md`).

### Sections
How it works (three steps with small SVG illustrations), Rates (a table with AER, gross, limits, a representative example), For parents (controls, statements), Help (FAQ in `<details>`), legal footer (registered name, number, regulator, deposit guarantee), all in Lexend 15 px minimum.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Coins | load, once | `0.4 + i × 0.09 s` | 500 ms | `--spring` | translateY(−320px), 0 → rest, 1 |
| Saved label | after last coin | 1.6 s | 400 ms | ease-out | opacity 0 → 1 |
| Sections | in view | `i × 80 ms` | 600 ms | ease-out | 16 px, 0 → 0, 1 |
Reduced motion: full jar and label at once.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Jar | 260 px under the CTA | 360 px | 420 px | 360 px |
| Rate box + CTA | stacked, full width | side by side | side by side | side by side |

### Acceptance
**First viewport:** at 1440 × 900 a light grey page; the friendly headline on the left, a white rate box with "3.10 % AER variable" and a green open-account button; on the right a glass jar that fills with gold coins once and shows "€ 240 saved". At 390 × 844 the rate box and button are visible before the jar.
**Do not:** show a rate without AER, "variable" and the limit; animate the rate; use cartoon mascots; hide the small print in grey under 13 px; promise returns.
