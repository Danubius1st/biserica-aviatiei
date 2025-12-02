import * as z from 'zod';
import {
  passwordLengthErrorMessage,
  newPasswordRequiredErrorMessage,
  passwordRequiredErrorMessage
} from '@/schemas/auth/schema-const';
import { UserRole } from '@/prisma/generated/prisma-db-auth/client';

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.email()),
  password: z.optional(z.string().min(6, {
    error: passwordLengthErrorMessage
  })),
  newPassword: z.optional(z.string().min(6, {
    error: passwordLengthErrorMessage
  })),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    error: newPasswordRequiredErrorMessage,
    path: ['newPassword'],
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    error: passwordRequiredErrorMessage,
    path: ['password'],
  });
