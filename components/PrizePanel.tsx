export default function PrizePanel() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-300 text-blue-900 p-6 shadow-lg">
      <div className="text-4xl mb-2">🏆</div>
      <h2 className="text-2xl font-extrabold mb-1">Grand Prize</h2>
      <p className="text-4xl font-black mb-3">$500</p>
      <p className="font-semibold text-blue-800">Bargain Grocery Gift Card</p>
      <p className="text-sm text-blue-700 mt-1">
        Awarded to the entry with the most correct picks. Tiebreaker decides in case of a tie.
      </p>

      <hr className="border-yellow-500 my-4" />

      <div className="flex flex-col gap-2 text-sm text-blue-800">
        <div className="flex justify-between">
          <span>Entry limit</span>
          <span className="font-bold">1 per person</span>
        </div>
        <div className="flex justify-between">
          <span>Entries close</span>
          <span className="font-bold">First pitch, Game 1 WC</span>
        </div>
        <div className="flex justify-between">
          <span>Winner notified</span>
          <span className="font-bold">After World Series</span>
        </div>
      </div>
    </div>
  );
}
