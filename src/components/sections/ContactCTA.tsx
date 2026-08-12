import { SectionLabel } from "../ui/SectionLabel";
import { RevealHeading } from "../ui/RevealHeading";
import { Button } from "../ui/Button";

/**
 * Closing invitation. Relies on scale, space and typography rather than a boxed
 * card. No fake form or fabricated address — the CTA stays contact-oriented and
 * points to the studio channels in the footer.
 */
export function ContactCTA() {
  return (
    <section id="contact" className="section-y">
      <div className="shell">
        <div className="flex items-end justify-between gap-6 border-t border-line pt-6">
          <SectionLabel index="06">Contact</SectionLabel>
          <span className="eyebrow hidden text-mute sm:block">Let's talk</span>
        </div>

        <RevealHeading
          as="h2"
          className="t-hero mt-16 max-w-[16ch] text-bone"
          lines={[
            "Have something",
            <>
              ambitious <span className="text-gold">in mind?</span>
            </>,
          ]}
        />

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
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
    </section>
  );
}
