import type { MouseEvent, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { useSmoothScroll } from "../../lib/smooth-scroll";
import { SCROLL_OFFSET } from "../../lib/constants";

interface ArrowLinkProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * Secondary / inline link: tracked label with a gold underline that travels
 * in from the left and an arrow that slides on hover.
 */
export function ArrowLink({
  children,
  href,
  onClick,
  className,
  ariaLabel,
}: ArrowLinkProps) {
  const { scrollTo } = useSmoothScroll();
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

  const classes = cn(
    "group inline-flex items-center gap-2.5 text-[0.76rem] font-medium uppercase tracking-[0.18em] text-bone transition-colors duration-[240ms] hover:text-gold rtl:normal-case rtl:tracking-normal rtl:text-[0.85rem]",
    className,
  );

  const inner = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-[360ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />
      </span>
      <ArrowRight
        className="size-4 transition-transform duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
        strokeWidth={1.75}
      />
    </>
  );

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
