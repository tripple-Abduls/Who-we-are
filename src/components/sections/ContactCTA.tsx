import { SectionLabel } from "../ui/SectionLabel";
import { RevealHeading } from "../ui/RevealHeading";
import { Button } from "../ui/Button";

/**
 * The closing scene. A near-full-viewport statement carried entirely by scale,
 * space and typography — no boxed card. Stays contact-oriented (no fake form or
 * fabricated address); the CTA points to the studio channels in the footer.
 */
export function ContactCTA() {
  return (
    <section id="contact" className="overflow-hidden">
      <div className="shell flex min-h-dvh flex-col pb-12 pt-28 md:pt-32">
        <div className="flex items-center justify-between gap-6 border-t border-line pt-6">
          <SectionLabel index="06">Contact</SectionLabel>
          <span className="eyebrow hidden text-mute sm:block">Let's talk</span>
        </div>

        <div className="mt-auto pt-16">
          <RevealHeading
            as="h2"
            className="font-display text-bone text-[clamp(3rem,10.5vw,10.5rem)] leading-[0.9] tracking-[-0.03em]"
            lines={[
              "Have something",
              "ambitious",
              <>
                in <span className="text-gold">mind?</span>
              </>,
            ]}
          />

          <div className="mt-14 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
            <p className="t-lead max-w-xl text-mute">
              Tell us what you're building, where you are now, and where you want
              to go. We'll help you build it{" "}
              <span className="text-bone">properly.</span>
            </p>
            <Button href="#site-footer" className="shrink-0 px-9 py-5">
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
