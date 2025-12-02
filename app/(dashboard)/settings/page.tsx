'use server';

import {
  Card,
  CardContent,
  CardHeader
} from '@/components/ui/card';
import { redirect } from 'next/navigation';
import { loginPath, profilePath } from '@/middleware/routes';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { UpdateUserForm } from '@/components/auth/update-user-form';
import { ReturnButton } from '@/components/ui/custom/return-button';

const SettingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect(loginPath);
  }

  const user = session.user;
  if (user.role !== 'ADMIN') {
    return (
      <div className='px-8 py-16 container mx-auto max-w-screen-lg space-y-8'>
        <div className='space-y-4'>
          <ReturnButton href={profilePath} label='Profile' />

          <h1 className='text-3xl font-bold'>Admin Dashboard</h1>

          <p className='p-2 rounded-md text-lg bg-red-600 text-white font-bold'>
            FORBIDDEN
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl [text-shadow:2px_2px_2px_rgb(0_0_0/0.8)] font-semibold text-center mt-2'>
          ⚙️ Settings
        </p>
      </CardHeader>

      <CardContent>
        <UpdateUserForm
          name={user.name}
          image={user.image ?? ""}
        />
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
