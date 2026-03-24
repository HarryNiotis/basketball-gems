import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  console.error(error);

  return (
    <div className="feedback-shell">
      <div className="feedback-card">
        <p className="eyebrow">Something broke</p>
        <ErrorComponent error={error} />
        <div className="feedback-actions">
          <button
            className="button button--primary"
            onClick={() => router.invalidate()}
            type="button"
          >
            Retry
          </button>
          {isRoot ? (
            <Link className="button button--ghost" to="/">
              Home
            </Link>
          ) : (
            <button
              className="button button--ghost"
              onClick={() => window.history.back()}
              type="button"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
