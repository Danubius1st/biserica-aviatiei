'use server';

import { auth } from '@/lib/auth/auth';
import { dbAuth as db } from '@/lib/prisma/db-auth';
import { UserRole } from '@/prisma/generated/prisma-db-auth/client';
import { APIError } from 'better-auth/api';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function deleteUserAction({ userId }: { userId: string; }) {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) throw new Error('Unauthorized');

  if (session.user.role !== 'ADMIN' || session.user.id === userId) {
    throw new Error('Forbidden');
  }

  try {
    await db.user.delete({
      where: {
        id: userId,
        role: UserRole.USER,
      },
    });

    /*
    // or using admin plugin:
    const hasPermission = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permission: {
          user: ['delete'],
        },
      },
    })

    if (!hasPermission) {
      return { success: false, error: 'No permission to delete users' }
    }

    await auth.api.removeUser({
      body: {
        userId,
      },
    })
    */

    if (session.user.id === userId) {
      await auth.api.signOut({ headers: headersList });
      redirect('/auth/sign-in');
    }

    revalidatePath('/(dashboard)/server');
    return { success: true, error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { success: false, error: err.message };
    }
    return { success: false, error: 'Internal Server Error' };
  }
}
