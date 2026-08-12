/**
 * Centralized motion system. Every component pulls timing and easing from
 * here so the whole site shares one rhythm — no scattered magic numbers.
 *
 * Durations are in seconds (GSAP units) and mirror the CSS custom properties
 * defined in index.css.
 */
export const DUR = {
  micro: 0.2, // hover / press feedback        (150–250ms)
  standard: 0.36, // UI transitions             (250–450ms)
  reveal: 0.64, // content reveals              (500–800ms)
  cinematic: 0.9, // hero / large statements    (700–1000ms)
} as const;

/** GSAP easing strings, tuned for a refined, expensive feel. */
export const EASE = {
  out: "power3.out",
  outSoft: "power2.out",
  outExpo: "expo.out",
  inOut: "power2.inOut",
  inOutStrong: "power4.inOut",
} as const;

/** Stagger steps for grouped reveals. */
export const STAGGER = {
  tight: 0.055,
  base: 0.09,
  loose: 0.14,
} as const;

/** ScrollTrigger start position shared by most in-view reveals. */
export const REVEAL_START = "top 82%";
