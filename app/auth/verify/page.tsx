import { SendVerificationEmailForm } from '@/components/auth/send-verification-email-form';
import { ReturnButton } from '@/components/ui/custom/return-button';
import { landingPath, loginPath } from '@/middleware/routes';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{ error: string; }>;
}

export default async function Page({ searchParams }: Props) {
  const error = (await searchParams).error;

  if (!error) redirect(landingPath);

  return (
    <div className='px-8 py-16 container mx-auto max-w-5xl space-y-8'>
      <div className='space-y-8'>
        <ReturnButton href={loginPath} label='Login' />

        <h1 className='text-3xl font-bold'>Verify Email</h1>
      </div>

      <p className='text-destructive'>
        {error === 'invalid_token' || error === 'token_expired'
          ? 'Your token is invalid or expired. Please request a new one.'
          : error === 'email_not_verified'
            ? 'Please verify your email address or request a new verification below.'
            : 'Oops! Something went wrong. Please try again.'}
      </p>

      <SendVerificationEmailForm />
    </div>
  );
};
