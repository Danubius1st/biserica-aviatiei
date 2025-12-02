'use client';

import { UserInfo } from '@/components/user-info';
import { CurrentUser } from '@/lib/current-user';
import { User, UserRole } from '@/prisma/generated/prisma-db-auth/client';

const ClientPage = () => {
  const crtUser = CurrentUser();

  const user: User = {
    ...crtUser,
    id: crtUser?.id || '',
    name: crtUser?.name || 'Name',
    createdAt: crtUser?.createdAt || new Date(),
    updatedAt: crtUser?.updatedAt || new Date(),
    email: crtUser?.email || 'Email',
    emailVerified: false,
    image: crtUser?.image || '',
    role: crtUser?.role || UserRole.USER,
    banned: null,
    banReason: null,
    banExpires: null,
  };

  return (
    <div>
      <UserInfo
        label={'📱 Client component'}
        user={user}
      />
    </div>
  );
};

export default ClientPage;
