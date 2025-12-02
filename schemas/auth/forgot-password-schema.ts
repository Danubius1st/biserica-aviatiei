import * as z from 'zod';
import { emailInvalidErrorMessage } from '@/schemas/auth/schema-const';

export const ForgotPasswordSchema = z.object({
  email: z.email({
    error: emailInvalidErrorMessage,
  }),
});
