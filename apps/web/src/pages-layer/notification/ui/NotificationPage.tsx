'use client';
import { useEffect } from 'react';
import type { HeaderConfig } from '@/widgets/app-header/model/types';
import { useSubHeaderStore } from '@/widgets/app-header/ui/SubHeaderProvider';
import { NotificationList } from '@/widgets/notification';

export const NotificationPage = () => {
  const { setHeader } = useSubHeaderStore();
  useEffect(() => {
    const HEADER_CONFIG: HeaderConfig = {
      leftAction: { type: 'back' },
      rightAction: { type: 'settings' },
      title: '알림',
      variant: 'sub',
    };

    setHeader(HEADER_CONFIG);
  }, [setHeader]);

  return <NotificationList />;
};
