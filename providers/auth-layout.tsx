'use client';

import { useSession } from '@/lib/auth/auth-client';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { RandomSpinner } from '@/components/ui/custom/random-spinner';

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <RandomSpinner />
      </div>
    );
  }

  return (
    <>
      {session && <Navbar />}
      {/* <pre className='text-sm overflow-clip'>
        {JSON.stringify(session, null, 2)}
      </pre> */}
      <main>{children}</main>
      {session && <Footer />}
    </>
  );
}
