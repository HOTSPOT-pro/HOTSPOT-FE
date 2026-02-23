'use client';

import { useRef } from 'react';
import { BottomNavigation } from '@/shared/ui/index';
import { useBottomNavItems } from '@/widgets/app-bottom-nav/model/useBottomNavItems';
import { useBottomNavLayoutSync } from '@/widgets/app-bottom-nav/model/useBottomNavLayoutSync';
import { useBottomNavVisibility } from '@/widgets/app-bottom-nav/model/useBottomNavVisibility';

interface BottomNavControllerProps {
  nearBottomOffset?: number;
  durationMs?: number;
  /** iOS 오버스크롤/미세 튐 무시용 임계값(px) */
  scrollDeltaThreshold?: number;
  /** top 판정 여유(px) */
  topEpsilon?: number;
}

export function BottomNavController({
  nearBottomOffset = 160,
  durationMs = 200,
  scrollDeltaThreshold = 4,
  topEpsilon = 2,
}: BottomNavControllerProps) {
  const barRef = useRef<HTMLDivElement | null>(null);
  useBottomNavLayoutSync({ barRef });
  const items = useBottomNavItems();
  const hidden = useBottomNavVisibility({
    nearBottomOffset,
    scrollDeltaThreshold,
    topEpsilon,
  });

  return <BottomNavigation durationMs={durationMs} hidden={hidden} items={items} ref={barRef} />;
}
