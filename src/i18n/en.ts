import type { SiteContent } from "./types";

/**
 * English — the source of truth. These strings were lifted verbatim out of the
 * components and `src/data/*` during localization; do not reword, re-punctuate
 * or re-capitalize them.
 */
export const en: SiteContent = {
  meta: {
    title: "Tripple — Strategy, Design & Technology",
    description:
      "Tripple is a multidisciplinary digital studio creating thoughtful products, brands and digital experiences through strategy, design and technology.",
  },

  ui: {
    skipToContent: "Skip to content",
    brandHome: "Tripple — back to top",
    menu: "Menu",
    openMenu: "Open menu",
    close: "Close",
    closeMenu: "Close menu",
    siteMenu: "Site menu",
    primaryNav: "Primary",
    footerNav: "Footer",
    howWeWork: "How we work",
    backToTop: "Back to top",
    studioTagline: "Independent digital studio",
    cursorView: "View",
    cursorGo: "Go",
  },

  language: {
    label: "العربية",
    aria: "Switch to Arabic",
  },

  nav: {
    items: [
      { id: "work", label: "Work", href: "#work", index: "01" },
      { id: "services", label: "Services", href: "#services", index: "02" },
      { id: "about", label: "About", href: "#about", index: "03" },
      { id: "process", label: "Process", href: "#process", index: "04" },
      { id: "contact", label: "Contact", href: "#contact", index: "05" },
    ],
    cta: { label: "Start a Project", href: "#contact" },
  },

  hero: {
    eyebrow: "Independent Digital Studio",
    meta: "Est. 2026 — Portfolio",
    lines: {
      wide: [
        "We turn bold ideas",
        "into digital [em]experiences[/em]",
        "built to [gold]matter.[/gold]",
      ],
      narrow: [
        "We turn",
        "bold ideas",
        "into digital",
        "[em]experiences[/em]",
        "built to [gold]matter.[/gold]",
      ],
    },
    copy: "Tripple brings strategy, design and technology into one focused team to create thoughtful digital products and experiences.",
    primaryCta: "Start a Project",
    secondaryCta: "Explore Our Work",
    stages: [
      { index: "01", label: "Think" },
      { index: "02", label: "Create" },
      { index: "03", label: "Build" },
    ],
    scrollCue: "Scroll to explore",
  },

  about: {
    index: "01",
    label: "Who We Are",
    heading: [
      "Three perspectives.",
      "One standard.",
      "Exceptional digital work.",
    ],
    body: "We combine strategic thinking, thoughtful design and strong engineering to turn ambitious ideas into polished digital experiences.",
  },

  signature: {
    eyebrow: "Why Tripple",
    phases: [
      {
        index: "01",
        word: "Think",
        copy: "We start with strategy — understanding the problem, the people and the goal before a single pixel exists.",
      },
      {
        index: "02",
        word: "Create",
        copy: "We design the experience — interface, system, motion and detail, shaped with intent.",
      },
      {
        index: "03",
        word: "Build",
        copy: "We engineer the product — fast, resilient and made for the real world.",
      },
    ],
  },

  work: {
    index: "02",
    label: "Selected Work",
    meta: "Portfolio 2026",
    heading: ["Work designed", "to make an impact."],
    body: "Our portfolio is being prepared. These spaces are ready for the products, platforms and experiences we've built.",
    featured: "Featured",
    status: "In preparation",
    projects: [
      {
        id: "project-01",
        index: "01",
        title: "Project Title",
        category: "Digital Product",
        year: "2026",
        description: "Project details will be added here.",
      },
      {
        id: "project-02",
        index: "02",
        title: "Project Title",
        category: "Brand Experience",
        year: "2026",
        description: "Project details will be added here.",
      },
      {
        id: "project-03",
        index: "03",
        title: "Project Title",
        category: "Platform",
        year: "2026",
        description: "Project details will be added here.",
      },
      {
        id: "project-04",
        index: "04",
        title: "Project Title",
        category: "Web Experience",
        year: "2026",
        description: "Project details will be added here.",
      },
      {
        id: "project-05",
        index: "05",
        title: "Project Title",
        category: "Product Platform",
        year: "2026",
        description: "Project details will be added here.",
      },
    ],
  },

  services: {
    index: "03",
    label: "What We Do",
    meta: "Six disciplines",
    heading: ["From first thought", "to final build."],
    body: "We bring strategy, design and technology together so ideas don't get lost between disciplines.",
    items: [
      {
        index: "01",
        title: "Strategy & Product",
        capabilities: [
          "Product Strategy",
          "Research",
          "Digital Direction",
          "Product Architecture",
        ],
      },
      {
        index: "02",
        title: "UX & UI Design",
        capabilities: [
          "User Experience",
          "Interface Systems",
          "Interaction Design",
          "Prototyping",
        ],
      },
      {
        index: "03",
        title: "Web Development",
        capabilities: [
          "Frontend Engineering",
          "Responsive Platforms",
          "Interactive Experiences",
          "Performance",
        ],
      },
      {
        index: "04",
        title: "Application Development",
        capabilities: [
          "Web Applications",
          "Product Platforms",
          "Internal Tools",
          "Scalable Interfaces",
        ],
      },
      {
        index: "05",
        title: "Brand & Digital Identity",
        capabilities: [
          "Brand Direction",
          "Visual Identity",
          "Design Systems",
          "Digital Expression",
        ],
      },
      {
        index: "06",
        title: "Creative Technology",
        capabilities: [
          "Motion",
          "Interaction",
          "Experimental Interfaces",
          "Digital Experiences",
        ],
      },
    ],
  },

  philosophy: {
    eyebrow: "Principles",
    principles: [
      {
        index: "01",
        lines: ["Strategy before", "decoration."],
        body: "We understand the problem before we design the interface.",
        align: "start",
        upper: true,
      },
      {
        index: "02",
        lines: ["Design and engineering", "belong together."],
        body: "The strongest digital products happen when both disciplines evolve as one.",
        align: "end",
      },
      {
        index: "03",
        lines: ["Details are part", "of the product."],
        body: "Motion, responsiveness, performance and polish are never afterthoughts.",
        align: "start",
        upper: true,
      },
      {
        index: "04",
        lines: ["Build for reality."],
        body: "Our work has to perform for real users, on real devices.",
        align: "end",
      },
    ],
  },

  process: {
    index: "04",
    label: "Our Process",
    meta: "Five stages",
    heading: ["Clear thinking.", "Focused execution."],
    body: "A structured process that keeps business goals, user experience and technology moving in the same direction.",
    steps: [
      {
        index: "01",
        title: "Discover",
        body: "Understand the business, the audience, the goals and the constraints.",
      },
      {
        index: "02",
        title: "Define",
        body: "Turn insight into a clear strategy and a sharp experience direction.",
      },
      {
        index: "03",
        title: "Create",
        body: "Design the interface, the system, the interactions and the visual language.",
      },
      {
        index: "04",
        title: "Build",
        body: "Engineer the experience with production quality in mind from the start.",
      },
      {
        index: "05",
        title: "Refine",
        body: "Test, polish and improve until the experience feels genuinely complete.",
      },
    ],
  },

  team: {
    index: "05",
    label: "The Team",
    heading: [
      "Different disciplines.",
      "Shared standards.",
      "One [gold]Tripple.[/gold]",
    ],
    body: "A focused team bringing complementary perspectives to every project.",
    openSeat: "Open seat",
    members: [
      {
        index: "01",
        initial: "S",
        name: "Member 01",
        role: "Strategy & Product",
      },
      {
        index: "02",
        initial: "D",
        name: "Member 02",
        role: "Design & Experience",
      },
      {
        index: "03",
        initial: "T",
        name: "Member 03",
        role: "Engineering & Technology",
      },
    ],
  },

  contact: {
    index: "06",
    label: "Contact",
    meta: "Let's talk",
    heading: ["Have something", "ambitious", "in [gold]mind?[/gold]"],
    body: "Tell us what you're building, where you are now, and where you want to go. We'll help you build it [hi]properly.[/hi]",
    cta: "Start a Project",
  },

  footer: {
    tagline: "Strategy / Design / Technology",
    body: "An independent digital studio, building its first case studies.",
    navigateLabel: "Navigate",
    studioLabel: "Studio",
    soon: "Soon",
    channels: ["LinkedIn", "GitHub", "Behance", "Instagram"],
    builtBy: "Built by Tripple",
  },
};
