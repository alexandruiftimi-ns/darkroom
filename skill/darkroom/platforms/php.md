# PHP site (`php`)

Checked on: 2026-10-26 against the docs below.

## Choose it when
The user already pays for shared hosting (cPanel, Plesk), wants a working contact form without a third-party service, or needs a few dynamic bits (opening hours, a small include system) without a CMS.

## Official docs to check before building
- https://www.php.net/supported-versions.php (pick a supported version; ask which one the host runs)
- https://www.php.net/manual/en/function.htmlspecialchars.php
- https://www.php.net/manual/en/function.mail.php

## Ask before building
- Which host, and which PHP version does it run? (Its control panel shows it.)
- Where do form messages go (an email address), and does the host give SMTP details?
- Any other dynamic need? If it's a blog or the client edits pages, recommend `wordpress` instead.

## What Darkroom delivers
`index.php`, `partials/` (bootstrap with escaping and CSRF helpers, head, foot), `contact.php` (CSRF token, honeypot, validation), `config.example.php` (copied to `config.php` on the server, git-ignored), `assets/site.css`. Start with `darkroom platform scaffold php`.

## Where the design goes
`:root` in `assets/site.css`. Recipes go in `assets/`.

## Preview and capture
If PHP is installed: `php -S 127.0.0.1:8080`, then `darkroom capture http://127.0.0.1:8080`. If not, say so: the PHP pages cannot be rendered here; capture a static export of the same markup and mark the PHP parts "not run".

## Deploy and free hosting
Upload by FTP/SFTP or the host's file manager into `public_html/`; create `config.php` there. Free PHP hosts exist (they add limits, sometimes ads, and often block `mail()`): fine for a trial, not for a business.

## Gotchas
- Escape every printed value with `e()` (`htmlspecialchars`); the structure check flags `echo $_GET…`.
- `mail()` often lands in spam or is disabled; prefer the host's SMTP (PHPMailer needs Composer: ask first).
- Never commit `config.php`. Never print errors on the live site (`display_errors=Off`).
