import { fetchTeamByCode, fetchTeamGames } from './fetcher';

type Params = {
  code: string;
};

export default async function TeamDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { code } = await params;
  console.log({ code });
  const team = await fetchTeamByCode(code);
  const games = await fetchTeamGames(code);

  if (!team) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Team Not Found
          </h2>
          <p className="text-gray-600">
            Unable to find the team you're looking for.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col">
        {/* Team Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12 flex items-center gap-6">
          {/* Team Crest */}
          {team.images?.crest && (
            <div className="flex-shrink-0">
              <img
                src={team.images.crest}
                alt={team.name}
                className="w-32 h-32 object-contain"
              />
            </div>
          )}

          {/* Team Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {team.abbreviatedName}
            </h2>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Country:</span>{' '}
              {team.country.name}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">City:</span> {team.city}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Coach:</span> {team.president}
            </p>
          </div>
        </div>

        {/* Games Section */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Games</h3>
          <div className="grid grid-cols-1 gap-6 overflow-y-auto pr-4 h-[calc(100vh-580px)]">
            {games.reverse().map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                {/* Game Date and Status */}
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500">
                    {new Date(game.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs font-semibold text-blue-600 capitalize">
                    {game.played ? 'Finished' : 'Upcoming'}
                  </p>
                </div>

                {/* Match Content */}
                <div className="flex items-center justify-between gap-4">
                  {/* Home Team */}
                  <div className="flex-1 flex flex-col items-center">
                    {game.local.club.images?.crest && (
                      <img
                        src={game.local.club.images.crest}
                        alt={game.local.club.abbreviatedName}
                        className="w-12 h-12 object-contain mb-2"
                      />
                    )}
                    <p className="text-sm font-semibold text-gray-900 text-center">
                      {game.local.club.abbreviatedName}
                    </p>
                  </div>

                  {/* Score or vs */}
                  <div className="flex flex-col items-center">
                    {game.played && (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {game.local.score}
                        </p>
                        <p className="text-gray-600 text-xs">-</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {game.road.score}
                        </p>
                      </div>
                    )}
                    {!game.played && (
                      <p className="text-gray-600 font-semibold">VS</p>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex-1 flex flex-col items-center">
                    {game.road.club.images?.crest && (
                      <img
                        src={game.road.club.images.crest}
                        alt={game.road.club.abbreviatedName}
                        className="w-12 h-12 object-contain mb-2"
                      />
                    )}
                    <p className="text-sm font-semibold text-gray-900 text-center">
                      {game.road.club.abbreviatedName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
