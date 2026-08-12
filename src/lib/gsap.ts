import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once, at module load, so every consumer shares the same instances.
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Don't refresh ScrollTrigger when the mobile browser chrome grows/shrinks the
// viewport — that avoids layout jumps mid-scroll on phones.
ScrollTrigger.config({ ignoreMobileResize: true });

// Reduced-motion branches legitimately leave some targets absent; no warnings.
gsap.config({ nullTargetWarn: false });

export { gsap, ScrollTrigger, useGSAP };
