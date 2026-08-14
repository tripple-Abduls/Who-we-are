import { Fragment, useEffect, useRef } from "react";
import { LocaleProvider, useLocale } from "./i18n/locale";
import { SmoothScrollProvider, useSmoothScroll } from "./lib/smooth-scroll";
import { ScrollTrigger } from "./lib/gsap";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Signature } from "./components/sections/Signature";
import { SelectedWork } from "./components/sections/SelectedWork";
import { Services } from "./components/sections/Services";
import { Philosophy } from "./components/sections/Philosophy";
import { Process } from "./components/sections/Process";
import { Team } from "./components/sections/Team";
import { ContactCTA } from "./components/sections/ContactCTA";
import { Footer } from "./components/layout/Footer";
import { CustomCursor } from "./components/ui/CustomCursor";

export default function App() {
  return (
    <LocaleProvider>
      {/* Lenis lives outside the locale key so switching never creates a
          second instance — it is set up once, for the session. */}
      <SmoothScrollProvider>
        <Site />
      </SmoothScrollProvider>
    </LocaleProvider>
  );
}

function Site() {
  const { locale, content } = useLocale();
  const { scrollTo } = useSmoothScroll();
  const isFirstRender = useRef(true);

  // A language change remounts the tree (see the key below), so the outgoing
  // locale's timelines and ScrollTriggers are reverted rather than stacked on
  // top of the new ones. Jump to the top — Arabic sections have different
  // heights, so holding the old offset would land mid-nowhere — then let the
  // new copy lay out and re-measure exactly once.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollTo(0, { immediate: true });
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [locale, scrollTo]);

  // The Arabic face loads on demand and can land after first paint, which
  // changes text heights. One refresh when it settles keeps trigger boundaries
  // honest. English ships with its fonts in the document head already.
  useEffect(() => {
    if (locale !== "ar" || !document.fonts) return;
    let alive = true;
    void document.fonts.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });
    return () => {
      alive = false;
    };
  }, [locale]);

  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-[3px] focus:bg-bone focus:px-5 focus:py-3 focus:text-[0.8rem] focus:font-medium focus:uppercase focus:tracking-[0.14em] focus:text-ink rtl:focus:normal-case rtl:focus:tracking-normal"
      >
        {content.ui.skipToContent}
      </a>
      <div className="grain" aria-hidden="true" />
      <Fragment key={locale}>
        <CustomCursor />
        <Header />
        <main id="top" className="relative">
          <Hero />
          <About />
          <Signature />
          <SelectedWork />
          <Services />
          <Philosophy />
          <Process />
          <Team />
          <ContactCTA />
        </main>
        <Footer />
      </Fragment>
    </>
  );
}
