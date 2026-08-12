import { useRef, type ReactNode, type ElementType } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE, STAGGER, REVEAL_START } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../../lib/cn";

type HeadingTag = "h1" | "h2" | "h3" | "p" | "div";

interface RevealHeadingProps {
  /** Each entry is one visually-controlled line (art-directed line breaks). */
  lines: ReactNode[];
  as?: HeadingTag;
  className?: string;
  lineClassName?: string;
  start?: string;
  stagger?: number;
  delay?: number;
}

/**
 * Masked, line-by-line reveal for headings. Each line lives inside a clipping
 * mask and rises into place on scroll. Descenders stay visible at rest via a
 * padded mask whose extra height is cancelled with a negative margin, so line
 * rhythm is untouched. Falls back to fully-visible text under reduced motion.
 */
export function RevealHeading({
  lines,
  as = "h2",
  className,
  lineClassName,
  start = REVEAL_START,
  stagger = STAGGER.base,
  delay = 0,
}: RevealHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const inners =
        ref.current.querySelectorAll<HTMLElement>("[data-reveal-line]");
      gsap.set(inners, { yPercent: 118 });
      gsap.to(inners, {
        yPercent: 0,
        duration: DUR.reveal,
        ease: EASE.outExpo,
        stagger,
        delay,
        scrollTrigger: { trigger: ref.current, start },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  const Tag = as as ElementType;
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="reveal-mask"
          style={{ paddingBottom: "0.16em", marginBottom: "-0.16em" }}
        >
          <span
            data-reveal-line
            className={cn("block will-change-transform", lineClassName)}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
