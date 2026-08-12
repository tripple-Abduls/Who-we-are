import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { cn } from "../../lib/cn";

const PHASES = [
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
];

const WORD_SIZE = "clamp(3.4rem, 13.5vw, 12.5rem)";
const GHOST_SIZE = "clamp(8rem, 34vw, 30rem)";

/**
 * The Tripple signature moment. On desktop the section pins and the reader
 * scrubs through Think → Create → Build: the word and giant ghost numeral
 * crossfade, a gold line fills, and the active label lights. Under reduced
 * motion it collapses to a plain, readable three-part list — no pin, no scrub.
 */
export function Signature() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // Pinning a full-viewport scrub is poor on touch — desktop only (>=1024).
  // Tablet and mobile get the lightweight vertical list.
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const pinned = !reduced && isDesktop;

  useGSAP(
    () => {
      if (!ref.current) return;

      // Mobile: no pin, no scrub. A single lightweight reveal of the list.
      if (!pinned) {
        if (reduced) return;
        gsap.from("[data-sig-item]", {
          autoAlpha: 0,
          y: 24,
          duration: DUR.reveal,
          ease: EASE.out,
          stagger: 0.09,
          scrollTrigger: {
            trigger: "[data-sig-list]",
            start: "top 85%",
            once: true,
          },
        });
        return;
      }

      const root = ref.current;
      const phases = gsap.utils.toArray<HTMLElement>("[data-phase]", root);
      const labels = gsap.utils.toArray<HTMLElement>("[data-sig-label]", root);
      const counter = root.querySelector<HTMLElement>("[data-sig-counter]");

      gsap.set(phases[0], { autoAlpha: 1, yPercent: 0 });
      gsap.set([phases[1], phases[2]], { autoAlpha: 0, yPercent: 8 });

      let current = -1;
      const setActive = (idx: number) => {
        if (idx === current) return;
        current = idx;
        if (counter) counter.textContent = `0${idx + 1} / 03`;
        labels.forEach((l, i) =>
          gsap.to(l, {
            color: i === idx ? "#f4f2ed" : "#6b6760",
            duration: 0.3,
            ease: EASE.out,
          }),
        );
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=260%",
          pin: "[data-sig-pin]",
          scrub: 0.5,
          anticipatePin: 0.5,
          onUpdate: (self) => {
            gsap.set("[data-sig-progress]", { scaleX: self.progress });
            setActive(self.progress < 0.42 ? 0 : self.progress < 0.75 ? 1 : 2);
          },
        },
      });
      tl.to(phases[0], { autoAlpha: 0, yPercent: -8, duration: 0.5 }, 1)
        .to(phases[1], { autoAlpha: 1, yPercent: 0, duration: 0.5 }, 1)
        .to(phases[1], { autoAlpha: 0, yPercent: -8, duration: 0.5 }, 2)
        .to(phases[2], { autoAlpha: 1, yPercent: 0, duration: 0.5 }, 2)
        .to({}, { duration: 0.5 }, 2.5);
    },
    { scope: ref, dependencies: [pinned, reduced] },
  );

  // Mobile / reduced motion: a plain, readable three-part list — no pin.
  if (!pinned) {
    return (
      <section id="approach" className="section-y" aria-label="How we work">
        <div className="shell">
          <p className="eyebrow text-gold">Why Tripple</p>
          <div data-sig-list className="mt-14 flex flex-col gap-16">
            {PHASES.map((p) => (
              <div
                key={p.index}
                data-sig-item
                className="border-t border-line pt-8"
              >
                <span className="num text-[0.85rem] font-medium text-gold">
                  {p.index} / 03
                </span>
                <h3
                  className="mt-4 font-display text-bone"
                  style={{ fontSize: "clamp(3rem,14vw,7rem)", lineHeight: 0.9 }}
                >
                  {p.word}
                  <span className="text-gold">.</span>
                </h3>
                <p className="t-lead mt-5 max-w-md text-mute">{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="approach" aria-label="How we work">
      <div data-sig-pin className="relative h-dvh overflow-hidden">
        <div className="shell flex h-full flex-col justify-center pt-24">
          {/* Top row */}
          <div className="flex items-center justify-between border-t border-line pt-5">
            <p className="eyebrow text-gold">Why Tripple</p>
            <p data-sig-counter className="eyebrow num text-mute">
              01 / 03
            </p>
          </div>

          {/* Crossfading phases */}
          <div className="relative flex-1">
            {PHASES.map((p) => (
              <div
                key={p.index}
                data-phase
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-[0.35em] left-[-0.06em] select-none font-display leading-none text-transparent [-webkit-text-stroke:1.25px_rgba(198,161,91,0.16)]"
                    style={{ fontSize: GHOST_SIZE }}
                  >
                    {p.index}
                  </span>
                  <h3
                    className="relative font-display text-bone"
                    style={{
                      fontSize: WORD_SIZE,
                      lineHeight: 0.86,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {p.word}
                    <span className="text-gold">.</span>
                  </h3>
                </div>
                <p className="t-lead relative mt-8 max-w-xl text-mute">
                  {p.copy}
                </p>
              </div>
            ))}
          </div>

          {/* Progress track + labels */}
          <div className="pb-6">
            <div className="relative h-px w-full bg-line">
              <span
                data-sig-progress
                className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gold"
              />
            </div>
            <div className="mt-4 flex justify-between">
              {PHASES.map((p, i) => (
                <span
                  key={p.index}
                  data-sig-label
                  className={cn(
                    "flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.16em]",
                  )}
                  style={{ color: i === 0 ? "#f4f2ed" : "#6b6760" }}
                >
                  <span className="num text-gold">{p.index}</span>
                  {p.word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
