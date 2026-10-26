# Jekyll (`jekyll`)

Checked on: 2026-10-26 against the docs below.

## Choose it when
A blog, portfolio or project page on **GitHub Pages**, which builds Jekyll itself: push Markdown, the site updates. Nothing to install for the user if they edit on github.com.

## Official docs to check before building
- https://jekyllrb.com/docs/structure/
- https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll
- https://pages.github.com/versions/ (the Jekyll version and plugins GitHub Pages allows)
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## Ask before building
- A user site (`username.github.io`) or a project site (`username.github.io/repo`)? It sets `baseurl`.
- Commercial? GitHub Pages is **not for running an online business or shop**: suggest `static` on Cloudflare instead.
- Any plugin beyond GitHub's allowed list? Then build with GitHub Actions (Jekyll 4 works there).

## What Darkroom delivers
`_config.yml`, `_layouts/default.html`, `_includes/head.html`, `index.html`, `404.html`, `assets/css/site.css`, `Gemfile` (the `github-pages` gem so local builds match). Posts go in `_posts/YYYY-MM-DD-title.md`. Start with `darkroom platform scaffold jekyll`.

## Where the design goes
`:root` in `assets/css/site.css`. Recipes in `assets/js/`. Every internal link through `relative_url` so the project-site prefix works.

## Preview and capture
With Ruby: `bundle install && bundle exec jekyll serve` (port 4000), then `darkroom capture http://localhost:4000`. Without Ruby, say "not rendered here"; GitHub builds it on push and the live URL can be captured after.

## Deploy and free hosting
Push to GitHub, Settings → Pages → deploy from branch (`main`, root). 1 GB site, about 100 GB/month soft bandwidth, 10 builds an hour.

## Gotchas
- GitHub Pages' built-in Jekyll is version 3.x with a fixed plugin list; check `pages.github.com/versions`.
- Liquid in Markdown runs; escape literal `{{ }}` with `{% raw %}`.
