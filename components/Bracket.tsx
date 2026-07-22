import type { StandingRow } from "@/data/standings";

interface Props {
  alRows: StandingRow[];
  nlRows: StandingRow[];
  title?: string;
}

const COL_HEADERS = ["Pos", "Team", "W", "L", "Pct", "GB"];

function StandingsTable({ rows, leagueLabel }: { rows: StandingRow[]; leagueLabel: string }) {
  return (
    <div className="border border-sox-border border-t-4 border-t-crimson">
      {/* League header */}
      <div className="bg-sox-charcoal px-4 py-2.5 flex items-center justify-between">
        <p className="font-heading font-black text-xs uppercase tracking-[0.2em] text-white">
          {leagueLabel}
        </p>
        <p className="font-heading font-bold text-[10px] uppercase tracking-widest text-white/40">
          2026 Regular Season Final
        </p>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[32px_1fr_48px_48px_60px_52px] bg-sox-charcoal/80 border-b border-sox-border">
        {COL_HEADERS.map((h) => (
          <div
            key={h}
            className={`px-3 py-2 font-heading font-bold text-[10px] uppercase tracking-widest text-white/50 ${
              h === "Team" ? "text-left" : "text-center"
            }`}
          >
            {h}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-sox-border">
        {rows.map((row, i) => {
          const isWildCard = row.pos > 3;
          return (
            <div
              key={row.code}
              className={`grid grid-cols-[32px_1fr_48px_48px_60px_52px] items-center ${
                i % 2 === 0 ? "bg-white" : "bg-sox-gray"
              }`}
            >
              {/* Pos */}
              <div className="px-3 py-3 font-heading font-black text-sm text-center text-sox-body">
                {row.pos}
              </div>
              {/* Team */}
              <div className="px-3 py-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sox-charcoal flex items-center justify-center font-heading font-black text-[9px] text-white flex-shrink-0">
                  {row.code.slice(0, 2)}
                </span>
                <div>
                  <span className="font-heading font-bold text-xs text-sox-body leading-tight block">
                    {row.team}
                  </span>
                  {isWildCard && (
                    <span className="font-heading font-bold text-[9px] uppercase tracking-wide text-crimson">
                      WC
                    </span>
                  )}
                </div>
              </div>
              {/* W */}
              <div className="px-3 py-3 font-heading font-black text-sm text-center text-sox-body">
                {row.w}
              </div>
              {/* L */}
              <div className="px-3 py-3 font-heading font-bold text-sm text-center text-gray-400">
                {row.l}
              </div>
              {/* Pct */}
              <div className="px-3 py-3 font-body text-xs text-center text-sox-body tabular-nums">
                {row.pct}
              </div>
              {/* GB */}
              <div className="px-3 py-3 font-body text-xs text-center text-gray-400 tabular-nums">
                {row.gb}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-sox-charcoal px-4 py-2 flex justify-between items-center">
        <span className="font-heading font-bold text-[9px] uppercase tracking-widest text-white/30">
          WC = Wild Card qualifier
        </span>
        <a
          href="#bracket"
          className="font-heading font-bold text-[10px] uppercase tracking-widest text-crimson hover:text-white transition-colors"
        >
          View bracket →
        </a>
      </div>
    </div>
  );
}

export default function Bracket({ alRows, nlRows, title = "Postseason Field" }: Props) {
  return (
    <section id="standings">
      <div className="mb-4">
        <p className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] text-crimson mb-1">
          Standings
        </p>
        <h2 className="font-heading font-black text-2xl uppercase text-sox-body tracking-tight">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StandingsTable rows={alRows} leagueLabel="American League" />
        <StandingsTable rows={nlRows} leagueLabel="National League" />
      </div>
    </section>
  );
}
