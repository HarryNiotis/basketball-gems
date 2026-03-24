import { Link } from '@tanstack/react-router';

export function NotFound() {
  return (
    <div className="feedback-shell">
      <div className="feedback-card">
        <p className="eyebrow">404</p>
        <h1>That page is off the scouting report.</h1>
        <p className="muted-copy">
          The route does not exist yet or the URL is incorrect.
        </p>
        <div className="feedback-actions">
          <button
            className="button button--ghost"
            onClick={() => window.history.back()}
            type="button"
          >
            Go back
          </button>
          <Link className="button button--primary" to="/">
            Start over
          </Link>
        </div>
      </div>
    </div>
  );
}
