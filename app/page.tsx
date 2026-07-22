import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import BracketApp from "@/components/BracketApp";
import PrizePanel from "@/components/PrizePanel";
import ScoringCard from "@/components/ScoringCard";
import RulesCard from "@/components/RulesCard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <main className="max-w-5xl mx-auto w-full px-4 flex flex-col gap-10 py-10">
        <HowItWorks />

        {/* Prize + scoring panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PrizePanel />
          <ScoringCard />
        </div>

        {/* Interactive bracket + entry form */}
        <BracketApp />

        <RulesCard />
      </main>

      <div className="flex-1" />
      <Footer />
    </div>
  );
}
