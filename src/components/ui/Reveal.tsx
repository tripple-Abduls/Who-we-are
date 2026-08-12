import { useRef, type ReactNode, type ElementType } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE, REVEAL_START } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  as?: "div" | "li" | "figure" | "span" | "p";
  className?: string;
  /** Vertical travel in px. */
  y?: number;
  delay?: number;
  start?: string;
}

/**
 * Lightweight fade-and-rise for a single block on scroll. For groups, prefer a
 * single section timeline with a stagger to keep ScrollTrigger count in check.
 */
export function Reveal({
  children,
  as = "div",
  className,
  y = 26,
  delay = 0,
  start = REVEAL_START,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from(ref.current, {
        autoAlpha: 0,
        y,
        duration: DUR.reveal,
        ease: EASE.out,
        delay,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  const Tag = as as ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
