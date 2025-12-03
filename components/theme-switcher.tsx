'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonSVG } from '@/components/svg/moon-svg';
import { SunSVG } from '@/components/svg/sun-svg';
import { Switch } from '@/components/ui/custom/switch';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  // Hydration safe
  if (!mounted) {
    return (
      <div className='flex flex-row items-center'>
        <div className='mt-1'>
          <div className='w-12 h-7 bg-gray-200 rounded-full animate-pulse' />
        </div>
      </div>
    );
  }

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const isDark = resolvedTheme === 'dark';
  const isSystem = theme === 'system';

  return (
    <div className='flex flex-row items-center'>
      <div className='mt-1'>
        <Switch
          onChange={toggleTheme}
          checked={isDark}
          label={isDark ? <MoonSVG /> : <SunSVG />}
          reverse={isSystem}
          className=''
        />
      </div>
    </div>
  );
};
