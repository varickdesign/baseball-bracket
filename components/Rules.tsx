interface Rule {
  text: string;
}

interface Props {
  rules?: Rule[];
  title?: string;
}

const DEFAULT_RULES: Rule[] = [
  { text: "No purchase necessary to enter. Open to legal U.S. residents 18+ at time of entry." },
  { text: "One (1) entry per person. Duplicate entries will be disqualified." },
  { text: "All bracket picks must be submitted before the first pitch of Game 1 of the Wild Card Series. Late entries will not be accepted." },
  { text: "The entrant with the most correct series picks at the conclusion of the World Series wins the Grand Prize ($500 Bargain Grocery Gift Card)." },
  { text: "In the event of a tie in bracket score, tiebreaker predictions determine the winner: first, predicted World Series length (games); second, combined runs in the deciding game. Closest to actual without going over wins each tiebreaker step." },
  { text: "Grand Prize winner will be notified by email within 5 business days following the final game of the World Series." },
  { text: "Winner must respond within 5 business days of notification or an alternate winner will be selected." },
  { text: "Employees of Bargain Grocery and their immediate family members are not eligible." },
  { text: "Void where prohibited. Sponsor: Bargain Grocery." },
];

export default function Rules({ rules = DEFAULT_RULES, title = "Official Rules" }: Props) {
  return (
    <section id="rules" className="border border-sox-border border-t-4 border-t-crimson">
      <div className="bg-sox-charcoal px-5 py-3">
        <p className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] text-white/60">
          Contest
        </p>
        <h2 className="font-heading font-black text-lg uppercase text-white tracking-tight">
          {title}
        </h2>
      </div>

      <ol className="flex flex-col divide-y divide-sox-border">
        {rules.map((rule, i) => (
          <li
            key={i}
            className={`flex gap-4 px-5 py-4 ${i % 2 === 1 ? "bg-sox-gray" : "bg-white"}`}
          >
            <span className="font-heading font-black text-crimson text-sm flex-shrink-0 w-5 text-right">
              {i + 1}.
            </span>
            <span className="font-body text-sm text-sox-body leading-relaxed">{rule.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
