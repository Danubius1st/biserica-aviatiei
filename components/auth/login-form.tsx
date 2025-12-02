'use client';

import { useState } from 'react';
import Link from 'next/link';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schemas/auth';

import { MagicLinkLoginForm } from '@/components/auth/magic-link-login-form';
import { CardWrapper } from '@/components/ui/custom/card-wrapper';
import { Button } from '@/components/ui/button';
import { signInEmailAction } from '@/actions/sign-in-email.action';
import { Spinner } from '@/components/ui/custom/spinner';
import { toast } from 'react-toastify';

import { LuEye, LuEyeOff } from 'react-icons/lu';
import { EmailSVG } from '@/components/svg/email-svg';
import { PasswordSVG } from '@/components/svg/password-svg';

import {
  styleError,
  styleInput,
  styleLabel
} from '@/styles/styles-form';
import {
  forgotPasswordPath,
  landingPath,
  registerPath
} from '@/middleware/routes';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsPending(true);

    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      const { error } = await signInEmailAction(formData);

      if (error) {
        toast.error(error);
        setIsPending(false);
      } else {
        toast.success('Logged in successfully. Good to see you back!');
        window.location.href = landingPath; // forțează refresh
      }
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : 'An unexpected error occurred';
      toast.error(errorMessage);
    } finally {
      setIsPending(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <CardWrapper
      headerLabel='Bine ați revenit'
      buttonLabel='Nu aveți cont? Înregistrare'
      buttonHref={registerPath}
      showSocial
    >
      <div>
        <div className='mb-2'>
          <MagicLinkLoginForm />
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col'>
            <div className='flex flex-row items-center'>
              <EmailSVG />
              <label
                className={`${styleLabel} ml-2`}
                htmlFor='email'
              >
                Email:
              </label>
            </div>
            <input
              {...form.register('email')}
              className={styleInput}
              type='email'
              id='email'
              disabled={isPending}
              placeholder='user@aviatiei.ro'
              autoComplete='email'
            />
            {form.formState.errors.email && (
              <p className={styleError}>
                {form.formState.errors.email.message}
              </p>
            )}

            <div className='mt-2'>
              <div className='flex flex-row items-center'>
                <PasswordSVG />
                <label
                  className={`${styleLabel} ml-2`}
                  htmlFor='password'
                >
                  Parolă:
                </label>
              </div>
              <div className='relative'>
                <input
                  {...form.register('password')}
                  className={styleInput}
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  disabled={isPending}
                  placeholder='*********'
                  autoComplete='current-password'
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
              {form.formState.errors.password && (
                <p className={styleError}>
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              size='lg'
              variant='customLink'
              className='px-0 italic font-normal mt-2'
              asChild
            >
              <Link href={forgotPasswordPath}>
                Ați uitat parola ?
              </Link>
            </Button>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='bg-indian-khaki-700 hover:bg-indian-khaki-500 text-white font-bold py-2 px-4 rounded cursor-pointer'
                disabled={isPending}
              >
                Login
              </button>
            </div>

            {isPending && <Spinner />}
          </div>
        </form>
      </div>
    </CardWrapper>
  );
};
