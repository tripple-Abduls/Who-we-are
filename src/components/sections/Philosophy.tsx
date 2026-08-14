import { RevealHeading } from "../ui/RevealHeading";
import { Reveal } from "../ui/Reveal";
import { useLocale } from "../../i18n/locale";
import { cn } from "../../lib/cn";

/**
 * The single warm-white chapter — a deliberate black → bone → black shift.
 * Oversized principle statements alternate start/end with quiet supporting
 * lines. Pure typography and whitespace; no cards.
 */
export function Philosophy() {
  const { content } = useLocale();
  const { philosophy } = content;

  return (
    <section id="philosophy" className="bg-bone text-ink section-y">
      <div className="shell">
        <div className="border-t border-ink/15 pt-6">
          <p className="eyebrow text-gold">{philosophy.eyebrow}</p>
        </div>

        <div className="mt-16 flex flex-col gap-y-24 md:gap-y-32">
          {philosophy.principles.map((p) => {
            const end = p.align === "end";
            return (
              <div
                key={p.index}
                className={cn(
                  "flex flex-col",
                  end ? "md:items-end md:text-end" : "",
                )}
              >
                <span className="num mb-5 text-[0.85rem] font-medium tracking-[0.1em] text-gold">
                  {p.index}
                </span>
                <RevealHeading
                  as="h3"
                  className={cn(
                    "font-display text-ink text-[clamp(2.5rem,6.6vw,6.5rem)] leading-[0.94] tracking-[-0.02em]",
                    p.upper && "uppercase",
                  )}
                  lineClassName={cn(end && "md:text-end")}
                  lines={p.lines}
                  start="top 88%"
                />
                <Reveal
                  as="p"
                  className="t-body mt-6 max-w-sm text-ink/55"
                  y={16}
                >
                  {p.body}
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
