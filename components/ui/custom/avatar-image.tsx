'use client';

import Image from 'next/image';
import { FaUser } from 'react-icons/fa';

interface Props {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}

export const AvatarImage = (
  { src,
    alt,
    size = 40,
    className = '' }: Props
) => {
  return (
    <div
      className={`relative rounded-full overflow-hidden bg-gray-200 ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          // objectFit='cover'
          className='rounded-full'
          sizes={`${size}px`}
        />
      ) : (
        <div className='flex items-center justify-center w-full h-full bg-gray-300'>
          <FaUser className='text-gray-500' size={size * 0.6} />
        </div>
      )}
    </div>
  );
};
