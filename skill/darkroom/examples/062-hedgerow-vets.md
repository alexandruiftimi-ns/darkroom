# Hedgerow Vets · small-animal veterinary practice
<!-- Darkroom example 062 · fictional practice · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `family` + `trust` | `calm` | none | — |

## Say this
> /darkroom a friendly website for our vet practice: emergency info first, then register your pet, our vets, prices for common things like vaccinations, and opening hours. Warm but professional. Simple to host.

## Build spec

### Brief & signature
Hedgerow Vets is a three-vet practice in a market town in Devon; cats, dogs, rabbits; out-of-hours care through a partner clinic. Visitors are worried owners (some in an emergency) and new arrivals registering a pet. Feeling: kind, calm, competent. **Signature:** a two-path opening: a red "Emergency now?" card with the in-hours and out-of-hours numbers and what to do in the next 10 minutes, next to a green "Register your pet" card; both 50 % of the first screen, so nobody hunts. **Supporting:** a price list for common treatments, vet profiles with their own pets, illustrated paw-free icons drawn in a single line.

### Stack & files
`index.html`, `register.html` (form to the practice's mailbox through their form service), `styles.css`, no JS. Host on Cloudflare Pages.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Fraunces | 600 (SOFT 100, WONK 0) | headings, a soft serif |
| Text | Nunito Sans | 400, 700 | body |

### Tokens
```css
:root { --ground: #fbf8f3; --ink: #1f2a2e; --ink-70: #1f2a2eb3; --leaf: #2f6b4f; --urgent: #b42318; --urgent-wash: #fdeceb; --leaf-wash: #e8f2ec; --line: #1f2a2e1f;
  --display: "Fraunces", Georgia, serif; --text: "Nunito Sans", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| vets ×3 | own photos (NEEDS 1) | `<img>` 1:1 | 50 % 35 % | static | initials, TEMP | each vet with their own pet, outside the practice |
| line icons ×6 | drawn in code (SVG, 2 px stroke) | inline | — | static | — | vaccination, dental, microchip, neutering, nail clip, nurse clinic |

### Nav
64 px: "Hedgerow Vets" Display 600 22 px; Services · Prices · Our team · Find us; phone "01392 496 000" (TEMP) as a link.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Caring for Crediton's cats, dogs and rabbits since 1988. | Display 600, clamp(30px, 3.6vw, 52px) | 1.15 / −0.01em | ink | full width, top 12 vh | none |
| Emergency card | Emergency now? · In hours: 01392 496 000 · Out of hours: 01392 496 999 (Moorside Vets) · Keep your pet warm and still; call before you travel. | Display 600 32 px title; Text 400 18 px; numbers Text 700 24 px tabular, tap-to-call | 1.4 | ink, title urgent | left half, `--urgent-wash`, radius 20 px, padding 32 px | none |
| Register card | New to the area? · Register your pet in 3 minutes. First vaccination check £ 25. · [Register your pet] | same scale; button leaf fill | 1.4 | ink, title leaf | right half, `--leaf-wash` | none |

Numbers, partner clinic and prices are TEMP until confirmed.

### Sections
Services (six with line icons), Prices (common treatments table incl. VAT; "From" only where the price really varies, with why), Our team (three vets, two nurses), Find us (address, parking, hours table, accessible entrance), footer with RCVS registration statement.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Buttons, links | hover / focus | 0 | 150 ms | `cubic-bezier(.4,0,.2,1)` | colour |
Calm.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Cards | stacked: emergency first | stacked | side by side | side by side |
| H1 | 28 px | 40 px | 52 px | 44 px |

### Acceptance
**First viewport:** at 1440 × 900 a warm off-white page; a gentle serif line about the practice; below it two big cards: a soft red emergency card with two large tap-to-call numbers and a one-line instruction, and a soft green registration card with a button. At 390 × 844 the emergency card first with both numbers visible without scrolling.
**Do not:** hide the out-of-hours number; use stock puppies; show prices as images; give medical advice beyond "call us".
