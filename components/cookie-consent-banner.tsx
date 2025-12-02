'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/custom/card';
import { useCookieConsent } from '@/hooks/use-cookie-consent';
import { LuCookie } from 'react-icons/lu';

export const CookieConsentBanner = () => {
  const { consent, updateConsent } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (consent === null || localStorage.getItem('cookieConsent') === null) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [consent]);

  const handleAccept = () => {
    updateConsent(true);
    setIsVisible(false);
  };

  if (isVisible) {
    return (
      <Card className='fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50 bg-indian-khaki-900 dark:bg-indian-khaki-800 border border-indian-khaki-400'>
        <CardHeader>
          <div className='flex flex-row text-indian-khaki-400'>
            <LuCookie className='mr-2' />
            <CardTitle>Cookie Consent</CardTitle>
          </div>
          <CardDescription className='text-sm text-indian-khaki-50'>Acest site utilizează cookies pentru a vă oferi o experiență plăcută.</CardDescription>
        </CardHeader>

        <CardFooter className='flex justify-end space-x-2'>
          <Button
            variant='outline'
            onClick={handleAccept}
            className='bg-indian-khaki-500 hover:bg-indian-khaki-700 text-indian-khaki-900'>
            Am înțeles
          </Button>
        </CardFooter>
      </Card>
    );
  } else {
    return null;
  };
};
