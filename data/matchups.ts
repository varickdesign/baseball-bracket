export interface Matchup {
  id: string;
  homeTeam: string;
  homeCode: string;
  awayTeam: string;
  awayCode: string;
  date: string;       // ISO date string
  time: string;       // display time, e.g. "8:07 PM ET"
  league: "AL" | "NL" | "WS";
  round: string;
  venue: string;
  tvNetwork: string;
}

// Placeholder matchups — replace with real schedule once seedings are confirmed
export const MATCHUPS: Matchup[] = [
  {
    id: "al-wc-g1",
    homeTeam: "AL Seed 3",
    homeCode: "AL3",
    awayTeam: "AL Seed 6",
    awayCode: "AL6",
    date: "2026-09-29",
    time: "8:07 PM ET",
    league: "AL",
    round: "Wild Card Series — Game 1",
    venue: "TBD",
    tvNetwork: "ESPN",
  },
  {
    id: "nl-wc-g1",
    homeTeam: "NL Seed 3",
    homeCode: "NL3",
    awayTeam: "NL Seed 6",
    awayCode: "NL6",
    date: "2026-09-29",
    time: "4:38 PM ET",
    league: "NL",
    round: "Wild Card Series — Game 1",
    venue: "TBD",
    tvNetwork: "ABC",
  },
  {
    id: "al-wc2-g1",
    homeTeam: "AL Seed 4",
    homeCode: "AL4",
    awayTeam: "AL Seed 5",
    awayCode: "AL5",
    date: "2026-09-30",
    time: "8:07 PM ET",
    league: "AL",
    round: "Wild Card Series — Game 1",
    venue: "TBD",
    tvNetwork: "ESPN",
  },
];
