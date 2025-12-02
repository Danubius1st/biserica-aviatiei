'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { InfoSVG } from '@/components/svg/info-svg';

export const MobileDetector = () => {
  const msg = 'Vizionarea de pe mobil e OK, dar pe calculator arată mai bine';
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    };

    setMounted(true);
    setMobile(isMobile());
    if (isMobile() && localStorage.getItem('isMobile') === null) {
      setIsVisible(true);
      localStorage.setItem('isMobile', 'true');
    }
    setIsVisible(process.env.NODE_ENV === 'development');
  }, [mobile, setMobile]);

  // Hydration safe
  if (!mounted) {
    return null;
  }

  const toastMessage = () => {
    setIsVisible(false);
    toast.info(msg, {
      position: 'top-right',
      autoClose: 15000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      progressClassName: 'bg-indian-khaki-300',
      theme: 'colored',
      style: { background: '#766852' },
    });
  };

  return (
    <>
      {isVisible && (
        <div className='fixed mt-20'>
          <button
            className='fixed mt-30 right-10 rounded-full bg-indian-khaki-600 shadow-md transition duration-150 ease-in-out hover:bg-indian-khaki-500 hover:shadow-lg focus:bg-indian-khaki-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indian-khaki-900 active:shadow-lg z-50 cursor-pointer'
            onClick={toastMessage}
          >
            <InfoSVG />
          </button>
        </div>
      )}
    </>
  );
};
