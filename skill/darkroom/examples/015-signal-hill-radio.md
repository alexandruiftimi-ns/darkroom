# Signal Hill Radio · community radio station
<!-- Darkroom example 015 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing (single viewport) | `cyberpunk` (restrained) | `hero-effect` | none | — |

## Say this
> /darkroom a single-screen page for our community radio station. A dot-matrix display font like an old LED sign for the station name and what's on now, a looping night video of the transmitter hill behind it, and a big Listen live button.

## Build spec

### Brief & signature
Signal Hill Radio broadcasts volunteer shows on 104.6 FM from a hill above Sheffield. Visitors want to listen now or see what's on. Feeling: nocturnal, local, warm hum. **Signature:** the "now playing" line set in a dot-matrix face like an LED sign, with the show name ticking in character by character (30 ms per character) when it changes. **Supporting:** a night loop of the mast with its red light, one listen button, a schedule strip.

### Stack & files
`index.html`, `styles.css`, `main.js` (reads `schedule.json` to show the current and next show in the visitor's time zone converted to UK time; no live API), `<audio>` element for the stream URL the station supplies (NEEDS 2).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Doto | 700 | dot-matrix, OFL; station name, now playing |
| Text | Radio Canada | 400, 600 | UI |

### Tokens
```css
html, body { background: #07060a; }
:root { --ground: #07060a; --ink: 30 20% 92%; --led: #ff5a3c; --amber: #ffb547; --line: hsl(var(--ink) / .1);
  --dot: "Doto", ui-monospace, monospace; --text: "Radio Canada", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| mast loop | filmed by a volunteer or generated (NEEDS 1) | `<video muted loop playsinline autoplay poster>` | cover, 72 % 40 % | loops | poster | a lattice radio mast on a hill at night, red aviation light blinking slowly (≤ 1 per second), city glow at the horizon; left 50 % dark sky; edges fall to `#07060a`; locked camera |
| stream | station's stream URL | `<audio preload="none">` | — | starts only on click | link to the stream page | — |

### Nav
None beyond a top row: "Signal Hill Radio" text 600 15 px left, "Schedule · Shows · Volunteer · Donate" right in 14 px ink-60.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Station | SIGNAL HILL 104.6 | Dot 700, clamp(48px, 9vw, 150px) | 0.9 / 0 | `--led` | left gutter, top 18 vh | none |
| Now label | ON AIR NOW | Text 600, 12 px +0.16em | 1 | ink-60 | above now line | blinking dot (1 s period, 0.5 duty), off under reduced motion |
| Now line | Night Shift with Priya · until 23:00 | Dot 700, clamp(22px, 2.6vw, 40px) | 1.1 | `--amber` | under station | characters tick in at 30 ms |
| Listen | ▶ Listen live | Text 600, 18 px, led fill, ground text, 56 px tall, radius 999 px | — | — | under now line | `:active` scale .97 |
| Next | Next: Steel City Soul at 23:00 | Text 400, 15 px | 1.4 | ink-60 | under button | none |
| Strip | today's six shows with times | Text 400, 13 px tabular | — | ink-60 | bottom, hairline above | none |

LED text glow: `text-shadow: 0 0 18px #ff5a3c66` on the station name only. Show names and times are TEMP until `schedule.json` is filled.

### Interaction logic
Listen toggles play/pause on the `<audio>`, label switches "❚❚ Pause", `aria-pressed`. Errors show "Stream unavailable, try the FM dial: 104.6" in the next line. The now line re-checks the schedule every 60 s and re-ticks only when the show changes.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Now line | load / show change | 0 | 30 ms × characters | steps | characters revealed left to right |
| On-air dot | always | — | 1 s | steps(2) | opacity 1 ↔ .2 |
Reduced motion: whole line at once, dot steady, video paused on the poster.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Station | 44 px, two lines | 96 px | 150 px | 110 px |
| Strip | horizontal scroll with snap | full row | full row | hidden |
| Video focal | 80 % 40 % | 74 % | 72 % | — |

### Acceptance
**First viewport:** at 1440 × 900 a dark hillside with a mast and a slow red light on the right; on the left the station name glows in red LED dots, the amber now-playing line ticks in, a big red Listen button below. At 390 × 844 everything stacks within the screen; the strip scrolls sideways.
**Do not:** autoplay audio; blink anything faster than once a second; glow the button; claim a live schedule feed that does not exist; hotlink the stream player.
