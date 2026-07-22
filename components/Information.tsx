interface InfoItem {
  icon: string;
  heading: string;
  body: string;
}

interface Props {
  title?: string;
  items?: InfoItem[];
}

const DEFAULT_ITEMS: InfoItem[] = [
  {
    icon: "📅",
    heading: "When",
    body: "The 2026 MLB Postseason runs from Wild Card Weekend (Sept 29–Oct 1) through the World Series (late October). Entries must be submitted before first pitch of Wild Card Game 1.",
  },
  {
    icon: "📍",
    heading: "Who Can Enter",
    body: "Open to legal U.S. residents 18 years of age or older. No purchase necessary. One entry per person — duplicates will be disqualified.",
  },
  {
    icon: "🏆",
    heading: "The Prize",
    body: "The top bracket score wins a $200 Bargain Grocery Gift Card. Tiebreaker predictions (WS length and combined runs in the deciding game) break any ties.",
  },
  {
    icon: "🔔",
    heading: "Winner Notification",
    body: "The winner will be notified by email within 5 business days of the World Series final game and must respond within 5 business days to claim their prize.",
  },
];

export default function Information({ title = "About the Challenge", items = DEFAULT_ITEMS }: Props) {
  return (
    <section id="information" className="bg-sox-gray p-6 sm:p-8">
      <div>
        <div className="mb-6">
          <p className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] text-crimson mb-1">
            Info
          </p>
          <h2 className="font-heading font-black text-2xl uppercase text-sox-body tracking-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div key={i} className="bg-white border border-sox-border p-5 flex flex-col gap-3">
              <div className="text-2xl">{item.icon}</div>
              <div className="w-8 h-0.5 bg-crimson" />
              <h3 className="font-heading font-bold text-sm uppercase tracking-wide text-sox-body">
                {item.heading}
              </h3>
              <p className="font-body text-sm text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
