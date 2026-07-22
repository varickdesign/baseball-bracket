const POINTS = [
  { round: "Wild Card Series", pts: 1, note: "2 series per league" },
  { round: "Division Series", pts: 2, note: "2 series per league" },
  { round: "Championship Series", pts: 4, note: "1 per league" },
  { round: "World Series", pts: 8, note: "1 series" },
];

export default function ScoringCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h2 className="font-extrabold text-gray-900 text-lg mb-4">Scoring</h2>
      <div className="flex flex-col divide-y divide-gray-100">
        {POINTS.map((row) => (
          <div key={row.round} className="flex items-center justify-between py-3">
            <div>
              <div className="font-semibold text-sm text-gray-800">{row.round}</div>
              <div className="text-xs text-gray-400">{row.note}</div>
            </div>
            <div className="text-2xl font-black text-blue-800">
              {row.pts}
              <span className="text-sm font-normal text-gray-400 ml-1">pt{row.pts > 1 ? "s" : ""}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-blue-50 border border-blue-100 px-4 py-2 flex justify-between items-center">
        <span className="text-sm font-semibold text-blue-800">Maximum score</span>
        <span className="text-xl font-black text-blue-900">28 pts</span>
      </div>
    </div>
  );
}
