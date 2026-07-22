import Image from "next/image";

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

interface Props {
  columns?: FooterColumn[];
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    heading: "Challenge",
    links: [
      { label: "Enter Now",    href: "#bracket" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Scoring",      href: "#standings" },
      { label: "Official Rules", href: "#rules" },
    ],
  },
  {
    heading: "Content",
    links: [
      { label: "Latest News",  href: "#news" },
      { label: "Video",        href: "#video" },
      { label: "Schedule",     href: "#matchups" },
      { label: "Standings",    href: "#standings" },
    ],
  },
  {
    heading: "Bargain Grocery",
    links: [
      { label: "About Us",        href: "#" },
      { label: "Locations",       href: "#" },
      { label: "Weekly Ad",       href: "#" },
      { label: "Community",       href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Facebook",  href: "#", icon: "f" },
  { label: "Instagram", href: "#", icon: "ig" },
  { label: "X",         href: "#", icon: "x" },
];

export default function Footer({ columns = DEFAULT_COLUMNS }: Props) {
  return (
    <footer className="bg-sox-black text-white mt-16">
      {/* Main columns */}
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Bargain Grocery"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full"
            />
            <div>
              <p className="font-heading font-black text-sm uppercase tracking-wide text-white leading-tight">
                Bargain Grocery
              </p>
              <p className="font-body text-[10px] text-white/40 uppercase tracking-widest">
                Supporting Community
              </p>
            </div>
          </div>
          <p className="font-body text-xs text-white/40 leading-relaxed">
            Bargain Grocery is proud to support the Compassion Coalition and local community organizations across the region.
          </p>
          {/* Social */}
          <div className="flex gap-2 mt-1">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-heading font-black text-[10px] text-white/40 hover:border-crimson hover:text-white hover:bg-crimson transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">
              {col.heading}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/30">
            &copy; {new Date().getFullYear()} Bargain Grocery. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/30 text-center max-w-sm">
            No purchase necessary. Open to legal U.S. residents 18+. See{" "}
            <a href="#rules" className="underline hover:text-white/60 transition-colors">
              Official Rules
            </a>{" "}
            for complete details.
          </p>
        </div>
      </div>
    </footer>
  );
}
