// GraphQL Resolvers for Basketball API
// Maps GraphQL queries to Euroleague API data source

import { EuroleagueDataSource } from '../datasources/euroleague.js';

// Context type for resolvers
interface Context {
  dataSources: {
    euroleague: EuroleagueDataSource;
  };
}

// Query argument types
interface TeamArgs {
  code: string;
}

interface GameArgs {
  id: string;
}

interface GamesArgs {
  teamCode?: string;
  round?: number;
  played?: boolean;
}

interface RoundsArgs {
  phaseTypeCode?: string;
}

interface StandingsArgs {
  round?: number;
}

interface TeamGamesArgs {
  teamCode: string;
}

export const resolvers = {
  Query: {
    // Get all teams
    teams: async (_: unknown, __: unknown, { dataSources }: Context) => {
      return dataSources.euroleague.getTeams();
    },

    // Get a single team by code
    team: async (_: unknown, { code }: TeamArgs, { dataSources }: Context) => {
      return dataSources.euroleague.getTeamByCode(code);
    },

    // Get games with optional filters
    games: async (_: unknown, args: GamesArgs, { dataSources }: Context) => {
      return dataSources.euroleague.getGames(args);
    },

    // Get a single game by ID
    game: async (_: unknown, { id }: GameArgs, { dataSources }: Context) => {
      return dataSources.euroleague.getGameById(id);
    },

    // Get games for a specific team
    teamGames: async (
      _: unknown,
      { teamCode }: TeamGamesArgs,
      { dataSources }: Context,
    ) => {
      return dataSources.euroleague.getTeamGames(teamCode);
    },

    // Get all rounds
    rounds: async (
      _: unknown,
      { phaseTypeCode }: RoundsArgs,
      { dataSources }: Context,
    ) => {
      return dataSources.euroleague.getRounds(phaseTypeCode);
    },

    // Get standings - uses current round if not specified
    standings: async (
      _: unknown,
      { round }: StandingsArgs,
      { dataSources }: Context,
    ) => {
      if (round !== undefined) {
        const data = await dataSources.euroleague.getStandings(round);
        return data[0]?.standings || [];
      }
      // Get current round and return standings for it
      return dataSources.euroleague.getCurrentStandings();
    },
  },

  // Field resolvers for nested types (if needed for data transformation)
  Partials: {
    // Convert extraPeriods object to JSON string
    extraPeriods: (parent: { extraPeriods?: Record<string, number> }) => {
      return parent.extraPeriods ? JSON.stringify(parent.extraPeriods) : null;
    },
  },

  // You can add more field resolvers here for data transformation
  // For example, formatting dates, computing derived fields, etc.
};
