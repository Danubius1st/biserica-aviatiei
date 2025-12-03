'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '@/schemas/auth';

import { CardWrapper } from '@/components/ui/custom/card-wrapper';
import { Button } from '@/components/ui/button';
import { signUpEmailAction } from '@/actions/sign-up-email.action';
import { RandomSpinner } from '@/components/ui/custom/random-spinner';
import { toast } from 'react-toastify';

import { LuEye, LuEyeOff } from 'react-icons/lu';
import { UserRegisterSVG } from '@/components/svg/user-register-svg';
import { EmailSVG } from '@/components/svg/email-svg';
import { PasswordSVG } from '@/components/svg/password-svg';

import {
  styleError,
  styleInput,
  styleLabel
} from '@/styles/styles-form';
import {
  loginPath,
  registerPath
} from '@/middleware/routes';

export const RegisterForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setIsPending(true);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);

      const { error } = await signUpEmailAction(formData);

      if (error) {
        toast.error(error);
        setIsPending(false);
      } else {
        toast.success('Registration complete. Please verify your email.');
        router.push(`${registerPath}/success`);
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
      headerLabel='Creați un cont'
      buttonLabel='Aveți deja un cont ?'
      buttonHref={loginPath}
      showSocial
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <div className='flex flex-col'>
            <div className='flex flex-row items-center'>
              <UserRegisterSVG />
              <label
                className={`${styleLabel} ml-2`}
                htmlFor='name'
              >
                Nume:
              </label>
            </div>
            <input
              {...form.register('name')}
              className={styleInput}
              type='text'
              id='name'
              disabled={isPending}
              placeholder='user name'
            />
            {form.formState.errors.name && (
              <p className={styleError}>{form.formState.errors.name.message}</p>
            )}

            <div className='mt-2'>
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
              />
              {form.formState.errors.email && (
                <p className={styleError}>
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

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
                />
                <Button
                  variant='ghost'
                  size='sm'
                  className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <LuEyeOff className='h-4 w-4 text-gray-500' />
                  ) : (
                    <LuEye className='h-4 w-4 text-gray-500' />
                  )}
                </Button>
              </div>
              {form.formState.errors.password && (
                <p className={styleError}>
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-center'>
              <button
                type='submit'
                disabled={isPending}
                className='bg-indian-khaki-700 hover:bg-indian-khaki-500 text-white font-bold py-2 px-4 rounded mt-2 cursor-pointer'
              >
                Creați un cont
              </button>
            </div>

            {isPending && <RandomSpinner />}
          </div>
        </div>
      </form>
    </CardWrapper>
  );
};
