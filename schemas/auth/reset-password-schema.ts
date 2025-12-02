import * as z from 'zod';
import { passwordLengthErrorMessage } from '@/schemas/auth/schema-const';

export const ResetPasswordSchema = z.object({
  newPassword: z.string().min(6, { error: passwordLengthErrorMessage }),
  confirmNewPassword: z.string(),
})
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match.',
    path: ['confirmNewPassword'],
  });
