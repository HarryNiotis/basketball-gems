import { useSession } from '@tanstack/react-start/server';
import type { SessionUser } from './session';

type SessionData = {
  user?: SessionUser;
};

export function useAppSession() {
  return useSession<SessionData>({
    password:
      process.env.SESSION_SECRET ??
      'basketball-gems-start-dev-session-secret-change-me',
  });
}
