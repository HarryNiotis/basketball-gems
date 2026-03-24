import { useReadQuery } from '@apollo/client/react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { GET_TEAMS } from '~/lib/graphql/queries';

export const Route = createFileRoute('/_authed/teams')({
  loader: ({ context }) => ({
    teamsQueryRef: context.preloadQuery(GET_TEAMS),
  }),
  component: TeamsPage,
});

function TeamsPage() {
  const { teamsQueryRef } = Route.useLoaderData();
  const { data } = useReadQuery(teamsQueryRef);
  const teams = data.teams;

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Teams</p>
          <h1>Club directory</h1>
        </div>
        <p className="muted-copy page-intro">
          This route already uses Apollo preloadQuery and hydrated reads.
        </p>
      </section>

      <section className="team-grid">
        {teams.map((team) => (
          <Link
            className="team-card"
            key={team.code}
            params={{ code: team.code }}
            to="/teams/$code"
          >
            {team.images?.crest ? (
              <img
                alt={team.name}
                className="team-crest"
                src={team.images.crest}
              />
            ) : (
              <div className="team-crest team-crest--placeholder">
                {team.abbreviatedName}
              </div>
            )}
            <div>
              <h2>{team.abbreviatedName}</h2>
              <p className="muted-copy">{team.city || team.country.name}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
