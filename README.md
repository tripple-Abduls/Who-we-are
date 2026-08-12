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
│   ├── sections/   Hero, BrandStatement, About, SelectedWork,
│   │               Services, Philosophy, Process, Team, ContactCTA
│   └── ui/         Button, ArrowLink, RevealHeading, Reveal, SectionLabel,
│                   ScrollHighlightText, ProjectCard, CustomCursor
├── data/           navigation, projects, services, process, team (content)
├── hooks/          useReducedMotion
├── lib/            gsap, motion tokens, smooth-scroll, constants, cn
├── App.tsx
├── main.tsx
└── index.css       design tokens, typography and utilities (Tailwind v4)
```

## Content status

Selected Work and Team are intentional placeholders — no invented clients,
metrics or identities. Replace the entries in `src/data/projects.ts` and
`src/data/team.ts` (adding `image`/`href` fields) without touching the layouts.
The contact section stays CTA-oriented until a backend is connected.

## Accessibility & motion

Semantic landmarks and headings, a keyboard skip link, focus-visible states, a
focus-trapped mobile menu, and full support for `prefers-reduced-motion` (Lenis
and non-essential animation switch off; all content is revealed immediately).
