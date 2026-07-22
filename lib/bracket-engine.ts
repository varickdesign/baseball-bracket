import type { BracketState, Series, Team } from "./bracket-types";
import { AL_TEAMS, NL_TEAMS } from "./teams";

// ─── Initial bracket construction ────────────────────────────────────────────

function makeTeam(id: string, teams: Team[]): Team | null {
  return teams.find((t) => t.id === id) ?? null;
}

export function buildInitialBracket(): BracketState {
  const al = AL_TEAMS;
  const nl = NL_TEAMS;

  // Wild Card matchups: 3 vs 6, 4 vs 5 — wait, MLB format:
  // Seeds: 1 gets bye to DS. WC: 2 vs 3 in format? No — correct MLB format:
  // 1 = bye (hosts DS), 2 = bye (hosts DS), 3 = hosts WC vs 6, 4 = hosts WC vs 5, ... actually:
  // 2026 format: Top 2 seeds get byes to DS. WC: 3 vs 6, 4 vs 5, and then what about the 3rd WC?
  // Actually MLB has 3 Wild Card teams + 3 division winners = 6.
  // Seeds 1 & 2 = division winners with byes to DS.
  // Seed 3 = division winner who hosts a WC.
  // Seeds 4, 5, 6 = wild card teams.
  // WC matchups: (3 vs 6), (4 vs 5), and seed 3 team plays the winner.
  // Wait — MLB has Best-of-3 WC series. Three WC series: (3 vs 6), (4 vs 5).
  // But that's only 2 series — we need a 3rd. Actually:
  //   WC Series 1: #3 seed hosts #6 seed (best-of-3)
  //   WC Series 2: #4 seed hosts #5 seed (best-of-3)
  //   But seeds 1 & 2 already get byes. That means only 4 teams play WC (seeds 3,4,5,6).
  //   That leaves us with 2 WC winners + seeds 1 & 2 = 4 DS teams. Correct!
  //   So per league: 2 WC series, not 3.
  //
  // Actually the handoff says "11 series" — let's count:
  //   AL: 2 WC + 2 DS + 1 CS = 5
  //   NL: 2 WC + 2 DS + 1 CS = 5
  //   WS: 1
  //   Total: 11 ✓
  //
  // DS matchups (after WC): #1 vs WC winner (lower seed), #2 vs WC winner (higher seed)

  const series: Record<string, Series> = {
    // ── American League Wild Card ──────────────────────────────────────────
    "AL-WC-1": {
      id: "AL-WC-1",
      round: "wildcard",
      league: "AL",
      topSeed: makeTeam("AL-3", al),
      bottomSeed: makeTeam("AL-6", al),
      winner: null,
      seriesLength: null,
    },
    "AL-WC-2": {
      id: "AL-WC-2",
      round: "wildcard",
      league: "AL",
      topSeed: makeTeam("AL-4", al),
      bottomSeed: makeTeam("AL-5", al),
      winner: null,
      seriesLength: null,
    },
    // ── National League Wild Card ──────────────────────────────────────────
    "NL-WC-1": {
      id: "NL-WC-1",
      round: "wildcard",
      league: "NL",
      topSeed: makeTeam("NL-3", nl),
      bottomSeed: makeTeam("NL-6", nl),
      winner: null,
      seriesLength: null,
    },
    "NL-WC-2": {
      id: "NL-WC-2",
      round: "wildcard",
      league: "NL",
      topSeed: makeTeam("NL-4", nl),
      bottomSeed: makeTeam("NL-5", nl),
      winner: null,
      seriesLength: null,
    },
    // ── American League Division Series ────────────────────────────────────
    // #1 hosts winner of WC-1 (lower seed wins WC, plays #1)
    // #2 hosts winner of WC-2
    "AL-DS-1": {
      id: "AL-DS-1",
      round: "division",
      league: "AL",
      topSeed: makeTeam("AL-1", al),
      bottomSeed: null, // populated from AL-WC-1 winner
      winner: null,
      seriesLength: null,
    },
    "AL-DS-2": {
      id: "AL-DS-2",
      round: "division",
      league: "AL",
      topSeed: makeTeam("AL-2", al),
      bottomSeed: null, // populated from AL-WC-2 winner
      winner: null,
      seriesLength: null,
    },
    // ── National League Division Series ────────────────────────────────────
    "NL-DS-1": {
      id: "NL-DS-1",
      round: "division",
      league: "NL",
      topSeed: makeTeam("NL-1", nl),
      bottomSeed: null,
      winner: null,
      seriesLength: null,
    },
    "NL-DS-2": {
      id: "NL-DS-2",
      round: "division",
      league: "NL",
      topSeed: makeTeam("NL-2", nl),
      bottomSeed: null,
      winner: null,
      seriesLength: null,
    },
    // ── League Championship Series ─────────────────────────────────────────
    "AL-CS": {
      id: "AL-CS",
      round: "championship",
      league: "AL",
      topSeed: null,
      bottomSeed: null,
      winner: null,
      seriesLength: null,
    },
    "NL-CS": {
      id: "NL-CS",
      round: "championship",
      league: "NL",
      topSeed: null,
      bottomSeed: null,
      winner: null,
      seriesLength: null,
    },
    // ── World Series ───────────────────────────────────────────────────────
    WS: {
      id: "WS",
      round: "worldseries",
      league: null,
      topSeed: null, // AL champion (AL pennant winner)
      bottomSeed: null, // NL champion
      winner: null,
      seriesLength: null,
    },
  };

  return { series };
}

