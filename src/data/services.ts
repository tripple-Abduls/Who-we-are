export interface Service {
  index: string;
  title: string;
  capabilities: string[];
}

export const services: Service[] = [
  {
    index: "01",
    title: "Strategy & Product",
    capabilities: [
      "Product Strategy",
      "Research",
      "Digital Direction",
      "Product Architecture",
    ],
  },
  {
    index: "02",
    title: "UX & UI Design",
    capabilities: [
      "User Experience",
      "Interface Systems",
      "Interaction Design",
      "Prototyping",
    ],
  },
  {
    index: "03",
    title: "Web Development",
    capabilities: [
      "Frontend Engineering",
      "Responsive Platforms",
      "Interactive Experiences",
      "Performance",
    ],
  },
  {
    index: "04",
    title: "Application Development",
    capabilities: [
      "Web Applications",
      "Product Platforms",
      "Internal Tools",
      "Scalable Interfaces",
    ],
  },
  {
    index: "05",
    title: "Brand & Digital Identity",
    capabilities: [
      "Brand Direction",
      "Visual Identity",
      "Design Systems",
      "Digital Expression",
    ],
  },
  {
    index: "06",
    title: "Creative Technology",
    capabilities: [
      "Motion",
      "Interaction",
      "Experimental Interfaces",
      "Digital Experiences",
    ],
  },
];
