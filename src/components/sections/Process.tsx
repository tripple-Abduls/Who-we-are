import { useRef } from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { RevealHeading } from "../ui/RevealHeading";
import { useLocale } from "../../i18n/locale";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";
import { DUR, EASE } from "../../lib/motion";

const BONE = "#f4f2ed";
const MUTE = "#8f8b81";
const IDLE = "#6b6760";
const GOLD = "#c6a15b";
const LINE = "rgba(244,242,237,0.14)";

const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const MOBILE = "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";

/**
 * Process, split by gsap.matchMedia:
 * - Desktop: a sticky left rail (CSS sticky, no pin) with an active stage
 *   number, a scrubbed gold progress fill and a labelled index; the right
 *   column's stages brighten as they reach the centre.
 * - Mobile: performance-first — no scrub, no active toggling, no continuous
 *   work. Each stage simply reveals once as it enters the viewport.
 * - Reduced motion: a fully readable, static list.
 * matchMedia reverts each context automatically when the breakpoint changes.
 */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { content } = useLocale();
  const { process } = content;
  const steps = process.steps;

  useGSAP(
    () => {
      if (!ref.current) return;
      const q = <T extends HTMLElement>(sel: string) =>
        gsap.utils.toArray<T>(sel, ref.current);
      const mm = gsap.matchMedia(ref);

      mm.add(DESKTOP, () => {
        const nums = q("[data-proc-num]");
        const labels = q("[data-proc-label]");
        const lines = q("[data-proc-line]");
        const titles = q("[data-proc-title]");

        const setActive = (idx: number) => {
          nums.forEach((n, i) =>
            gsap.to(n, { autoAlpha: i === idx ? 1 : 0, duration: 0.4, ease: EASE.out }),
          );
          labels.forEach((l, i) =>
            gsap.to(l, { color: i === idx ? BONE : MUTE, duration: 0.35, ease: EASE.out }),
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
            gsap.to(t, { color: i === idx ? BONE : IDLE, duration: 0.4, ease: EASE.out }),
          );
        };

        gsap.set(titles, { color: IDLE });
        q("[data-proc-step]").forEach((step, i) => {
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
      });

      mm.add(MOBILE, () => {
        // Lightweight: one-time reveal per stage, titles fully legible, no scrub.
        q("[data-proc-title]").forEach((t) => gsap.set(t, { color: BONE }));
        q("[data-proc-step]").forEach((step) => {
          gsap.from(step, {
            autoAlpha: 0,
            y: 22,
            duration: DUR.reveal,
            ease: EASE.out,
            scrollTrigger: { trigger: step, start: "top 88%", once: true },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        q("[data-proc-num]").forEach((n, i) =>
          gsap.set(n, { autoAlpha: i === 0 ? 1 : 0 }),
        );
        q("[data-proc-title]").forEach((t) => gsap.set(t, { color: BONE }));
        gsap.set("[data-proc-fill]", { scaleX: 1 });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [steps] },
  );

  return (
    <section ref={ref} id="process" className="section-y">
      <div className="shell">
        <div className="flex items-end justify-between gap-6 border-t border-line pt-6">
          <SectionLabel index={process.index}>{process.label}</SectionLabel>
          <span className="eyebrow hidden text-mute sm:block">
            {process.meta}
          </span>
        </div>

        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <RevealHeading
            as="h2"
            className="t-h1 max-w-[14ch] text-bone"
            lines={process.heading}
          />
          <p className="t-body max-w-md text-mute">{process.body}</p>
        </div>

        <div className="mt-20 lg:grid lg:grid-cols-12 lg:gap-10">
          {/* Sticky rail — desktop only */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="lg:sticky lg:top-[22vh]">
              <div className="flex items-start gap-4">
                <div className="relative h-[9rem] flex-1">
                  {steps.map((s, i) => (
                    <span
                      key={s.index}
                      data-proc-num
                      aria-hidden="true"
                      className="num latin-display absolute inset-0 font-display leading-none text-gold"
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
                  className="absolute inset-0 origin-left scale-x-0 bg-gold rtl:origin-right"
                />
              </div>

              <ul className="mt-8 flex flex-col gap-4" aria-hidden="true">
                {steps.map((s) => (
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

          {/* Stages — vertical list on mobile/tablet, scrolling column on desktop */}
          <div
            data-proc-track
            className="lg:col-span-7 lg:col-start-6"
          >
            {steps.map((s) => (
              <article
                key={s.index}
                data-proc-step
                className="flex flex-col justify-center border-t border-line py-9 lg:min-h-[56vh] lg:py-10"
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
