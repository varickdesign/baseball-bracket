"use client";

import type { Series, Team } from "@/lib/bracket-types";
import { SERIES_FORMAT } from "@/lib/bracket-engine";

interface Props {
  series: Series;
  onPick: (seriesId: string, winner: Team) => void;
  disabled?: boolean;
}

export default function SeriesCard({ series, onPick, disabled }: Props) {
  const { id, round, topSeed, bottomSeed, winner } = series;
  const format = SERIES_FORMAT[round];
  const canPick = !disabled && topSeed !== null && bottomSeed !== null;
  const isWS = round === "worldseries";

  function TeamSlot({ team }: { team: Team | null }) {
    if (!team) {
      return (
        <div className="flex items-center gap-2 px-3 py-2 bg-sox-gray border border-sox-border">
          <span className="w-5 h-5 rounded-full bg-sox-border flex-shrink-0" />
          <span className="font-body text-xs text-gray-400">TBD</span>
        </div>
      );
    }

    const isWinner = winner?.id === team.id;
    const isLoser = winner !== null && winner.id !== team.id;

    return (
      <button
        onClick={() => canPick && onPick(id, team)}
        disabled={!canPick}
        className={[
          "w-full flex items-center gap-2 px-3 py-2 text-left transition-all border",
          canPick && !isWinner
            ? "hover:border-crimson hover:bg-red-50 cursor-pointer"
            : "",
          isWinner
            ? "bg-crimson border-crimson text-white"
            : isLoser
            ? "bg-sox-gray border-sox-border text-gray-400"
            : "bg-white border-sox-border text-sox-body",
        ].join(" ")}
      >
        <span
          className={[
            "w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-heading font-black",
            isWinner ? "bg-white/20 text-white" : "bg-sox-border text-gray-500",
          ].join(" ")}
        >
          {team.seed}
        </span>
        <span
          className={[
            "font-heading font-bold text-xs flex-1 truncate uppercase tracking-wide",
            isLoser ? "line-through opacity-50" : "",
          ].join(" ")}
        >
          {team.name}
        </span>
        <span
          className={[
            "font-body text-[10px] flex-shrink-0",
            isWinner ? "text-white/70" : "text-gray-400",
          ].join(" ")}
        >
          {team.code}
        </span>
        {isWinner && (
          <span className="text-white text-xs ml-0.5" aria-label="Winner">✓</span>
        )}
      </button>
    );
  }

  return (
    <div
      className={[
        "flex flex-col border",
        isWS
          ? "border-t-4 border-crimson"
          : "border-sox-border border-t-2 border-t-sox-charcoal",
      ].join(" ")}
    >
      <div className="bg-sox-charcoal px-3 py-1.5">
        <span className="font-heading font-bold text-[10px] uppercase tracking-[0.15em] text-white/50">
          {format}
        </span>
      </div>
      <TeamSlot team={topSeed} />
      <div className="text-center text-[10px] font-heading font-bold uppercase tracking-widest text-gray-300 bg-sox-gray py-0.5 border-y border-sox-border">
        vs
      </div>
      <TeamSlot team={bottomSeed} />
    </div>
  );
}
