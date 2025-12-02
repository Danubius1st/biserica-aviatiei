import { createAuthClient } from 'better-auth/react';
import {
  adminClient,
  customSessionClient,
  inferAdditionalFields,
  magicLinkClient
} from 'better-auth/client/plugins';
import type { auth } from '@/lib/auth/auth';
import { ac, roles } from '@/lib/auth/permissions';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({ ac, roles }),
    customSessionClient<typeof auth>(), // type inference for plugins workaround
    magicLinkClient()
  ]
});

export const {
  signUp,
  signOut,
  signIn,
  useSession,
  admin,
  sendVerificationEmail,
  requestPasswordReset,
  resetPassword,
  updateUser,
  changePassword
} = authClient;
