'use client';

import { BlurImage } from '@/components/ui/custom/blur-image';
import { images } from '@/config/images';

export const DoNotEnter = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <BlurImage
        src={images[9].src}
        alt={images[9].alt}
        width={images[9].width}
        height={images[9].height}
      />
    </div>
  );
};
