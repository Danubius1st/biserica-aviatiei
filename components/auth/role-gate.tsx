'use client';

import React from 'react';
import { useCurrentRole } from '@/lib/use-current-role';
import { UserRole } from '@/prisma/generated/prisma-db-auth/client';
import { FormError } from '@/components/form-error';

interface Props {
  children: React.ReactNode;
  allowedRole: UserRole;
};

export const RoleGate = ({
  children,
  allowedRole
}: Props) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message='You do not have permission to access this page.' />
    );
  };

  return (
    <>{children}</>
  );
};
