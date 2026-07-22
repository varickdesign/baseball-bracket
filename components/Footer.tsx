import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-300 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Image
            src="/logo.png"
            alt="Bargain Grocery"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full"
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
