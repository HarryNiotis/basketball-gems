import Link from 'next/link';
import { fetchTeams } from './fetcher';

export default async function Teams() {
  const teams = await fetchTeams();

  return (
    <>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col h-[calc(100vh-180px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pr-4">
          {teams.map((team) => (
            <Link key={team.code} href={`/teams/${team.code}/`}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50">
                {/* Team Crest/Logo */}
                {team.images?.crest && (
                  <div className="mb-4 w-full">
                    <img
                      src={team.images.crest}
                      alt={team.name}
                      className="w-full h-32 object-contain rounded-lg"
                    />
                  </div>
                )}

                {/* Team Info */}
                <div className="flex-1 flex flex-col justify-center w-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {team.abbreviatedName}
                  </h3>
                  <p className="text-sm text-gray-600">{team.country.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
