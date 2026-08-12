import { ScrollHighlightText } from "../ui/ScrollHighlightText";

/**
 * Transitional belief statement between the hero and the about section. A
 * single large line that brightens word-by-word as it scrolls past.
 */
export function BrandStatement() {
  return (
    <section className="section-y" aria-label="What we believe">
      <div className="shell">
        <div className="border-t border-line pt-6">
          <p className="eyebrow text-gold">What we believe</p>
        </div>
        <ScrollHighlightText
          as="p"
          text="We don't decorate ideas. We turn them into experiences."
          accent="experiences"
          className="t-h1 mt-10 max-w-[22ch] font-display leading-[1.05]"
        />
      </div>
    </section>
  );
}
