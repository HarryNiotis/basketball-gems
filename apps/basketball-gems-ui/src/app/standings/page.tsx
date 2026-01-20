import { fetchStandings } from './fetcher';
import { Card, CardContent } from '@/components/ui/card';

export default async function Teams() {
  const standings = await fetchStandings();

  return (
    <>
      <div className="grid grid-cols-1 gap-6 overflow-y-auto pr-4">
        {standings.map((standing) => (
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-50">
            <CardContent className="p-6 flex flex-row items-center text-center">
              {standing.club.images.crest && (
                <div className="mb-4">
                  <img
                    src={standing.club.images.crest}
                    alt={standing.club.name}
                    className="w-full h-32 object-contain rounded-lg"
                  />
                </div>
              )}

              <div className="flex-1 flex flex-col justify-center w-full">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {standing.data.gamesPlayed} GP - {standing.data.gamesWon}W -{' '}
                  {standing.data.gamesLost}L
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
