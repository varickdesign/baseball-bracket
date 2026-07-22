"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Wild Card Series first pitch target — update once MLB confirms the date
const TARGET_DATE = new Date("2026-09-29T20:07:00-04:00");

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
  return {
    days:  Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    mins:  Math.floor((diff % 3_600_000)  / 60_000),
    secs:  Math.floor((diff % 60_000)     / 1_000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface Props {
  headline?: string;
  subheadline?: string;
  highlightedWord?: string;
  subcopy?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function Hero({
  headline = "World Series",
  subheadline = "Bracket Challenge",
  subcopy = "Pick every series winner from Wild Card through the World Series. The best bracket wins a $200 Bargain Grocery gift card.",
  ctaLabel = "Make Your Picks →",
  ctaHref = "#bracket",
}: Props) {
  // null until mounted — avoids SSR/client hydration mismatch on the live clock
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => {
      const t = getTimeLeft();
      setTime(t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const expired = time !== null && TARGET_DATE.getTime() <= Date.now();

  return (
    <section className="relative text-white overflow-hidden">
      {/* Full-bleed background */}
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Gradient overlay — heavier on left so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-24 flex flex-col items-start gap-6">
        {/* Eyebrow */}
        <p className="font-heading font-bold text-[11px] uppercase tracking-[0.25em] text-crimson">
          ⚾ 2026 MLB Postseason
        </p>

        {/* Headline */}
        <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-none uppercase">
          {headline}
          <br />
          <span className="text-crimson">{subheadline}</span>
        </h1>

        {/* Sub-copy */}
        <p className="font-body text-white/70 text-base sm:text-lg max-w-lg leading-relaxed">
          {subcopy}
        </p>

        {/* CTA */}
        <a
          href={ctaHref}
          className="bg-crimson hover:bg-crimson-dark text-white font-heading font-black text-sm uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg transition-colors"
        >
          {ctaLabel}
        </a>

        {/* Countdown — only renders after client mount to avoid hydration mismatch */}
        {time !== null && (
          expired ? (
            <p className="font-heading font-bold text-xs uppercase tracking-widest text-crimson">
              Entries are now closed.
            </p>
          ) : (
            <div className="mt-2 flex flex-col gap-2">
              <p className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] text-white/40">
                Entries close at first pitch
              </p>
              <div className="flex gap-3 sm:gap-5">
                {[
                  { value: time.days,  label: "Days" },
                  { value: time.hours, label: "Hrs" },
                  { value: time.mins,  label: "Min" },
                  { value: time.secs,  label: "Sec" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col items-center">
                    <span className="font-heading font-black text-3xl sm:text-4xl leading-none tabular-nums text-white">
                      {pad(value)}
                    </span>
                    <span className="font-heading font-bold text-[9px] uppercase tracking-widest text-white/40 mt-1">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
