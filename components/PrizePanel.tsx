export default function PrizePanel() {
  return (
    <div className="bg-sox-charcoal text-white border-t-4 border-crimson p-6">
      <p className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-crimson mb-3">
        Grand Prize
      </p>
      <p className="font-heading font-black text-5xl text-white leading-none mb-1">$200</p>
      <p className="font-heading font-bold text-white/80 text-sm uppercase tracking-wide mb-4">
        Bargain Grocery Gift Card
      </p>
      <p className="font-body text-sm text-white/60 leading-relaxed mb-5">
        Awarded to the entry with the most correct picks. Tiebreaker decides ties.
      </p>

      <div className="border-t border-white/10 pt-4 flex flex-col gap-2.5">
        {[
          ["Entry limit", "1 per person"],
          ["Entries close", "First pitch, WC Game 1"],
          ["Winner notified", "After World Series"],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-white/50 font-body">{label}</span>
            <span className="font-heading font-bold text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
