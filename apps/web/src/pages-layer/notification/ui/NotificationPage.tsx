'use client';
import { useEffect } from 'react';
import type { HeaderConfig } from '@/widgets/app-header/model/types';
import { useSubHeaderStore } from '@/widgets/app-header/ui/SubHeaderProvider';
import { NotificationList } from '@/widgets/notification';

const HEADER_CONFIG: HeaderConfig = {
  leftAction: { type: 'back' },
  rightAction: { type: 'settings' },
  title: '알림',
  variant: 'sub',
};

export const NotificationPage = () => {
  const { setHeader } = useSubHeaderStore();
  useEffect(() => {
    setHeader(HEADER_CONFIG);
  }, [setHeader]);

  return (
    <div>
      <NotificationList />
    </div>
  );
};
