export interface ProcessStep {
  index: string;
  title: string;
  body: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    body: "Understand the business, the audience, the goals and the constraints.",
  },
  {
    index: "02",
    title: "Define",
    body: "Turn insight into a clear strategy and a sharp experience direction.",
  },
  {
    index: "03",
    title: "Create",
    body: "Design the interface, the system, the interactions and the visual language.",
  },
  {
    index: "04",
    title: "Build",
    body: "Engineer the experience with production quality in mind from the start.",
  },
  {
    index: "05",
    title: "Refine",
    body: "Test, polish and improve until the experience feels genuinely complete.",
  },
];
