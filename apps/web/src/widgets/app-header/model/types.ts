import type { ReactNode } from 'react';

export type HeaderVariant = 'main' | 'sub';

type CommonHeaderAction =
  | { type: 'none' }
  // 기본 아이콘들
  | { type: 'back'; onClick?: () => void }
  | { type: 'close'; onClick?: () => void }
  | { type: 'settings'; onClick?: () => void }
  | { type: 'notification'; onClick?: () => void }
  // 커스텀 슬롯
  | { type: 'custom'; ariaLabel: string; node: ReactNode; onClick?: () => void };

// 메인
type MainHeaderAction = { type: 'brand'; label: string; onClick?: () => void };

export type HeaderConfig =
  | {
      variant: 'main';
      leftAction?: MainHeaderAction; // brand(HOTSPOT)
      rightAction?: CommonHeaderAction; // default: notification
    }
  | {
      variant: 'sub';
      title: string;
      leftAction: CommonHeaderAction;
      rightAction?: CommonHeaderAction;
    };
