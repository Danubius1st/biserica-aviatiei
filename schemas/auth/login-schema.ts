import * as z from 'zod';
import {
  emailRequiredErrorMessage,
  passwordLength,
  passwordRequiredErrorMessage
} from '@/schemas/auth/schema-const';

export const LoginSchema = z.object({
  email: z.email({
    error: emailRequiredErrorMessage,
  }),
  password: z.string().min(passwordLength, { error: passwordRequiredErrorMessage }),
  code: z.optional(z.string()),
});
