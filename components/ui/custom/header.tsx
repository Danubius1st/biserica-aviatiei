'use client';

import { BlurImage } from '@/components/ui/custom/blur-image';
import { images } from '@/config/images';
import { appTitle } from '@/config/app-name';

interface Props {
  label: string;
};

export const Header = (props: Props) => {
  return (
    <div className='max-w-sm text-center'>
      <BlurImage
        src={images[0].src}
        width={images[0].width}
        height={images[0].height}
        alt={images[0].alt}
        css='rounded-t-lg'
      />
      <h1 className='text-2xl text-center font-GaramondBold tracking-[6px] uppercase font-medium text-indian-khaki-800 mt-2'>
        {appTitle}
      </h1>
      <p className='text-muted-foreground text-sm font-HandycheeraRegular tracking-[3px] dark:text-black'>
        {props.label}
      </p>
    </div>
  );
};
