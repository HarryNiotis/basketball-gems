import Link from 'next/link';
import { fetchTeams } from './fetcher';
import { teamRoute } from '@/lib/routes';
import { Card, CardContent } from '@/components/ui/card';

export default async function Teams() {
  const teams = await fetchTeams();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pr-4">
        {teams.map((team) => (
          <Link key={team.code} href={teamRoute(team.code)}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-50">
              <CardContent className="p-6 flex flex-col items-center text-center">
                {team.images?.crest && (
                  <div className="mb-4 w-full">
                    <img
                      src={team.images.crest}
                      alt={team.name}
                      className="w-full h-32 object-contain rounded-lg"
                    />
                  </div>
                )}

                <div className="flex-1 flex flex-col justify-center w-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {team.abbreviatedName}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
