'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth/auth-client';
import { toast } from 'react-toastify';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { loginPath, profilePath } from '@/middleware/routes';

interface Props {
  provider: 'google' | 'github',
}

export const SignInOauthButton = ({ provider }: Props) => {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    await signIn.social({
      provider,
      callbackURL: profilePath,
      errorCallbackURL: `${loginPath}/error`,
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
          toast.success('Logged in successfully. Good to see you back!');
        },
      }
    });
    setIsPending(false);
  }

  return (
    <Button
      size='sm'
      className='w-full cursor-pointer'
      variant='customOutline'
      disabled={isPending}
      onClick={() => handleClick()}
    >
      {provider === 'google' && <FcGoogle className='w-5 h-5' />}
      {provider === 'github' && <FaGithub className='w-5 h-5' />}
    </Button>

  );
};
