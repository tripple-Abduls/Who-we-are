import { useRef, type CSSProperties, type ReactNode } from "react";
import { Button } from "../ui/Button";
import { ArrowLink } from "../ui/ArrowLink";
import { Rich } from "../ui/Rich";
import { useLocale } from "../../i18n/locale";
import type { Locale } from "../../i18n/types";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE, REVEAL_MASK } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { cn } from "../../lib/cn";

/** Staircase offsets for the wide composition; logical, so they mirror in RTL. */
const WIDE_INDENT = ["", "md:ms-[8%]", "md:ms-[16%]"];

/**
 * The headline's scale is set here rather than through a utility because it is
 * the one piece of type that sits outside the shared ramp. Arabic runs at a
 * smaller cap with real leading and no optical tightening; weight replaces the
 * serif's contrast.
 *
 * Arabic gets its own phone scale as well. Its lines are shorter than the
 * English ones by word count but each word is wider, so a single ramp either
 * overruns the desktop shell or leaves a phone half empty — the two widths are
 * art-directed separately.
 */
const EN_HEADLINE: CSSProperties = {
  fontSize: "clamp(2.85rem, 8.8vw, 9rem)",
  lineHeight: 0.94,
  letterSpacing: "-0.03em",
};

const HEADLINE: Record<Locale, { wide: CSSProperties; narrow: CSSProperties }> =
  {
    en: { wide: EN_HEADLINE, narrow: EN_HEADLINE },
    ar: {
      wide: {
        fontSize: "clamp(2.9rem, 7.7vw, 7.5rem)",
        lineHeight: 1.3,
        letterSpacing: "normal",
        fontWeight: 600,
      },
      narrow: {
        fontSize: "clamp(2.85rem, 11.6vw, 4.9rem)",
        lineHeight: 1.26,
        letterSpacing: "normal",
        fontWeight: 600,
      },
    },
  };

/** A line wrapped in a clipping mask for the entrance reveal. */
function HeroLine({
  children,
  indent = "",
  pad,
}: {
  children: ReactNode;
  indent?: string;
  pad: string;
}) {
  return (
    <span
      className={`reveal-mask ${indent}`}
      style={{ paddingBottom: pad, marginBottom: `-${pad}` }}
    >
      <span data-hero-line className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // Mobile gets its own, more vertical set of controlled line breaks.
  const isWide = useMediaQuery("(min-width: 768px)");
  const { locale, content, isRTL } = useLocale();
  const { hero, ui } = content;
  const mask = REVEAL_MASK[locale];

  useGSAP(
    () => {
      if (reduced) return;

      // Entrance driven by width (matches the DOM's line count). gsap.from
      // (immediateRender) reliably applies the hidden state, then reveals.
      if (isWide) {
        const tl = gsap.timeline({ delay: 0.12, defaults: { ease: EASE.outExpo } });
        tl.from("[data-hero-top]", { autoAlpha: 0, y: 22, duration: DUR.reveal }, 0)
          .from("[data-hero-line]", { yPercent: mask.travel, duration: DUR.cinematic, stagger: 0.11 }, 0.08)
          .from("[data-hero-copy]", { autoAlpha: 0, y: 22, duration: DUR.reveal }, "-=0.55")
          .from("[data-hero-cta]", { autoAlpha: 0, y: 22, duration: DUR.reveal }, "-=0.4")
          .from("[data-hero-stage]", { autoAlpha: 0, y: 22, duration: DUR.reveal, stagger: 0.08 }, "-=0.5")
          .from("[data-hero-cue]", { autoAlpha: 0, y: 22, duration: DUR.reveal }, "-=0.4");
      } else {
        // Mobile: shorter, lighter — fewer moving parts, quick settle.
        const tl = gsap.timeline({ delay: 0.06, defaults: { ease: EASE.out } });
        tl.from("[data-hero-top]", { autoAlpha: 0, y: 16, duration: DUR.standard }, 0)
          .from("[data-hero-line]", { yPercent: mask.travelCompact, duration: DUR.reveal, stagger: 0.05 }, 0.05)
          .from("[data-hero-copy]", { autoAlpha: 0, y: 16, duration: DUR.standard }, "-=0.35")
          .from("[data-hero-cta]", { autoAlpha: 0, y: 16, duration: DUR.standard }, "-=0.25")
          .from("[data-hero-stage]", { autoAlpha: 0, y: 16, duration: DUR.standard, stagger: 0.05 }, "-=0.3")
          .from("[data-hero-cue]", { autoAlpha: 0, y: 16, duration: DUR.standard }, "-=0.25");
      }

      // Desktop only: the looping scroll cue.
      gsap.matchMedia(ref).add("(min-width: 1024px)", () => {
        gsap.fromTo(
          "[data-scroll-seg]",
          { y: 0 },
          { y: 22, duration: 1.5, ease: "power1.inOut", repeat: -1, yoyo: true },
        );
      });
    },
    { scope: ref, dependencies: [reduced, isWide, mask] },
  );

  const lines = isWide ? hero.lines.wide : hero.lines.narrow;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="shell flex min-h-svh flex-col pb-10 pt-28 md:min-h-dvh md:pt-32">
        {/* Top metadata row */}
        <div
          data-hero-top
          className="flex items-center justify-between gap-6 border-t border-line pt-5"
        >
          <p className="eyebrow text-gold">{hero.eyebrow}</p>
          {/* Arabic drops `num`: this line mixes Arabic words with a year, and
              isolating the whole run as LTR would reorder the words. Plain bidi
              already renders the year correctly inside an RTL line. */}
          <p className={cn("eyebrow hidden text-mute sm:block", !isRTL && "num")}>
            {hero.meta}
          </p>
        </div>

        {/* Headline — staircase on desktop, vertical stack on mobile */}
        <div className="mt-auto pt-12">
          <h1
            id="hero-heading"
            className="font-display text-bone"
            style={HEADLINE[locale][isWide ? "wide" : "narrow"]}
          >
            {lines.map((line, i) => (
              <HeroLine
                key={i}
                indent={isWide ? WIDE_INDENT[i] : ""}
                pad={mask.pad}
              >
                <Rich text={line} />
              </HeroLine>
            ))}
          </h1>
        </div>

        {/* Bottom composition */}
        <div className="mt-12 grid gap-10 border-t border-line pt-7 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p data-hero-copy className="t-lead max-w-md text-mute">
              {hero.copy}
            </p>
            <div
              data-hero-cta
              className="mt-8 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8"
            >
              <Button href="#contact" className="w-full sm:w-auto">
                {hero.primaryCta}
              </Button>
              <ArrowLink href="#work">{hero.secondaryCta}</ArrowLink>
            </div>
          </div>

          <ul
            className="flex gap-10 md:col-span-4 md:col-start-9 md:justify-end md:gap-10"
            aria-label={ui.howWeWork}
          >
            {hero.stages.map((s) => (
              <li key={s.index} data-hero-stage className="flex flex-col gap-2">
                <span className="num text-[0.72rem] font-medium text-gold">
                  {s.index}
                </span>
                <span className="text-[0.82rem] uppercase tracking-[0.14em] text-bone rtl:normal-case rtl:tracking-normal">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scroll cue */}
        <div data-hero-cue className="mt-8 flex items-center gap-4">
          <span className="relative h-9 w-px overflow-hidden bg-line">
            <span
              data-scroll-seg
              aria-hidden="true"
              className="absolute inset-x-0 top-0 block h-4 w-px bg-gold"
            />
          </span>
          <span className="eyebrow text-mute">{hero.scrollCue}</span>
        </div>
      </div>
    </section>
  );
}
