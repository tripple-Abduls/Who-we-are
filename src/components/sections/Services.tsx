import { useRef } from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { RevealHeading } from "../ui/RevealHeading";
import { services } from "../../data/services";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE, STAGGER, REVEAL_START } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * The one warm-white section — a deliberate pacing shift. An editorial
 * capability list (not icon cards): large names, a gold index, capability
 * tags and a gold rule that expands on hover.
 */
export function Services() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from("[data-service]", {
        autoAlpha: 0,
        y: 30,
        duration: DUR.reveal,
        ease: EASE.out,
        stagger: STAGGER.base,
        scrollTrigger: { trigger: "[data-service-list]", start: REVEAL_START },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section ref={ref} id="services" className="bg-bone text-ink section-y">
      <div className="shell">
        <div className="flex items-end justify-between gap-6 border-t border-ink/15 pt-6">
          <SectionLabel index="03" tone="light">
            What We Do
          </SectionLabel>
          <span className="eyebrow hidden text-ink/50 sm:block">
            Six disciplines
          </span>
        </div>

        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <RevealHeading
            as="h2"
            className="t-h1 max-w-[16ch] text-ink"
            lines={["From first thought", "to final build."]}
          />
          <p className="t-body max-w-md text-ink/60">
            We bring strategy, design and technology together so ideas don't get
            lost between disciplines.
          </p>
        </div>

        <ul data-service-list className="mt-16 border-t border-ink/15">
          {services.map((service) => (
            <li
              key={service.index}
              data-service
              className="group relative border-b border-ink/15"
            >
              {/* Gold rule that expands on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <div className="grid gap-3 py-8 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,30rem)] md:items-baseline md:gap-10 md:py-10">
                <span className="num text-[0.9rem] font-medium tracking-[0.1em] text-ink/40 transition-colors duration-[360ms] group-hover:text-gold">
                  {service.index}
                </span>
                <h3 className="t-h2 text-ink transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  {service.title}
                </h3>
                <p className="t-body text-ink/55 md:text-right">
                  {service.capabilities.join("  /  ")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
