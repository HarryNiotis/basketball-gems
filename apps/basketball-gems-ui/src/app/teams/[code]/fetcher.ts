import type { Team } from '../fetcher';

export type Game = {
  id: string;
  homeTeam: {
    code: string;
    abbreviatedName: string;
    images: {
      crest?: string;
    };
  };
  awayTeam: {
    code: string;
    abbreviatedName: string;
    images: {
      crest?: string;
    };
  };
  homeScore?: number;
  awayScore?: number;
  date: string;
  status: 'scheduled' | 'live' | 'finished';
};

// Mock games data for demonstration
const mockGames: Game[] = [
  {
    id: '1',
    homeTeam: {
      code: 'REA',
      abbreviatedName: 'Real Madrid',
      images: { crest: 'https://media-cdn.cortextech.io/real-madrid.png' },
    },
    awayTeam: {
      code: 'BAR',
      abbreviatedName: 'Barcelona',
      images: { crest: 'https://media-cdn.cortextech.io/barcelona.png' },
    },
    homeScore: 85,
    awayScore: 78,
    date: '2025-01-15',
    status: 'finished',
  },
  {
    id: '2',
    homeTeam: {
      code: 'EFS',
      abbreviatedName: 'Efes',
      images: { crest: 'https://media-cdn.cortextech.io/efes.png' },
    },
    awayTeam: {
      code: 'OLY',
      abbreviatedName: 'Olympiakos',
      images: { crest: 'https://media-cdn.cortextech.io/olympiakos.png' },
    },
    homeScore: 92,
    awayScore: 88,
    date: '2025-01-14',
    status: 'finished',
  },
  {
    id: '3',
    homeTeam: {
      code: 'CSK',
      abbreviatedName: 'CSKA',
      images: { crest: 'https://media-cdn.cortextech.io/cska.png' },
    },
    awayTeam: {
      code: 'PAO',
      abbreviatedName: 'Panathinaikos',
      images: { crest: 'https://media-cdn.cortextech.io/pao.png' },
    },
    date: '2025-01-20',
    status: 'scheduled',
  },
];

export async function fetchTeamByCode(code: string): Promise<Team | null> {
  try {
    const response = await fetch(
      `https://api-live.euroleague.net/v2/competitions/E/seasons/E2025/clubs/${code}`,
    );
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching team details:', error);
    return null;
  }
}

export async function fetchTeamGames(code: string): Promise<Game[]> {
  // TODO: Replace with actual API call to fetch games for the team
  // const response = await fetch(
  //   `https://api-live.euroleague.net/v2/competitions/E/seasons/E2025/games?teamCode=${code}`
  // );
  // if (!response.ok) {
  //   throw new Error('Failed to fetch team games');
  // }
  // return response.json();

  // For now, return mock data
  return Promise.resolve(mockGames);
}
