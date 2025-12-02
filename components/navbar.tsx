'use client';

import Link from 'next/link';
import { OfflineDetect } from '@/components/offline-detect';
import { XSVG } from '@/components/svg/x-svg';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/prisma/generated/prisma-db-auth/client';
import { navigation } from '@/config/navigation';
import { styleNavBar, styleNavBarButton } from '@/styles/styles-form';
import { landingPath } from '@/middleware/routes';
import { SignOutButton } from '@/components/ui/auth/sign-out-button';
import { images } from '@/config/images';
import { useCurrentRole } from '@/lib/use-current-role';

export const Navbar = () => {
  const pathName = usePathname();
  const styleActive = `${styleNavBarButton} text-indian-khaki-100 bg-indian-khaki-900 hover:text-indian-khaki-900`;

  const userRole = useCurrentRole();

  return (
    <nav className={`relative flex px-4 border-b md:shadow-lg items-center ${styleNavBar} m-5 rounded-md`}>
      <Link href={landingPath}>
        <img src={images[11].src} alt={images[11].alt} width={48} height={61} />
      </Link>

      {userRole === UserRole.ADMIN && (
        <div>
          <Link
            href='/admin'
            className={pathName === '/admin' ? styleActive : styleNavBarButton}
          >
            Admin
          </Link>
          <Link
            href='/admin-db'
            className={pathName === '/admin-db' ? styleActive : styleNavBarButton}
          >
            Admin-db
          </Link>
        </div>
      )}

      <ul className='md:px-2 ml-auto md:flex md:space-x-2 md:relative top-full left-0 right-0'>
        {navigation?.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={pathName === item.href ? styleActive : styleNavBarButton}
            >
              <span>{item.description}</span>
            </Link>
          </li>
        ))}

        <li>
          {/* {session && <SignOutButton />} */}
          <SignOutButton />
        </li>
      </ul>

      <div className='ml-auto md:hidden cursor-pointer'>
        <XSVG />
      </div>

      <ThemeSwitcher />

      <OfflineDetect />
    </nav>
  );
};

// https://tailwindcomponents.com/component/navbar-using-css-only
