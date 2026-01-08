import type { Team } from '../fetcher';

type ClubInfo = {
  code: string;
  name: string;
  abbreviatedName: string;
  editorialName: string;
  tvCode: string;
  isVirtual: boolean;
  images: {
    crest?: string;
  };
};

type Score = {
  club: ClubInfo;
  score: number;
  standingsScore: number;
  partials: {
    partials1: number;
    partials2: number;
    partials3: number;
    partials4: number;
    extraPeriods: Record<string, number>;
  };
};

export type Game = {
  id: string;
  identifier: string;
  gameCode: number;
  season: {
    name: string;
    code: string;
    alias: string;
    competitionCode: string;
    year: number;
    startDate: string;
  };
  group: {
    id: string;
    order: number;
    name: string;
    rawName: string;
  };
  phaseType: {
    code: string;
    alias: string;
    name: string;
    isGroupPhase: boolean;
  };
  round: number;
  roundAlias: string;
  roundName: string;
  played: boolean;
  date: string;
  confirmedDate: boolean;
  confirmedHour: boolean;
  localTimeZone: number;
  localDate: string;
  utcDate: string;
  local: Score;
  road: Score;
  audience: number;
  audienceConfirmed: boolean;
  socialFeed: string;
  operationsCode: string | null;
  referee1: string | null;
  referee2: string | null;
  referee3: string | null;
  referee4: string | null;
  venue: {
    name: string;
    code: string;
    capacity: number;
    address: string;
    images: {
      medium: string | null;
    };
    active: boolean;
    notes: string;
  };
  isNeutralVenue: boolean;
  gameStatus: string;
  winner: string | null;
};

type ApiResponse = {
  data: Game[];
};

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
  try {
    const response = await fetch(
      `https://api-live.euroleague.net/v2/competitions/E/seasons/E2025/games?teamCode=${code}`,
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
