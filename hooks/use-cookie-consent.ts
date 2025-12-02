'use client';

import { useState, useEffect } from 'react';

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent');
    if (storedConsent !== null) {
      setConsent(storedConsent === 'true');
    }
  }, []);

  const updateConsent = async (newConsent: boolean) => {
    setConsent(newConsent);
    localStorage.setItem('cookieConsent', newConsent.toString());

    try {
      const response = await fetch('/api/cookie-consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ consent: newConsent }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cookie consent');
      }
    } catch (error) {
      console.error('Error updating cookie consent:', error);
    }
  };

  return { consent, updateConsent };
};
