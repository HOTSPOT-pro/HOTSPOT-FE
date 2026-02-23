'use client';

import { useEffect, useRef, useState } from 'react';

interface UseBottomNavVisibilityOptions {
  nearBottomOffset: number;
  scrollDeltaThreshold: number;
  topEpsilon: number;
}

export function useBottomNavVisibility({
  nearBottomOffset,
  scrollDeltaThreshold,
  topEpsilon,
}: UseBottomNavVisibilityOptions) {
  const prevScrollY = useRef(0);
  const ticking = useRef(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const getScrollTop = () => {
      const se = document.scrollingElement;
      const raw = se?.scrollTop ?? window.scrollY ?? 0;
      return Math.max(0, raw);
    };

    const getDocHeight = () => {
      const se = document.scrollingElement;
      return se?.scrollHeight ?? document.documentElement.scrollHeight;
    };

    prevScrollY.current = getScrollTop();

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const current = getScrollTop();
        const prev = prevScrollY.current;
        const delta = current - prev;
        const absDelta = Math.abs(delta);

        const windowHeight = window.innerHeight;
        const docHeight = getDocHeight();

        const nearTop = current <= topEpsilon;
        const nearBottom = current + windowHeight >= docHeight - nearBottomOffset;

        const isMeaningful = absDelta >= scrollDeltaThreshold;
        const goingUp = isMeaningful ? delta < 0 : false;

        if (nearTop || nearBottom) {
          setHidden(false);
        } else if (isMeaningful) {
          setHidden(!goingUp);
        }

        prevScrollY.current = current;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [nearBottomOffset, scrollDeltaThreshold, topEpsilon]);

  return hidden;
}
