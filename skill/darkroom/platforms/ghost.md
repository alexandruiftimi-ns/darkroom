# Ghost theme (`ghost`)

Checked on: 2026-10-26 against the docs below (the starter passes gscan as "compatible with Ghost 6.x").

## Choose it when
A publication, newsletter or blog with free or paid members: Ghost handles posts, email newsletters, memberships and payments (Stripe). Darkroom builds the theme.

## Official docs to check before building
- https://docs.ghost.org/themes/structure/
- https://docs.ghost.org/themes/helpers/
- https://docs.ghost.org/themes/custom-settings/
- https://gscan.ghost.org/ (the validator) and https://ghost.org/changelog/

## Ask before building
- Ghost(Pro) (paid, managed) or self-hosted (free software, needs a server)? Which Ghost version?
- Memberships and paid tiers? Newsletter sign-up placement?
- Which templates matter: home, post, page, tag, author? A custom home page (`home.hbs`)?

## What Darkroom delivers
`package.json` (name, version, `config.posts_per_page`, `image_sizes`, `card_assets`), `default.hbs` (with `{{ghost_head}}`, `{{ghost_foot}}`, `{{body_class}}`), `index.hbs`, `post.hbs`, `page.hbs`, `assets/css/screen.css` (with Ghost's custom-font variables and the editor's card width classes). Start with `darkroom platform scaffold ghost`.

## Where the design goes
`:root` in `assets/css/screen.css`; `--font-display` and `--font-body` fall back to Darkroom's fonts and yield to `--gh-font-heading` / `--gh-font-body` when the publisher picks fonts in Ghost. Design-time choices the publisher may change go in `config.custom` (custom theme settings).

## Preview and capture
`npx gscan <theme>` (free; ask first) must pass. To render: a local Ghost (`npm install ghost-cli -g && ghost install local`, or Docker) then upload the zipped theme and `darkroom capture http://localhost:2368`. Without a local Ghost, say "gscan passed; not rendered".

## Deploy and free hosting
Zip the theme folder; Ghost Admin → Settings → Design → Change theme → Upload. Ghost(Pro) is paid; self-hosting is free software on a paid or free-tier server.

## Gotchas
- `{{ghost_head}}` and `{{ghost_foot}}` are required: members, search and scripts break without them.
- The editor's cards (`kg-*` classes, wide and full images) need CSS, or gscan fails.
- Post content comes from writers: design for long and short posts, missing feature images and embeds.
