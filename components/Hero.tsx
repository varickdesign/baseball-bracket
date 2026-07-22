import Image from "next/image";

export default function Hero() {
  return (
    <header className="relative text-white overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      {/* Top nav bar — logo left */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Bargain Grocery"
            width={52}
            height={52}
            priority
            className="h-13 w-13 rounded-full flex-shrink-0"
          />
          <div>
            <p className="font-heading font-black text-sm uppercase tracking-widest text-white leading-tight">
              Bargain Grocery
            </p>
            <p className="font-body text-[10px] text-white/50 uppercase tracking-widest">
              Supporting Community
            </p>
          </div>
        </div>
      </div>

      {/* Hero content — left-aligned */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-24 flex flex-col items-start gap-5">
        <p className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-crimson">
          ⚾ 2026 Postseason
        </p>

        <h1 className="font-heading font-black text-4xl sm:text-6xl tracking-tight leading-none uppercase">
          World Series
          <br />
          <span className="text-crimson">Bracket Challenge</span>
        </h1>

        <p className="font-body text-white/70 text-base sm:text-lg max-w-lg leading-relaxed">
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

