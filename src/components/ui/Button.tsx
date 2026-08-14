import type { MouseEvent, ReactNode } from "react";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { useLocale } from "../../i18n/locale";
import { useSmoothScroll } from "../../lib/smooth-scroll";
import { SCROLL_OFFSET } from "../../lib/constants";

type ButtonVariant = "solid" | "outline";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  withArrow?: boolean;
  className?: string;
  ariaLabel?: string;
}

// `rtl:` drops the Latin micro-typography for Arabic (unicase, and tracking
// breaks joined letterforms) and gives the label room to breathe vertically.
const BASE =
  "group relative inline-flex select-none items-center justify-center overflow-hidden rounded-[3px] px-7 py-4 text-[0.76rem] font-medium uppercase tracking-[0.18em] leading-none transition-colors duration-[360ms] ease-[cubic-bezier(0.16,1,0.3,1)] rtl:normal-case rtl:tracking-normal rtl:text-[0.85rem] rtl:leading-[1.4]";

const VARIANTS: Record<ButtonVariant, string> = {
  solid: "bg-bone text-ink",
  outline: "border border-line text-bone group-hover:border-gold hover:text-ink",
};

const FILL: Record<ButtonVariant, string> = {
  solid: "bg-gold",
  outline: "bg-gold",
};

/**
 * Refined CTA. Rectangular, tightly-tracked type, with a gold fill that slides
 * up on hover and an arrow that nudges. Renders as an anchor (with smooth
 * in-page scroll for hash targets) or a button.
 */
export function Button({
  children,
  href,
  onClick,
  variant = "solid",
  withArrow = true,
  className,
  ariaLabel,
}: ButtonProps) {
  const { scrollTo } = useSmoothScroll();
  const { isRTL } = useLocale();

  // "Onward" is a reading direction, not a physical one: the diagonal points
  // up-and-forward, which is up-left once the page reads right-to-left.
  const Arrow = isRTL ? ArrowUpLeft : ArrowUpRight;

  const isExternal = !!href && /^https?:\/\//.test(href);

  const handleClick = (e: MouseEvent) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      onClick?.();
      scrollTo(href, { offset: SCROLL_OFFSET });
      return;
    }
    onClick?.();
  };

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-0 translate-y-full transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0",
          FILL[variant],
        )}
      />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
        {withArrow && (
          <Arrow
            className="size-4 transition-transform duration-[360ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] rtl:group-hover:-translate-x-[3px]"
            strokeWidth={1.75}
          />
        )}
      </span>
    </>
  );

  const classes = cn(BASE, VARIANTS[variant], className);

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={classes}
        aria-label={ariaLabel}
        data-cursor="cta"
        {...(isExternal
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onClick?.()}
      className={classes}
      aria-label={ariaLabel}
      data-cursor="cta"
    >
      {inner}
    </button>
  );
}