// ─── Pick a winner for a series and advance downstream ───────────────────────

export function pickWinner(
  state: BracketState,
  seriesId: string,
  winner: Team
): BracketState {
  const next = deepCopy(state);
  const series = next.series[seriesId];
  if (!series) return state;

  series.winner = winner;

  // Cascade into downstream series
  advance(next, seriesId, winner);

  return next;
}

function advance(state: BracketState, seriesId: string, winner: Team) {
  const s = state.series;

  switch (seriesId) {
    // Wild Card → Division Series
    case "AL-WC-1":
      s["AL-DS-1"].bottomSeed = winner;
      if (s["AL-DS-1"].winner !== null) {
        s["AL-DS-1"].winner = null;
        resetDownstream(state, "AL-DS-1");
      }
      break;
    case "AL-WC-2":
      s["AL-DS-2"].bottomSeed = winner;
      if (s["AL-DS-2"].winner !== null) {
        s["AL-DS-2"].winner = null;
        resetDownstream(state, "AL-DS-2");
      }
      break;
    case "NL-WC-1":
      s["NL-DS-1"].bottomSeed = winner;
      if (s["NL-DS-1"].winner !== null) {
        s["NL-DS-1"].winner = null;
        resetDownstream(state, "NL-DS-1");
      }
      break;
    case "NL-WC-2":
      s["NL-DS-2"].bottomSeed = winner;
      if (s["NL-DS-2"].winner !== null) {
        s["NL-DS-2"].winner = null;
        resetDownstream(state, "NL-DS-2");
      }
      break;

    // Division Series → Championship Series
    case "AL-DS-1":
      s["AL-CS"].topSeed = winner;
      if (s["AL-CS"].winner !== null) {
        s["AL-CS"].winner = null;
        resetDownstream(state, "AL-CS");
      }
      break;
    case "AL-DS-2":
      s["AL-CS"].bottomSeed = winner;
      if (s["AL-CS"].winner !== null) {
        s["AL-CS"].winner = null;
        resetDownstream(state, "AL-CS");
      }
      break;
    case "NL-DS-1":
      s["NL-CS"].topSeed = winner;
      if (s["NL-CS"].winner !== null) {
        s["NL-CS"].winner = null;
        resetDownstream(state, "NL-CS");
      }
      break;
    case "NL-DS-2":
      s["NL-CS"].bottomSeed = winner;
      if (s["NL-CS"].winner !== null) {
        s["NL-CS"].winner = null;
        resetDownstream(state, "NL-CS");
      }
      break;

    // Championship Series → World Series
    case "AL-CS":
      s["WS"].topSeed = winner;
      if (s["WS"].winner !== null) {
        s["WS"].winner = null;
      }
      break;
    case "NL-CS":
      s["WS"].bottomSeed = winner;
      if (s["WS"].winner !== null) {
        s["WS"].winner = null;
      }
      break;
  }
}

function resetDownstream(state: BracketState, seriesId: string) {
  const s = state.series;

  switch (seriesId) {
    case "AL-DS-1":
    case "AL-DS-2":
      s["AL-CS"].topSeed = null;
      s["AL-CS"].bottomSeed = null;
      s["AL-CS"].winner = null;
      s["WS"].topSeed = null;
      s["WS"].winner = null;
      break;
    case "NL-DS-1":
    case "NL-DS-2":
      s["NL-CS"].topSeed = null;
      s["NL-CS"].bottomSeed = null;
      s["NL-CS"].winner = null;
      s["WS"].bottomSeed = null;
      s["WS"].winner = null;
      break;
    case "AL-CS":
      s["WS"].topSeed = null;
      s["WS"].winner = null;
      break;
    case "NL-CS":
      s["WS"].bottomSeed = null;
      s["WS"].winner = null;
      break;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function deepCopy(state: BracketState): BracketState {
  return JSON.parse(JSON.stringify(state));
}

export function isBracketComplete(state: BracketState): boolean {
  return Object.values(state.series).every((s) => s.winner !== null);
}

export function countPicks(state: BracketState): number {
  return Object.values(state.series).filter((s) => s.winner !== null).length;
}

export const TOTAL_SERIES = 11;

// Series display order per round
export const SERIES_ORDER = {
  wildcard: {
    AL: ["AL-WC-1", "AL-WC-2"],
    NL: ["NL-WC-1", "NL-WC-2"],
  },
  division: {
    AL: ["AL-DS-1", "AL-DS-2"],
    NL: ["NL-DS-1", "NL-DS-2"],
  },
  championship: {
    AL: ["AL-CS"],
    NL: ["NL-CS"],
  },
  worldseries: {
    both: ["WS"],
  },
};

export const ROUND_LABELS: Record<string, string> = {
  wildcard: "Wild Card Series",
  division: "Division Series",
  championship: "Championship Series",
  worldseries: "World Series",
};

export const SERIES_FORMAT: Record<string, string> = {
  wildcard: "Best-of-3",
  division: "Best-of-5",
  championship: "Best-of-7",
  worldseries: "Best-of-7",
};
