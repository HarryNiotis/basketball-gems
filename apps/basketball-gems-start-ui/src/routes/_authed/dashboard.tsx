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
    title: 'Teams',
    body: 'Browse EuroLeague clubs and jump into each team detail page.',
    to: '/teams' as const,
  },
  {
    title: 'Standings',
    body: 'Review the current table with a clean, data-first layout.',
    to: '/standings' as const,
  },
  {
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
      <section className="feature-grid">
        {cards.map((card) => (
          <Link key={card.to} to={card.to}>
            <Card className="feature-card feature-card--interactive h-full">
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{card.body}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
