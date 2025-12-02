'use client';

import React from 'react';
import { Header } from '@/components/ui/custom/header';
import { Social } from '@/components/auth/social';
import { ButtonLinkBack } from '@/components/ui/custom/button-link-back';

import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/custom/card';

interface Props {
  children: React.ReactNode;
  headerLabel: string;
  buttonLabel: string;
  buttonHref: string;
  showSocial?: boolean;
};

export const CardWrapper = (props: Props) => {
  return (
    <div className='flex h-screen justify-center items-center pl-10 pr-10'>
      <Card className='shadow-md'>
        <Header label={props.headerLabel} />

        <CardContent>
          {props.children}
        </CardContent>

        {props.showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}

        <CardFooter>
          <ButtonLinkBack
            label={props.buttonLabel}
            href={props.buttonHref}
          />
        </CardFooter>
      </Card>
    </div>
  );
};
