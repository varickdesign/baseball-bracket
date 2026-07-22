export type League = "AL" | "NL";

export type Round =
  | "wildcard"
  | "division"
  | "championship"
  | "worldseries";

export interface Team {
  id: string;      // e.g. "AL-1", "NL-3"
  name: string;    // e.g. "New York Yankees"
  code: string;    // e.g. "NYY"
  seed: number;    // 1-6
  league: League;
}

export interface Series {
  id: string;           // e.g. "AL-WC-1", "NL-DS-1", "AL-CS", "WS"
  round: Round;
  league: League | null; // null for World Series
  topSeed: Team | null;
  bottomSeed: Team | null;
  winner: Team | null;
  seriesLength: number | null; // 3-5 for WC, 3-7 for DS/CS/WS (best-of-3 or best-of-7)
}

export interface BracketState {
  series: Record<string, Series>;
  // Wild Card: AL-WC-1, AL-WC-2, AL-WC-3, NL-WC-1, NL-WC-2, NL-WC-3
  // Division:  AL-DS-1, AL-DS-2, NL-DS-1, NL-DS-2
  // Champ:     AL-CS, NL-CS
  // WS:        WS
}

export interface EntryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  tbWsGames: number;    // predicted WS length (4-7)
  tbCombinedRuns: number; // combined runs in deciding game
  agreedToRules: boolean;
}
