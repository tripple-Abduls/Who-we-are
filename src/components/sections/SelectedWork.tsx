import { useRef } from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { RevealHeading } from "../ui/RevealHeading";
import { ProjectCard, type CardShape } from "../ui/ProjectCard";
import { projects } from "../../data/projects";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";
import { DUR, EASE } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Editorial layout template — varied spans, aspects, offsets and folio
 * compositions. The numeral sits differently in each card (bleeding corners,
 * centre, offset) so the grid reads as art direction, not a repeated cell.
 */
const SHAPES: CardShape[] = [
  {
    col: "md:col-span-7",
    extra: "",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
    surface: "bg-ink-soft",
    numPlace: "items-end justify-end",
    numSize: "text-[clamp(4rem,30cqi,14rem)]",
  },
  {
    col: "md:col-span-5",
    extra: "md:mt-24",
    aspect: "aspect-[4/3] md:aspect-[3/4]",
    surface: "bg-ink-raised",
    numPlace: "items-center justify-center",
    numSize: "text-[clamp(3.5rem,44cqi,11rem)]",
  },
  {
    col: "md:col-span-5",
    extra: "",
    aspect: "aspect-[4/3] md:aspect-[3/4]",
    surface: "bg-ink-raised",
    numPlace: "items-start justify-start",
    numSize: "text-[clamp(3.5rem,40cqi,10rem)]",
  },
  {
    col: "md:col-span-7",
    extra: "md:mt-24",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
    surface: "bg-ink-soft",
    numPlace: "items-center justify-start",
    numSize: "text-[clamp(4rem,28cqi,13rem)]",
  },
  {
    col: "md:col-span-8",
    extra: "",
    aspect: "aspect-[4/3] md:aspect-[16/7]",
    surface: "bg-ink-soft",
    numPlace: "items-center justify-end",
    numSize: "text-[clamp(3.5rem,20cqi,11rem)]",
  },
  {
    col: "md:col-span-4",
    extra: "md:mt-24",
    aspect: "aspect-[4/3] md:aspect-[3/4]",
    surface: "bg-ink-raised",
    numPlace: "items-end justify-center",
    numSize: "text-[clamp(3.5rem,46cqi,11rem)]",
  },
];

export function SelectedWork() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]");
      gsap.set(cards, { autoAlpha: 0, y: 44 });
      // Batch so cards revealing in the same row rise together.
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: DUR.reveal,
            ease: EASE.out,
            stagger: 0.09,
            overwrite: true,
          }),
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section ref={ref} id="work" className="section-y">
      <div className="shell">
        <div className="flex items-end justify-between gap-6 border-t border-line pt-6">
          <SectionLabel index="02">Selected Work</SectionLabel>
          <span className="eyebrow hidden text-mute sm:block">Portfolio 2026</span>
        </div>

        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <RevealHeading
            as="h2"
            className="t-h1 max-w-[15ch] text-bone"
            lines={["Work designed", "to make an impact."]}
          />
          <p className="t-body max-w-md text-mute">
            Our portfolio is being prepared. These spaces are ready for the
            products, platforms and experiences we've built.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-y-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              shape={SHAPES[i % SHAPES.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
