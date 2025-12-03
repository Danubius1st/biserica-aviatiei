'use client';

import * as z from 'zod';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ForgotPasswordSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/lib/auth/auth-client';
import { CardWrapper } from '@/components/ui/custom/card-wrapper';
import { loginPath } from '@/middleware/routes';
import {
  styleError,
  styleInput,
  styleLabel
} from '@/styles/styles-form';

export function ForgotPasswordForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    try {
      setIsPending(true);

      await authClient.requestPasswordReset({
        email: values.email,
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      toast.success('Check your email for the reset link.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <CardWrapper
      headerLabel='Forgot your password?'
      buttonLabel='Back to login'
      buttonHref={loginPath}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label className={styleLabel} htmlFor='email'>Email:</label>
        <input
          id='email'
          type='email'
          {...form.register('email')}
          disabled={isPending}
          className={styleInput}
        />
        {form.formState.errors.email && (
          <p className={styleError}>{form.formState.errors.email.message}</p>
        )}

        <div className='flex justify-center'>
          <button
            type='submit'
            disabled={isPending}
            className='bg-indian-khaki-700 hover:bg-indian-khaki-500 text-white font-bold py-2 px-4 rounded mt-2 cursor-pointer'
          >
            Send reset email
          </button>
        </div>
      </form>
    </CardWrapper>
  );
}
