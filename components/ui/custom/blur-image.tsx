'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  css?: string;
};

export const BlurImage = ({
  src,
  alt,
  width,
  height,
  css = 'rounded-lg',
}: Props) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div
      className={`aspect-w-1 aspect-h-1 w-full overflow-hidden ${css} xl:aspect-w-7 xl:aspect-h-8`}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        priority={true}
        className={`
              duration-700 ease-in-out group-hover:opacity-75

              ${isLoading
            ? 'scale-110 blur-2xl grayscale'
            : 'scale-100 blur-0 grayscale-0'
          })`}
        // onLoadingComplete={() => setLoading(false)}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
