"use client";

import { useEffect, useState, useCallback } from "react";
import type { BracketState, Team } from "@/lib/bracket-types";
import {
  buildInitialBracket,
  isBracketComplete,
  pickWinner,
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
    // storage unavailable — silently ignore
  }
}

async function fireConfetti() {
  const { default: confetti } = await import("canvas-confetti");
  confetti({
    particleCount: 200,
    spread: 90,
    origin: { y: 0.6 },
    colors: ["#1e3a8a", "#fbbf24", "#ef4444", "#ffffff"],
  });
  setTimeout(
    () =>
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#1e3a8a", "#fbbf24", "#ef4444"],
      }),
    400
  );
}

export default function BracketApp() {
  const [bracket, setBracket] = useState<BracketState>(() => buildInitialBracket());
  const [hydrated, setHydrated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Hydrate from localStorage after mount
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) setBracket(saved);
    setHydrated(true);
  }, []);

  // Autosave on every change
  useEffect(() => {
    if (hydrated) saveToStorage(bracket);
  }, [bracket, hydrated]);

  const handlePick = useCallback((seriesId: string, winner: Team) => {
    setBracket((prev) => pickWinner(prev, seriesId, winner));
  }, []);

  const handleReset = useCallback(() => {
    const fresh = buildInitialBracket();
    setBracket(fresh);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const handleSubmitSuccess = useCallback(async () => {
    setSubmitted(true);
    await fireConfetti();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-24 text-center px-4">
        <div className="text-6xl">🎉</div>
        <h2 className="text-3xl font-extrabold text-gray-900">
          Your bracket is in!
        </h2>
        <p className="text-gray-600 max-w-md">
          We received your picks. Check your email for a confirmation. Good luck — and
          play ball!
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            handleReset();
          }}
          className="text-sm text-blue-700 underline hover:text-blue-900"
        >
          Start a new entry
        </button>
      </div>
    );
  }

  const complete = isBracketComplete(bracket);

  return (
    <div className="flex flex-col gap-10">
      {/* Bracket section */}
      <section id="bracket">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-extrabold text-gray-900">Your Picks</h2>
          <button
            onClick={handleReset}
            className="text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Reset bracket
          </button>
        </div>

        {!hydrated ? (
          <div className="h-64 flex items-center justify-center text-gray-300 text-sm">
            Loading…
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-6 overflow-x-auto">
            <BracketGrid bracket={bracket} onPick={handlePick} />
          </div>
        )}
      </section>

      {/* Progress bar */}
      {hydrated && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Picks complete</span>
            <span>
              {Object.values(bracket.series).filter((s) => s.winner).length} / 11
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-blue-700 rounded-full transition-all duration-500"
              style={{
                width: `${
                  (Object.values(bracket.series).filter((s) => s.winner).length / 11) *
                  100
                }%`,
              }}
            />
          </div>
          {complete && (
            <p className="text-sm text-green-700 font-semibold text-center mt-1">
              All picks made! Fill in your info below and submit.
            </p>
          )}
        </div>
      )}

      {/* Entry form */}
      <section>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Submit Your Entry</h2>
        <div className="max-w-lg">
          <EntryForm bracket={bracket} onSubmitSuccess={handleSubmitSuccess} />
        </div>
      </section>
    </div>
  );
}
