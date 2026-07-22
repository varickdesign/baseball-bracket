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

const ROUND_SHORT: Record<RoundKey, string> = {
  wildcard: "Wild Card",
  division: "Division",
  championship: "LCS",
  worldseries: "World Series",
};

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
        <div className="flex overflow-x-auto gap-1 pb-3 mb-4 no-scrollbar border-b border-sox-border">
          {ROUNDS.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRound(r)}
              className={[
                "flex-shrink-0 px-4 py-1.5 text-xs font-heading font-bold uppercase tracking-wide transition-colors",
                activeRound === r
                  ? "bg-crimson text-white"
                  : "bg-sox-gray text-gray-500 hover:text-sox-body",
              ].join(" ")}
            >
              {ROUND_SHORT[r]}
            </button>
          ))}
        </div>

        <div className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3">
          {ROUND_LABELS[activeRound]}
        </div>

        {activeRound !== "worldseries" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["AL", "NL"].map((lg) => {
              const lgIds = (order[lg] ?? []) as string[];
              return (
                <div key={lg}>
                  <div className="font-heading font-black text-xs uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-crimson" />
                    {lg}
                  </div>
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
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_90px_1fr_1fr_1fr_1fr] gap-2 mb-3">
          {[
            "Wild Card", "Div. Series", "LCS", "",
            "WS",
            "", "LCS", "Div. Series", "Wild Card",
          ].map((label, i) => (
            <div
              key={i}
              className="text-center font-heading font-bold text-[10px] uppercase tracking-[0.15em] text-gray-400"
            >
              {label}
            </div>
          ))}
        </div>

        {/* League labels */}
        <div className="flex justify-between mb-1 px-1">
          <span className="font-heading font-black text-[10px] uppercase tracking-widest text-crimson flex items-center gap-1">
            <span className="w-3 h-0.5 bg-crimson" /> AL
          </span>
          <span className="font-heading font-black text-[10px] uppercase tracking-widest text-crimson flex items-center gap-1">
            NL <span className="w-3 h-0.5 bg-crimson" />
          </span>
        </div>

        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_90px_1fr_1fr_1fr_1fr] gap-2 items-start">
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
          <div className="flex flex-col justify-center gap-3 mt-10">
            <SeriesCard series={bracket.series["AL-CS"]} onPick={onPick} disabled={disabled} />
          </div>
          <div />

          {/* World Series center */}
          <div className="flex flex-col justify-center" style={{ minHeight: 280 }}>
            <SeriesCard series={bracket.series["WS"]} onPick={onPick} disabled={disabled} />
          </div>

          <div />
          {/* NL side (right) */}
          <div className="flex flex-col justify-center gap-3 mt-10">
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
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] text-crimson">
            Your Bracket
          </p>
          <h2 className="font-heading font-black text-xl uppercase text-sox-body tracking-tight">
            Make Your Picks
          </h2>
        </div>
        <span className="font-heading font-bold text-sm text-gray-400 uppercase tracking-wide">
          {picks} <span className="text-gray-300">/</span> {TOTAL_SERIES}
        </span>
      </div>
      <MobileView />
      <DesktopView />
    </div>
  );
}
