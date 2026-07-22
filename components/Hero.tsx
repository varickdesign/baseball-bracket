import Image from "next/image";

export default function Hero() {
  return (
    <header className="bg-sox-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center text-center gap-5">
        <Image
          src="/logo.png"
          alt="Bargain Grocery"
          width={100}
          height={100}
          priority
          className="h-20 w-20 rounded-full"
        />

        <p className="text-xs font-heading font-700 uppercase tracking-[0.2em] text-crimson">
          ⚾ 2026 Postseason
        </p>

        <h1 className="font-heading font-black text-4xl sm:text-6xl tracking-tight leading-none uppercase">
          World Series
          <br />
          <span className="text-crimson">Bracket Challenge</span>
        </h1>

        <p className="font-body text-white/70 text-base sm:text-lg max-w-xl leading-relaxed">
          Pick every series winner from Wild Card through the World Series.
          The best bracket wins a{" "}
          <strong className="text-white font-semibold">$500 Bargain Grocery gift card</strong>.
        </p>

        <a
          href="#bracket"
          className="mt-1 inline-block bg-crimson hover:bg-crimson-dark text-white font-heading font-bold text-sm uppercase tracking-widest px-8 py-3 rounded-full shadow-lg transition-colors"
        >
          Make Your Picks →
        </a>
      </div>
    </header>
  );
}
