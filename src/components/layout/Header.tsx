import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { navItems, CTA } from "../../data/navigation";
import { useSmoothScroll } from "../../lib/smooth-scroll";
import { SCROLL_OFFSET } from "../../lib/constants";
import { gsap, useGSAP } from "../../lib/gsap";
import { EASE, DUR } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const reduced = useReducedMotion();

  // Compact / background state after leaving the very top.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Entrance: brand, nav and CTA settle in on load.
  useGSAP(
    () => {
      if (reduced || !headerRef.current) return;
      gsap.from(headerRef.current.querySelectorAll("[data-header-item]"), {
        y: -14,
        autoAlpha: 0,
        duration: DUR.reveal,
        ease: EASE.out,
        stagger: 0.07,
        delay: 0.1,
      });
    },
    { scope: headerRef, dependencies: [reduced] },
  );

  const go = (href: string) => scrollTo(href, { offset: SCROLL_OFFSET });

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-[70] border-b transition-[background-color,border-color,padding] duration-[360ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-line bg-ink py-3.5 md:bg-ink/80 md:backdrop-blur-md"
            : "border-transparent py-6",
        )}
      >
        <div className="shell flex items-center justify-between gap-6">
          {/* Wordmark */}
          <a
            data-header-item
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("#top");
            }}
            aria-label="Tripple — back to top"
            className="text-[0.98rem] font-medium uppercase tracking-[0.28em] text-bone transition-colors duration-[240ms] hover:text-gold"
          >
            Tripple<span className="text-gold">.</span>
          </a>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-9 md:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                data-header-item
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className="group relative py-1 text-[0.82rem] font-medium tracking-[0.02em] text-mute transition-colors duration-[240ms] hover:text-bone"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-4">
            <div data-header-item className="hidden lg:block">
              <Button
                href={CTA.href}
                variant="outline"
                className="px-6 py-3 text-[0.7rem]"
              >
                {CTA.label}
              </Button>
            </div>

            <button
              data-header-item
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="group flex items-center gap-2.5 py-1 md:hidden"
            >
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-bone">
                Menu
              </span>
              <Menu
                className="size-5 text-bone transition-colors group-hover:text-gold"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
