export interface StandingRow {
  pos: number;
  team: string;
  code: string;
  league: "AL" | "NL";
  w: number;
  l: number;
  pct: string;   // e.g. ".667"
  gb: string;    // e.g. "—" for first place, "2.0" for others
}

// Placeholder standings — update once 2026 regular season ends (Sept 27 2026)
export const AL_STANDINGS: StandingRow[] = [
  { pos: 1, team: "AL East Leader",   code: "AL1", league: "AL", w: 98, l: 64, pct: ".605", gb: "—"  },
  { pos: 2, team: "AL Central Leader",code: "AL2", league: "AL", w: 94, l: 68, pct: ".580", gb: "4.0" },
  { pos: 3, team: "AL West Leader",   code: "AL3", league: "AL", w: 91, l: 71, pct: ".562", gb: "7.0" },
  { pos: 4, team: "AL Wild Card 1",   code: "AL4", league: "AL", w: 89, l: 73, pct: ".549", gb: "9.0" },
  { pos: 5, team: "AL Wild Card 2",   code: "AL5", league: "AL", w: 87, l: 75, pct: ".537", gb: "11.0"},
  { pos: 6, team: "AL Wild Card 3",   code: "AL6", league: "AL", w: 85, l: 77, pct: ".525", gb: "13.0"},
];

export const NL_STANDINGS: StandingRow[] = [
  { pos: 1, team: "NL East Leader",   code: "NL1", league: "NL", w: 100, l: 62, pct: ".617", gb: "—"  },
  { pos: 2, team: "NL Central Leader",code: "NL2", league: "NL", w: 93,  l: 69, pct: ".574", gb: "7.0" },
  { pos: 3, team: "NL West Leader",   code: "NL3", league: "NL", w: 90,  l: 72, pct: ".556", gb: "10.0"},
  { pos: 4, team: "NL Wild Card 1",   code: "NL4", league: "NL", w: 88,  l: 74, pct: ".543", gb: "12.0"},
  { pos: 5, team: "NL Wild Card 2",   code: "NL5", league: "NL", w: 86,  l: 76, pct: ".531", gb: "14.0"},
  { pos: 6, team: "NL Wild Card 3",   code: "NL6", league: "NL", w: 84,  l: 78, pct: ".519", gb: "16.0"},
];
