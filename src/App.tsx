import { SmoothScrollProvider } from "./lib/smooth-scroll";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/sections/Hero";
import { BrandStatement } from "./components/sections/BrandStatement";
import { About } from "./components/sections/About";

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main id="top" className="relative">
        <Hero />
        <BrandStatement />
        <About />
      </main>
    </SmoothScrollProvider>
  );
}
