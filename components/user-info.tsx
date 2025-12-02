'use client';

import {
  Card,
  CardContent,
  CardHeader
} from '@/components/ui/custom/card';
import { User } from '@/prisma/generated/prisma-db-auth/client';

interface Props {
  user?: User;
  label: string;
};

export const UserInfo = ({ user, label }: Props) => {
  const styles = {
    styleDiv: 'flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm',
    styleP: 'truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md dark:text-indian-khaki-800',
    styleItem: 'truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md dark:text-indian-khaki-800 text-sm font-medium'
  };

  return (
    <Card className='w-[600px] shadow-md'>
      <CardHeader>
        <p className='text-2xl [text-shadow:2px_2px_2px_rgb(0_0_0/0.8)] font-semibold text-center mt-2'>
          {label}
        </p>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className={styles.styleDiv}>
          <p className={styles.styleItem}>
            ID
          </p>
          <p className={styles.styleP}>
            {user?.id}
          </p>
        </div>

        <div className={styles.styleDiv}>
          <p className={styles.styleItem}>
            Name
          </p>
          <p className={styles.styleP}>
            {user?.name}
          </p>
        </div>

        <div className={styles.styleDiv}>
          <p className={styles.styleItem}>
            Email
          </p>
          <p className={styles.styleP}>
            {user?.email}
          </p>
        </div>

        <div className={styles.styleDiv}>
          <p className={styles.styleItem}>
            Role
          </p>
          <p className={styles.styleP}>
            {user?.role}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
