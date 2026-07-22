import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-sox-black text-white mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Bargain Grocery"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <p className="font-heading font-black text-sm uppercase tracking-wide text-white">
              Bargain Grocery
            </p>
            <p className="font-body text-xs text-white/40">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>

        <div className="font-body text-xs text-white/40 text-center sm:text-right max-w-xs leading-relaxed">
          No purchase necessary. Open to legal U.S. residents 18+. Entries close at first
          pitch of Wild Card Game 1. See{" "}
          <a href="#rules" className="underline text-white/60 hover:text-white transition-colors">
            Official Rules
          </a>{" "}
          for complete details.
        </div>
      </div>
    </footer>
  );
}
