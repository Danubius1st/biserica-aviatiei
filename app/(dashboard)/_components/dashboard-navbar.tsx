'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AvatarImage } from '@/components/ui/custom/avatar-image';
import { CurrentUser } from '@/lib/current-user';

export const DashboardNavbar = () => {
  const user = CurrentUser();
  const pathName = usePathname();

  const navigation = [
    { name: 'Server', href: '/server', },
    { name: 'Client', href: '/client' },
    { name: 'Admin', href: '/admin' },
    { name: 'Settings', href: '/settings' }
  ];

  return (
    <nav className='bg-indian-khaki-200 flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm'>
      <div className='flex gap-x-2'>
        {navigation.map((item) => (
          <li key={item.name} className='list-none'>
            <Button
              variant={pathName === item.href ? 'customDefault' : 'customOutline'}
            >
              <Link href={item.href}>
                {item.name}
              </Link>
            </Button>
          </li>
        ))}
      </div>
      <AvatarImage src={user?.image || 'https://i.pravatar.cc/150'} alt={''} />
    </nav>
  );
};
