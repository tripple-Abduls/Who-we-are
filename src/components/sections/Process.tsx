import { useRef } from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { RevealHeading } from "../ui/RevealHeading";
import { processSteps } from "../../data/process";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";
import { EASE } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const BONE = "#f4f2ed";
const MUTE = "#8f8b81";
const IDLE = "#6b6760";
const GOLD = "#c6a15b";
const LINE = "rgba(244,242,237,0.14)";

/**
 * Scroll-driven process. A sticky left rail (CSS sticky — no pin jank) shows
 * the active stage number, a progress fill and a labelled index; the right
 * column scrolls through the five stages, each brightening as it reaches the
 * centre. ScrollTrigger only reads scroll position — it never owns layout — so
 * with reduced motion the section is a fully readable, static list.
 */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      const nums = gsap.utils.toArray<HTMLElement>("[data-proc-num]");
      const labels = gsap.utils.toArray<HTMLElement>("[data-proc-label]");
      const lines = gsap.utils.toArray<HTMLElement>("[data-proc-line]");
      const titles = gsap.utils.toArray<HTMLElement>("[data-proc-title]");

      if (reduced) {
        nums.forEach((n, i) => gsap.set(n, { autoAlpha: i === 0 ? 1 : 0 }));
        titles.forEach((t) => gsap.set(t, { color: BONE }));
        gsap.set("[data-proc-fill]", { scaleX: 1 });
        return;
      }

      const setActive = (idx: number) => {
        nums.forEach((n, i) =>
          gsap.to(n, { autoAlpha: i === idx ? 1 : 0, duration: 0.4, ease: EASE.out }),
        );
        labels.forEach((l, i) =>
          gsap.to(l, {
            color: i === idx ? BONE : MUTE,
            duration: 0.35,
            ease: EASE.out,
          }),
        );
        lines.forEach((l, i) =>
          gsap.to(l, {
            width: i === idx ? 40 : 20,
            backgroundColor: i === idx ? GOLD : LINE,
            duration: 0.35,
            ease: EASE.out,
          }),
        );
        titles.forEach((t, i) =>
          gsap.to(t, {
            color: i === idx ? BONE : IDLE,
            duration: 0.4,
            ease: EASE.out,
          }),
        );
      };

      gsap.set(titles, { color: IDLE });

      const steps = gsap.utils.toArray<HTMLElement>("[data-proc-step]");
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });

      gsap.fromTo(
        "[data-proc-fill]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-proc-track]",
            start: "top center",
            end: "bottom center",
            scrub: 0.4,
          },
        },
      );

      setActive(0);
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section ref={ref} id="process" className="section-y">
      <div className="shell">
        <div className="flex items-end justify-between gap-6 border-t border-line pt-6">
          <SectionLabel index="04">Our Process</SectionLabel>
          <span className="eyebrow hidden text-mute sm:block">Five stages</span>
        </div>

        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <RevealHeading
            as="h2"
            className="t-h1 max-w-[14ch] text-bone"
            lines={["Clear thinking.", "Focused execution."]}
          />
          <p className="t-body max-w-md text-mute">
            A structured process that keeps business goals, user experience and
            technology moving in the same direction.
          </p>
        </div>

        <div className="mt-20 md:grid md:grid-cols-12 md:gap-10">
          {/* Sticky rail */}
          <div className="hidden md:col-span-4 md:block">
            <div className="md:sticky md:top-[22vh]">
              <div className="flex items-start gap-4">
                <div className="relative h-[9rem] flex-1">
                  {processSteps.map((s, i) => (
                    <span
                      key={s.index}
                      data-proc-num
                      aria-hidden="true"
                      className="num absolute inset-0 font-display leading-none text-gold"
                      style={{
                        fontSize: "clamp(4rem,9vw,8rem)",
                        opacity: i === 0 ? 1 : 0,
                      }}
                    >
                      {s.index}
                    </span>
                  ))}
                </div>
                <span className="num mt-3 text-[0.95rem] tracking-[0.1em] text-mute">
                  / 05
                </span>
              </div>

              <div className="relative mt-8 h-px w-full max-w-[16rem] bg-line">
                <span
                  data-proc-fill
                  className="absolute inset-0 origin-left scale-x-0 bg-gold"
                />
              </div>

              <ul className="mt-8 flex flex-col gap-4" aria-hidden="true">
                {processSteps.map((s) => (
                  <li
                    key={s.index}
                    data-proc-label
                    className="flex items-center gap-4 text-[0.95rem] tracking-[0.02em] text-mute"
                  >
                    <span data-proc-line className="h-px w-5 bg-line" />
                    {s.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scrolling stages */}
          <div
            data-proc-track
            className="md:col-span-7 md:col-start-6 lg:col-start-6"
          >
            {processSteps.map((s) => (
              <article
                key={s.index}
                data-proc-step
                className="flex flex-col justify-center border-t border-line py-10 md:min-h-[56vh]"
              >
                <span className="num text-[0.85rem] font-medium tracking-[0.14em] text-gold">
                  {s.index} <span className="text-faint">/ 05</span>
                </span>
                <h3
                  data-proc-title
                  className="t-h1 mt-5 text-bone"
                >
                  {s.title}
                </h3>
                <p className="t-lead mt-6 max-w-md text-mute">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
