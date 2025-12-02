import { ReturnButton } from '@/components/ui/custom/return-button';
import { loginPath } from '@/middleware/routes';

interface Props {
  searchParams: Promise<{ error: string; }>;
}

export default async function Page({ searchParams }: Props) {
  const sp = await searchParams;

  return (
    <div className='px-8 py-16 container mx-auto max-w-5xl space-y-8'>
      <div className='space-y-8'>
        <ReturnButton href={loginPath} label='Login' />

        <h1 className='text-3xl font-bold'>Login Error</h1>
      </div>

      <p className='text-destructive'>
        {sp.error === 'account_not_linked'
          ? 'Tis account is already linked to another user. Please log in with the correct account.'
          : 'Oops! Something went wrong. Please try again.'}
      </p>
    </div>
  );
};
