'use client';

import { useState } from 'react';
import { signIn } from '@/lib/auth/auth-client';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import {
  landingPath,
  loginPath
} from '@/middleware/routes';
import { Tooltip } from 'react-tooltip';
import {
  contentConfirmation,
  contentWarning
} from '@/config/warnings';

export const Social = () => {
  const [isPending, setIsPending] = useState(false);

  const onClick = async (provider: 'google' | 'github') => {
    if (process.env.NODE_ENV !== 'development') {
      return toast.error(contentConfirmation);
    }

    await signIn.social({
      provider,
      callbackURL: `${landingPath}`,
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
  };

  return (
    <div className='flex flex-row items-center justify-center w-full gap-x-2'>
      <Button
        id='googleBtn'
        size='lg'
        className='cursor-pointer flex-1'
        variant='customOutline'
        disabled={isPending}
        onClick={() => onClick('google')}
      >
        <FcGoogle className='h-5 w-5' />
      </Button>
      {process.env.NODE_ENV !== 'development' && <Tooltip
        anchorSelect='#googleBtn'
        content={contentWarning}
        style={{ backgroundColor: 'indian-khaki-500' }}
      />}

      <Button
        id='githubBtn'
        size='lg'
        className='cursor-pointer flex-1'
        variant='customOutline'
        disabled={isPending}
        onClick={() => onClick('github')}
      >
        <FaGithub className='h-5 w-5' />
      </Button>
      {process.env.NODE_ENV !== 'development' && <Tooltip
        anchorSelect='#githubBtn'
        content={contentWarning}
        style={{ backgroundColor: 'indian-khaki-500' }}
      />}
    </div>
  );
};
