export interface Project {
  id: string;
  /** Editorial folio number, e.g. "01". */
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  /** Optional real assets — drop in later to replace the placeholder visual. */
  image?: string;
  href?: string;
}

/**
 * Placeholder slots. Intentionally generic — no invented clients, metrics or
 * brands. Replace `title`, `description`, `image` and `href` with real case
 * studies without touching the Selected Work layout.
 */
export const projects: Project[] = [
  {
    id: "project-01",
    index: "01",
    title: "Project Title",
    category: "Digital Product",
    year: "2026",
    description: "Project details will be added here.",
  },
  {
    id: "project-02",
    index: "02",
    title: "Project Title",
    category: "Brand Experience",
    year: "2026",
    description: "Project details will be added here.",
  },
  {
    id: "project-03",
    index: "03",
    title: "Project Title",
    category: "Platform",
    year: "2026",
    description: "Project details will be added here.",
  },
  {
    id: "project-04",
    index: "04",
    title: "Project Title",
    category: "Web Experience",
    year: "2026",
    description: "Project details will be added here.",
  },
  {
    id: "project-05",
    index: "05",
    title: "Project Title",
    category: "Product Platform",
    year: "2026",
    description: "Project details will be added here.",
  },
  {
    id: "project-06",
    index: "06",
    title: "Project Title",
    category: "Interactive Experience",
    year: "2026",
    description: "Project details will be added here.",
  },
];
