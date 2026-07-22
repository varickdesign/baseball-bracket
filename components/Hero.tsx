import Image from "next/image";

export default function Hero() {
  return (
    <header className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col items-center text-center gap-4">
        <div className="mb-2">
          <Image
            src="/logo.png"
            alt="Bargain Grocery"
            width={120}
            height={120}
            priority
            className="h-24 w-24 rounded-full"
          />
        </div>

        <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          <span>⚾</span>
          <span>2026 Postseason</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          World Series
          <br />
          <span className="text-yellow-400">Bracket Challenge</span>
        </h1>

        <p className="text-blue-200 text-base sm:text-lg max-w-xl">
          Pick every series winner from Wild Card through the World Series.
          The best bracket wins a <strong className="text-white">$500 Bargain Grocery gift card</strong>.
        </p>

        <a
          href="#bracket"
          className="mt-2 inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold text-sm uppercase tracking-wide px-6 py-3 rounded-full shadow-lg transition-colors"
        >
          Make Your Picks →
        </a>
      </div>
    </header>
  );
}
