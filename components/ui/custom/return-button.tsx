'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';

interface Props {
  href: string;
  label: string;
}

export const ReturnButton = ({ href, label }: Props) => {
  return (
    <Button
      size='sm'
      asChild
    >
      <Link href={href} >
        <ArrowLeftIcon /> {label}
      </Link>
    </Button >
  );
};
