'use client';

import { useState } from 'react';
import { signOut } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ExitSVG } from '@/components/svg/exit-svg';
import { RandomSpinner } from '@/components/ui/custom/random-spinner';
import { loginPath } from '@/middleware/routes';
import { styleNavBarButton } from '@/styles/styles-form';

export const SignOutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleClick(): Promise<void> {
    await signOut({
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
          localStorage.clear();
          toast.success('Logged out successfully. See you next time!');
          router.push(loginPath);
          // router.refresh();
          // redirect(loginPath);
          // window.location.href = landingPath; // forțează refresh

        },
      },
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`${styleNavBarButton} cursor-pointer`}
    >
      <ExitSVG />
      {isPending && <RandomSpinner id={23} color={'#F1EBE2'} />}
    </button>
  );
};
