import { useSyncExternalStore } from "react";

/**
 * Reactive media-query reader (SSR-safe; defaults to `false` server-side).
 * Used to gate desktop-only interactions like ScrollTrigger pinning.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
