const POINTS = [
  { round: "Wild Card Series", pts: 1, note: "4 series total" },
  { round: "Division Series", pts: 2, note: "4 series total" },
  { round: "Championship Series", pts: 4, note: "2 series total" },
  { round: "World Series", pts: 8, note: "1 series" },
];

export default function ScoringCard() {
  return (
    <div className="border border-sox-border border-t-4 border-t-crimson bg-white">
      {/* Table header */}
      <div className="bg-sox-charcoal px-4 py-3">
        <p className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-white/60">
          Scoring
        </p>
      </div>

      <div className="divide-y divide-sox-border">
        {POINTS.map((row, i) => (
          <div
            key={row.round}
            className={`flex items-center justify-between px-4 py-3 ${
              i % 2 === 1 ? "bg-sox-gray" : "bg-white"
            }`}
          >
            <div>
              <div className="font-heading font-bold text-sm text-sox-body">{row.round}</div>
              <div className="font-body text-xs text-gray-400">{row.note}</div>
            </div>
            <div className="font-heading font-black text-2xl text-crimson">
              {row.pts}
              <span className="text-xs font-body font-normal text-gray-400 ml-0.5">
                pt{row.pts > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-sox-charcoal px-4 py-3 flex justify-between items-center">
        <span className="font-heading font-bold text-xs uppercase tracking-wide text-white/60">
          Maximum score
        </span>
        <span className="font-heading font-black text-xl text-white">28 pts</span>
      </div>
    </div>
  );
}
