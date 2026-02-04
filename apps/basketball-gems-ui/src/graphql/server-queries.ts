// Server-side GraphQL queries for Next.js Server Components
// Uses Apollo Client's getClient() for RSC (React Server Components)

import { getClient } from '@/lib/apollo-client';
import {
  GET_TEAMS,
  GET_TEAM_BY_CODE,
  GET_TEAM_GAMES,
  GET_ROUNDS,
  GET_STANDINGS,
  GET_CURRENT_STANDINGS,
  GET_GAMES,
  GET_GAME,
} from './queries';
import type { Team, Game, Round, Standing, TeamStanding } from './types';

/**
 * Fetch all teams (Server Component)
 */
export async function fetchTeams(): Promise<Team[]> {
  const client = getClient();
  const { data } = await client.query<{ teams: Team[] }>({
    query: GET_TEAMS,
  });
  return data?.teams ?? [];
}

/**
 * Fetch a single team by code (Server Component)
 */
export async function fetchTeamByCode(code: string): Promise<Team | null> {
  const client = getClient();
  const { data } = await client.query<{ team: Team | null }>({
    query: GET_TEAM_BY_CODE,
    variables: { code },
  });
  return data?.team ?? null;
}

/**
 * Fetch games for a specific team (Server Component)
 */
export async function fetchTeamGames(teamCode: string): Promise<Game[]> {
  const client = getClient();
  const { data } = await client.query<{ teamGames: Game[] }>({
    query: GET_TEAM_GAMES,
    variables: { teamCode },
  });
  return data?.teamGames ?? [];
}

/**
 * Fetch all rounds with optional phase filter (Server Component)
 */
export async function fetchRounds(phaseTypeCode?: string): Promise<Round[]> {
  const client = getClient();
  const { data } = await client.query<{ rounds: Round[] }>({
    query: GET_ROUNDS,
    variables: { phaseTypeCode },
  });
  return data?.rounds ?? [];
}

/**
 * Fetch standings for a specific round (Server Component)
 */
export async function fetchStandingsByRound(
  round: number,
): Promise<Standing[]> {
  const client = getClient();
  const { data } = await client.query<{ standings: Standing[] }>({
    query: GET_STANDINGS,
    variables: { round },
  });
  return data?.standings ?? [];
}

/**
 * Fetch current standings (Server Component)
 * This automatically determines the current round
 */
export async function fetchCurrentStandings(): Promise<TeamStanding[]> {
  const client = getClient();
  const { data } = await client.query<{ currentStandings: TeamStanding[] }>({
    query: GET_CURRENT_STANDINGS,
  });
  return data?.currentStandings ?? [];
}

/**
 * Fetch games with optional filters (Server Component)
 */
export async function fetchGames(options?: {
  teamCode?: string;
  round?: number;
  played?: boolean;
}): Promise<Game[]> {
  const client = getClient();
  const { data } = await client.query<{ games: Game[] }>({
    query: GET_GAMES,
    variables: options,
  });
  return data?.games ?? [];
}

/**
 * Fetch a single game by ID (Server Component)
 */
export async function fetchGame(id: string): Promise<Game | null> {
  const client = getClient();
  const { data } = await client.query<{ game: Game | null }>({
    query: GET_GAME,
    variables: { id },
  });
  return data?.game ?? null;
}
