import { SectionLabel } from "../ui/SectionLabel";
import { RevealHeading } from "../ui/RevealHeading";
import { Reveal } from "../ui/Reveal";

/**
 * Brief, typography-driven introduction. Statement headline on the left, a
 * single supporting paragraph offset to the right — no cards, plenty of air.
 */
export function About() {
  return (
    <section id="about" className="section-y">
      <div className="shell">
        <div className="border-t border-line pt-6">
          <SectionLabel index="01">Who We Are</SectionLabel>
        </div>

        <div className="mt-14 grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <RevealHeading
            as="h2"
            className="t-h1 text-bone md:col-span-8"
            lines={[
              "Three perspectives.",
              "One standard.",
              "Exceptional digital work.",
            ]}
          />

          <Reveal
            as="p"
            className="t-lead self-end text-mute md:col-span-4"
            y={20}
          >
            We combine strategic thinking, thoughtful design and strong
            engineering to turn ambitious ideas into polished digital
            experiences.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
