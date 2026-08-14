import { SectionLabel } from "../ui/SectionLabel";
import { RevealHeading } from "../ui/RevealHeading";
import { Reveal } from "../ui/Reveal";
import { useLocale } from "../../i18n/locale";

/**
 * Brief, typography-driven introduction. Statement headline on the left, a
 * single supporting paragraph offset to the right — no cards, plenty of air.
 */
export function About() {
  const { content } = useLocale();
  const { about } = content;

  return (
    <section id="about" className="section-y">
      <div className="shell">
        <div className="border-t border-line pt-6">
          <SectionLabel index={about.index}>{about.label}</SectionLabel>
        </div>

        <div className="mt-14 grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <RevealHeading
            as="h2"
            className="t-h1 text-bone md:col-span-8"
            lines={about.heading}
          />

          <Reveal
            as="p"
            className="t-lead self-end text-mute md:col-span-4"
            y={20}
          >
            {about.body}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
