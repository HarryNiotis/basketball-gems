import type { Round, Standing, TeamStanding } from '../types/api-types';

export async function fetchStandings(): Promise<TeamStanding[]> {
  try {
    const roundsResponse = await fetch(
      `${process.env.API_BASE_URL}/rounds?phaseTypeCode=RS`,
    );
    if (!roundsResponse.ok) {
      throw new Error('Failed to fetch rounds from Euroleague API');
    }
    const roundsData: { data: Round[] } = await roundsResponse.json();

    const currentRound = roundsData.data.find(
      (r) => Date.now() > new Date(r.maxGameStartDate).getTime(),
    );
    if (!currentRound) {
      throw new Error('Current round not found');
    }

    console.log('Current Round:', { currentRound });

    const response = await fetch(
      `${process.env.API_BASE_URL}/rounds/${currentRound.round}/standings`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch standings from Euroleague API');
    }
    const data: Standing[] = await response.json();
    console.log('Standings Data:', { data });
    return data[0].standings;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
}
