'use server';

import { UserRoleSelect } from '@/components/auth/user-role-select';
import {
  DeleteUserButton,
  PlaceholderDeleteUserButton
} from '@/components/ui/auth/delete-user-button';
import { auth } from '@/lib/auth/auth';
import { UserRole } from '@/prisma/generated/prisma-db-auth/client';
import { headers } from 'next/headers';

const ServerPage = async () => {
  const headersList = await headers();
  const { users } = await auth.api.listUsers({
    headers: headersList,
    query: {
      sortBy: 'name',
    },
  });

  const sortedUsers = users.sort((a, b) => {
    if (a.role === UserRole.ADMIN && b.role !== UserRole.ADMIN) return -1;
    if (a.role !== UserRole.ADMIN && b.role === UserRole.ADMIN) return 1;
    return 0;
  });

  return (
    <div className='px-8 py-16 container mx-auto max-w-screen-lg space-y-8'>
      <div className='w-full overflow-x-auto'>
        <table className='table-auto min-w-full whitespace-nowrap'>
          <thead>
            <tr className='border-b text-sm text-left'>
              <th className='px-4 py-2'>ID</th>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Email</th>
              <th className='px-4 py-2 text-center'>Role</th>
              <th className='px-4 py-2 text-center'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} className='border-b text-sm text-left'>
                <td className='px-4 py-2'>{user.id.slice(0, 8)}</td>
                <td className='px-4 py-2'>{user.name}</td>
                <td className='px-4 py-2'>{user.email}</td>
                <td className='px-4 py-2 text-center'>
                  <UserRoleSelect
                    userId={user.id}
                    role={user.role as UserRole}
                  />
                </td>
                <td className='px-4 py-2 text-center'>
                  {user.role === 'USER' ? (
                    <DeleteUserButton userId={user.id} />
                  ) : (
                    <PlaceholderDeleteUserButton />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServerPage;
