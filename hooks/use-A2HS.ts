'use client';

import { useEffect, useState } from 'react';

interface IBeforeInstallPromptEvent extends Event {
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
  }>;
  prompt(): Promise<void>;
}

interface Config {
  onAccepted?: () => void;
  onDismissed?: () => void;
}

const timeout = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay));
};
/**
 * prompt A2HS if available.
 * Only Chrome and Edge is supported. (https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent)
 */
export const useA2HS = (
  config?: Config,
): [IBeforeInstallPromptEvent | null, () => void] => {

  const [promptEvent, setPromptEvent] =
    useState<IBeforeInstallPromptEvent | null>(null);

  const promptToInstall = () => {
    if (promptEvent) promptEvent.prompt();
  };

  useEffect(() => {
    const listener = async (e: IBeforeInstallPromptEvent) => {
      e.preventDefault();
      // Banner not shown: beforeinstallpromptevent.preventDefault() called. The page must call beforeinstallpromptevent.prompt() to show the banner.
      await timeout(5 * 60 * 1000); // 5 minutes delay
      setPromptEvent(e);
      e.userChoice
        .then((result) => {
          if (result.outcome === 'accepted') {
            if (config?.onAccepted) config.onAccepted();
          } else {
            if (config?.onDismissed) config.onDismissed();
          }
          return;
        })
        .catch(console.error);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', listener as unknown as EventListener);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeinstallprompt', listener as unknown as EventListener);
      }
    };
  }, [config]);

  return [promptEvent, promptToInstall];
};

// https://github.com/kodai3/react-use-a2hs
