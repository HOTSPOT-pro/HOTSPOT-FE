'use client';

import ArrowLeftIcon from '@hotspot/ui/assets/icons/arrow-left.svg';
import CloseIcon from '@hotspot/ui/assets/icons/close.svg';
import NotificationIcon from '@hotspot/ui/assets/icons/notification.svg';
import SettingIcon from '@hotspot/ui/assets/icons/setting.svg';
import TextLogoImage from '@hotspot/ui/assets/images/logo/text-logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ReactNode, useState } from 'react';
import { SettingDropDown, useNotification } from '@/features/notification';
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
      className="flex h-40 w-40 items-center justify-center rounded-md"
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
  const handleNotificationDefault = () => router.push(ROUTES.NOTIFICATION.ROOT);
  const handleSettingsDefault = () => setIsSettingsOpen(!isSettingsOpen); // 임시, 현재는 알림에서만 사용

  const renderLeft = (action?: HeaderAction) => {
    if (!isRenderableAction(action)) return null;

    switch (action.type) {
      case 'brand':
        return (
          <Link aria-label="로고" href={action.href} onClick={action.onClick}>
            <TextLogoImage />
          </Link>
        );

      case 'back':
        return (
          <IconButton ariaLabel="뒤로가기" onClick={action.onClick ?? handleBackDefault}>
            <ArrowLeftIcon className="h-24 w-24" />
          </IconButton>
        );

      case 'close':
        return (
          <IconButton ariaLabel="닫기" onClick={action.onClick ?? handleBackDefault}>
            <CloseIcon className="h-24 w-24" />
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
              <SettingIcon className="h-24 w-24" />
            </IconButton>
            {isSettingsOpen && (
              <SettingDropDown handleDropDown={() => setIsSettingsOpen(!isSettingsOpen)} />
            )}
          </div>
        );

      case 'notification':
        return (
          <IconButton ariaLabel="알림" onClick={action.onClick ?? handleNotificationDefault}>
            <div className="relative w-fit h-fit flex items-center justify-center">
              <NotificationIcon className="h-24 w-24" />
              {unReadCount.data !== 0 ? (
                <div className="absolute right-3 top-5 translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center ring-1 ring-white">
                  <span className="font-body-body4 text-white">{unReadCount.data}</span>
                </div>
              ) : null}
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
    const leftAction = config.leftAction ?? {
      href: ROUTES.MY_STATUS,
      type: 'brand' as const,
    };
    const rightAction = config.rightAction ?? { type: 'notification' as const };

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
