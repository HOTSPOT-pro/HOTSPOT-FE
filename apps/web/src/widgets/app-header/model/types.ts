import type { ReactNode } from 'react';

export type HeaderVariant = 'main' | 'sub';

export type HeaderAction =
  | { type: 'none' }
  // main 전용 (로고 버전)
  | { type: 'brand'; label: string; onClick?: () => void }
  // 기본 아이콘들
  | { type: 'back'; onClick?: () => void }
  | { type: 'close'; onClick?: () => void }
  | { type: 'settings'; onClick?: () => void }
  | { type: 'notification'; onClick?: () => void }
  // 커스텀 슬롯
  | { type: 'custom'; ariaLabel: string; node: ReactNode; onClick?: () => void };

export type HeaderConfig =
  | {
      variant: 'main';
      leftAction?: HeaderAction; // default: brand(HOTSPOT)
      rightAction?: HeaderAction; // default: notification
    }
  | {
      variant: 'sub';
      title: string;
      leftAction: HeaderAction;
      rightAction?: HeaderAction;
    };
