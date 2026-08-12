import { SmoothScrollProvider } from "./lib/smooth-scroll";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/sections/Hero";
import { BrandStatement } from "./components/sections/BrandStatement";
import { About } from "./components/sections/About";
import { SelectedWork } from "./components/sections/SelectedWork";
import { Services } from "./components/sections/Services";
import { Philosophy } from "./components/sections/Philosophy";

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main id="top" className="relative">
        <Hero />
        <BrandStatement />
        <About />
        <SelectedWork />
        <Services />
        <Philosophy />
      </main>
    </SmoothScrollProvider>
  );
}
