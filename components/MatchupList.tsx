import type { Matchup } from "@/data/matchups";

interface Props {
  matchups: Matchup[];
  title?: string;
}

function leagueBadgeCls(league: Matchup["league"]) {
  if (league === "AL") return "bg-sox-charcoal text-white";
  if (league === "NL") return "bg-crimson text-white";
  return "bg-sox-black text-white";
}

export default function MatchupList({ matchups, title = "Upcoming Matchups" }: Props) {
  return (
    <section id="matchups">
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] text-crimson mb-1">
            Schedule
          </p>
          <h2 className="font-heading font-black text-2xl uppercase text-sox-body tracking-tight">
            {title}
          </h2>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-sox-border border border-sox-border border-t-4 border-t-crimson">
        {matchups.map((m) => (
          <div
            key={m.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 bg-white hover:bg-sox-gray transition-colors"
          >
            {/* Round + date */}
            <div className="flex-shrink-0 sm:w-48">
              <p className="font-heading font-bold text-xs uppercase tracking-wide text-sox-body">
                {m.round}
              </p>
              <p className="font-body text-xs text-gray-400 mt-0.5">
                {new Date(m.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}{" "}
                · {m.time}
              </p>
            </div>

            {/* Teams */}
            <div className="flex-1 flex items-center gap-3 sm:justify-center">
              <TeamChip code={m.awayCode} name={m.awayTeam} />
              <span className="font-heading font-black text-xs text-gray-300">@</span>
              <TeamChip code={m.homeCode} name={m.homeTeam} />
            </div>

            {/* Meta */}
            <div className="flex-shrink-0 flex items-center gap-3 sm:text-right">
              <span
                className={`font-heading font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 ${leagueBadgeCls(m.league)}`}
              >
                {m.league}
              </span>
              <div className="hidden sm:block text-right">
                <p className="font-body text-xs text-gray-400">{m.tvNetwork}</p>
                <p className="font-body text-xs text-gray-400">{m.venue !== "TBD" ? m.venue : "Venue TBD"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TeamChip({ code, name }: { code: string; name: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-8 h-8 rounded-full bg-sox-charcoal flex items-center justify-center font-heading font-black text-[10px] text-white flex-shrink-0">
        {code.slice(0, 2)}
      </span>
      <span className="font-heading font-bold text-xs uppercase tracking-wide text-sox-body">
        {name}
      </span>
    </div>
  );
}
