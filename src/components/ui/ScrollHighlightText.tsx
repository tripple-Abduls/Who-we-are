import { useRef, type ElementType } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const DIM = "#4b483f";
const BRIGHT = "#f4f2ed";
const GOLD = "#c6a15b";

interface ScrollHighlightTextProps {
  text: string;
  /** A single word (ignoring punctuation) that resolves to gold instead of bone. */
  accent?: string;
  as?: ElementType;
  className?: string;
}

const clean = (w: string) => w.replace(/[^a-z]/gi, "").toLowerCase();

/**
 * A statement whose words brighten from dim to bone as the section scrolls
 * through the viewport — a rolling focus reveal. Used sparingly, on one big
 * belief line. Under reduced motion the words render at full brightness.
 */
export function ScrollHighlightText({
  text,
  accent,
  as = "p",
  className,
}: ScrollHighlightTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const Tag = as;

  const words = text.split(" ");

  useGSAP(
    () => {
      if (!ref.current) return;
      const spans = gsap.utils.toArray<HTMLElement>("[data-word]", ref.current);

      if (reduced) {
        spans.forEach((s) => {
          s.style.color = s.dataset.accent !== undefined ? GOLD : BRIGHT;
        });
        return;
      }

      gsap.set(spans, { color: DIM });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 62%",
          scrub: 0.5,
        },
      });
      spans.forEach((s, i) => {
        tl.to(
          s,
          {
            color: s.dataset.accent !== undefined ? GOLD : BRIGHT,
            duration: 1,
            ease: "none",
          },
          i * 0.5,
        );
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          data-word
          {...(accent && clean(word) === clean(accent)
            ? { "data-accent": "" }
            : {})}
          style={{ color: DIM }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
