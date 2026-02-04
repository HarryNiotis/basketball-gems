import { resolvers } from '../schema/resolvers';
import { EuroleagueDataSource } from '../datasources/euroleague';

// Mock the data source
jest.mock('../datasources/euroleague');

describe('GraphQL Resolvers', () => {
  let mockDataSource: jest.Mocked<EuroleagueDataSource>;
  let context: {
    dataSources: { euroleague: jest.Mocked<EuroleagueDataSource> };
  };

  beforeEach(() => {
    mockDataSource =
      new EuroleagueDataSource() as jest.Mocked<EuroleagueDataSource>;
    context = {
      dataSources: {
        euroleague: mockDataSource,
      },
    };
  });

  describe('Query.teams', () => {
    it('should fetch all teams', async () => {
      const mockTeams = [
        { code: 'BAR', name: 'FC Barcelona' },
        { code: 'MAD', name: 'Real Madrid' },
      ];
      mockDataSource.getTeams = jest.fn().mockResolvedValue(mockTeams);

      const result = await resolvers.Query.teams(null, {}, context);

      expect(mockDataSource.getTeams).toHaveBeenCalled();
      expect(result).toEqual(mockTeams);
    });
  });

  describe('Query.team', () => {
    it('should fetch a team by code', async () => {
      const mockTeam = { code: 'BAR', name: 'FC Barcelona' };
      mockDataSource.getTeamByCode = jest.fn().mockResolvedValue(mockTeam);

      const result = await resolvers.Query.team(null, { code: 'BAR' }, context);

      expect(mockDataSource.getTeamByCode).toHaveBeenCalledWith('BAR');
      expect(result).toEqual(mockTeam);
    });

    it('should return null for non-existent team', async () => {
      mockDataSource.getTeamByCode = jest.fn().mockResolvedValue(null);

      const result = await resolvers.Query.team(
        null,
        { code: 'INVALID' },
        context,
      );

      expect(result).toBeNull();
    });
  });

  describe('Query.teamGames', () => {
    it('should fetch games for a team', async () => {
      const mockGames = [
        { id: 'game1', local: { club: { code: 'BAR' } } },
        { id: 'game2', road: { club: { code: 'BAR' } } },
      ];
      mockDataSource.getTeamGames = jest.fn().mockResolvedValue(mockGames);

      const result = await resolvers.Query.teamGames(
        null,
        { teamCode: 'BAR' },
        context,
      );

      expect(mockDataSource.getTeamGames).toHaveBeenCalledWith('BAR');
      expect(result).toEqual(mockGames);
    });
  });

  describe('Partials.extraPeriods', () => {
    it('should convert extraPeriods object to JSON string', () => {
      const parent = { extraPeriods: { OT1: 10, OT2: 8 } };

      const result = resolvers.Partials.extraPeriods(parent);

      expect(result).toBe('{"OT1":10,"OT2":8}');
    });

    it('should return null when extraPeriods is undefined', () => {
      const parent = { extraPeriods: undefined };

      const result = resolvers.Partials.extraPeriods(parent);

      expect(result).toBeNull();
    });
  });
});
