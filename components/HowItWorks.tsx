const STEPS = [
  {
    icon: "⚾",
    title: "Pick Every Series",
    body: "Choose a winner for all 11 postseason series — Wild Card, Division, Championship, and the World Series.",
  },
  {
    icon: "🔢",
    title: "Tiebreaker Prediction",
    body: "Predict the World Series length (games) and combined runs in the deciding game. Used only to break ties.",
  },
  {
    icon: "📬",
    title: "Submit Your Entry",
    body: "Fill in your contact info and submit before first pitch of Wild Card Game 1. One entry per person.",
  },
  {
    icon: "🏆",
    title: "Win the Prize",
    body: "The entry with the most correct picks after the World Series ends wins a $500 Bargain Grocery gift card.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-8">
      <p className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-crimson mb-2">
        How It Works
      </p>
      <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-sox-body tracking-tight mb-6">
        Four Steps to Enter
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="bg-white border border-sox-border p-5 flex flex-col gap-3"
          >
            <div className="text-2xl">{step.icon}</div>
            <div className="w-8 h-0.5 bg-crimson" />
            <h3 className="font-heading font-bold text-sox-body text-sm uppercase tracking-wide">
              {step.title}
            </h3>
            <p className="font-body text-sm text-gray-500 leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
