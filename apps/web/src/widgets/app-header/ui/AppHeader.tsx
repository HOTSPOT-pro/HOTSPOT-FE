'use client';

import { useRouter } from 'next/navigation';
import { type ReactNode, useState } from 'react';
import { SettingDropDown } from '@/features/header-setting';
import { useNotification } from '@/features/notification';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import SettingIcon from '@/shared/assets/icons/setting.svg';
import { ROUTES } from '@/shared/constants/routes';
import { Header } from '@/shared/ui/header/Header';
import type { HeaderConfig } from '../model/types';

interface IconButtonProps {
  ariaLabel: string;
  children: ReactNode;
  onClick?: () => void;
}

const IconButton = ({ ariaLabel, children, onClick }: IconButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className="flex h-10 w-10 items-center justify-center rounded-md"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

type HeaderRenderableAction = Exclude<HeaderAction, { type: 'none' }>;

type HeaderAction =
  | NonNullable<HeaderConfig['leftAction']>
  | NonNullable<HeaderConfig['rightAction']>;

const isRenderableAction = (action?: HeaderAction): action is HeaderRenderableAction => {
  return Boolean(action && action.type !== 'none');
};

export function AppHeader({ config }: { config: HeaderConfig }) {
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { unReadCount } = useNotification();

  const handleBackDefault = () => router.back();
  const handleNotificationDefault = () => router.push(ROUTES.NOTIFICATION);
  const handleSettingsDefault = () => setIsSettingsOpen(true); // 임시, 현재는 알림에서만 사용

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
          <div>
            <IconButton ariaLabel="설정" onClick={action.onClick ?? handleSettingsDefault}>
              <SettingIcon className="h-6 w-6" />
            </IconButton>
            {isSettingsOpen && (
              <SettingDropDown handleDropDown={() => setIsSettingsOpen(!isSettingsOpen)} />
            )}
          </div>
        );

      case 'notification':
        return (
          <IconButton ariaLabel="알림" onClick={action.onClick ?? handleNotificationDefault}>
            <div className="relative w-7 h-7 flex items-center justify-center">
              <NotificationIcon className="h-6 w-6" />
              <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 text-[10px] border border-white text-white px-1 bg-purple-600 rounded-full">
                {unReadCount.data}
              </div>
            </div>
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
