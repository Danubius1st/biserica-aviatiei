'use client';

import React from 'react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

interface Props {
  message?: string;
};

export const FormError = (props: Props) => {
  if (!props.message) return null;

  return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
      <HiOutlineExclamationTriangle className='w-4 h-4' />
      <p>{props.message}</p>
    </div>
  );
};
