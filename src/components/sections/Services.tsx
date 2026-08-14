import { useRef } from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { RevealHeading } from "../ui/RevealHeading";
import { useLocale } from "../../i18n/locale";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE, STAGGER, REVEAL_START } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Editorial capability list — no cards. Large service names, a gold index and
 * the capabilities stacked as a quiet column. On hover the index turns gold,
 * the title nudges, the capabilities brighten and a gold rule expands.
 */
export function Services() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { content } = useLocale();
  const { services } = content;

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from("[data-service]", {
        autoAlpha: 0,
        y: 30,
        duration: DUR.reveal,
        ease: EASE.out,
        stagger: STAGGER.base,
        scrollTrigger: {
          trigger: "[data-service-list]",
          start: REVEAL_START,
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section ref={ref} id="services" className="section-y">
      <div className="shell">
        <div className="flex items-end justify-between gap-6 border-t border-line pt-6">
          <SectionLabel index={services.index}>{services.label}</SectionLabel>
          <span className="eyebrow hidden text-mute sm:block">
            {services.meta}
          </span>
        </div>

        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <RevealHeading
            as="h2"
            className="t-h1 max-w-[16ch] text-bone"
            lines={services.heading}
          />
          <p className="t-body max-w-md text-mute">{services.body}</p>
        </div>

        <ul data-service-list className="mt-16 border-t border-line">
          {services.items.map((service) => (
            <li
              key={service.index}
              data-service
              className="group relative border-b border-line"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 rtl:origin-right"
              />
              <div className="grid gap-6 py-9 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,22rem)] md:items-start md:gap-10 md:py-11">
                <span className="num text-[0.9rem] font-medium tracking-[0.1em] text-mute transition-colors duration-[360ms] group-hover:text-gold">
                  {service.index}
                </span>
                <h3 className="t-h2 text-bone transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
                  {service.title}
                </h3>
                <ul className="flex flex-col gap-1.5 md:pt-2">
                  {service.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="text-[0.95rem] text-faint transition-colors duration-[360ms] group-hover:text-mute"
                    >
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
