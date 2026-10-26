<p align="center">
  <img src="assets/darkroom-designer.jpg" alt="Darkroom: a designer in a dark room, two monitors showing pages built with the skill" width="100%">
</p>

<h3 align="center">Type <code>/darkroom</code>. Say what you want. It tells you what it needs.</h3>

<p align="center">
  <a href="LICENSE"><img alt="MIT licence" src="https://img.shields.io/badge/licence-MIT-ff7a3d?style=flat-square&labelColor=121110"></a>
  <img alt="Node 18+" src="https://img.shields.io/badge/node-18%2B-ece6dc?style=flat-square&labelColor=121110">
  <img alt="Claude Code skill" src="https://img.shields.io/badge/Claude%20Code-skill-ff7a3d?style=flat-square&labelColor=121110">
  <img alt="Scope: single landing pages" src="https://img.shields.io/badge/scope-single--page%20landing%20sites-a39b8f?style=flat-square&labelColor=121110">
  <img alt="Tests: 41 checks" src="https://img.shields.io/badge/tests-41%20checks-ece6dc?style=flat-square&labelColor=121110">
</p>

<p align="center">
  <a href="#what-you-can-make"><b>What you can make</b></a> &nbsp;·&nbsp;
  <a href="#see-it"><b>See it</b></a> &nbsp;·&nbsp;
  <a href="#try-these-prompts"><b>Prompts</b></a> &nbsp;·&nbsp;
  <a href="#how-a-project-runs"><b>How it runs</b></a> &nbsp;·&nbsp;
  <a href="#where-the-knowledge-comes-from"><b>Knowledge</b></a> &nbsp;·&nbsp;
  <a href="#install"><b>Install</b></a>
</p>

