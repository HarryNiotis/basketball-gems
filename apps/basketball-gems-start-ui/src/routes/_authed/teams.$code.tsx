import { useReadQuery } from '@apollo/client/react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { GET_TEAM_BY_CODE, GET_TEAM_GAMES } from '~/lib/graphql/queries';

export const Route = createFileRoute('/_authed/teams/$code')({
  loader: ({ context, params }) => ({
    teamQueryRef: context.preloadQuery(GET_TEAM_BY_CODE, {
      variables: { code: params.code },
    }),
    gamesQueryRef: context.preloadQuery(GET_TEAM_GAMES, {
      variables: { teamCode: params.code },
    }),
  }),
  component: TeamDetailPage,
});

function TeamDetailPage() {
  const { teamQueryRef, gamesQueryRef } = Route.useLoaderData();
  const { data: teamData } = useReadQuery(teamQueryRef);
  const { data: gamesData } = useReadQuery(gamesQueryRef);
  const team = teamData.team;

  if (!team) {
    return (
      <div className="feedback-shell">
        <div className="feedback-card">
          <p className="eyebrow">Teams</p>
          <h1>Team not found</h1>
          <Link className="button button--primary" to="/teams">
            Back to teams
          </Link>
        </div>
      </div>
    );
  }

  const games = [...gamesData.teamGames].reverse();

  return (
    <div className="page-stack">
      <section className="team-hero">
        {team.images?.crest ? (
          <img
            alt={team.name}
            className="team-hero__crest"
            src={team.images.crest}
          />
        ) : null}
        <div>
          <p className="eyebrow">Team detail</p>
          <h1>{team.abbreviatedName}</h1>
          <p className="muted-copy">
            {team.city}, {team.country.name}
          </p>
        </div>
      </section>

      <section className="info-grid">
        <article className="feature-card">
          <p className="eyebrow">Club</p>
          <h2>{team.name}</h2>
          <p className="muted-copy">{team.sponsor || 'Sponsor not listed'}</p>
        </article>
        <article className="feature-card">
          <p className="eyebrow">Venue</p>
          <h2>{team.venueCode || 'TBD'}</h2>
          <p className="muted-copy">{team.address || 'Address unavailable'}</p>
        </article>
        <article className="feature-card">
          <p className="eyebrow">Contact</p>
          <h2>{team.website || 'No website'}</h2>
          <p className="muted-copy">{team.phone || 'Phone unavailable'}</p>
        </article>
      </section>

      <section className="page-stack">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Schedule</p>
            <h2>Recent and upcoming games</h2>
          </div>
        </div>
        <div className="games-grid">
          {games.map((game) => (
            <article className="game-card" key={game.id}>
              <div className="game-card__meta">
                <span>{new Date(game.date).toLocaleDateString()}</span>
                <span>{game.played ? 'Final' : 'Upcoming'}</span>
              </div>
              <div className="score-row">
                <div className="score-team">
                  <span>{game.local.club.abbreviatedName}</span>
                  {game.played ? <strong>{game.local.score}</strong> : null}
                </div>
                <div className="score-divider">vs</div>
                <div className="score-team">
                  <span>{game.road.club.abbreviatedName}</span>
                  {game.played ? <strong>{game.road.score}</strong> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
