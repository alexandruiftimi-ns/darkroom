<p align="center">
  <img src="assets/darkroom-designer.jpg" alt="Darkroom: a designer in a dark room, two monitors showing pages built with the skill" width="100%">
</p>

<p align="center">
  <a href="LICENSE"><img alt="MIT licence" src="https://img.shields.io/badge/licence-MIT-ff7a3d?style=flat-square&labelColor=121110"></a>
  <img alt="Node 18+" src="https://img.shields.io/badge/node-18%2B-ece6dc?style=flat-square&labelColor=121110">
  <img alt="Claude Code skill" src="https://img.shields.io/badge/Claude%20Code-skill-ff7a3d?style=flat-square&labelColor=121110">
  <img alt="Scope: single landing pages" src="https://img.shields.io/badge/scope-single--page%20landing%20sites-a39b8f?style=flat-square&labelColor=121110">
</p>

<p align="center"><b>Tell it what you want. It tells you what it needs.</b></p>

Darkroom is a [Claude Code](https://claude.com/claude-code) skill for single-page landing sites. You bring the business facts, the assets and your taste. Claude decides the design, writes the code, **screenshots the real browser output**, audits it and fixes what it sees.

It is built for people who know nothing about design. Say "an animation when I scroll" and it answers in plain words: the two or three ways it can be done, the catch of each, one recommendation, and a checklist of what you have to provide.

---

## See what it makes

<p align="center"><a href="assets/darkroom-showcase.mp4"><b>▶ Watch the 24-second showcase film</b></a><br><sub>Real screen capture of the pages below, on two monitors in a dark room.</sub></p>

These two pages were art-directed and built with Darkroom and Claude. Both are **unofficial fictional concepts** (not affiliated with Porsche, Rockstar Games or Take-Two Interactive); the mockup frames around them are AI-generated presentation art.

<table>
  <tr>
    <td width="50%"><img src="assets/mockup-porsche.jpg" alt="Porsche 911 Turbo S concept page on a laptop and a phone"><br><sub><b>Porsche 911 Turbo S (concept).</b> A supplied film becomes a scroll-controlled frame sequence, with a configurator.</sub></td>
    <td width="50%"><img src="assets/mockup-northshutter.jpg" alt="NorthShutter AI Reality headset concept page on a laptop and a phone"><br><sub><b>NorthShutter AI Reality (concept).</b> A hero film scrubbed by scroll, a lens dive, eight cinematic beats.</sub></td>
  </tr>
</table>

---

## Who it helps, and how

- **Founders, makers and small businesses who are not designers.** Describe the page; Darkroom tells you in plain words what it needs from you (photos, a film, copy, facts) and what it will do with it, instead of asking you to know design vocabulary.
- **Developers who want a landing page that does not look templated.** It makes the design decisions, writes plain HTML/CSS/JS (or your stack), and checks its own work in a real browser.
- **Anyone shipping a scroll story.** Tested recipes for scroll-scrubbed frame sequences and video, with fallbacks for reduced motion and no-JS.

What it will *not* do: generate photographic video or 3D models by itself (you supply those, or use an image/video model with the prompts it writes), replace a human creative director, or guarantee any particular result.

## One tool, many kinds of page

Every page is two choices, and any look combines with any motion level. Darkroom works out both from what you say, tells you in one line, and lets you change it.

**The look**

| You say | You get |
|---|---|
| "luxury", "bold", "warm and handmade", "trustworthy"… | one of 13 style packs, each with its own rules for type, colour, layout and motion |
| "make it look like apple.com", "like Rolex", "like Cartier" | that brand's design language (spacing, type scale, rhythm, restraint) measured from the live site and applied to *your* brand. Never their logo, photos, text or font files. Profiles ship for Apple, Rolex, Cartier, Aesop, Stripe, Linear and Tesla; any other site can be measured. |

**The motion level**

| Level | What visitors see | What you provide |
|---|---|---|
| **Calm** | a still, composed page; hover and focus states only | nothing extra |
| **Animated** | headings rise, text fades in, pictures open, cards arrive one by one as you scroll. No pinning, normal scrolling. | nothing extra |
| **One hero effect** | one memorable moment (a product that turns, a dive into a lens, a looping film), then a normal page | usually one video clip or one strong image |
| **Scroll story** | the page told in chapters: sections pin while scenes change and text arrives in step | a few sentences per chapter, plus the media each chapter needs. Darkroom gives you a per-chapter list with the kind of tool to make each item (phone, Blender, an AI image or video tool), its cost class, and what ships if it never arrives. |

Which library fits which job (built-in recipes, GSAP, Motion, Lenis, three.js, Lottie, CSS scroll-driven animation), and which tools can make the assets, is in [`motion-toolkit.md`](skill/darkroom/references/motion-toolkit.md).

## Example prompts

You don't need commands. Open Claude Code in an empty folder (or your project) and say what you want:

```text
Build me a landing page for my bike repair shop in Porto that looks like apple.com.
```
```text
I want a site like Rolex for my watch-strap brand. Dark, slow, expensive. I have 12 product photos in ./photos.
```
```text
Make a Cartier-style landing page for my handmade ceramics, with one wow moment at the top.
```
```text
A nice landing page for my yoga studio with animations when you scroll: text and images fading in. Not a scroll story.
```
```text
I want scroll storytelling for my coffee roastery: from the farm to the cup. What do you need from me?
```
```text
Calm and trustworthy one-pager for my accounting practice. No animations, it has to load fast.
```
```text
Here is my product video (./assets/turn.mp4). Make the product turn as people scroll.
```
```text
Just go: you decide everything, show me the result at the end.
```

Typing `/darkroom` first makes sure Darkroom is the skill that answers (useful if you have other design skills installed).

## How a project runs

<p align="center"><img src="assets/flow.svg" alt="Intake, Direction, Slice, Build, Look and fix, Final" width="100%"></p>

You are asked at **three moments only**: the direction, a working slice, the final result. Everything between is Claude's job, and you can say "just go" at any time.

| Stage | What happens |
|---|---|
| **Intake** | Reads your brief, assets and references. Works out what quality your assets can support. |
| **Direction** | Finds the one idea of the page and codes two options of the hero with real copy, desktop and mobile. |
| **Slice** | Builds the hero, its key interaction and the transition into the next section, working. |
| **Build** | Writes the rest from a short design bible: palette, type, motion, copy budgets. |
| **Look + fix** | Captures real browser states (scroll, hover, reduced motion), runs the audits and fixes what shows up. |
| **Final** | You review. Nothing is called done without a capture of the current build. |

## What it can do

| | |
|---|---|
| **Art direction** | 13 style packs: cinematic, luxury, modern, bold, cyberpunk, editorial, restaurant, catalog, nature, art, artsy, family, trust. Each switches the rules, so a luxury page and a bold page are not judged the same way. |
| **Scroll and motion** | Tested recipes for on-scroll reveals (headings, text, images, cards), scroll-scrubbed video, frame sequences, scene progress and pointer tilt. Each has a reduced-motion fallback, and nothing is hidden for visitors without JavaScript. |
| **Brand look-alikes** | "Like apple.com / Rolex / Cartier": the reference is measured live, translated into licensable fonts and your own colours, and checked so it cannot be mistaken for the brand. |
| **Real-browser QA** | Playwright captures at several viewports, contact sheets and crops, with motion and reduced-motion modes. Each run records the build revision it was taken from. |
| **Audits** | Each check is marked measured, heuristic or manual: accessibility, clutter, word budgets, type scale, colour. |
| **Compliance checklist** | EU and US build checklists for things like cookies and disclosures. A checklist, not legal advice. |
| **Media** | Probes media, makes responsive stills, turns video into a frame sequence with a manifest. |
| **Image and video prompts** | Prompt templates for image and video models (hero plates, product masters, mobile frames, clips), with acceptance criteria. |
| **Study a reference** | Captures and audits a reference site so you can borrow its mood, type or motion by role. |

## Install

Requires Node 18+ and Claude Code.

```bash
git clone https://github.com/alexandruiftimi-ns/darkroom.git && cd darkroom
node install.mjs              # for all your projects  (~/.claude/skills/darkroom)
node install.mjs --project    # or for the current project only
```

Restart Claude Code. For screenshots and audits Darkroom needs Playwright in your project (`npm i -D playwright && npx playwright install chromium`) or installed globally. ffmpeg and sharp are optional; the media tools fall back to headless Chromium.

Prefer a download? Releases contain `darkroom-skill.zip`: unzip it into `~/.claude/skills/`.

## Use

Describe the page ("a landing page for a ceramics studio…") or type `/darkroom`. It works without any other skill installed. To resume after a break, Claude runs `node <skill>/scripts/darkroom.mjs state`, which reports the stage, what is approved, which captures are stale and the next action.

## What is inside

The skill is plain Markdown playbooks plus small Node scripts. There is no build step.

| Folder | Purpose |
|---|---|
| `skill/darkroom/SKILL.md` | the flow and the rules Claude follows |
| `skill/darkroom/commands/` | one playbook per stage (intake, style, build, audit…) |
| `skill/darkroom/scripts/` | `darkroom.mjs`: capture, audit, media, assets, state |
| `skill/darkroom/references/`, `styles/`, `library/`, `prompts/`, `recipes/`, `templates/` | knowledge, style packs, written lessons from real sites, model prompts, tested scroll code, project files |

Only `skill/darkroom/` is installed. Tests, the example and CI stay in the repository.

## Develop and test

```bash
npm install && npx playwright install chromium
npm test        # regression suite against skill/darkroom; keep it green when scripts change
npm run pack    # dist/darkroom-skill.zip
```

## Honest limits

- Scope is **single landing pages**. Catalogs, long articles and apps need different rules.
- Heuristic checks are questions, not verdicts. The compliance command is a build checklist, not legal advice.
- Darkroom raises the floor and the process. It cannot certify that a page is "worth $10,000", and the result depends heavily on the assets you supply. Your eye is the judge.
- `skill/darkroom/references/provenance.md` records what informed the knowledge base.

## Licence

[MIT](LICENSE) © 2026 Alexandru Iftimi. Example fonts: SIL OFL 1.1.
