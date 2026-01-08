interface Team {
  id: string;
  name: string;
  country: string;
  image?: string;
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Real Madrid',
    country: 'Spain',
    image: 'https://via.placeholder.com/150?text=Real+Madrid',
  },
  {
    id: '2',
    name: 'FC Barcelona',
    country: 'Spain',
    image: 'https://via.placeholder.com/150?text=Barcelona',
  },
  {
    id: '3',
    name: 'Olympiakos',
    country: 'Greece',
    image: 'https://via.placeholder.com/150?text=Olympiakos',
  },
  {
    id: '4',
    name: 'CSKA Moscow',
    country: 'Russia',
    image: 'https://via.placeholder.com/150?text=CSKA',
  },
  {
    id: '5',
    name: 'Panathinaikos',
    country: 'Greece',
    image: 'https://via.placeholder.com/150?text=Panathinaikos',
  },
  {
    id: '6',
    name: 'Lakers',
    country: 'USA',
    image: 'https://via.placeholder.com/150?text=Lakers',
  },
  {
    id: '7',
    name: 'Celtics',
    country: 'USA',
    image: 'https://via.placeholder.com/150?text=Celtics',
  },
  {
    id: '8',
    name: 'Warriors',
    country: 'USA',
    image: 'https://via.placeholder.com/150?text=Warriors',
  },
  {
    id: '9',
    name: 'Miami Heat',
    country: 'USA',
    image: 'https://via.placeholder.com/150?text=Heat',
  },
  {
    id: '10',
    name: 'Denver Nuggets',
    country: 'USA',
    image: 'https://via.placeholder.com/150?text=Nuggets',
  },
];

export async function fetchTeams(): Promise<Team[]> {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/teams');
  // if (!response.ok) {
  //   throw new Error('Failed to fetch teams');
  // }
  // return response.json();

  // For now, return mock data
  return Promise.resolve(mockTeams);
}

export type { Team };
