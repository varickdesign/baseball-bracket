export interface VideoItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnailUrl: string;
  duration: string;   // e.g. "4:22"
  href: string;
}

export const VIDEO_ITEMS: VideoItem[] = [
  {
    id: "v1",
    title: "2026 Postseason Preview Show",
    excerpt: "Our analysts break down every AL and NL matchup heading into Wild Card weekend.",
    date: "Sep 27, 2026",
    thumbnailUrl: "/hero.jpg",
    duration: "18:45",
    href: "#",
  },
  {
    id: "v2",
    title: "How the Wild Card Format Works",
    excerpt: "Best-of-3 series, seeding rules, and why the #1 and #2 seeds get a bye explained in under 5 minutes.",
    date: "Sep 24, 2026",
    thumbnailUrl: "/hero.jpg",
    duration: "4:22",
    href: "#",
  },
  {
    id: "v3",
    title: "Bracket Challenge Tips from Our Analysts",
    excerpt: "Which upsets to target, when to pick the lower seed, and how to use your tiebreaker wisely.",
    date: "Sep 21, 2026",
    thumbnailUrl: "/hero.jpg",
    duration: "7:11",
    href: "#",
  },
];
