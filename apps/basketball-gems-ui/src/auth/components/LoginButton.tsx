import { Button } from '@/components/ui/button';
import { loginRoute } from '@/lib/routes';
import Link from 'next/link';

export const LoginButton = () => {
  return (
    <Link href={loginRoute}>
      <Button>Log In</Button>
    </Link>
  );
};
