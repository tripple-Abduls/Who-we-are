import { useRef } from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { RevealHeading } from "../ui/RevealHeading";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE, STAGGER, REVEAL_START } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const PILLARS = [
  {
    index: "01",
    title: "Think",
    body: "Strategy and product thinking. We understand the problem before we design a single screen.",
  },
  {
    index: "02",
    title: "Create",
    body: "Design and experience. Interfaces, systems and interactions shaped with intent.",
  },
  {
    index: "03",
    title: "Build",
    body: "Technology and execution. Engineered for performance and the real world.",
  },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from("[data-about-copy]", {
        autoAlpha: 0,
        y: 24,
        duration: DUR.reveal,
        ease: EASE.out,
        scrollTrigger: { trigger: "[data-about-copy]", start: REVEAL_START },
      });
      gsap.from("[data-pillar]", {
        autoAlpha: 0,
        y: 28,
        duration: DUR.reveal,
        ease: EASE.out,
        stagger: STAGGER.base,
        scrollTrigger: { trigger: "[data-pillar-list]", start: REVEAL_START },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section ref={ref} id="about" className="section-y">
      <div className="shell">
        <div className="flex items-center justify-between border-t border-line pt-6">
          <SectionLabel index="01">Who We Are</SectionLabel>
          <span className="eyebrow hidden text-mute sm:block">
            A focused team
          </span>
        </div>

        <RevealHeading
          as="h2"
          className="t-h1 mt-14 max-w-[17ch] text-bone"
          lines={[
            "Three perspectives.",
            "One standard.",
            "Exceptional digital work.",
          ]}
        />

        <div className="mt-16 grid gap-y-12 md:grid-cols-12">
          <div className="md:col-span-5 md:col-start-8" data-about-copy>
            <p className="t-lead text-mute">
              We combine strategic thinking, thoughtful design and strong
              engineering to turn ambitious ideas into polished digital
              experiences.
            </p>
          </div>

          <ul
            data-pillar-list
            className="border-t border-line md:col-span-12"
          >
            {PILLARS.map((p) => (
              <li
                key={p.index}
                data-pillar
                className="group grid grid-cols-1 gap-3 border-b border-line py-7 md:grid-cols-[6rem_minmax(0,1fr)_minmax(0,26rem)] md:items-baseline md:gap-8"
              >
                <span className="num text-[0.82rem] font-medium tracking-[0.1em] text-gold">
                  {p.index}
                </span>
                <h3 className="t-h3 text-bone transition-colors duration-[360ms] group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="t-body text-mute">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
