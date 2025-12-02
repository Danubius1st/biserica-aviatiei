import { useSession } from '@/lib/auth/auth-client';

export const CurrentUser = () => {
  /*
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'Kk6Jd@example.com',
      role: UserRole.ADMIN
    };

    return user;
    */

  // const { data: session, isPending } = useSession();
  const session = useSession();

  return session.data?.user;
};
