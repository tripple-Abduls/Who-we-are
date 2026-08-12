import { SmoothScrollProvider } from "./lib/smooth-scroll";
import { RevealHeading } from "./components/ui/RevealHeading";
import { SectionLabel } from "./components/ui/SectionLabel";

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="grain" aria-hidden="true" />
      <main id="top" className="relative">
        <section className="section-y shell">
          <SectionLabel index="00" className="mb-10">
            DESIGN SYSTEM
          </SectionLabel>
          <RevealHeading
            as="h1"
            className="t-hero text-bone"
            lines={["Strategy. Design.", "Technology."]}
          />
          <p className="t-lead mt-8 max-w-xl text-mute">
            Triple brings strategy, design and technology into one focused team
            to create thoughtful digital products and experiences.
          </p>
        </section>
      </main>
    </SmoothScrollProvider>
  );
}
