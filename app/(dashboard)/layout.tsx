import React from 'react';
import { DashboardProtectedLayout } from './_components/dashboard-protected-layout';

interface Props {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  return (
    <DashboardProtectedLayout>
      {children}
    </DashboardProtectedLayout>
  );
};

export default DashboardLayout;
