import * as z from 'zod';
import {
  emailInvalidErrorMessage,
  nameLength,
  passwordLength,
  passwordLengthErrorMessage
} from '@/schemas/auth/schema-const';

export const RegisterSchema = z.object({
  email: z.email({
    error: emailInvalidErrorMessage,
  }),
  password: z.string().min(passwordLength, { error: passwordLengthErrorMessage }),
  name: z.string().min(nameLength, {
    error: 'Name is required'
  }),
});
