export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;       // display string, e.g. "Sep 15, 2026"
  imageUrl: string;   // path relative to /public, or external URL
  href: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "1",
    title: "Wild Card Weekend Preview: Everything You Need to Know",
    excerpt: "The 2026 MLB postseason begins Tuesday. Here's a breakdown of every first-round matchup, pitching probables, and series predictions.",
    category: "Preview",
    date: "Sep 28, 2026",
    imageUrl: "/hero.jpg",
    href: "#",
  },
  {
    id: "2",
    title: "How to Fill Out Your Bracket Challenge Entry",
    excerpt: "A step-by-step walkthrough of the Bargain Grocery Bracket Challenge — what the rounds mean, how scoring works, and what the tiebreaker decides.",
    category: "Guide",
    date: "Sep 25, 2026",
    imageUrl: "/hero.jpg",
    href: "#bracket",
  },
  {
    id: "3",
    title: "Scoring System Explained: Earn Up to 28 Points",
    excerpt: "Wild Card picks are worth 1 point each, but correctly calling the World Series winner earns you 8 points. Every series matters.",
    category: "Rules",
    date: "Sep 22, 2026",
    imageUrl: "/hero.jpg",
    href: "#rules",
  },
  {
    id: "4",
    title: "$500 Gift Card on the Line — Past Winners Share Their Strategies",
    excerpt: "We talked to previous Bracket Challenge winners about how they approach seeding, momentum, and the all-important tiebreaker.",
    category: "Feature",
    date: "Sep 20, 2026",
    imageUrl: "/hero.jpg",
    href: "#",
  },
];
