// Apollo Client Hooks for Basketball Gems UI
// These hooks are for client-side data fetching (Client Components)

import { useQuery, useSuspenseQuery } from '@apollo/client/react';
import {
  GET_TEAMS,
  GET_TEAM_BY_CODE,
  GET_TEAM_GAMES,
  GET_ROUNDS,
  GET_STANDINGS,
  GET_GAMES,
  GET_GAME,
} from './queries';
import type {
  Team,
  Game,
  Round,
  TeamStanding,
  GetTeamByCodeVars,
  GetTeamGamesVars,
  GetRoundsVars,
  GetStandingsVars,
  GetGamesVars,
  GetGameVars,
} from './types';

// ============================================
// Standard useQuery hooks (with loading state)
// ============================================

export function useTeams() {
  return useQuery<{ teams: Team[] }>(GET_TEAMS);
}

export function useTeamByCode(code: string) {
  return useQuery<{ team: Team | null }, GetTeamByCodeVars>(GET_TEAM_BY_CODE, {
    variables: { code },
    skip: !code,
  });
}

export function useTeamGames(teamCode: string) {
  return useQuery<{ teamGames: Game[] }, GetTeamGamesVars>(GET_TEAM_GAMES, {
    variables: { teamCode },
    skip: !teamCode,
  });
}

export function useRounds(phaseTypeCode?: string) {
  return useQuery<{ rounds: Round[] }, GetRoundsVars>(GET_ROUNDS, {
    variables: { phaseTypeCode },
  });
}

export function useStandings(round?: number) {
  return useQuery<{ standings: TeamStanding[] }, GetStandingsVars>(
    GET_STANDINGS,
    {
      variables: { round },
    },
  );
}

export function useGames(variables?: GetGamesVars) {
  return useQuery<{ games: Game[] }, GetGamesVars>(GET_GAMES, {
    variables,
  });
}

export function useGame(id: string) {
  return useQuery<{ game: Game | null }, GetGameVars>(GET_GAME, {
    variables: { id },
    skip: !id,
  });
}

// ============================================
// Suspense hooks (for use with React Suspense)
// ============================================

export function useTeamsSuspense() {
  return useSuspenseQuery<{ teams: Team[] }>(GET_TEAMS);
}

export function useTeamByCodeSuspense(code: string) {
  return useSuspenseQuery<{ team: Team | null }, GetTeamByCodeVars>(
    GET_TEAM_BY_CODE,
    {
      variables: { code },
    },
  );
}

export function useTeamGamesSuspense(teamCode: string) {
  return useSuspenseQuery<{ teamGames: Game[] }, GetTeamGamesVars>(
    GET_TEAM_GAMES,
    {
      variables: { teamCode },
    },
  );
}

export function useRoundsSuspense(phaseTypeCode?: string) {
  return useSuspenseQuery<{ rounds: Round[] }, GetRoundsVars>(GET_ROUNDS, {
    variables: { phaseTypeCode },
  });
}

export function useStandingsSuspense(round?: number) {
  return useSuspenseQuery<{ standings: TeamStanding[] }, GetStandingsVars>(
    GET_STANDINGS,
    {
      variables: { round },
    },
  );
}

export function useGamesSuspense(variables?: GetGamesVars) {
  return useSuspenseQuery<{ games: Game[] }, GetGamesVars>(GET_GAMES, {
    variables,
  });
}

export function useGameSuspense(id: string) {
  return useSuspenseQuery<{ game: Game | null }, GetGameVars>(GET_GAME, {
    variables: { id },
  });
}
