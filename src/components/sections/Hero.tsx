import { useRef } from "react";
import { Button } from "../ui/Button";
import { ArrowLink } from "../ui/ArrowLink";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const STAGES = [
  { index: "01", label: "Think" },
  { index: "02", label: "Create" },
  { index: "03", label: "Build" },
];

/** A staircase line wrapped in a clipping mask for the entrance reveal. */
function HeroLine({
  children,
  indent,
}: {
  children: React.ReactNode;
  indent: string;
}) {
  return (
    <span
      className={`reveal-mask ${indent}`}
      style={{ paddingBottom: "0.16em", marginBottom: "-0.16em" }}
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

  useGSAP(
    () => {
      if (reduced) return;

      gsap.set("[data-hero-line]", { yPercent: 118 });
      gsap.set(
        ["[data-hero-top]", "[data-hero-copy]", "[data-hero-cta]", "[data-hero-stage]", "[data-hero-cue]"],
        { autoAlpha: 0, y: 22 },
      );

      const tl = gsap.timeline({ delay: 0.12, defaults: { ease: EASE.outExpo } });
      tl.to("[data-hero-top]", { autoAlpha: 1, y: 0, duration: DUR.reveal }, 0)
        .to(
          "[data-hero-line]",
          { yPercent: 0, duration: DUR.cinematic, stagger: 0.11 },
          0.08,
        )
        .to("[data-hero-copy]", { autoAlpha: 1, y: 0, duration: DUR.reveal }, "-=0.55")
        .to("[data-hero-cta]", { autoAlpha: 1, y: 0, duration: DUR.reveal }, "-=0.4")
        .to(
          "[data-hero-stage]",
          { autoAlpha: 1, y: 0, duration: DUR.reveal, stagger: 0.08 },
          "-=0.5",
        )
        .to("[data-hero-cue]", { autoAlpha: 1, y: 0, duration: DUR.reveal }, "-=0.4");

      // Continuous loop is desktop-only — never runs (or lingers off-screen)
      // on mobile. gsap.matchMedia reverts it automatically below 769px.
      gsap.matchMedia(ref).add("(min-width: 1024px)", () => {
        gsap.fromTo(
          "[data-scroll-seg]",
          { y: 0 },
          { y: 22, duration: 1.5, ease: "power1.inOut", repeat: -1, yoyo: true },
        );
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="shell flex min-h-dvh flex-col pb-10 pt-28 md:pt-32">
        {/* Top metadata row */}
        <div
          data-hero-top
          className="flex items-center justify-between gap-6 border-t border-line pt-5"
        >
          <p className="eyebrow text-gold">Independent Digital Studio</p>
          <p className="eyebrow num text-mute">Est. 2026 — Portfolio</p>
        </div>

        {/* Oversized staircase headline */}
        <div className="mt-auto pt-12">
          <h1
            id="hero-heading"
            className="font-display text-bone"
            style={{
              fontSize: "clamp(2.85rem, 8.8vw, 9rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
            }}
          >
            <HeroLine indent="">We turn bold ideas</HeroLine>
            <HeroLine indent="md:ml-[8%]">
              into digital <em className="italic">experiences</em>
            </HeroLine>
            <HeroLine indent="md:ml-[16%]">
              built to <span className="text-gold">matter.</span>
            </HeroLine>
          </h1>
        </div>

        {/* Bottom composition: copy + CTAs (left) · Tripple stages (right) */}
        <div className="mt-12 grid gap-10 border-t border-line pt-7 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p data-hero-copy className="t-lead max-w-md text-mute">
              Tripple brings strategy, design and technology into one focused
              team to create thoughtful digital products and experiences.
            </p>
            <div
              data-hero-cta
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5"
            >
              <Button href="#contact">Start a Project</Button>
              <ArrowLink href="#work">Explore Our Work</ArrowLink>
            </div>
          </div>

          <ul
            className="flex gap-8 md:col-span-4 md:col-start-9 md:justify-end md:gap-10"
            aria-label="How we work"
          >
            {STAGES.map((s) => (
              <li key={s.index} data-hero-stage className="flex flex-col gap-2">
                <span className="num text-[0.72rem] font-medium text-gold">
                  {s.index}
                </span>
                <span className="text-[0.82rem] uppercase tracking-[0.14em] text-bone">
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
          <span className="eyebrow text-mute">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
