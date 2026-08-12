import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMediaQuery } from "../hooks/useMediaQuery";

type ScrollTarget = string | number | HTMLElement;
type ScrollToOptions = { offset?: number; immediate?: boolean };
type ScrollTo = (target: ScrollTarget, options?: ScrollToOptions) => void;

interface SmoothScrollApi {
  scrollTo: ScrollTo;
  /** Pause scrolling (e.g. while a full-screen overlay is open). */
  stop: () => void;
  /** Resume scrolling. */
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi>({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

/**
 * Drives Lenis smooth scrolling and keeps it in lockstep with GSAP's ticker
 * and ScrollTrigger — on desktop only. On touch / small screens (<=768px) and
 * under reduced motion, Lenis is never created: the page uses native scrolling
 * (no continuous rAF loop) and `scrollTo` falls back to native scrolling. This
 * is the single biggest mobile-scroll performance win.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  // Desktop only (>=1024). Tablet and mobile use native scrolling.
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const enableLenis = !reduced && isDesktop;

  useEffect(() => {
    if (!enableLenis) return;

    const lenis = new Lenis({
      duration: 0.9,
      // Quartic ease-out: settles quickly so fast scrolls never feel like syrup.
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger measurements aligned with Lenis' virtual scroll.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enableLenis]);

  const scrollTo: ScrollTo = (target, options) => {
    const lenis = lenisRef.current;
    const offset = options?.offset ?? 0;

    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.15 });
      return;
    }

    // Reduced-motion / pre-init fallback: native, instant.
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    if (el instanceof HTMLElement) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "auto" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "auto" });
    }
  };

  const stop = () => {
    if (lenisRef.current) lenisRef.current.stop();
    else document.body.style.overflow = "hidden";
  };

  const start = () => {
    if (lenisRef.current) lenisRef.current.start();
    else document.body.style.overflow = "";
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, stop, start }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
