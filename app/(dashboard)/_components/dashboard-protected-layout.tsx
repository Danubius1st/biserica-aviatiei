'use client';

import React from 'react';
import { DashboardNavbar } from './dashboard-navbar';
import { UserRole } from '@/prisma/generated/prisma-db-auth/client';
import { DoNotEnter } from '@/components/do-not-enter';
import { useSession } from '@/lib/auth/auth-client';

interface Props {
  children: React.ReactNode;
}

export const DashboardProtectedLayout = ({ children }: Props) => {
  const { data: session } = useSession();

  if (session?.user?.role === UserRole.ADMIN) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <DashboardNavbar />
        {children}
      </div>
    );
  } else {
    return (
      <div className='flex flex-col items-center justify-center'>
        <DoNotEnter />
      </div>
    );
  }
};
