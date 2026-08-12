import { cn } from "../../lib/cn";

interface SectionLabelProps {
  /** Editorial index, e.g. "02". */
  index: string;
  children: string;
  className?: string;
  /** Warm-white sections flip the label colors. */
  tone?: "dark" | "light";
}

/**
 * Editorial section marker — "02 / SELECTED WORK" — with a gold index and a
 * thin rule. Reinforces the technical, numbered identity across the page.
 */
export function SectionLabel({
  index,
  children,
  className,
  tone = "dark",
}: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="eyebrow num text-gold">{index}</span>
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8 shrink-0",
          tone === "dark" ? "bg-line" : "bg-ink/20",
        )}
      />
      <span
        className={cn(
          "eyebrow",
          tone === "dark" ? "text-mute" : "text-ink/55",
        )}
      >
        {children}
      </span>
    </div>
  );
}
