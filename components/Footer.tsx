import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-300 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-2">
          {/* Replace logo-white.svg with the real Bargain Grocery logo */}
          <Image
            src="/logo-white.svg"
            alt="Bargain Grocery"
            width={140}
            height={40}
            className="h-8 w-auto opacity-80"
          />
          <p className="text-xs text-blue-400">
            &copy; {new Date().getFullYear()} Bargain Grocery. All rights reserved.
          </p>
        </div>

        <div className="text-xs text-blue-400 text-center sm:text-right max-w-xs">
          No purchase necessary. Open to legal U.S. residents 18+. Entries close at first pitch
          of Wild Card Game 1. See{" "}
          <a href="#rules" className="underline hover:text-blue-200">
            Official Rules
          </a>{" "}
          for complete details.
        </div>
      </div>
    </footer>
  );
}
