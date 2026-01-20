import type { Game, Team } from '@/app/types/api-types';

type ApiResponse = {
  data: Game[];
};

export async function fetchTeamByCode(code: string): Promise<Team | null> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/clubs/${code}`);
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
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/games?teamCode=${code}`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch team games');
    }
    const data: ApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching team games:', error);
    throw error;
  }
}
