'use client';

import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StarIcon } from 'lucide-react';
import { signIn } from '@/lib/auth/auth-client';
import { toast } from 'react-toastify';
import { landingPath } from '@/middleware/routes';
import { Tooltip } from 'react-tooltip';
import {
  contentConfirmation,
  contentIsDisabled,
  contentWarning
} from '@/config/warnings';

export const MagicLinkLoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const ref = useRef<HTMLDetailsElement>(null);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (contentIsDisabled) return toast.error(contentConfirmation);

    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get('email'));

    if (!email) return toast.error('Please enter your email.');

    await signIn.magicLink({
      email,
      name: email.split('@')[0], // user name
      callbackURL: landingPath,
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
          toast.success('Check your email for the magic link!');
          if (ref.current) ref.current.open = false;
          (evt.target as HTMLFormElement).reset();
        },
      },
    });
  };

  return (
    <details
      ref={ref}
      className='max-w-sm rounded-md border border-indian-khaki-600 overflow-hidden'
    >
      <summary
        className='flex gap-2 items-center px-2 py-1 bg-indian-khaki-700 text-white hover:bg-indian-khaki-600/80 transition cursor-pointer'
      >
        Încearcă Magic Link <StarIcon size={16} />
      </summary>

      <form onSubmit={handleSubmit} className='px-2 py-1'>
        <Label
          id='emailLabel'
          htmlFor='email'
          className='sr-only'
        >
          Email
        </Label>
        <div className='flex gap-2 items-center'>
          <Input
            id='emailInput'
            type='email'
            name='email'
            placeholder='not.allowed@you.wish.com'
          />
          <button
            id='send-button'
            className='bg-indian-khaki-700 hover:bg-indian-khaki-500 text-white font-bold py-2 px-4 rounded cursor-pointer'
            disabled={isPending}
          >
            Send
          </button>
          <Tooltip
            anchorSelect='#send-button'
            content={contentWarning}
            style={{ backgroundColor: 'indian-khaki-500' }}
          />
        </div>
      </form>
    </details>
  );
};
