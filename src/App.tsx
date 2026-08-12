import { SmoothScrollProvider } from "./lib/smooth-scroll";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/sections/Hero";

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main id="top" className="relative">
        <Hero />
      </main>
    </SmoothScrollProvider>
  );
}
