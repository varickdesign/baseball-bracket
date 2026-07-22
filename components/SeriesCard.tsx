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

  function TeamSlot({ team }: { team: Team | null }) {
    if (!team) {
      return (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-400 text-sm">
          <span className="w-6 h-6 rounded bg-gray-200 flex-shrink-0" />
          <span>TBD</span>
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
          "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-left transition-all",
          canPick && !isWinner
            ? "hover:bg-blue-50 hover:border-blue-400 cursor-pointer"
            : "",
          isWinner
            ? "bg-green-50 border-2 border-green-500 text-green-800"
            : isLoser
            ? "bg-gray-50 border border-gray-200 text-gray-400 line-through"
            : "bg-white border border-gray-200 text-gray-800",
        ].join(" ")}
      >
        <span className="w-6 h-6 rounded bg-gray-200 flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-500">
          {team.seed}
        </span>
        <span className="truncate">{team.name}</span>
        <span className="ml-auto text-xs text-gray-400 font-normal">{team.code}</span>
        {isWinner && (
          <span className="text-green-500 ml-1" aria-label="Winner">✓</span>
        )}
      </button>
    );
  }

  return (
    <div
      className={[
        "rounded-xl border bg-white shadow-sm p-3 flex flex-col gap-1.5",
        round === "worldseries"
          ? "border-yellow-400 shadow-yellow-100"
          : "border-gray-200",
      ].join(" ")}
    >
      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
        {format}
      </div>
      <TeamSlot team={topSeed} />
      <div className="text-center text-xs text-gray-300 font-medium">vs</div>
      <TeamSlot team={bottomSeed} />
    </div>
  );
}
