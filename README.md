# Tripple

The digital home of **Tripple** — an independent digital studio bringing
strategy, design and technology into one focused team.

A bespoke, motion-led single-page experience: black and warm white with gold as
a controlled signature, editorial typography, and scroll-driven storytelling.

## Stack

- **Bun** — package manager and script runner
- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`, CSS-first tokens)
- **GSAP** + **ScrollTrigger** for animation
- **Lenis** for smooth scrolling (synced to the GSAP ticker)
- **lucide-react** for the few interface icons

## Getting started

Requires [Bun](https://bun.sh). All tooling runs through Bun.

```bash
bun install       # install dependencies
bun run dev       # start the dev server
bun run build     # type-check and build for production
bun run preview   # preview the production build
bun run lint      # lint
bun run typecheck # type-check only
```

## Structure

```
src/
├── components/
│   ├── layout/     Header, MobileMenu, Footer
│   ├── sections/   Hero, About, Signature, SelectedWork, Services,
│   │               Philosophy, Process, Team, ContactCTA
│   └── ui/         Button, ArrowLink, LanguageSwitch, RevealHeading, Reveal,
│                   SectionLabel, Rich, ProjectCard, CustomCursor
├── i18n/           types (SiteContent), en, ar, locale provider, resolution
├── hooks/          useReducedMotion, useMediaQuery
├── lib/            gsap, motion tokens, smooth-scroll, constants, cn
├── App.tsx
├── main.tsx
└── index.css       design tokens, typography and utilities (Tailwind v4)
```

## Languages

English and Arabic, English by default. Both locales are typed against the
single `SiteContent` interface in `src/i18n/types.ts`, so a missing key is a
compile error rather than a blank spot on the page.

The choice is remembered in `localStorage` under `triple-locale`, and `?lang=ar`
makes an Arabic link shareable. An inline resolver in `index.html` stamps
`lang` / `dir` before first paint so a stored Arabic choice never flashes
left-to-right. English loads no extra font.

Arabic is real RTL, not mirrored English: it has its own type ramp, its own
art-directed line breaks at phone and desktop widths, and its own Saudi Arabic
voice. Latin islands — the wordmark, the `01 / 02 / 03` numerals, years, channel
names — are bidi-isolated and keep the Latin faces so the brand's numerals read
exactly as designed. Arabic-only styling lives under `html[lang="ar"]` in
`index.css` and behind `rtl:` variants; English matches none of it.

### Arabic typeface

The intended face is **Saudi** (الخط السعودي), from the Ministry of Culture. Its
EULA restricts sharing with third parties without prior approval, so the files
are **not committed** — publishing them in this repository would be exactly that
kind of redistribution. `IBM Plex Sans Arabic` (SIL Open Font License) ships as
the fallback: contemporary and geometric, chosen to suit a digital brand rather
than a calligraphic one.

`"Saudi"` already leads the Arabic font stack, so nothing needs rewiring once
the licence question is settled. To enable it, accept the EULA at
[engage.moc.gov.sa](https://engage.moc.gov.sa/e/fonts/saudi-font/), drop the
web fonts into `public/fonts/saudi/`, and add an `@font-face` block naming the
family `Saudi`. It will take over automatically.

## Content status

Selected Work and Team are intentional placeholders in both locales — no
invented clients, metrics or identities. Replace the entries under `work` and
`team` in `src/i18n/en.ts` and `src/i18n/ar.ts` (adding `image` / `href` fields)
without touching the layouts. The contact section stays CTA-oriented in both
languages until a backend is connected — no form is shown that cannot submit.

## Accessibility & motion

Semantic landmarks and headings, a keyboard skip link, focus-visible states, a
focus-trapped mobile menu, and full support for `prefers-reduced-motion` (Lenis
and non-essential animation switch off; all content is revealed immediately).

The language control carries its own `lang` and `dir` plus an `aria-label`
stating what it does, so the label is announced in the right language. Switching
remounts the tree, which reverts the outgoing locale's GSAP contexts instead of
stacking new ones on top; Lenis sits outside that boundary and is created once
per session.
