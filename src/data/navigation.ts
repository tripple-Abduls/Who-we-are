export interface NavItem {
  id: string;
  label: string;
  href: string;
  /** Editorial index shown in the mobile menu. */
  index: string;
}

export const navItems: NavItem[] = [
  { id: "work", label: "Work", href: "#work", index: "01" },
  { id: "services", label: "Services", href: "#services", index: "02" },
  { id: "about", label: "About", href: "#about", index: "03" },
  { id: "process", label: "Process", href: "#process", index: "04" },
  { id: "contact", label: "Contact", href: "#contact", index: "05" },
];

/** Primary call-to-action target used across the site. */
export const CTA = { label: "Start a Project", href: "#contact" } as const;
