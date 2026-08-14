import { useLocale } from "../../i18n/locale";
import { cn } from "../../lib/cn";

interface LanguageSwitchProps {
  className?: string;
  /** `menu` gets a slightly larger touch target inside the mobile menu. */
  variant?: "header" | "menu";
}

/**
 * Quiet language control. It always shows the language you would switch *to*,
 * written in that language's own script — `العربية` while English is active,
 * `EN` while Arabic is. Styled to sit with the navigation links rather than
 * compete with them, and carries `lang` / `dir` so the label is announced and
 * shaped correctly whichever locale surrounds it.
 */
export function LanguageSwitch({
  className,
  variant = "header",
}: LanguageSwitchProps) {
  const { locale, content, setLocale } = useLocale();
  const next = locale === "en" ? "ar" : "en";

  return (
    <button
      type="button"
      lang={next}
      dir={next === "ar" ? "rtl" : "ltr"}
      onClick={() => setLocale(next)}
      aria-label={content.language.aria}
      className={cn(
        "group relative inline-flex items-center font-medium text-mute transition-colors duration-[240ms] hover:text-bone",
        // Micro-typography follows the label's own script: tracked uppercase
        // for the Latin "EN", neither for Arabic.
        next === "en"
          ? "text-[0.72rem] uppercase tracking-[0.16em]"
          : "text-[0.8rem] normal-case tracking-normal",
        // In the menu the padding is cancelled by an equal negative margin:
        // a comfortable 40px+ tap target that still occupies only its text
        // height, so adding it barely moves the menu's centred navigation.
        variant === "menu" ? "py-3 -my-3" : "py-1",
        className,
      )}
    >
      <span className="relative">
        {content.language.label}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 start-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 rtl:origin-right"
        />
      </span>
    </button>
  );
}
