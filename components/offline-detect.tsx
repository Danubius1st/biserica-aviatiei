'use client';

import { useState } from 'react';
import { Detector } from 'react-detect-offline';
import { OfflineSVG } from '@/components/svg/offline-svg';
import { OnlineSVG } from '@/components/svg/online-svg';
import { OnlineInactiveSVG } from '@/components/svg/onlineInactive-svg';

export const OfflineDetect = () => {
  const [active, setActive] = useState(false);

  const clickHandler = () => {
    setActive(active ? false : true);
  };

  return (
    <div>
      <button className='group' onClick={clickHandler} type='button'>
        {active ? (
          <Detector
            render={({ online }) => (
              <div className={`App${online ? 'Online' : 'Offline'} `}>
                {online ? <OnlineSVG /> : <OfflineSVG />}
              </div>
            )}
          />
        ) : (
          <OnlineInactiveSVG />
        )}
        <div className='hidden group-hover:flex'>
          <div className='absolute top-5 flex flex-col items-center mt-6'>
            <div className='w-3 h-3 -mb-2 rotate-45 bg-indian-khaki-900'></div>
            <span className='relative p-2 text-xs leading-none text-indian-khaki-50 whitespace-no-wrap bg-indian-khaki-900 rounded-md shadow-lg z-10'>
              👀 pe rețea.
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};
