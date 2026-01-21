import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { fetchStandings } from './fetcher';

export default async function Teams() {
  const standings = await fetchStandings();

  return (
    // <div className="gap-6 overflow-y-auto pr-4">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold text-xl">Pos</TableHead>
          <TableHead className="text-center font-bold text-xl">Team</TableHead>
          <TableHead className="text-center font-bold text-xl">
            Games Played
          </TableHead>
          <TableHead className="text-center font-bold text-xl">
            Games Won
          </TableHead>
          <TableHead className="text-center font-bold text-xl">
            Games Lost
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {standings.map((standing, index) => (
          <TableRow key={index}>
            <TableCell className="text-lg">{standing.data.position}</TableCell>
            <TableCell className="w-[100px]">
              {standing.club.images.crest ? (
                <div className="m-1">
                  <img
                    src={standing.club.images.crest}
                    alt={standing.club.name}
                    className="w-full h-12 object-contain rounded-lg"
                  />
                </div>
              ) : (
                standing.club.name
              )}
            </TableCell>
            <TableCell className="text-center text-lg">
              {standing.data.gamesPlayed}
            </TableCell>
            <TableCell className="text-center text-lg">
              {standing.data.gamesWon}
            </TableCell>
            <TableCell className="text-center text-lg">
              {standing.data.gamesLost}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // </div>
  );
}
