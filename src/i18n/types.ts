/**
 * The shape every locale must satisfy. Both `en` and `ar` are typed against
 * `SiteContent`, so a missing or misspelled key is a compile error rather than
 * a blank spot on the page.
 *
 * Copy strings may carry a tiny inline-emphasis markup rendered by `<Rich>`:
 *   `[gold]…[/gold]`  gold accent
 *   `[hi]…[/hi]`      bright accent
 *   `[em]…[/em]`      italic emphasis (Latin only — Arabic has no italics)
 */

export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  /** Editorial index shown in the mobile menu. */
  index: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface Service {
  index: string;
  title: string;
  capabilities: string[];
}

export interface ProcessStep {
  index: string;
  title: string;
  body: string;
}

export interface Project {
  id: string;
  /** Editorial folio number, e.g. "01". */
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  /** Optional real assets — drop in later to replace the placeholder visual. */
  image?: string;
  href?: string;
}

export interface TeamMember {
  index: string;
  /** Discipline monogram shown in the placeholder portrait. */
  initial: string;
  name: string;
  role: string;
}

export interface SignaturePhase {
  index: string;
  word: string;
  copy: string;
}

export interface Principle {
  index: string;
  lines: string[];
  body: string;
  /** Logical side, so the alternating rhythm mirrors correctly in RTL. */
  align: "start" | "end";
  /** Latin-only styling flag; never set for Arabic (unicase script). */
  upper?: boolean;
}

export interface SiteContent {
  /** Applied to <title> and the description meta tag when the locale is active. */
  meta: {
    title: string;
    description: string;
  };

  /** Chrome, controls and assistive-technology labels. */
  ui: {
    skipToContent: string;
    brandHome: string;
    menu: string;
    openMenu: string;
    close: string;
    closeMenu: string;
    siteMenu: string;
    primaryNav: string;
    footerNav: string;
    howWeWork: string;
    backToTop: string;
    /** Custom-cursor labels. */
    cursorView: string;
    cursorGo: string;
  };

  /** The language control shows the *other* language, in its own script. */
  language: {
    label: string;
    aria: string;
  };

  nav: {
    items: NavItem[];
    cta: Cta;
  };

  hero: {
    eyebrow: string;
    meta: string;
    /** Art-directed line breaks, composed per locale and per width. */
    lines: { wide: string[]; narrow: string[] };
    copy: string;
    primaryCta: string;
    secondaryCta: string;
    stages: { index: string; label: string }[];
    scrollCue: string;
  };

  about: {
    index: string;
    label: string;
    heading: string[];
    body: string;
  };

  signature: {
    eyebrow: string;
    phases: SignaturePhase[];
  };

  work: {
    index: string;
    label: string;
    meta: string;
    heading: string[];
    body: string;
    /** Prefix on the full-width feature card. */
    featured: string;
    /** Placeholder status shown on every card. */
    status: string;
    projects: Project[];
  };

  services: {
    index: string;
    label: string;
    meta: string;
    heading: string[];
    body: string;
    items: Service[];
  };

  philosophy: {
    eyebrow: string;
    principles: Principle[];
  };

  process: {
    index: string;
    label: string;
    meta: string;
    heading: string[];
    body: string;
    steps: ProcessStep[];
  };

  team: {
    index: string;
    label: string;
    heading: string[];
    body: string;
    openSeat: string;
    members: TeamMember[];
  };

  contact: {
    index: string;
    label: string;
    meta: string;
    heading: string[];
    body: string;
    cta: string;
  };

  footer: {
    tagline: string;
    body: string;
    navigateLabel: string;
    studioLabel: string;
    soon: string;
    /** Placeholders until real profiles exist — no invented URLs. */
    channels: string[];
    builtBy: string;
  };
}
