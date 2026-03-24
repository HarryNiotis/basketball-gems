import { useReadQuery } from '@apollo/client/react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { GET_STANDINGS } from '~/lib/graphql/queries';

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
        <table className="standings-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Team</th>
              <th>Played</th>
              <th>Won</th>
              <th>Lost</th>
            </tr>
          </thead>
          <tbody>
            {data.standings.map((standing) => (
              <tr key={standing.club.code}>
                <td>{standing.data.position}</td>
                <td>
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
                </td>
                <td>{standing.data.gamesPlayed}</td>
                <td>{standing.data.gamesWon}</td>
                <td>{standing.data.gamesLost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
