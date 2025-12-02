import React from 'react';
// import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next/types';
import { RootProviders } from '@/providers/root-providers';
import { fonts } from '@/config/fonts';
import {
  ToastContainer,
  ToastContainerProps
} from 'react-toastify';
import '@/styles/globals.css';
import { CookieConsentBanner } from '@/components/cookie-consent-banner';
// import { ScrollProvider } from '@/provider/scroll-provider';
// import { SessionDebug } from '@/components/debug/session-debug';
import {
  appName,
  appTitle,
  canonicalUrl
} from '@/config/app-name';
import AuthLayout from '@/providers/auth-layout';

export const metadata: Metadata = {
  title: `Bine ați venit la ${appTitle}`,
  description: 'Gânduri privind evanghelia',
  applicationName: `${appName}`,
  authors: { name: 'Adrian Bucur' },
  generator: 'create-next-app',
  // keywords: [
  //   'biblia, biblie, studiu biblic, Creștini după Evanghelie, Biserica Aviației, biserica aviatiei, aviatiei, evanghelie, evanghelici, creștini, crestini',
  // ],
  keywords: [
    'biblia, biblie, studiu biblic, Creștini după Evanghelie, evanghelie, evanghelici, creștini, crestini',
  ],
  creator: 'create-next-app@16.0.1',
  publisher: 'Vercel',
  robots: { index: false, follow: false },
  alternates: { canonical: `${canonicalUrl}` },
  icons: '/favicon.ico',
  manifest: '/manifest.webmanifest',
  assets: '/assets'
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  // const session = useSession();

  const toastProps: ToastContainerProps = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: 'light',
  };

  // const session = await auth.api.getSession({
  //   headers: await headers()
  // });

  // const initialSession = authSession?.session ? {
  //   token: authSession.session.token,
  //   user: {
  //     id: authSession.user?.id || '',
  //     name: authSession.user?.name || '',
  //     email: authSession.user?.email || '',
  //     image: authSession.user.image || '',
  //     emailVerified: authSession.user.emailVerified || false
  //   }
  // } : undefined;

  // ScrollProvider cannot be included in RootProviders
  // because RootProviders is redendered conditionally !

  return (
    <html lang='en'>
      <head>
        <link rel='manifest' href='/manifest.webmanifest' />
        <meta name='theme-color' content='#000000' />
      </head>

      <body
        className={`
          ${fonts.geistSans.variable}
          ${fonts.geistMono.variable}
          ${fonts.handycheeraRegular.variable}
          ${fonts.garamondBold.variable}
          ${fonts.tangerineBold.variable}
          ${fonts.meriendaRegular.variable}
          ${fonts.italiannoRegular.variable}
          ${fonts.playwriteCARegular.variable}
          antialiased
          `}
      >
        {/* <ScrollProvider> */}
        <RootProviders>
          <AuthLayout>
            {children}
          </AuthLayout>
          {/* <Analytics /> */}
          <ToastContainer {...toastProps} />
          <CookieConsentBanner />
        </RootProviders>
        {/* </ScrollProvider> */}
      </body>
    </html>
  );
}
