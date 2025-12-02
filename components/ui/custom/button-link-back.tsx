'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Props {
  href: string;
  label: string;
};

export const ButtonLinkBack = (props: Props) => {
  return (
    <Button
      size='lg'
      variant='customLink'
      className='w-full italic font-normal'
      asChild
    >
      <Link href={props.href}>
        {props.label}
      </Link>
    </Button>
  );
};
