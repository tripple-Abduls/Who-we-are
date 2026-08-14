import { en } from "./en";
import { ar } from "./ar";
import type { Direction, Locale, SiteContent } from "./types";

export type {
  Cta,
  Direction,
  Locale,
  NavItem,
  Principle,
  ProcessStep,
  Project,
  Service,
  SignaturePhase,
  SiteContent,
  TeamMember,
} from "./types";

export const LOCALES = ["en", "ar"] as const;

export const CONTENT: Record<Locale, SiteContent> = { en, ar };

export const DEFAULT_LOCALE: Locale = "en";

/** localStorage key holding the reader's chosen language. */
export const LOCALE_STORAGE_KEY = "triple-locale";

/** Query parameter used for a shareable Arabic link (`?lang=ar`). */
export const LOCALE_QUERY_KEY = "lang";

/** Kept in sync with the early inline resolver in `index.html`. */
export const ARABIC_FONT_LINK_ID = "ar-fonts";
export const ARABIC_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "ar";
}

export function directionOf(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

/**
 * Resolution order: an explicit `?lang=` (so links are shareable) beats the
 * stored choice, which beats the English default. Mirrors the inline resolver
 * in `index.html` that runs before first paint to avoid an LTR → RTL flash.
 */
export function resolveLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get(
      LOCALE_QUERY_KEY,
    );
    if (isLocale(fromUrl)) return fromUrl;
  } catch {
    /* malformed query string — fall through */
  }
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    /* storage blocked (private mode) — fall through */
  }
  return DEFAULT_LOCALE;
}

/**
 * Loads the Arabic typeface on demand, so English readers never pay for it.
 * Idempotent, and a no-op when the inline resolver already added the link.
 */
export function ensureArabicFonts(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(ARABIC_FONT_LINK_ID)) return;
  const link = document.createElement("link");
  link.id = ARABIC_FONT_LINK_ID;
  link.rel = "stylesheet";
  link.href = ARABIC_FONT_HREF;
  document.head.appendChild(link);
}

/** Root `lang` / `dir` plus locale-aware document metadata. */
export function applyDocumentLocale(locale: Locale): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.lang = locale;
  root.dir = directionOf(locale);

  const { meta } = CONTENT[locale];
  document.title = meta.title;
  const description = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]',
  );
  if (description) description.content = meta.description;

  if (locale === "ar") ensureArabicFonts();
}

/** Persists the choice and keeps the URL shareable. */
export function persistLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* storage blocked — the in-memory choice still applies for this visit */
  }
  try {
    const url = new URL(window.location.href);
    if (locale === DEFAULT_LOCALE) url.searchParams.delete(LOCALE_QUERY_KEY);
    else url.searchParams.set(LOCALE_QUERY_KEY, locale);
    window.history.replaceState(null, "", url);
  } catch {
    /* history unavailable — persistence via storage is enough */
  }
}
