import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { navItems, CTA } from "../../data/navigation";
import { useSmoothScroll } from "../../lib/smooth-scroll";
import { SCROLL_OFFSET } from "../../lib/constants";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Button } from "../ui/Button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen editorial menu. Large numbered typography, refined open/close
 * timeline, focus trap, ESC-to-close and background scroll lock.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<ReturnType<typeof gsap.timeline> | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const { scrollTo, stop, start } = useSmoothScroll();
  const reduced = useReducedMotion();

  // Build the open timeline once (or set the reduced-motion resting state).
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      gsap.set(root, { autoAlpha: 0 });
      if (reduced) return;

      const items = root.querySelectorAll("[data-menu-item]");
      const footer = root.querySelector("[data-menu-footer]");

      const tl = gsap.timeline({ paused: true });
      tl.set(root, { autoAlpha: 1 })
        .fromTo(
          root.querySelector("[data-menu-panel]"),
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: DUR.standard,
            ease: EASE.inOut,
          },
          0,
        )
        .fromTo(
          items,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: DUR.reveal,
            ease: EASE.outExpo,
            stagger: 0.06,
          },
          0.12,
        )
        .fromTo(
          footer,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: DUR.reveal, ease: EASE.out },
          0.28,
        );
      tlRef.current = tl;
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  // Play / reverse on open change + lock scroll.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const tl = tlRef.current;

    if (open) {
      lastFocused.current = document.activeElement as HTMLElement;
      stop();
      if (tl) tl.timeScale(1).play();
      else gsap.set(root, { autoAlpha: 1 });
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      if (tl) tl.timeScale(1.5).reverse();
      else gsap.set(root, { autoAlpha: 0 });
      start();
      lastFocused.current?.focus?.();
    }
  }, [open, stop, start]);

  // ESC + focus trap while open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const root = rootRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleNav = (href: string) => {
    onClose();
    start();
    requestAnimationFrame(() => scrollTo(href, { offset: SCROLL_OFFSET }));
  };

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="invisible fixed inset-0 z-[80] md:hidden"
      // Keep out of the tab order entirely when closed.
      {...(!open ? { inert: true } : {})}
    >
      <div
        data-menu-panel
        className="flex h-dvh w-full flex-col bg-ink"
      >
        {/* Top bar */}
        <div className="shell flex items-center justify-between py-6">
          <span className="text-[0.98rem] font-medium uppercase tracking-[0.28em] text-bone">
            Triple<span className="text-gold">.</span>
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="group flex items-center gap-2.5 py-1"
          >
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-bone">
              Close
            </span>
            <X
              className="size-5 text-bone transition-colors group-hover:text-gold"
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Primary"
          className="shell flex flex-1 flex-col justify-center"
        >
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.id} className="reveal-mask">
                <a
                  data-menu-item
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(item.href);
                  }}
                  className="group flex items-baseline gap-5 py-2"
                >
                  <span className="num text-[0.8rem] font-medium tracking-[0.1em] text-gold">
                    {item.index}
                  </span>
                  <span className="t-h1 text-bone transition-[color,transform] duration-[360ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-gold">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div
          data-menu-footer
          className="shell flex flex-col gap-6 border-t border-line py-8"
        >
          <p className="eyebrow text-mute">Independent digital studio</p>
          <Button
            href={CTA.href}
            onClick={() => {
              onClose();
              start();
            }}
            className="w-full"
          >
            {CTA.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
