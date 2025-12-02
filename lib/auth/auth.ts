import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { dbAuth } from '@/lib/prisma/db-auth';
import { nextCookies } from 'better-auth/next-js';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { admin, customSession, magicLink } from 'better-auth/plugins';
import { ac, roles } from '@/lib/auth/permissions';

import { UserRole } from '@/prisma/generated/prisma-db-auth/client';
import { hashPassword, verifyPassword } from '@/lib/auth/bcrypt';
import { getValidDomains, normalizeName } from '@/lib/utils';
import { sendVerificationEmailAction } from '@/actions/send-verification-email.action';
import { verifyPath } from '@/middleware/routes';
import { passwordLength } from '@/schemas/auth/schema-const';

// import {
//   ANSI_code_Reset,
//   ANSI_style_1
// } from '@/config/ANSI-codes';

const options = {
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(dbAuth, {
    provider: 'postgresql',
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }
  },

  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60, // 1 hour (default)
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url, process.env.NEXT_PUBLIC_BASE_URL);
      link.searchParams.set('callbackURL', verifyPath);
      // console.log(`${ANSI_style_1}sendVerificationEmail${ANSI_code_Reset}:\nuser: ${JSON.stringify(user)}\nurl: ${url}\nlink: ${link.toString()}`);

      await sendVerificationEmailAction({
        to: user.email,
        subject: 'Verify your email address',
        meta: {
          description: 'Please click the link below to verify your email address:',
          link: link.toString(),
        },
      });
    }
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: passwordLength,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 60, // 1 hour (default)

    sendResetPassword: async ({ user, url }) => {
      // const fullUrl = new URL(url, process.env.NEXT_PUBLIC_BASE_URL);

      await sendVerificationEmailAction({
        to: user.email,
        subject: 'Reset your password',
        meta: {
          description: 'Please click the link below to reset your password:',
          // link: fullUrl.toString(),
          link: url,
        },
      });
    }
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === '/sign-up/email') {
        const email = String(ctx.body.email);
        const domain = email.split('@')[1]?.toLowerCase();

        const VALID_DOMAINS = getValidDomains();
        if (!VALID_DOMAINS.includes(domain)) {
          throw new APIError('BAD_REQUEST', {
            message: 'Invalid email domain'
          });
        }

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name: normalizeName(ctx.body.name)
            }
          }
        };
      }

      if (ctx.path === '/sign-in/magic-link') {
        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name: normalizeName(ctx.body.name)
            }
          }
        };
      }

      if (ctx.path === '/update-user') {
        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name: normalizeName(ctx.body.name)
            }
          }
        };
      }
    })
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = (process.env.NEXT_APP_ADMIN_EMAIL || '').split(';') ?? [];

          if (ADMIN_EMAILS.includes(user.email)) {
            return { data: { ...user, role: UserRole.ADMIN } };
          }

          return { data: user };
        }
      }
    }
  },

  user: {
    additionalFields: {
      role: {
        type: [UserRole.USER, UserRole.ADMIN],
        input: false
      }
    }
  },

  session: {
    // expiresIn: 15, // 15 seconds for testing
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // 5 minutes
    }
  },

  account: {
    accountLinking: {
      enabled: false
    }
  },

  advanced: {
    database: {
      generateId: false
    }
  },

  plugins: [
    nextCookies(),
    admin({
      defaultRole: UserRole.USER,
      adminRoles: [UserRole.ADMIN],
      ac, // access control
      roles
    }),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        sendVerificationEmailAction({
          to: email,
          subject: 'Magic link login',
          meta: {
            description: 'Please click the link below to sign in to your account:',
            link: String(url),
          },
        });
      }
    })
  ]
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,
  plugins: [
    ...(options.plugins ?? []),

    customSession(async ({ user, session }) => {
      return {
        session: {
          expiresAt: session.expiresAt,
          token: session.token,
          userAgent: session.userAgent
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          role: user.role,
          // giraffeFact: 'giraffes ca sometimes nap with one eye open'
        }
      };
    }, options)
  ]
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | 'UNKNOWN';
