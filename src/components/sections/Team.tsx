import { useRef } from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { RevealHeading } from "../ui/RevealHeading";
import { team } from "../../data/team";
import { cn } from "../../lib/cn";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE, STAGGER, REVEAL_START } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/** Middle seat drops to echo the three-point Triple composition. */
const OFFSET = ["", "md:mt-16", ""];

export function Team() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from("[data-member]", {
        autoAlpha: 0,
        y: 34,
        duration: DUR.reveal,
        ease: EASE.out,
        stagger: STAGGER.loose,
        scrollTrigger: { trigger: "[data-team-grid]", start: REVEAL_START },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section ref={ref} id="team" className="section-y">
      <div className="shell">
        <div className="border-t border-line pt-6">
          <SectionLabel index="05">The Team</SectionLabel>
        </div>

        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <RevealHeading
            as="h2"
            className="t-h1 max-w-[15ch] text-bone"
            lines={[
              "Different disciplines.",
              "Shared standards.",
              <>
                One <span className="text-gold">Triple.</span>
              </>,
            ]}
          />
          <p className="t-body max-w-sm text-mute">
            A focused team bringing complementary perspectives to every project.
          </p>
        </div>

        <div
          data-team-grid
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 md:gap-6"
        >
          {team.map((member, i) => (
            <figure
              key={member.index}
              data-member
              className={cn("group", OFFSET[i])}
            >
              <div className="@container relative aspect-[4/5] overflow-hidden border border-line bg-ink-soft transition-colors duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-gold/50">
                <div className="absolute inset-0 grid place-items-center">
                  <span
                    aria-hidden="true"
                    className="select-none font-display leading-none text-transparent [-webkit-text-stroke:1.25px_rgba(244,242,237,0.14)] text-[clamp(4rem,40cqi,9rem)] transition-[transform,-webkit-text-stroke-color] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:[-webkit-text-stroke-color:rgba(198,161,91,0.55)]"
                  >
                    {member.initial}
                  </span>
                </div>
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="eyebrow text-mute">Open seat</span>
                  <span className="num eyebrow text-gold">{member.index}</span>
                </div>
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between gap-4">
                <span className="t-h3 text-bone">{member.name}</span>
                <span className="eyebrow text-mute">{member.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
