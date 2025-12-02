'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const PagesProviders = ({ children }: Props) => {
  return <>{children}</>;
};
