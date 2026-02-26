'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import type { HeaderConfig } from '@/widgets/app-header/model/types';
import { useSubHeaderStore } from '@/widgets/app-header/ui/SubHeaderProvider';
import { NotificationList } from '@/widgets/notification';

export const NotificationPage = () => {
  const { setHeader } = useSubHeaderStore();
  const router = useRouter();
  const handleRouting = useCallback(() => {
    router.push('/notification/settings');
  }, [router]);
  useEffect(() => {
    const HEADER_CONFIG: HeaderConfig = {
      leftAction: { type: 'back' },
      rightAction: { onClick: handleRouting, type: 'settings' },
      title: '알림',
      variant: 'sub',
    };

    setHeader(HEADER_CONFIG);
  }, [setHeader, handleRouting]);

  return <NotificationList />;
};
