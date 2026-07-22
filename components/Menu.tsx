"use client";

import { useState } from "react";

export interface NavLink {
  label: string;
  href: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Home",        href: "/" },
  { label: "Bracket",     href: "#bracket" },
  { label: "Standings",   href: "#standings" },
  { label: "How It Works",href: "#how-it-works" },
  { label: "Rules",       href: "#rules" },
];

interface Props {
  links?: NavLink[];
}

export default function Menu({ links = DEFAULT_LINKS }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-heading font-bold text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 group"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-200 ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-200 ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 bg-sox-charcoal border-t border-white/10 z-50">
            <ul className="flex flex-col py-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-3 font-heading font-bold text-xs uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
