const RULES = [
  "No purchase necessary to enter. Open to legal U.S. residents 18+ at time of entry.",
  "One (1) entry per person. Duplicate entries will be disqualified.",
  "All bracket picks must be submitted before the first pitch of Game 1 of the Wild Card Series. Late entries will not be accepted.",
  "The entrant with the most correct series picks at the conclusion of the World Series wins the Grand Prize ($500 Bargain Grocery Gift Card).",
  "In the event of a tie in bracket score, tiebreaker predictions determine the winner: first, predicted World Series length (games); second, combined runs in the deciding game. Closest to actual without going over wins each tiebreaker step.",
  "Grand Prize winner will be notified by email within 5 business days following the final game of the World Series.",
  "Winner must respond within 5 business days of notification or an alternate winner will be selected.",
  "Employees of Bargain Grocery and their immediate family members are not eligible.",
  "Void where prohibited. Sponsor: Bargain Grocery.",
];

export default function RulesCard() {
  return (
    <div id="rules" className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h2 className="font-extrabold text-gray-900 text-lg mb-4">Official Rules</h2>
      <ol className="flex flex-col gap-3 list-decimal list-outside pl-4">
        {RULES.map((rule, i) => (
          <li key={i} className="text-sm text-gray-600 leading-relaxed">
            {rule}
          </li>
        ))}
      </ol>
    </div>
  );
}
