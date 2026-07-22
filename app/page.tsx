import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PrizePanel from "@/components/PrizePanel";
import ScoringCard from "@/components/ScoringCard";
import MatchupList from "@/components/MatchupList";
import BracketApp from "@/components/BracketApp";
import Bracket from "@/components/Bracket";
import VideoNews from "@/components/VideoNews";
import LatestNews from "@/components/LatestNews";
import Newsletter from "@/components/Newsletter";
import Information from "@/components/Information";
import Clients from "@/components/Clients";
import Rules from "@/components/Rules";
import Footer from "@/components/Footer";

import { MATCHUPS } from "@/data/matchups";
import { AL_STANDINGS, NL_STANDINGS } from "@/data/standings";
import { NEWS_ARTICLES } from "@/data/news";
import { VIDEO_ITEMS } from "@/data/videos";
import { SPONSORS } from "@/data/sponsors";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />

      <main className="max-w-5xl mx-auto w-full px-4 flex flex-col gap-12 py-12">
        {/* How it works */}
        <section id="how-it-works">
          <HowItWorks />
        </section>

        {/* Prize + scoring */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PrizePanel />
          <ScoringCard />
        </div>

        {/* Upcoming Wild Card matchups */}
        <MatchupList matchups={MATCHUPS} />

        {/* Interactive bracket picker + entry form */}
        <BracketApp />

        {/* Postseason field / standings table */}
        <Bracket alRows={AL_STANDINGS} nlRows={NL_STANDINGS} />

        {/* Latest news */}
        <LatestNews articles={NEWS_ARTICLES} />
      </main>

      {/* Full-bleed video section (dark background) */}
      <div className="max-w-5xl mx-auto w-full px-4 py-4">
        <VideoNews videos={VIDEO_ITEMS} />
      </div>

      <main className="max-w-5xl mx-auto w-full px-4 flex flex-col gap-12 pb-12">
        {/* Information cards */}
        <Information />

        {/* Sponsor strip */}
        <Clients sponsors={SPONSORS} />

        {/* Official rules */}
        <Rules />
      </main>

      {/* Newsletter — full-bleed charcoal */}
      <Newsletter />

      <Footer />
    </div>
  );
}
