import type { Team } from "./bracket-types";

// -------------------------------------------------------------------------
// PLACEHOLDER TEAMS — update once 2026 postseason field is confirmed.
// Regular season ends Sept 27 2026; Wild Card opens ~Sept 29 2026.
//
// Rules: edit ONLY name and code. Never change id, league, or seed —
// the bracket engine keys off those values to wire every matchup.
// -------------------------------------------------------------------------

export const AL_TEAMS: Team[] = [
  { id: "AL-1", name: "TBD", code: "AL1", seed: 1, league: "AL" },
  { id: "AL-2", name: "TBD", code: "AL2", seed: 2, league: "AL" },
  { id: "AL-3", name: "TBD", code: "AL3", seed: 3, league: "AL" },
  { id: "AL-4", name: "TBD", code: "AL4", seed: 4, league: "AL" },
  { id: "AL-5", name: "TBD", code: "AL5", seed: 5, league: "AL" },
  { id: "AL-6", name: "TBD", code: "AL6", seed: 6, league: "AL" },
];

export const NL_TEAMS: Team[] = [
  { id: "NL-1", name: "TBD", code: "NL1", seed: 1, league: "NL" },
  { id: "NL-2", name: "TBD", code: "NL2", seed: 2, league: "NL" },
  { id: "NL-3", name: "TBD", code: "NL3", seed: 3, league: "NL" },
  { id: "NL-4", name: "TBD", code: "NL4", seed: 4, league: "NL" },
  { id: "NL-5", name: "TBD", code: "NL5", seed: 5, league: "NL" },
  { id: "NL-6", name: "TBD", code: "NL6", seed: 6, league: "NL" },
];

export const ALL_TEAMS: Team[] = [...AL_TEAMS, ...NL_TEAMS];

export function getTeam(id: string): Team | undefined {
  return ALL_TEAMS.find((t) => t.id === id);
}
