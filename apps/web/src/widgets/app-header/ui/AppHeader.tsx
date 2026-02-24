'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import SettingIcon from '@/shared/assets/icons/setting.svg';
import { ROUTES } from '@/shared/constants/routes';
import { Header } from '@/shared/ui/header/Header';
import type { HeaderAction, HeaderConfig } from '../model/types';

interface IconButtonProps {
  ariaLabel: string;
  children: ReactNode;
  onClick?: () => void;
}

const IconButton = ({ ariaLabel, children, onClick }: IconButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className="flex h-6 w-6 items-center justify-center rounded-md"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

type HeaderRenderableAction = Exclude<HeaderAction, { type: 'none' }>;

const isRenderableAction = (action?: HeaderAction): action is HeaderRenderableAction => {
  return Boolean(action && action.type !== 'none');
};

export function AppHeader({ config }: { config: HeaderConfig }) {
  const router = useRouter();

  const handleBackDefault = () => router.back();
  const handleNotificationDefault = () => router.push(ROUTES.NOTIFICATION);
  const handleSettingsDefault = () => router.push(ROUTES.SETTINGS); // 임시, 현재는 알림에서만 사용

  const renderLeft = (action?: HeaderAction) => {
    if (!isRenderableAction(action)) return null;

    switch (action.type) {
      case 'brand':
        return (
          <button
            aria-label="로고"
            className="px-2 text-sm font-semibold"
            onClick={action.onClick}
            type="button"
          >
            {action.label}
          </button>
        );

      case 'back':
        return (
          <IconButton ariaLabel="뒤로가기" onClick={action.onClick ?? handleBackDefault}>
            <ArrowLeftIcon className="h-6 w-6" />
          </IconButton>
        );

      case 'close':
        return (
          <IconButton ariaLabel="닫기" onClick={action.onClick ?? handleBackDefault}>
            <CloseIcon className="h-6 w-6" />
          </IconButton>
        );

      case 'custom':
        return (
          <IconButton ariaLabel={action.ariaLabel} onClick={action.onClick}>
            {action.node}
          </IconButton>
        );

      default:
        return null;
    }
  };

  const renderRight = (action?: HeaderAction) => {
    if (!isRenderableAction(action)) return null;

    switch (action.type) {
      case 'settings':
        return (
          <IconButton ariaLabel="설정" onClick={action.onClick ?? handleSettingsDefault}>
            <SettingIcon className="h-6 w-6" />
          </IconButton>
        );

      case 'notification':
        return (
          <IconButton ariaLabel="알림" onClick={action.onClick ?? handleNotificationDefault}>
            <NotificationIcon className="h-6 w-6" />
          </IconButton>
        );

      case 'custom':
        return (
          <button aria-label={action.ariaLabel} onClick={action.onClick} type="button">
            {action.node}
          </button>
        );

      default:
        return null;
    }
  };

  // defaults
  if (config.variant === 'main') {
    const leftAction: HeaderAction = config.leftAction ?? {
      label: 'HOTSPOT',
      type: 'brand',
    };
    const rightAction: HeaderAction = config.rightAction ?? {
      type: 'notification',
    };

    return (
      <Header
        leftSlot={renderLeft(leftAction)}
        rightSlot={renderRight(rightAction)}
        variant="logo"
      />
    );
  }

  // sub
  return (
    <Header
      leftSlot={renderLeft(config.leftAction)}
      rightSlot={renderRight(config.rightAction)}
      title={config.title}
      variant="title"
    />
  );
}
