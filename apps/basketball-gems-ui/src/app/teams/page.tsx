import { LogoutButton } from '@/auth/components';
import { fetchTeams } from './fetcher';

export default async function Teams() {
  const teams = await fetchTeams();

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
      </main>
    </div>
  );
}
