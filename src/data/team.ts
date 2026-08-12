export interface TeamMember {
  index: string;
  /** Discipline monogram shown in the placeholder portrait. */
  initial: string;
  name: string;
  role: string;
}

/**
 * Placeholder seats only — no invented names, biographies or portraits. Swap
 * `name` and add a portrait `image` field later without touching the layout.
 */
export const team: TeamMember[] = [
  { index: "01", initial: "S", name: "Member 01", role: "Strategy & Product" },
  { index: "02", initial: "D", name: "Member 02", role: "Design & Experience" },
  {
    index: "03",
    initial: "T",
    name: "Member 03",
    role: "Engineering & Technology",
  },
];
