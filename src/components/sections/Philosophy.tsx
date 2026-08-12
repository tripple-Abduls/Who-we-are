import { RevealHeading } from "../ui/RevealHeading";
import { Reveal } from "../ui/Reveal";
import { cn } from "../../lib/cn";

interface Principle {
  index: string;
  lines: string[];
  body: string;
  align: "left" | "right";
  upper?: boolean;
}

const PRINCIPLES: Principle[] = [
  {
    index: "01",
    lines: ["Strategy before", "decoration."],
    body: "We understand the problem before we design the interface.",
    align: "left",
    upper: true,
  },
  {
    index: "02",
    lines: ["Design and engineering", "belong together."],
    body: "The strongest digital products happen when both disciplines evolve as one.",
    align: "right",
  },
  {
    index: "03",
    lines: ["Details are part", "of the product."],
    body: "Motion, responsiveness, performance and polish are never afterthoughts.",
    align: "left",
    upper: true,
  },
  {
    index: "04",
    lines: ["Build for reality."],
    body: "Our work has to perform for real users, on real devices.",
    align: "right",
  },
];

/**
 * The single warm-white chapter — a deliberate black → bone → black shift.
 * Oversized principle statements alternate left/right with quiet supporting
 * lines. Pure typography and whitespace; no cards.
 */
export function Philosophy() {
  return (
    <section id="philosophy" className="bg-bone text-ink section-y">
      <div className="shell">
        <div className="border-t border-ink/15 pt-6">
          <p className="eyebrow text-gold">Principles</p>
        </div>

        <div className="mt-16 flex flex-col gap-y-24 md:gap-y-32">
          {PRINCIPLES.map((p) => {
            const right = p.align === "right";
            return (
              <div
                key={p.index}
                className={cn(
                  "flex flex-col",
                  right ? "md:items-end md:text-right" : "",
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
                  lineClassName={cn(right && "md:text-right")}
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
