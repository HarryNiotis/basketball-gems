import { useReadQuery } from '@apollo/client/react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { GET_TEAM_BY_CODE, GET_TEAM_GAMES } from '~/lib/graphql/queries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <Card className="feedback-card">
          <p className="eyebrow">Teams</p>
          <h1>Team not found</h1>
          <Button asChild>
            <Link to="/teams">Back to teams</Link>
          </Button>
        </Card>
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
        <Card className="feature-card">
          <CardHeader>
            <p className="eyebrow">Club</p>
            <CardTitle>{team.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="muted-copy">{team.sponsor || 'Sponsor not listed'}</p>
          </CardContent>
        </Card>
        <Card className="feature-card">
          <CardHeader>
            <p className="eyebrow">Venue</p>
            <CardTitle>{team.venueCode || 'TBD'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="muted-copy">
              {team.address || 'Address unavailable'}
            </p>
          </CardContent>
        </Card>
        <Card className="feature-card">
          <CardHeader>
            <p className="eyebrow">Contact</p>
            <CardTitle>{team.website || 'No website'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="muted-copy">{team.phone || 'Phone unavailable'}</p>
          </CardContent>
        </Card>
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
            <Card className="game-card" key={game.id}>
              <CardContent className="space-y-4 pt-6">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
