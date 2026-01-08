type Country = {
  code: string;
  name: string;
};

type Images = {
  crest?: string;
};

type Team = {
  code: string;
  name: string;
  abbreviatedName: string;
  editorialName: string;
  tvCode: string;
  isVirtual: boolean;
  images: Images;
  sponsor: string;
  clubPermanentName: string;
  clubPermanentAlias: string;
  country: Country;
  address: string;
  website: string;
  ticketsUrl: string;
  twitterAccount: string;
  venueCode: string;
  city: string;
  president: string;
  phone: string;
};

type ApiResponse = {
  data: Team[];
};

export async function fetchTeams(): Promise<Team[]> {
  try {
    const response = await fetch(
      'https://api-live.euroleague.net/v2/competitions/E/seasons/E2025/clubs',
    );
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

export type { Team };
