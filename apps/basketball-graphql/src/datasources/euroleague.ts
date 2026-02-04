// Data Source for Euroleague API
// Handles all HTTP requests to the external Euroleague API

import type { ApiResponse, Game, Round, Standing, Team } from './types.js';

const API_BASE_URL = process.env.EUROLEAGUE_API_URL;

export class EuroleagueDataSource {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Fetch all teams/clubs
   */
  async getTeams(): Promise<Team[]> {
    const response = await fetch(`${this.baseUrl}/clubs`);
    if (!response.ok) {
      throw new Error(`Failed to fetch teams: ${response.statusText}`);
    }
    const data: ApiResponse<Team[]> = await response.json();
    return data.data;
  }

  /**
   * Fetch a single team by code
   */
  async getTeamByCode(code: string): Promise<Team | null> {
    const response = await fetch(`${this.baseUrl}/clubs/${code}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch team ${code}: ${response.statusText}`);
    }
    return response.json() as Promise<Team>;
  }

  /**
   * Fetch games with optional filters
   */
  async getGames(filters?: {
    teamCode?: string;
    round?: number;
    played?: boolean;
  }): Promise<Game[]> {
    const params = new URLSearchParams();
    if (filters?.teamCode) params.append('teamCode', filters.teamCode);
    if (filters?.round !== undefined)
      params.append('round', String(filters.round));
    if (filters?.played !== undefined)
      params.append('played', String(filters.played));

    const url = `${this.baseUrl}/games${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }
    const data: ApiResponse<Game[]> = await response.json();
    return data.data;
  }

  /**
   * Fetch a single game by ID
   */
  async getGameById(id: string): Promise<Game | null> {
    const response = await fetch(`${this.baseUrl}/games/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch game ${id}: ${response.statusText}`);
    }
    return response.json() as Promise<Game>;
  }

  /**
   * Fetch games for a specific team
   */
  async getTeamGames(teamCode: string): Promise<Game[]> {
    return this.getGames({ teamCode });
  }

  /**
   * Fetch all rounds with optional phase filter
   */
  async getRounds(phaseTypeCode?: string): Promise<Round[]> {
    const params = phaseTypeCode ? `?phaseTypeCode=${phaseTypeCode}` : '';
    const response = await fetch(`${this.baseUrl}/rounds${params}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch rounds: ${response.statusText}`);
    }
    const data: ApiResponse<Round[]> = await response.json();
    return data.data;
  }

  /**
   * Fetch standings for a specific round
   */
  async getStandings(round: number) {
    const response = await fetch(`${this.baseUrl}/rounds/${round}/standings`);
    if (!response.ok) {
      throw new Error(`Failed to fetch standings: ${response.statusText}`);
    }
    const data: Standing[] = await response.json();
    return data;
  }

  /**
   * Fetch current standings (determines current round automatically)
   */
  async getCurrentStandings() {
    // First, get all rounds for regular season
    const rounds = await this.getRounds('RS');

    // Find the current round (most recent round that has started)
    const currentRound = rounds.find(
      (r: Round) => Date.now() > new Date(r.maxGameStartDate).getTime(),
    );

    if (!currentRound) {
      // If no round found, try to get the first round
      if (rounds.length > 0) {
        const firstRound = rounds[0];
        const standings = await this.getStandings(firstRound.round);
        return standings[0]?.standings || [];
      }
      throw new Error('No rounds found');
    }

    // Fetch standings for the current round
    const standings = await this.getStandings(currentRound.round);
    return standings[0]?.standings || [];
  }

  /**
   * Fetch current standings with group info (returns full Standing structure)
   * Used when standings query is called without a round parameter
   */
  async getCurrentStandingsWithGroup(): Promise<Standing[]> {
    // First, get all rounds for regular season
    const rounds = await this.getRounds('RS');

    // Find the current round (most recent round that has started)
    const currentRound = rounds.find(
      (r: Round) => Date.now() > new Date(r.maxGameStartDate).getTime(),
    );

    if (!currentRound) {
      // If no round found, try to get the first round
      if (rounds.length > 0) {
        const firstRound = rounds[0];
        return this.getStandings(firstRound.round);
      }
      throw new Error('No rounds found');
    }

    // Fetch standings for the current round
    return this.getStandings(currentRound.round);
  }
}
