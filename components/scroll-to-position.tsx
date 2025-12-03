'use client';

import { useEffect, useState } from 'react';
import { ArrowCircleUpSVG } from '@/components/svg/arrowCircleUp-svg';
import { ArrowCircleDownSVG } from '@/components/svg/arrowCircleDown-svg';

export const ScrollToPosition = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const topPosToStartShowing = 400;
  const scrollHeight = document.body.scrollHeight;
  const style = 'fixed right-10 outline-none z-30 animate-bounce cursor-pointer';

  const checkScroll = () => {
    if (!showScrollTop && window.scrollY > topPosToStartShowing) {
      setShowScrollTop(true);
    } else if (showScrollTop && window.scrollY <= topPosToStartShowing) {
      setShowScrollTop(false);
    }

    if (!showScrollBottom && window.scrollY <= topPosToStartShowing) {
      setShowScrollBottom(true);
    } else if (showScrollBottom && window.scrollY > topPosToStartShowing) {
      setShowScrollBottom(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollBottom = () => {
    window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  });

  return (
    <div>
      {showScrollTop && (
        <button
          className={`bottom-10 ${style}`}
          onClick={scrollTop}
        >
          <ArrowCircleUpSVG />
        </button>
      )}

      {showScrollBottom && (
        <button
          className={`top-20 ${style}`}
          onClick={scrollBottom}
        >
          <ArrowCircleDownSVG />
        </button>
      )}
    </div>
  );
};
