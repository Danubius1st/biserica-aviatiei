'use server';

import { auth, ErrorCode } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { APIError } from 'better-auth/api';
import { redirect } from 'next/navigation';
import { verifyPath } from '@/middleware/routes';

export async function signInEmailAction(formData: FormData) {
  const email = String(formData.get('email'));
  if (!email) {
    return { error: 'Email is required' };
  }

  const password = String(formData.get('password'));
  if (!password) {
    return { error: 'Password is required' };
  }

  // console.log(email, password);
  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
        // rememberMe: true,
        // callbackURL: "https://example.com/callback",
      }
    });

    /*
    const res = await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password
      },
      asResponse: true
    });

    // ===
    const setCookieHeader = res.headers.get('set-cookie');
    if (setCookieHeader) {
      const cookie = parseSetCookieHeader(setCookieHeader);
      const cookieStore = await cookies();

      const [key, cookieAttributes] = [...cookie.entries()][0];
      const value = cookieAttributes.value;
      const maxAge = cookieAttributes['max-age'];
      const path = cookieAttributes.path;
      const httpOnly = cookieAttributes.httponly;
      // const secure = cookieAttributes.secure;
      const sameSite = cookieAttributes.samesite;

      cookieStore.set(key, decodeURIComponent(value), {
        maxAge,
        path,
        httpOnly,
        // secure,
        sameSite
      });
    }
    */

    return { error: null };
  } catch (error) {
    if (error instanceof APIError) {
      const errCode = error.body
        ? (error.body.code as ErrorCode)
        : 'UNKNOWN';

      switch (errCode) {
        case 'EMAIL_NOT_VERIFIED':
          redirect(`${verifyPath}?error=email_not_verified`);

        default:
          return { error: error.message };
      }
    }

    return { error: 'Internal server error' };
  }
}
