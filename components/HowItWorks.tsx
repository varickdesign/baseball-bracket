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
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
        How It Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-2"
          >
            <div className="text-3xl">{step.icon}</div>
            <h3 className="font-bold text-gray-900 text-sm">{step.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
