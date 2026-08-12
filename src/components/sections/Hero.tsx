import { useRef } from "react";
import { Button } from "../ui/Button";
import { ArrowLink } from "../ui/ArrowLink";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const PILLARS = [
  { index: "01", label: "Strategy" },
  { index: "02", label: "Design" },
  { index: "03", label: "Technology" },
];

/** Line wrapped in a clipping mask for the entrance reveal. */
function HeroLine({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="reveal-mask"
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
        [
          "[data-hero-top]",
          "[data-hero-copy]",
          "[data-hero-cta]",
          "[data-hero-meta]",
        ],
        { autoAlpha: 0, y: 22 },
      );

      const tl = gsap.timeline({
        delay: 0.15,
        defaults: { ease: EASE.outExpo },
      });
      tl.to("[data-hero-top]", { autoAlpha: 1, y: 0, duration: DUR.reveal }, 0)
        .to(
          "[data-hero-line]",
          { yPercent: 0, duration: DUR.cinematic, stagger: 0.12 },
          0.1,
        )
        .to(
          "[data-hero-copy]",
          { autoAlpha: 1, y: 0, duration: DUR.reveal },
          "-=0.55",
        )
        .to(
          "[data-hero-cta]",
          { autoAlpha: 1, y: 0, duration: DUR.reveal },
          "-=0.4",
        )
        .to(
          "[data-hero-meta]",
          { autoAlpha: 1, y: 0, duration: DUR.reveal, stagger: 0.1 },
          "-=0.45",
        );

      // Looping scroll cue.
      gsap.fromTo(
        "[data-scroll-seg]",
        { y: 0 },
        {
          y: 22,
          duration: 1.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        },
      );
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
        {/* Top marker row */}
        <div
          data-hero-top
          className="flex items-start justify-between gap-6 border-t border-line pt-5"
        >
          <p className="eyebrow text-gold">Independent Digital Studio</p>
          <p className="eyebrow num text-mute">Est. 2026</p>
        </div>

        {/* Headline + copy + CTAs, weighted low */}
        <div className="mt-auto pt-20">
          <h1
            id="hero-heading"
            className="t-hero max-w-[15ch] text-bone md:max-w-[18ch]"
          >
            <HeroLine>We turn bold ideas</HeroLine>
            <HeroLine>
              into digital <em className="italic">experiences</em>
            </HeroLine>
            <HeroLine>
              built to <span className="text-gold">matter.</span>
            </HeroLine>
          </h1>

          <p data-hero-copy className="t-lead mt-9 max-w-lg text-mute">
            Triple brings strategy, design and technology into one focused team
            to create thoughtful digital products and experiences.
          </p>

          <div
            data-hero-cta
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <Button href="#contact">Start a Project</Button>
            <ArrowLink href="#work">Explore Our Work</ArrowLink>
          </div>
        </div>

        {/* Bottom meta: scroll cue + the three pillars */}
        <div className="mt-16 flex items-end justify-between gap-6">
          <div data-hero-meta className="flex items-center gap-4">
            <span className="relative h-10 w-px overflow-hidden bg-line">
              <span
                data-scroll-seg
                aria-hidden="true"
                className="absolute inset-x-0 top-0 block h-4 w-px bg-gold"
              />
            </span>
            <span className="eyebrow text-mute">Scroll to explore</span>
          </div>

          <ul
            data-hero-meta
            className="hidden items-center gap-8 sm:flex"
            aria-label="What we do"
          >
            {PILLARS.map((p) => (
              <li key={p.index} className="flex items-baseline gap-2">
                <span className="num text-[0.72rem] font-medium text-gold">
                  {p.index}
                </span>
                <span className="text-[0.82rem] tracking-[0.02em] text-bone">
                  {p.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
