import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyDocumentLocale,
  CONTENT,
  DEFAULT_LOCALE,
  directionOf,
  persistLocale,
  resolveLocale,
} from "./index";
import type { Direction, Locale, SiteContent } from "./types";

interface LocaleApi {
  locale: Locale;
  dir: Direction;
  /** Convenience flag for the handful of genuinely directional decisions. */
  isRTL: boolean;
  content: SiteContent;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleApi>({
  locale: DEFAULT_LOCALE,
  dir: "ltr",
  isRTL: false,
  content: CONTENT[DEFAULT_LOCALE],
  setLocale: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export function useLocale(): LocaleApi {
  return useContext(LocaleContext);
}

/**
 * Two-language state, deliberately small: one piece of state, `localStorage`
 * for persistence and `?lang=` for sharing — no routing and no i18n runtime.
 *
 * `index.html` resolves the same value and stamps `lang` / `dir` before first
 * paint, so Arabic never flashes as LTR; this provider keeps them in sync from
 * then on.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(resolveLocale);

  // Before paint, so a switch never shows the new copy at the old direction.
  // Also covers first load if the inline resolver in index.html was stripped.
  useLayoutEffect(() => applyDocumentLocale(locale), [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState((current) => {
      if (current === next) return current;
      persistLocale(next);
      return next;
    });
  }, []);

  const value = useMemo<LocaleApi>(
    () => ({
      locale,
      dir: directionOf(locale),
      isRTL: locale === "ar",
      content: CONTENT[locale],
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
