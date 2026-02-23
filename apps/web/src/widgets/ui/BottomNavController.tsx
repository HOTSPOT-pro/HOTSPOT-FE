'use client';

import { cn } from '@hotspot/ui';
import { useEffect, useRef, useState } from 'react';
import { BottomNavigation } from './BottomNavigation';

interface BottomNavControllerProps {
  /** jQuery에서 documentHeight - 160 기준값 */
  nearBottomOffset?: number;
  /** 모바일에서 숨길 때 이동 애니메이션 시간 */
  durationMs?: number;
}

export function BottomNavController({
  nearBottomOffset = 160,
  durationMs = 200,
}: BottomNavControllerProps) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const prevScrollY = useRef<number>(0);
  const ticking = useRef(false);

  const [hidden, setHidden] = useState(false);

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
        // jQuery: 100vh + 100dvh 둘 다 세팅
        sub.style.minHeight = '100vh';
        // 브라우저가 dvh 지원하면 이 값이 더 우선될 수 있음
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

    prevScrollY.current = window.scrollY;

    // 초기 1회 적용
    measureAndApplyLayout();

    // 바텀바 높이가 변할 수 있으니 ResizeObserver로 추적
    const ro = new ResizeObserver(() => {
      measureAndApplyLayout();
    });

    if (barRef.current) ro.observe(barRef.current);

    const onResize = () => {
      measureAndApplyLayout();
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const current = window.scrollY;
        const goingUp = current < prevScrollY.current;

        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        const nearBottom = current + windowHeight >= docHeight - nearBottomOffset;

        // jQuery 로직 동일:
        // - 위로 스크롤: 보이기
        // - 아래로 스크롤: (바닥 근처면 보이기) 아니면 숨기기
        setHidden(!(goingUp || nearBottom));

        prevScrollY.current = current;
        ticking.current = false;
      });
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, [nearBottomOffset]);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-sticky',
        'pb-[env(safe-area-inset-bottom)]',
        'transition-transform',
        hidden ? 'translate-y-full' : 'translate-y-0',
      )}
      ref={barRef}
      style={{ transitionDuration: `${durationMs}ms` }}
    >
      <BottomNavigation />
    </div>
  );
}
