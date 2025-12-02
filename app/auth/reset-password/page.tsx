'use server';

import { redirect } from 'next/navigation';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { loginPath } from '@/middleware/routes';

interface Props {
  searchParams: Promise<{ token?: string; }>;
}

export default async function Page({ searchParams }: Props) {
  const { token } = await searchParams;
  if (!token) redirect(loginPath);

  return (
    <ResetPasswordForm token={token} />
  );
}
