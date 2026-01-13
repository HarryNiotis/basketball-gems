'use client';

import { Button } from '@/components/ui/button';
import { logoutRoute } from '@/lib/routes';
import Link from 'next/link';

export const LogoutButton = () => {
  return (
    <Link href={logoutRoute}>
      <Button>Log Out</Button>
    </Link>
  );
};
