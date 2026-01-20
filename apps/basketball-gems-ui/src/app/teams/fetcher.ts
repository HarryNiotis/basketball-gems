import type { Team } from '../types/api-types';

type ApiResponse = {
  data: Team[];
};

export async function fetchTeams(): Promise<Team[]> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/clubs`);
    if (!response.ok) {
      throw new Error('Failed to fetch teams from Euroleague API');
    }
    const data: ApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
}
