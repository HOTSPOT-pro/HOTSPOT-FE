'use client';

import { type RefObject, useEffect } from 'react';

interface UseBottomNavLayoutSyncOptions {
  barRef: RefObject<HTMLDivElement | null>;
}

export function useBottomNavLayoutSync({ barRef }: UseBottomNavLayoutSyncOptions) {
  useEffect(() => {
    const applyFooterPadding = (barHeight: number) => {
      const footerWrap = document.querySelector<HTMLElement>('#footer .footer-wrap');
      if (!footerWrap) return;
      footerWrap.style.paddingBottom = `${barHeight}px`;
    };

    const applySubMinHeight = (barHeight: number) => {
      const sub = document.querySelector<HTMLElement>('.sub-conts-wrap');
      if (!sub) return;

      const footerWrap = document.querySelector<HTMLElement>('.footer-wrap');
      const footerHeight = footerWrap?.offsetHeight ?? 0;
      const footBottomHeight = footerHeight + barHeight;

      if (window.innerWidth <= 1024) {
        sub.style.minHeight = '100vh';
        sub.style.minHeight = '100dvh';
      } else {
        sub.style.minHeight = `calc(100vh - ${footBottomHeight}px)`;
        sub.style.minHeight = `calc(100dvh - ${footBottomHeight}px)`;
      }
    };

    const measureAndApplyLayout = () => {
      const barHeight = barRef.current?.offsetHeight ?? 0;
      applyFooterPadding(barHeight);
      applySubMinHeight(barHeight);
    };

    measureAndApplyLayout();

    const ro = new ResizeObserver(measureAndApplyLayout);
    if (barRef.current) ro.observe(barRef.current);

    window.addEventListener('resize', measureAndApplyLayout);

    return () => {
      window.removeEventListener('resize', measureAndApplyLayout);
      ro.disconnect();
    };
  }, [barRef]);
}
