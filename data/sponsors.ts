export interface Sponsor {
  id: string;
  name: string;
  logoText: string;   // text fallback until real logo assets are provided
  href: string;
}

export const SPONSORS: Sponsor[] = [
  { id: "s1", name: "Bargain Grocery",    logoText: "BG",    href: "#" },
  { id: "s2", name: "Compassion Coalition", logoText: "CC",  href: "#" },
  { id: "s3", name: "First Source",       logoText: "FS",    href: "#" },
  { id: "s4", name: "Community Bank",     logoText: "CB",    href: "#" },
  { id: "s5", name: "Local Foods Co.",    logoText: "LF",    href: "#" },
  { id: "s6", name: "The Daily Press",    logoText: "DP",    href: "#" },
];
