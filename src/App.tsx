import { SmoothScrollProvider } from "./lib/smooth-scroll";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/sections/Hero";
import { BrandStatement } from "./components/sections/BrandStatement";
import { About } from "./components/sections/About";
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
    <SmoothScrollProvider>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[3px] focus:bg-bone focus:px-5 focus:py-3 focus:text-[0.8rem] focus:font-medium focus:uppercase focus:tracking-[0.14em] focus:text-ink"
      >
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <Header />
      <main id="top" className="relative">
        <Hero />
        <BrandStatement />
        <About />
        <SelectedWork />
        <Services />
        <Philosophy />
        <Process />
        <Team />
        <ContactCTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
