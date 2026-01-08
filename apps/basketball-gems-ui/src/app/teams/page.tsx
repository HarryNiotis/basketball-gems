'use client';

import { LogoutButton } from '@/auth/components';
import { useEffect, useState } from 'react';

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

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch teams from API
    // For now, using mock data
    setTeams(mockTeams);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <header className="bg-blue-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Teams</h1>
            <p className="text-blue-100 mt-1">Explore all teams</p>
          </div>
          <div className="flex items-center gap-4">
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Loading teams...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50"
              >
                {/* Team Image */}
                {team.image && (
                  <div className="mb-4 w-full">
                    <img
                      src={team.image}
                      alt={team.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Team Info */}
                <div className="flex-1 flex flex-col justify-center w-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {team.name}
                  </h3>
                  <p className="text-sm text-gray-600">{team.country}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
