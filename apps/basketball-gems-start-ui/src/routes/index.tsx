import { Link, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/dashboard' });
    }
  },
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="landing-shell">
      <section className="hero-card">
        <p className="eyebrow">New app scaffold</p>
        <h1>Basketball Gems on TanStack Start</h1>
        <p className="hero-copy">
          This app mirrors the current product surface with route guards, Apollo
          data loading, and a Start-native server function model.
        </p>
        <div className="hero-actions">
          <Link className="button button--primary" to="/login">
            Enter demo session
          </Link>
          <a
            className="button button--ghost"
            href="https://tanstack.com/start/latest"
          >
            Framework docs
          </a>
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <p className="eyebrow">Routing</p>
          <h2>File-based pages</h2>
          <p className="muted-copy">
            Dashboard, teams, standings, chat, and team detail routes are in
            place for iteration.
          </p>
        </article>
        <article className="feature-card">
          <p className="eyebrow">Data</p>
          <h2>Apollo SSR integration</h2>
          <p className="muted-copy">
            Teams and standings already preload through the TanStack Start
            router.
          </p>
        </article>
        <article className="feature-card">
          <p className="eyebrow">Auth</p>
          <h2>Replaceable session layer</h2>
          <p className="muted-copy">
            A lightweight demo session drives guards and navigation until the
            real provider is integrated.
          </p>
        </article>
      </section>
    </div>
  );
}
