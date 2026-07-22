"use client";

import { useState } from "react";
import type { BracketState, Team } from "@/lib/bracket-types";
import {
  ROUND_LABELS,
  SERIES_ORDER,
  countPicks,
  TOTAL_SERIES,
} from "@/lib/bracket-engine";
import SeriesCard from "./SeriesCard";

type RoundKey = "wildcard" | "division" | "championship" | "worldseries";
const ROUNDS: RoundKey[] = ["wildcard", "division", "championship", "worldseries"];

interface Props {
  bracket: BracketState;
  onPick: (seriesId: string, winner: Team) => void;
  disabled?: boolean;
}

export default function BracketGrid({ bracket, onPick, disabled }: Props) {
  const [activeRound, setActiveRound] = useState<RoundKey>("wildcard");
  const picks = countPicks(bracket);

  // ── Mobile: tabbed round view ─────────────────────────────────────────────
  function MobileView() {
    const order = SERIES_ORDER[activeRound] as Record<string, string[]>;

    return (
      <div className="lg:hidden">
        {/* Round tabs */}
        <div className="flex overflow-x-auto gap-1 pb-2 mb-4 no-scrollbar">
          {ROUNDS.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRound(r)}
              className={[
                "flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                activeRound === r
                  ? "bg-blue-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              ].join(" ")}
            >
              {r === "wildcard" ? "Wild Card" :
               r === "division" ? "Division" :
               r === "championship" ? "LCS" : "World Series"}
            </button>
          ))}
        </div>

        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          {ROUND_LABELS[activeRound]}
        </div>

        {activeRound !== "worldseries" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["AL", "NL"].map((lg) => {
              const lgIds = (order[lg] ?? []) as string[];
              return (
                <div key={lg}>
                  <div className="text-xs font-bold text-gray-500 mb-2">{lg}</div>
                  <div className="flex flex-col gap-3">
                    {lgIds.map((sid) => (
                      <SeriesCard
                        key={sid}
                        series={bracket.series[sid]}
                        onPick={onPick}
                        disabled={disabled}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-xs mx-auto">
            <SeriesCard
              series={bracket.series["WS"]}
              onPick={onPick}
              disabled={disabled}
            />
          </div>
        )}
      </div>
    );
  }

  // ── Desktop: full funnel layout ───────────────────────────────────────────
  function DesktopView() {
    return (
      <div className="hidden lg:block">
        {/* Column headers */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_80px_1fr_1fr_1fr_1fr] gap-2 mb-2">
          {["Wild Card", "Div. Series", "LCS", "", "WS", "", "LCS", "Div. Series", "Wild Card"].map(
            (label, i) => (
              <div
                key={i}
                className="text-center text-xs font-semibold uppercase tracking-wide text-gray-400"
              >
                {label}
              </div>
            )
          )}
        </div>

        {/* League labels + cards */}
        <div className="relative">
          {/* AL label */}
          <div className="absolute -left-6 top-1/4 -translate-y-1/2 -rotate-90 text-xs font-bold tracking-widest text-blue-800 uppercase">
            AL
          </div>
          {/* NL label */}
          <div className="absolute -left-6 top-3/4 -translate-y-1/2 -rotate-90 text-xs font-bold tracking-widest text-red-700 uppercase">
            NL
          </div>

          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_80px_1fr_1fr_1fr_1fr] gap-2 items-start">
            {/* AL side (left) */}
            <div className="flex flex-col gap-3">
              {["AL-WC-1", "AL-WC-2"].map((sid) => (
                <SeriesCard key={sid} series={bracket.series[sid]} onPick={onPick} disabled={disabled} />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {["AL-DS-1", "AL-DS-2"].map((sid) => (
                <SeriesCard key={sid} series={bracket.series[sid]} onPick={onPick} disabled={disabled} />
              ))}
            </div>
            <div className="flex flex-col justify-center gap-3 mt-12">
              <SeriesCard series={bracket.series["AL-CS"]} onPick={onPick} disabled={disabled} />
            </div>
            {/* Spacer col for AL → WS connector */}
            <div />

            {/* World Series center */}
            <div className="flex flex-col justify-center" style={{ minHeight: 300 }}>
              <SeriesCard series={bracket.series["WS"]} onPick={onPick} disabled={disabled} />
            </div>

            {/* Spacer col for WS → NL connector */}
            <div />
            {/* NL side (right) — mirror order */}
            <div className="flex flex-col justify-center gap-3 mt-12">
              <SeriesCard series={bracket.series["NL-CS"]} onPick={onPick} disabled={disabled} />
            </div>
            <div className="flex flex-col gap-3">
              {["NL-DS-1", "NL-DS-2"].map((sid) => (
                <SeriesCard key={sid} series={bracket.series[sid]} onPick={onPick} disabled={disabled} />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {["NL-WC-1", "NL-WC-2"].map((sid) => (
                <SeriesCard key={sid} series={bracket.series[sid]} onPick={onPick} disabled={disabled} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Your Bracket</h2>
        <span className="text-sm text-gray-500">
          {picks} / {TOTAL_SERIES} picks
        </span>
      </div>
      <MobileView />
      <DesktopView />
    </div>
  );
}
