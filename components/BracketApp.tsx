"use client";

import { useEffect, useState, useCallback } from "react";
import type { BracketState, Team } from "@/lib/bracket-types";
import {
  buildInitialBracket,
  isBracketComplete,
  pickWinner,
  countPicks,
  TOTAL_SERIES,
} from "@/lib/bracket-engine";
import BracketGrid from "./BracketGrid";
import EntryForm from "./EntryForm";

const STORAGE_KEY = "wsbc-bracket-2026";

function loadFromStorage(): BracketState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveToStorage(state: BracketState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage unavailable
  }
}

async function fireConfetti() {
  const { default: confetti } = await import("canvas-confetti");
  confetti({
    particleCount: 200,
    spread: 90,
    origin: { y: 0.6 },
    colors: ["#C92F36", "#0B0B0B", "#FFFFFF", "#FF671F"],
  });
  setTimeout(
    () =>
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#C92F36", "#201D1D", "#FFFFFF"],
      }),
    400
  );
}

export default function BracketApp() {
  const [bracket, setBracket] = useState<BracketState>(() => buildInitialBracket());
  const [hydrated, setHydrated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) setBracket(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveToStorage(bracket);
  }, [bracket, hydrated]);

  const handlePick = useCallback((seriesId: string, winner: Team) => {
    setBracket((prev) => pickWinner(prev, seriesId, winner));
  }, []);

  const handleReset = useCallback(() => {
    const fresh = buildInitialBracket();
    setBracket(fresh);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  const handleSubmitSuccess = useCallback(async () => {
    setSubmitted(true);
    await fireConfetti();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-24 text-center px-4 bg-sox-gray">
        <div className="text-5xl">🎉</div>
        <p className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-crimson">
          Entry Received
        </p>
        <h2 className="font-heading font-black text-3xl uppercase text-sox-body tracking-tight">
          Your bracket is in!
        </h2>
        <p className="font-body text-gray-500 max-w-md">
          We received your picks. Check your email for a confirmation. Good luck — and play ball!
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            handleReset();
          }}
          className="font-body text-sm text-crimson underline hover:text-crimson-dark"
        >
          Start a new entry
        </button>
      </div>
    );
  }

  const complete = isBracketComplete(bracket);
  const picks = countPicks(bracket);
  const pct = Math.round((picks / TOTAL_SERIES) * 100);

  return (
    <div className="flex flex-col gap-10">
      {/* Bracket section */}
      <section id="bracket" className="border border-sox-border border-t-4 border-t-sox-charcoal">
        {/* Section header bar */}
        <div className="bg-sox-charcoal px-5 py-3 flex items-center justify-between">
          <p className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-white/60">
            Your Bracket
          </p>
          <button
            onClick={handleReset}
            className="font-body text-xs text-white/30 hover:text-white/70 underline transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="p-4 sm:p-6 bg-white overflow-x-auto">
          {!hydrated ? (
            <div className="h-64 flex items-center justify-center font-heading text-xs uppercase tracking-widest text-gray-300">
              Loading…
            </div>
          ) : (
            <BracketGrid bracket={bracket} onPick={handlePick} />
          )}
        </div>

        {/* Progress bar */}
        {hydrated && (
          <div className="px-5 pb-4 pt-2 border-t border-sox-border bg-sox-gray">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-heading font-bold text-[10px] uppercase tracking-widest text-gray-400">
                {complete ? "All picks complete" : "Picks"}
              </span>
              <span className="font-heading font-black text-sm text-sox-body">
                {picks}
                <span className="text-gray-400 font-body font-normal text-xs"> / {TOTAL_SERIES}</span>
              </span>
            </div>
            <div className="h-1.5 bg-sox-border overflow-hidden">
              <div
                className="h-full bg-crimson transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            {complete && (
              <p className="font-body text-xs text-crimson font-semibold mt-2">
                ✓ All series picked — fill in your info below and submit.
              </p>
            )}
          </div>
        )}
      </section>

      {/* Entry form section */}
      <section className="border border-sox-border border-t-4 border-t-crimson">
        <div className="bg-sox-charcoal px-5 py-3">
          <p className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-white/60">
            Submit Entry
          </p>
          <h2 className="font-heading font-black text-lg uppercase text-white tracking-tight">
            Your Info
          </h2>
        </div>
        <div className="p-5 sm:p-6 bg-white max-w-lg">
          <EntryForm bracket={bracket} onSubmitSuccess={handleSubmitSuccess} />
        </div>
      </section>
    </div>
  );
}
