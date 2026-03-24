import { Link, createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
          <Link key={card.to} to={card.to}>
            <Card className="feature-card feature-card--interactive h-full">
              <CardHeader>
                <p className="eyebrow">{card.eyebrow}</p>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="muted-copy">
                  {card.body}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
