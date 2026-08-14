import type { ReactNode } from "react";

/**
 * Renders a locale string that carries the project's tiny inline-emphasis
 * markup. Keeps the locale files as plain strings — no JSX in content — while
 * still allowing the art-directed accents the design depends on:
 *
 *   `[gold]…[/gold]`  gold accent      → <span class="text-gold">
 *   `[hi]…[/hi]`      bright accent    → <span class="text-bone">
 *   `[em]…[/em]`      italic emphasis  → <em class="italic">
 *
 * Strings without a marker are returned untouched, so the common case adds no
 * elements to the tree.
 */
const PATTERN = /\[(gold|hi|em)\]([\s\S]*?)\[\/\1\]/g;

const ACCENT: Record<string, string> = {
  gold: "text-gold",
  hi: "text-bone",
};

export function Rich({ text }: { text: string }): ReactNode {
  if (!text.includes("[")) return text;

  const parts: ReactNode[] = [];
  let cursor = 0;

  // matchAll clones the regex, so the shared PATTERN keeps no cursor state.
  for (const match of text.matchAll(PATTERN)) {
    const at = match.index;
    if (at > cursor) parts.push(text.slice(cursor, at));
    const [full, tag, inner] = match;
    parts.push(
      tag === "em" ? (
        <em key={parts.length} className="italic">
          {inner}
        </em>
      ) : (
        <span key={parts.length} className={ACCENT[tag]}>
          {inner}
        </span>
      ),
    );
    cursor = at + full.length;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}
