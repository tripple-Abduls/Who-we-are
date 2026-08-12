import { useRef } from "react";
import { cn } from "../../lib/cn";
import { gsap, useGSAP } from "../../lib/gsap";
import { EASE } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface SectionLabelProps {
  /** Editorial index, e.g. "02". */
  index: string;
  children: string;
  className?: string;
  /** Warm-white sections flip the label colors. */
  tone?: "dark" | "light";
}

/**
 * Editorial section marker — "02 ⋮ SELECTED WORK". The three-tick mark (middle
 * gold, taller) is Tripple's recurring signature; the ticks draw in 1·2·3 as the
 * label enters, echoing the studio's three-part rhythm. Static under reduced
 * motion.
 */
export function SectionLabel({
  index,
  children,
  className,
  tone = "dark",
}: SectionLabelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from("[data-tick]", {
        scaleY: 0,
        transformOrigin: "bottom center",
        duration: 0.5,
        ease: EASE.outExpo,
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 92%" },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  const outerTick = tone === "dark" ? "bg-mute/50" : "bg-ink/25";
  const labelColor = tone === "dark" ? "text-mute" : "text-ink/55";

  return (
    <div ref={ref} className={cn("flex items-center gap-4", className)}>
      <span className="eyebrow num text-gold">{index}</span>
      <span aria-hidden="true" className="flex items-end gap-[3px]">
        <span data-tick className={cn("block h-2.5 w-px", outerTick)} />
        <span data-tick className="block h-4 w-px bg-gold" />
        <span data-tick className={cn("block h-2.5 w-px", outerTick)} />
      </span>
      <span className={cn("eyebrow", labelColor)}>{children}</span>
    </div>
  );
}