Darkroom is a [Claude Code](https://claude.com/claude-code) skill for **single-page landing sites**. You bring the business facts, any photos or video, and your taste. Claude acts as art director and developer: it decides the design, writes the code, **screenshots the real browser output**, audits it and fixes what it sees. You need no design vocabulary. Ask for "animations when I scroll" and it answers in plain words with one recommendation and a short list of what it needs from you.

---

## Start with `/darkroom`

```text
/darkroom a landing page for my bakery in Lisbon, warm and handmade, with animations on scroll
```

> [!IMPORTANT]
> Darkroom **only starts when you type `/darkroom`**. Talking about websites in any other task will never start it by accident. Put what you want after the command; after that, just talk normally. To continue a project in a new session, type `/darkroom` again and it picks up where you left off.

---

## What you can make

Every page is **two choices**: how it **looks** and how it **moves**. Any look works with any motion level. Darkroom reads both from your message and confirms them in one line ("A Cartier-like look, animated on scroll, no scroll story"). Say so if you want something else.

### How it looks: a style, or "like a brand you love"

<p align="center"><img src="assets/looks.svg" alt="Three reference looks drawn as abstract page miniatures: Apple-like, light and centred with one product; Rolex-like, dark with one lit object; Cartier-like, white with a serif headline and a product grid" width="100%"></p>

Say *"like apple.com"*, *"like Rolex"* or *"like Cartier"*: Darkroom measures the live site (type sizes, spacing, rhythm, palette roles, motion) and applies that **design language** to *your* brand. It never copies their logo, photos, text or font files, and it checks that nobody could mistake your page for theirs. Profiles ship for Apple, Rolex, Cartier, Aesop, Stripe, Linear and Tesla; any other site can be measured.

<details>
<summary><b>Or pick one of 13 style packs</b> (each one changes the rules, so a luxury page and a bold page are not judged the same way)</summary>

| Pack | Feels | Typical use |
|---|---|---|
| Cinematic | immersive, filmic, dramatic | product launches, film, cars, hardware |
| Luxury | quiet, rare, slow | fashion, jewellery, hotels, real estate |
| Modern | clear, precise, current | SaaS, tools, startups, studios |
| Bold | loud, confident, poster-like | campaigns, sport, music, agencies |
| Cyberpunk | neon noir, tech, edge | gaming, events, nightlife |
| Editorial | informed, structured | magazines, reports, journals |
| Restaurant | appetite, place, hospitality | restaurants, bars, cafés, bakeries |
| Catalog | browsable, trustworthy, fast | product ranges, rentals |
| Nature | calm, grounded, alive | outdoor, wellness, farms |
| Art gallery | the work first | artists, galleries, photographers |
| Artsy | experimental, playful, colourful | creative studios, festivals, illustrators |
| Family | warm, safe, easy | kids, schools, community |
| Trust | credible, calm, competent | finance, legal, medical, B2B |

</details>

### How it moves: four levels

<p align="center"><img src="assets/modes.svg" alt="The four motion levels as small animated browser windows: calm, animated, one hero effect, scroll story" width="100%"></p>

| Level | Visitors see | You provide | Built with |
|---|---|---|---|
| **Calm** | a still, composed page; hover and focus states only | nothing extra | CSS |
| **Animated** | headings rise, text fades in, pictures open, cards arrive one by one as you scroll; normal scrolling | nothing extra | built-in reveal recipe (no library) |
| **One hero effect** | one memorable moment (a product that turns, a dive into a lens, a looping film), then a normal page | usually one video clip or one strong image | frame-sequence or scrubbed-video recipe |
| **Scroll story** | chapters on a pinned stage; text arrives in step with the pictures; scroll back to replay | a few sentences per chapter, plus the media each one needs | scene recipes, GSAP only when needed |

For a scroll story you get a **per-chapter asset list**: what each chapter needs, the best way to make it (your phone, Blender, an AI image or video tool), the cost class, and what ships if it never arrives. Which library suits which job (GSAP, Motion, Lenis, three.js, Lottie, CSS scroll animations) is in [`motion-toolkit.md`](skill/darkroom/references/motion-toolkit.md).

### For your kind of business

| You are… | A good starting look | A good motion level |
|---|---|---|
| launching a product or device | cinematic, or like Apple | one hero effect or scroll story |
| a SaaS or app | modern, or like Stripe / Linear | animated |
| a restaurant, café or bakery | restaurant | animated |
| a hotel, villa or property | luxury, nature | animated, or a looping film hero |
| fashion, jewellery, watches | luxury, or like Cartier / Rolex | animated or one hero effect |
| an agency, studio or portfolio | bold, artsy, art gallery | animated or scroll story |
| an event, festival or campaign | bold, artsy, cyberpunk | one hero effect |
| finance, legal, medical, B2B | trust | calm |
| a school, kids' or community project | family | animated |
| wellness, outdoor, a farm | nature | animated |

**Not for:** online shops with many products, blogs, web apps or multi-page sites. Darkroom says so instead of pretending.

---

## See it

<p align="center"><a href="assets/darkroom-showcase.mp4"><b>▶ Watch the 24-second showcase film</b></a><br><sub>Real screen capture of the two pages below, on two monitors in a dark room.</sub></p>

<table>
  <tr>
    <td width="50%"><img src="assets/mockup-porsche.jpg" alt="Porsche 911 Turbo S concept page on a laptop and a phone"><br><sub><b>Porsche 911 Turbo S (concept)</b> · look: cinematic · motion: <b>one hero effect</b><br>A supplied film becomes a scroll-controlled frame sequence, with a configurator.</sub></td>
    <td width="50%"><img src="assets/mockup-northshutter.jpg" alt="NorthShutter AI Reality headset concept page on a laptop and a phone"><br><sub><b>NorthShutter AI Reality (concept)</b> · look: cinematic · motion: <b>scroll story</b><br>A hero film scrubbed by scroll, a lens dive, eight cinematic beats.</sub></td>
  </tr>
</table>

<sub>Both are <b>unofficial fictional concepts</b>, not affiliated with Porsche, Rockstar Games or Take-Two Interactive. The laptop and phone frames are AI-generated presentation art.</sub>

---

## Try these prompts

Open Claude Code in an empty folder (or your project), then type one of these. Click a level to see the prompts for it.

<details open>
<summary><b>Look like a brand</b></summary>

```text
/darkroom a landing page for my bike repair shop in Porto that looks like apple.com
```
```text
/darkroom a site like Rolex for my watch-strap brand. Dark, slow, expensive. 12 product photos are in ./photos
```
```text
/darkroom Cartier-style landing page for my handmade ceramics, with one wow moment at the top
```
**What happens:** it says in plain words what it will borrow and what it won't, measures the reference site, then shows you two coded versions of the first screen to choose from.
</details>

<details>
<summary><b>Animated: things appear as you scroll</b></summary>

```text
/darkroom a nice landing page for my yoga studio with animations when you scroll: text and images fading in. Not a scroll story.
```
```text
/darkroom modern landing page for my invoicing app, lively but not flashy
```
**What you provide:** nothing extra. Better photos make it richer.
</details>

<details>
<summary><b>One hero effect</b></summary>

```text
/darkroom here is my product video (./assets/turn.mp4). Make the product turn as people scroll.
```
```text
/darkroom landing page for a boutique hotel with a looping film at the top. I have a 10-second clip.
```
**What you provide:** usually one clip or one strong image. No clip? It offers a version drawn in code, which always works.
</details>

<details>
<summary><b>Scroll story</b></summary>

```text
/darkroom I want scroll storytelling for my coffee roastery: from the farm to the cup. What do you need from me?
```
```text
/darkroom tell the story of our electric boat in chapters as people scroll. We have renders but no video.
```
**What you get first:** a chapter plan and a "what I need from you" list. Each item says the best way to make it, the cost class, and what ships if it never arrives.
</details>

<details>
<summary><b>Calm, or "you decide"</b></summary>

```text
/darkroom calm and trustworthy one-pager for my accounting practice. No animations, it has to load fast.
```
```text
/darkroom a landing page for my dog-walking service. Just go: you decide everything, show me the result at the end.
```
</details>

---

## How a project runs

<p align="center"><img src="assets/flow.svg" alt="Intake, look and motion, direction, slice, build, check and fix, final. You confirm the look and motion, pick the direction, approve the slice and decide at the end." width="100%"></p>

You are asked at **four moments only**: confirming the look and motion level, choosing between two directions, approving a working slice, and the final result. Everything between is Claude's job, and you can say "just go" at any time.

<details>
<summary><b>What happens at each stage</b></summary>

| Stage | What happens |
|---|---|
| **Intake** | Reads your message, assets and references. Works out what quality your assets can support. |
| **Look + motion** | Places the request: style pack or brand look, and one of four motion levels. Hands you the "what I need from you" list. |
| **Direction** | Finds the one idea of the page and codes two versions of the first screen, with real copy, on desktop and phone. |
| **Slice** | Builds the first screen, its key motion and the transition into the next section, working. |
| **Build** | Writes the rest from a short design bible: palette, type, motion, copy budgets. |
| **Check + fix** | Captures real browser states (scroll, hover, reduced motion), runs the audits and fixes what shows up. |
| **Final** | You review. Nothing is called done without a capture of the current build. |

</details>

<details>
<summary><b>Everything it can do</b></summary>

| | |
|---|---|
| **Art direction** | 13 style packs and brand look-alikes measured from the live site. |
| **Scroll and motion** | Tested recipes: on-scroll reveals, scroll-scrubbed video, frame sequences, pinned scenes, pointer tilt. Every one has a reduced-motion fallback, and nothing is hidden for visitors without JavaScript. |
| **Real-browser QA** | Playwright captures at several screen sizes, contact sheets and crops, in motion and reduced-motion modes. Each run records the build it was taken from. |
| **Audits** | Each check is marked measured, heuristic or manual: accessibility, contrast from real pixels, clutter, word budgets, type scale, colour, keyboard, reduced motion. |
| **Compliance checklist** | EU and US build checklists for cookies, prices, disclosures and AI-image labelling. A checklist, not legal advice. |
| **Media** | Probes media, makes responsive images, turns video into a frame sequence with a manifest. |
| **Image and video prompts** | Prompt templates for image and video models (hero plates, product masters, phone crops, clips), with acceptance criteria. |
| **Study a reference** | Captures and audits any public page so you can borrow its mood, type or motion by role. |

</details>

---

## Where the knowledge comes from

<p align="center"><img src="assets/knowledge.svg" alt="84 real sites studied (66 good, 18 bad), 24 cross-site lessons with 10 promoted to rules, 32 research sources, 6 design tools studied, 41 automated checks, one human art director" width="100%"></p>

Darkroom is **not a trained model**. It is written knowledge that Claude reads while it works, and all of it is in plain files you can check:

- **84 real websites studied live**: 52 Awwwards sites (28 Sites of the Day), 14 Dribbble concept mockups, and 18 counter-examples from colorlib's "bad website examples". Each one is kept as a short written note, never as screenshots or copied code.
- **24 lessons** that repeat across sites; **10 became rules** only after the author approved them.
- **32 research sources**: Nielsen Norman Group reading research, WCAG 2.2, the European Accessibility Act, EU cookie, price and dark-pattern rules, the AI Act's labelling duty.
- **6 open design tools** studied for principles, then rewritten in Darkroom's own words.
- **The author's own direction**: their dislikes became audit checks (font soup, scattered text, brochure-length copy), and they made the taste calls, approved the rules and supplied the test assets.

**[→ The full list: every site, source and human decision](KNOWLEDGE.md)**

---

## Install

Requires [Claude Code](https://claude.com/claude-code) and Node 18+.

```bash
git clone https://github.com/alexandruiftimi-ns/darkroom.git && cd darkroom
node install.mjs              # for all your projects  (~/.claude/skills/darkroom)
node install.mjs --project    # or for the current project only
```

1. **Restart Claude Code.**
2. For screenshots and audits, Darkroom needs Playwright: `npm i -D playwright && npx playwright install chromium` in your project, or a global install. On Windows it can use the Edge browser you already have. ffmpeg and sharp are optional.
3. Type `/darkroom` and describe your page.

To remove it: `node install.mjs --uninstall`.

<details>
<summary><b>What is inside the repository</b></summary>

The skill is plain Markdown playbooks plus small Node scripts. There is no build step.

| Folder | Purpose |
|---|---|
| `skill/darkroom/SKILL.md` | the flow and the rules Claude follows |
| `skill/darkroom/commands/` | one playbook per stage (intake, style, look-alike, build, audit…) |
| `skill/darkroom/scripts/` | `darkroom.mjs`: capture, audit, media, assets, state |
| `skill/darkroom/references/` | modes, looks, motion toolkit, effects, craft, compliance… |
| `skill/darkroom/styles/`, `library/`, `prompts/`, `recipes/`, `templates/` | style packs, written lessons from real sites, model prompts, tested motion code, project files |

Only `skill/darkroom/` is installed. Tests, the example and CI stay in the repository.

</details>

<details>
<summary><b>Develop and test</b></summary>

```bash
npm install && npx playwright install chromium
npm test        # regression suite against skill/darkroom; keep it green when scripts change
npm run pack    # dist/darkroom-skill.zip
```

</details>

## Honest limits

- Scope is **single landing pages**. Shops, blogs, apps and multi-page sites need different rules.
- Heuristic checks are questions, not verdicts. The compliance checklist is not legal advice.
- Darkroom raises the floor and the process. It cannot certify that a page is "worth $10,000", and the result depends heavily on the assets you supply. Your eye is the judge.
- Brand looks borrow a design language, never an identity. You are responsible for how you use any brand name in your own marketing.

## Licence

[MIT](LICENSE) © 2026 Alexandru Iftimi. Example fonts: SIL OFL 1.1.
