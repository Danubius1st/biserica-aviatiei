'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { A2HS } from '@/components/a2hs';
import { MobileDetector } from '@/components/mobile-detector';
import { ScrollToPosition } from '@/components/scroll-to-position';

interface Props {
  children: React.ReactNode;
}

export const RootProviders = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return (
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        // enableSystem
        disableTransitionOnChange
      >
        <A2HS />
        <MobileDetector />
        <ScrollToPosition />
        {children}
      </ThemeProvider>
    );
  } else {
    return <>{children}</>;
  }
};
