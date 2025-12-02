import { useCurrentRole } from '@/lib/use-current-role';
import { UserRole } from '@/prisma/generated/prisma-db-auth/client';

export const admin = () => {
  const role = useCurrentRole();

  if (role === UserRole.ADMIN) {
    return { success: 'Allowed Server Action!' };
  }

  return { error: 'Forbidden Server Action!' };
};
