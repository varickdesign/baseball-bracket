import Image from "next/image";
import Menu, { type NavLink } from "./Menu";

interface Props {
  links?: NavLink[];
}

export default function Header({ links }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-sox-black border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo + brand */}
        <a href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Bargain Grocery"
            width={40}
            height={40}
            className="h-9 w-9 rounded-full"
          />
          <div className="hidden sm:block">
            <p className="font-heading font-black text-xs uppercase tracking-widest text-white leading-tight">
              Bargain Grocery
            </p>
            <p className="font-body text-[9px] text-white/40 uppercase tracking-widest">
              Bracket Challenge
            </p>
          </div>
        </a>

        {/* Nav + CTA */}
        <div className="flex items-center gap-4">
          <Menu links={links} />
          <a
            href="#bracket"
            className="hidden sm:inline-block bg-crimson hover:bg-crimson-dark text-white font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors flex-shrink-0"
          >
            Enter Now
          </a>
        </div>
      </div>
    </header>
  );
}
