import { ArrowUp } from "lucide-react";
import { navItems } from "../../data/navigation";
import { useSmoothScroll } from "../../lib/smooth-scroll";
import { SCROLL_OFFSET } from "../../lib/constants";
import { Reveal } from "../ui/Reveal";

/** Channels are placeholders until real profiles exist — no invented URLs. */
const CHANNELS = ["LinkedIn", "GitHub", "Behance", "Instagram"];

function FooterLink({ href, children }: { href: string; children: string }) {
  const { scrollTo } = useSmoothScroll();
  return (
    <a
      href={href}
      onClick={(e) => {
        if (href.startsWith("#")) {
          e.preventDefault();
          scrollTo(href, { offset: SCROLL_OFFSET });
        }
      }}
      className="group inline-flex w-fit items-center text-[0.95rem] text-mute transition-colors duration-[240ms] hover:text-bone"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
      </span>
    </a>
  );
}

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer
      id="site-footer"
      className="overflow-hidden border-t border-line bg-ink-soft"
    >
      <div className="shell section-y-sm">
        {/* Columns */}
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-gold">Strategy / Design / Technology</p>
            <p className="t-body mt-7 max-w-xs text-mute">
              An independent digital studio, building its first case studies.
            </p>
          </div>

          <nav className="md:col-span-3 md:col-start-7" aria-label="Footer">
            <p className="eyebrow text-faint">Navigate</p>
            <ul className="mt-6 flex flex-col gap-3.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow text-faint">Studio</p>
            <ul className="mt-6 flex flex-col gap-3.5">
              {CHANNELS.map((channel) => (
                <li
                  key={channel}
                  className="flex items-center gap-2.5 text-[0.95rem] text-faint"
                >
                  {channel}
                  <span className="rounded-[2px] border border-line px-1.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-mute">
                    Soon
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Giant brand signature */}
        <Reveal className="mt-20 md:mt-28" y={30}>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(0);
            }}
            aria-label="Tripple — back to top"
            className="block whitespace-nowrap font-display leading-[0.78] text-bone"
            style={{
              fontSize: "clamp(5rem, 25vw, 22rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Tripple<span className="text-gold">.</span>
          </a>
        </Reveal>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9rem] text-mute">
            Built by Tripple<span className="text-gold">.</span>
          </p>
          <div className="flex items-center gap-7">
            <span className="num eyebrow text-faint">© 2026</span>
            <button
              type="button"
              onClick={() => scrollTo(0)}
              className="group flex items-center gap-2 eyebrow text-mute transition-colors duration-[240ms] hover:text-gold"
            >
              Back to top
              <ArrowUp
                className="size-3.5 transition-transform duration-[300ms] group-hover:-translate-y-0.5"
                strokeWidth={1.75}
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
