'use client';

import React, { useState } from 'react';
import {
  ScrollContext,
  ScrollContextType
} from '@/context/scroll-context';

interface Props {
  children: React.ReactNode;
};

export const ScrollProvider = ({ children }: Props) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const contextValue: ScrollContextType = {
    scrollPosition,
    setScrollPosition,
  };

  return (
    <ScrollContext.Provider value={contextValue}>
      {children}
    </ScrollContext.Provider>
  );
};
