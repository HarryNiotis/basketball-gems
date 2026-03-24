import { Link, createFileRoute } from '@tanstack/react-router';

const cards = [
  {
    eyebrow: 'Explore',
    title: 'Teams',
    body: 'Browse EuroLeague clubs and jump into each team detail page.',
    to: '/teams' as const,
  },
  {
    eyebrow: 'Table',
    title: 'Standings',
    body: 'Review the current table with a clean, data-first layout.',
    to: '/standings' as const,
  },
  {
    eyebrow: 'Assist',
    title: 'Chat',
    body: 'Use the Start-native server function chat surface for iteration.',
    to: '/chat' as const,
  },
];

export const Route = createFileRoute('/_authed/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Core building blocks are live</h1>
        </div>
        <p className="muted-copy page-intro">
          The app shell, guarded routes, Apollo integration, and page-level
          route structure are in place so we can iterate page by page.
        </p>
      </section>

      <section className="feature-grid">
        {cards.map((card) => (
          <Link
            className="feature-card feature-card--interactive"
            key={card.to}
            to={card.to}
          >
            <p className="eyebrow">{card.eyebrow}</p>
            <h2>{card.title}</h2>
            <p className="muted-copy">{card.body}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
