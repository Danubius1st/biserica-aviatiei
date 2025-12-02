'use client';

import React from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ className = '', children }: Props) => (
  <div className={`bg-indian-khaki-100 shadow-md rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ className = '', children }: Props) => (
  <div className={`px-6 py-2 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ className = '', children }: Props) => (
  <div className={`text-xl font-semibold mb-2 ${className}`}>
    {children}
  </div>
);

export const CardDescription = ({ className = '', children }: Props) => (
  <p className={`text-gray-600 ${className}`}>
    {children}
  </p>
);

export const CardContent = ({ className = '', children }: Props) => (
  <div className={`px-6 py-2 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ className = '', children }: Props) => (
  <div className={`px-6 py-2 ${className}`}>
    {children}
  </div>
);
