import {
  createFileRoute,
  redirect,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useState, useTransition } from 'react';
import { createDemoSession } from '~/lib/session';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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
      <Card className="hero-card hero-card--compact border-border/70 bg-card/90">
        <CardHeader>
          <p className="eyebrow">Demo auth</p>
          <CardTitle className="text-3xl">Open the app shell</CardTitle>
          <CardDescription className="hero-copy">
            This uses a cookie-backed demo session so we can iterate on the UI
            now and swap in real auth later.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
            <Input
              id="display-name"
              onChange={(event) => setDisplayName(event.target.value)}
              value={displayName}
            />
            <label className="field-label" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={email}
            />
            {error ? <p className="error-copy">{error}</p> : null}
            <Button className="w-full" disabled={isPending} type="submit">
              {isPending ? 'Creating session...' : 'Continue'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
