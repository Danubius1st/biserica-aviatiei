'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { images } from '@/config/images';
// import { FaFacebookF } from 'react-icons/fa';
// import { FaTwitter } from 'react-icons/fa';
import { HitCounter } from '@/components/hit-counter';
import { HostLocation } from '@/components/host-location';
import { useSession } from '@/lib/auth/auth-client';

export const Footer = () => {
  const [version, setVersion] = useState<string | null>('<Loading...>');
  const style = 'text-sm text-center text-indian-khaki-300 dark:text-indian-khaki-300';

  const fetchJson = async () => {
    await fetch('/app-version')
      .then((response) => {
        // console.log('Footer: response', response);
        return response.json();
      })
      .then((data) => {
        // console.log('Footer: data', data);
        setVersion(data.version);
      });
  };

  useEffect(() => {
    fetchJson();
  }, []);

  const session = useSession();

  // if (!session) {
  //   return null;
  // }

  return (
    <div className='flex flex-row items-center justify-center bg-indian-khaki-700 m-5'>
      <div className='flex-1'></div>
      <div className='py-5'>
        <p className={style}>
          {/* © {new Date().getFullYear()} Biserica Aviației (v.{version}) */}
          © {new Date().getFullYear()} Adrian Bucur (v.{version})
        </p>
      </div>
      <div>
        <HitCounter />
      </div>
      <div>
        <p className={style}>
          <HostLocation />
        </p>
      </div>
      <div>
        <p className={`${style} ml-1`}>
          user: {session.data?.user.name}
        </p>
      </div>

      <div className='flex-1'>
        <div className='flex items-center space-x-6 ml-auto w-60'>
          <Link
            href='/privacy'
            className='text-sm text-indian-khaki-300 transition-colors duration-300 dark:text-indian-khaki-300 hover:underline hover:text-primary dark:hover:text-primary mr-1'
          >
            Privacy
          </Link>
          <Link
            href='/cookies'
            className='text-sm text-indian-khaki-300 transition-colors duration-300 dark:text-indian-khaki-300 hover:underline hover:text-primary dark:hover:text-primary mr-1'
          >
            Cookies
          </Link>
          {/* <Link
            href='https://www.facebook.com/profile.php?id=100070017289138'
            target='_blank'
            className='text-indian-khaki-400 dark:text-indian-khaki-300 mr-1'
          >
            <FaFacebookF />
          </Link> */}

          {/*
              <Link
                href=''
                target='_blank'
                className='text-indian-khaki-400 dark:text-indian-khaki-300 mr-1'
              >
                <FaTwitter />
              </Link>
              */}

          <Link href='http://www.bcev.ro/' target='_blank'>
            <Image
              src={images[5].src}
              width={125}
              height={65}
              style={{ height: '24px', width: 'auto' }}
              alt='Biserica Creștină după Evanghelie din România'
              // quality={100}
              // blurDataURL={blurDataURL}
              // placeholder='blur'
              priority={true}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
