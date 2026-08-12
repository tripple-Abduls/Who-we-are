import { useRef } from "react";
import { RevealHeading } from "../ui/RevealHeading";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE, STAGGER, REVEAL_START } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const PRINCIPLES = [
  {
    index: "01",
    title: "Strategy before decoration.",
    body: "We understand the problem before we design the interface.",
  },
  {
    index: "02",
    title: "Design and engineering belong together.",
    body: "The strongest digital products happen when both disciplines evolve as one.",
  },
  {
    index: "03",
    title: "Details are part of the product.",
    body: "Motion, responsiveness, performance and polish are not afterthoughts.",
  },
  {
    index: "04",
    title: "Build for reality.",
    body: "Our work has to perform for real users, on real devices.",
  },
];

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from("[data-principle]", {
        autoAlpha: 0,
        y: 28,
        duration: DUR.reveal,
        ease: EASE.out,
        stagger: STAGGER.base,
        scrollTrigger: {
          trigger: "[data-principle-list]",
          start: REVEAL_START,
        },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section ref={ref} id="philosophy" className="section-y">
      <div className="shell grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4 md:self-start lg:sticky lg:top-32">
          <p className="eyebrow text-gold">Principles</p>
          <RevealHeading
            as="h2"
            className="t-h2 mt-7 max-w-[14ch] text-bone"
            lines={["The standards", "behind the work."]}
          />
        </div>

        <ol
          data-principle-list
          className="border-t border-line md:col-span-7 md:col-start-6"
        >
          {PRINCIPLES.map((p) => (
            <li
              key={p.index}
              data-principle
              className="group grid grid-cols-[3rem_minmax(0,1fr)] gap-5 border-b border-line py-9 md:gap-8"
            >
              <span className="num text-[0.85rem] font-medium tracking-[0.1em] text-gold">
                {p.index}
              </span>
              <div>
                <h3 className="t-h3 text-bone transition-colors duration-[360ms] group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="t-body mt-3 max-w-md text-mute">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
