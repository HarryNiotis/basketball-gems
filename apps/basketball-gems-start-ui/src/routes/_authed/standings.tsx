import { useReadQuery } from '@apollo/client/react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { GET_STANDINGS } from '~/lib/graphql/queries';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const Route = createFileRoute('/_authed/standings')({
  loader: ({ context }) => ({
    standingsQueryRef: context.preloadQuery(GET_STANDINGS),
  }),
  component: StandingsPage,
});

function StandingsPage() {
  const { standingsQueryRef } = Route.useLoaderData();
  const { data } = useReadQuery(standingsQueryRef);

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Standings</p>
          <h1>Current table</h1>
        </div>
        <p className="muted-copy page-intro">
          This is the first pass at the standings page structure and can be
          refined visually next.
        </p>
      </section>

      <div className="table-wrap">
        <Table className="standings-table">
          <TableHeader>
            <TableRow>
              <TableHead>Pos</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Played</TableHead>
              <TableHead>Won</TableHead>
              <TableHead>Lost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.standings.map((standing) => (
              <TableRow key={standing.club.code}>
                <TableCell>{standing.data.position}</TableCell>
                <TableCell>
                  <Link params={{ code: standing.club.code }} to="/teams/$code">
                    <span className="standings-team">
                      {standing.club.images?.crest ? (
                        <img
                          alt={standing.club.name}
                          className="standings-crest"
                          src={standing.club.images.crest}
                        />
                      ) : null}
                      <span>{standing.club.abbreviatedName}</span>
                    </span>
                  </Link>
                </TableCell>
                <TableCell>{standing.data.gamesPlayed}</TableCell>
                <TableCell>{standing.data.gamesWon}</TableCell>
                <TableCell>{standing.data.gamesLost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
