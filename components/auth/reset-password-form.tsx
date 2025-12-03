'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ResetPasswordSchema } from '@/schemas/auth';

import { useState } from 'react';
import { resetPassword } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';

import { CardWrapper } from '@/components/ui/custom/card-wrapper';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

import { LuEye, LuEyeOff } from 'react-icons/lu';
import { PasswordSVG } from '@/components/svg/password-svg';

import {
  styleError,
  styleInput,
  styleLabel
} from '@/styles/styles-form';
import {
  forgotPasswordPath,
  loginPath
} from '@/middleware/routes';

interface Props {
  token: string;
}

export const ResetPasswordForm = ({ token }: Props) => {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {

    await resetPassword({
      newPassword: data.newPassword,
      token,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success('Password reset successfully.');
          router.push(`${forgotPasswordPath}/success`);
        },
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <CardWrapper
      headerLabel='Forgot your password?'
      buttonLabel='Back to login'
      buttonHref={loginPath}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <div className='flex flex-row items-center'>
            <PasswordSVG />
            <label
              className={`${styleLabel} mt-2`}
              htmlFor='newPassword'
            >Parolă:
            </label>
          </div>
          <div className='relative'>
            <input
              {...form.register('newPassword')}
              className={styleInput}
              type={showPassword ? 'text' : 'password'}
              id='newPassword'
              disabled={isPending}
              placeholder='*********'
              autoComplete='new-password'
            />
            <Button
              id='toggle-password-visibility'
              type='button'
              variant='ghost'
              size='sm'
              className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <LuEye className='h-4 w-4 text-gray-500' />
              ) : (
                <LuEyeOff className='h-4 w-4 text-gray-500' />
              )}
            </Button>
          </div>
          {form.formState.errors.newPassword && (
            <p className={styleError}>{form.formState.errors.newPassword.message}</p>
          )}

          <div className='mt-2'>
            <div className='flex flex-row items-center'>
              <PasswordSVG />
              <label
                className={`${styleLabel} mt-2`}
                htmlFor='confirmNewPassword'
              >Parolă:
              </label>
            </div>
            <div className='relative'>
              <input
                {...form.register('confirmNewPassword')}
                className={styleInput}
                type={showPassword ? 'text' : 'password'}
                id='confirmNewPassword'
                disabled={isPending}
                placeholder='*********'
                autoComplete='new-password'
              />
              <Button
                id='toggle-password-visibility'
                type='button'
                variant='ghost'
                size='sm'
                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <LuEye className='h-4 w-4 text-gray-500' />
                ) : (
                  <LuEyeOff className='h-4 w-4 text-gray-500' />
                )}
              </Button>
            </div>
          </div>
          {form.formState.errors.confirmNewPassword && (
            <p className={styleError}>{form.formState.errors.confirmNewPassword.message}</p>
          )}
        </div>

        <div className='flex justify-center mt-4'>
          <button
            type='submit'
            className='bg-indian-khaki-700 hover:bg-indian-khaki-500 text-white font-bold py-2 px-4 rounded cursor-pointer'
            disabled={isPending}
          >
            Send reset email
          </button>
        </div>
      </form>
    </CardWrapper>
  );
};
