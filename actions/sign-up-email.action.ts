'use server';

import { auth } from '@/lib/auth/auth';
import { APIError } from 'better-auth/api';

// import {
//   ANSI_code_Reset,
//   ANSI_style_1
// } from '@/config/ANSI-codes';

export async function signUpEmailAction(formData: FormData) {
  const name = String(formData.get('name'));
  if (!name) {
    return { error: 'Name is required' };
  }

  const email = String(formData.get('email'));
  if (!email) {
    return { error: 'Email is required' };
  }

  const password = String(formData.get('password'));
  if (!password) {
    return { error: 'Password is required' };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        // role: 'USER' // auth.user.additionalFields.role.input: false
        // rememberMe: true,
        // callbackURL: "https://example.com/callback",
      },
    });

    return { error: null };
  } catch (error) {
    // console.log(`${ANSI_style_1}error${ANSI_code_Reset}: ${error}`);

    if (error instanceof APIError) {
      const errCode = error.body ? (error.body.code as string) : 'UNKNOWN';

      switch (errCode) {
        case 'USER_ALREADY_EXISTS':
          return { error: 'User already exists' };
        // case 'ERR_INVALID_URL':
        //   return { error: 'Invalid URL' };
        // case 'EMAIL_ALREADY_EXISTS':
        //   return { error: 'Email already exists' };
        // case 'INVALID_EMAIL':
        //   return { error: 'Invalid email address' };
        // case 'WEAK_PASSWORD':
        //   return { error: 'Password is too weak' };
        default:
          return { error: error.message };
      }
    }

    return { error: 'Internal server error' };
  }
}
