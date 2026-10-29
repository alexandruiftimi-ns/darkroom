# Night Shift Stories · a podcast about people who work at night
<!-- Darkroom example 060 · fictional show · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `ghost` | landing + episodes | `bold` + `cyberpunk` (night palette) | `animated` | none | `reveal.js` |

## Say this
> /darkroom a Ghost theme for our podcast: the latest episode playable right on the home page, all episodes as a list with guests and length, subscribe links for the apps, and supporters get bonus episodes. Night-time mood.

## Build spec

### Brief & signature
Night Shift Stories interviews people who work 22:00–06:00: bakers, nurses, tunnel engineers; 140 episodes, 2,100 paying supporters. Visitors are listeners who want to press play. Feeling: nocturnal, intimate, humane. **Signature:** the latest episode as a big player: the guest's job title set huge ("TUNNEL ENGINEER, 03:10") with the recording time in a clock face that advances as the audio plays; the waveform is a static SVG of the episode's real loudness, filled as it plays. **Supporting:** a sodium-orange accent like street lights, episode list with durations, member-only bonus episodes.

### Stack & files
Ghost theme: posts tagged `#episode` with custom fields via the post's code injection or a JSON card (audio URL from the podcast host, duration, guest job, recorded-at time, waveform as an SVG path); `partials/player.hbs`, `assets/js/player.js` (native `<audio>`, play/pause, ±15 s, speed 1×/1.5×), `index.hbs`, `post.hbs`. Bonus episodes via Ghost visibility `paid`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Anton | 400 | guest job titles |
| Text | Hanken Grotesk | 400, 600 | UI, show notes |
| Figures | Hanken Grotesk | 600 tabular | times |

### Tokens
```css
:root { --ground: #0b0c14; --ink: #eef0f6; --ink-60: #eef0f699; --sodium: #ff9a3c; --line: #eef0f61f;
  --gh-font-heading: "Anton", Impact, sans-serif; --gh-font-body: "Hanken Grotesk", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| episode audio | the podcast host's MP3 URL (the host is the source, not a hotlinked asset of someone else) | `<audio preload="none">` | — | user-started | link to the episode page | — |
| waveform | generated from the MP3 by the producer (NEEDS 1: one SVG path per episode) | inline SVG 100 % × 64 px | — | fill follows `currentTime` | flat line | — |
| guest photo | own, consent (optional) | `<img>` 1:1 | — | static | none | taken on shift, available light |

### Nav
64 px: "NIGHT SHIFT STORIES" Display 400 20 px +0.02em; Episodes · About · Support us; subscribe icons (Apple Podcasts, Spotify, RSS) as labelled links.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Label | Episode 140 · 52 min | Text 600, 13 px tabular | 1 | sodium | above the job title | none |
| Job title (h2; site title is h1) | TUNNEL ENGINEER, 03:10 | Display 400, clamp(56px, 10vw, 168px) | 0.86 / 0 | ink | full width, top 18 vh | rise 6 % in mask |
| Guest line | Marek fixes the U-Bahn while Berlin sleeps. | Text 400, 20 px | 1.45 | ink-60 | under the title | fade |
| Player | ▶ Play · −15 · +15 · 1× | Text 600, 16 px; play 64 px circle sodium fill, ground icon | — | — | under the guest line | — |
| Waveform + clock | SVG + "03:10 → 03:41" | Text 600 tabular | — | ink-60, played part sodium | beside the player | follows audio |

### Sections
Episodes list (number, job title Display 32 px, guest first name, date, duration tabular, a small play button that loads into the main player), Support us (what supporters get, the Ghost Portal sign-up), About, footer with RSS link.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Job title | load | 0 | 900 ms | `cubic-bezier(.22,1,.36,1)` | translateY(6%) → 0 |
| Waveform fill | timeupdate | — | — | linear | clip width = played % |
| Episode rows | in view | `i × 50 ms` | 500 ms | ease-out | opacity 0 → 1 |
Reduced motion: no rise; the waveform still fills (it is information).

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Job title | 15vw, two lines | 12vw | 10vw | 9vw |
| Player | sticky at the bottom once playing | inline | inline | inline |

### Acceptance
**First viewport:** at 1440 × 900 a deep night-blue page; "TUNNEL ENGINEER, 03:10" in huge condensed letters; a one-line story of the guest; a sodium-orange play button with a waveform that fills as it plays and a clock that advances from the recording time. At 390 × 844 the job title on two lines and the play button above the fold.
**Do not:** autoplay audio; show supporter-only episodes to free members; invent download numbers; put the player in an iframe that blocks keyboard use.
