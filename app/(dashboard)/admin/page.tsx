'use client';

import { toast } from 'react-toastify';
import { admin } from '@/actions/admin';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/custom/card';
import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { UserRole } from '@/prisma/generated/prisma-db-auth/client';

const AdminPage = () => {
  const styleDiv = 'flex flex-row items-center justify-between rounded-lg border p-3 shadow-md';
  const styleP = 'text-sm font-medium dark:text-indian-khaki-900';

  const onApiRouteClick = () => {
    fetch('/admin')
      .then((response) => {
        if (response.ok) {
          // console.log('OKAY');
          toast.success('Allowed API Route!');
        } else {
          // console.error('FORBIDDEN');
          toast.error('Forbidden API Route!');
        }
      });
  };

  const onServerActionClick = () => {
    // TODO: handle errors
    const data = admin();
    if (data.error) {
      toast.error(data.error);
    }

    if (data.success) {
      toast.success(data.success);
    }
  };

  return (
    <Card className='w-[600px]'>
      {/* <p className='text-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] font-semibold text-center mt-2'> */}
      <p className='text-2xl [text-shadow:2px_2px_2px_rgb(0_0_0/0.8)] font-semibold text-center mt-2'>
        {/* <p> */}
        🔑 Admin
      </p>

      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message='You are allowed to see this content!' />
        </RoleGate>

        <div className={styleDiv}>
          <p className={styleP}>
            Admin-only API Route
          </p>
          <Button
            onClick={onApiRouteClick}
            className='cursor-pointer'
          >
            Click to test
          </Button>
        </div>

        <div className={styleDiv}>
          <p className={styleP}>
            Admin-only Server Action
          </p>
          <Button
            onClick={onServerActionClick}
            className='cursor-pointer'
          >
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
