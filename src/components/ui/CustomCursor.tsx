import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Mode = "default" | "hover" | "label";

const BONE_40 = "rgba(244,242,237,0.4)";
const GOLD = "#c6a15b";

/**
 * Subtle desktop-only cursor: a trailing ring + gold dot that expands over
 * interactive elements and becomes a labelled disc over `[data-cursor]`
 * targets (VIEW / GO). Never mounts on touch or coarse pointers or under
 * reduced motion, and never blocks pointer events or text selection.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!root || !ring || !dot || !label) return;

    document.documentElement.setAttribute("data-cursor", "on");

    const xTo = gsap.quickTo(root, "x", { duration: 0.16, ease: "power3" });
    const yTo = gsap.quickTo(root, "y", { duration: 0.16, ease: "power3" });

    let shown = false;
    let mode: Mode = "default";

    const setMode = (next: Mode, text = "") => {
      if (next === mode && next !== "label") return;
      mode = next;
      if (next === "label") {
        label.textContent = text;
        gsap.to(ring, { autoAlpha: 0, scale: 0.4, duration: 0.25 });
        gsap.to(dot, { autoAlpha: 0, duration: 0.2 });
        gsap.to(label, { autoAlpha: 1, scale: 1, duration: 0.25, ease: "power3.out" });
      } else if (next === "hover") {
        gsap.to(ring, { autoAlpha: 1, scale: 1.6, borderColor: GOLD, duration: 0.25 });
        gsap.to(dot, { autoAlpha: 0, duration: 0.2 });
        gsap.to(label, { autoAlpha: 0, scale: 0.6, duration: 0.2 });
      } else {
        gsap.to(ring, { autoAlpha: 1, scale: 1, borderColor: BONE_40, duration: 0.25 });
        gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
        gsap.to(label, { autoAlpha: 0, scale: 0.6, duration: 0.2 });
      }
    };

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to(root, { autoAlpha: 1, duration: 0.3 });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const labelled = target?.closest?.("[data-cursor]") as HTMLElement | null;
      if (labelled) {
        setMode("label", labelled.dataset.cursor === "view" ? "View" : "Go");
        return;
      }
      if (target?.closest?.("a, button, input, textarea, select")) {
        setMode("hover");
        return;
      }
      setMode("default");
    };

    const onLeave = () => gsap.to(root, { autoAlpha: 0, duration: 0.2 });
    const onEnter = () => {
      shown = true;
      gsap.to(root, { autoAlpha: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.removeAttribute("data-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      gsap.killTweensOf([root, ring, dot, label]);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] opacity-0"
    >
      <div
        ref={ringRef}
        className="absolute size-9 rounded-full border"
        style={{ margin: "-18px 0 0 -18px", borderColor: BONE_40 }}
      />
      <div
        ref={dotRef}
        className="absolute size-1.5 rounded-full bg-gold"
        style={{ margin: "-3px 0 0 -3px" }}
      />
      <div
        ref={labelRef}
        className="absolute grid size-14 place-items-center rounded-full bg-gold text-[0.58rem] font-medium uppercase tracking-[0.12em] text-ink opacity-0"
        style={{ margin: "-28px 0 0 -28px" }}
      />
    </div>
  );
}
