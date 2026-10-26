# Compliance reference (checked Oct 2026 — not legal advice)

## Accessibility

- **EU — European Accessibility Act** (Directive 2019/882): applies since **28 June 2025** to e-commerce and many consumer services offered in the EU, regardless of seller location. Technical benchmark: harmonised standard **EN 301 549**, which incorporates **WCAG 2.1 AA** for web. Micro-enterprises (< 10 staff and ≤ €2 M turnover) are exempt for services. Penalties set nationally. Overlays are not compliance.
- **WCAG 2.2** (W3C Recommendation) adds at AA: **2.4.11** Focus Not Obscured (Minimum) — focused element not entirely hidden by sticky headers/banners; **2.5.7** Dragging Movements — single-pointer alternative; **2.5.8** Target Size (Minimum) — **24×24 CSS px** or spacing exception; **3.3.8** Accessible Authentication (Minimum). At A: **3.2.6** Consistent Help, **3.3.7** Redundant Entry. AAA: 2.4.12, 2.4.13 Focus Appearance, 3.3.9. Build to 2.2 AA; it satisfies 2.1 AA.
- Motion: 2.2.2 Pause, Stop, Hide (auto motion > 5 s with other content); 2.3.1 Three Flashes; 2.3.3 Animation from Interactions (AAA, but honour `prefers-reduced-motion` anyway).
- **US**: ADA Title III suits against private websites are routine; courts and DOJ reference WCAG 2.1 AA (Title II rule for state/local government web content adopted 2024).

## Privacy, cookies, embeds

- **ePrivacy (national law) + GDPR**: consent before non-essential cookies/trackers; EDPB cookie-banner taskforce (2023): most authorities expect a **Reject** option on the first layer and no design that makes rejection harder (colour/format assessed case by case). No pre-ticked boxes. Austrian and Dutch cases have penalised accept-dominant designs and default-on cookies.
- Remote fonts/embeds send IPs to third parties: self-host fonts; click-to-load for video/maps.

## Prices and consumer protection (EU)

- **Price Indication Directive (98/6/EC)**: consumer selling price and unit price clearly shown **incl. VAT and all taxes** (goods).
- **Omnibus (Directive 2019/2161) Art. 6a**: price-reduction announcements show the prior price = lowest price in the **30 days** before the reduction (applicable since 28 May 2022).
- **UCPD** + **DSA Art. 25** (online platforms, since 17 Feb 2024): no deceptive or manipulative interface design. Fake countdowns, false scarcity, confirmshaming, obstructive cancellation are targets; the EU 2023 sweep found manipulative practices on ~40 % of 399 shops. **EmpCo Directive (2024/825)** tightens green/durability claims (transposition due 27 Mar 2026; verify national dates). A Digital Fairness Act proposal is pending.
- UK: DMCC Act 2024 gives the CMA direct fining powers on drip pricing, fake reviews and pressure selling.

## AI-generated content

- **EU AI Act Art. 50** applies from **2 Aug 2026**: providers must mark synthetic output machine-readably; **deployers** must visibly disclose deepfakes (realistic images/video/audio of real-looking people, places, events) and AI-generated text published to inform the public on matters of public interest. Artistic/fictional works: disclosure in a way that doesn't spoil the work. The Commission's Code of Practice on transparency is voluntary but the obligation is not. Practical rule for websites: label AI-generated people/scenes that a visitor could take as real; label renders of products that don't exist yet.

## IP and honesty

Rights for every asset (image, font web licence, music, video). Third-party trademarks need permission; fan/concept work states clearly that it is unofficial. Never fabricate testimonials, reviews, ratings, client logos, awards, stats or certifications.

Sources: `sources.md`.
