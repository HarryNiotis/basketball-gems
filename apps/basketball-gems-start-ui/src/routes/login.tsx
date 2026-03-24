import {
  createFileRoute,
  redirect,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useState, useTransition } from 'react';
import { createDemoSession } from '~/lib/session';

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/dashboard' });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [email, setEmail] = useState('coach@basketball-gems.local');
  const [displayName, setDisplayName] = useState('Scout Room');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  return (
    <div className="landing-shell">
      <section className="hero-card hero-card--compact">
        <p className="eyebrow">Demo auth</p>
        <h1>Open the app shell</h1>
        <p className="hero-copy">
          This uses a cookie-backed demo session so we can iterate on the UI now
          and swap in real auth later.
        </p>
        <form
          className="auth-form"
          onSubmit={(event) => {
            event.preventDefault();

            if (!email.trim()) {
              setError('Email is required.');
              return;
            }

            setError('');

            startTransition(async () => {
              await createDemoSession({
                data: { email, displayName },
              });
              await router.invalidate();
              await navigate({ to: '/dashboard' });
            });
          }}
        >
          <label className="field-label" htmlFor="display-name">
            Display name
          </label>
          <input
            className="text-input"
            id="display-name"
            onChange={(event) => setDisplayName(event.target.value)}
            value={displayName}
          />
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input
            className="text-input"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
          />
          {error ? <p className="error-copy">{error}</p> : null}
          <button
            className="button button--primary button--full"
            disabled={isPending}
          >
            {isPending ? 'Creating session...' : 'Continue'}
          </button>
        </form>
      </section>
    </div>
  );
}
