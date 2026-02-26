// pages/notification-setting/ui/Page.tsx
'use client';

import { NotificationSettingItem, useNotificationSettings } from '@features/notification-setting';
import { useSubHeaderStore } from '@widgets/app-header/ui/SubHeaderProvider';
import { useEffect } from 'react';
import { NOTIFICATION_SETTINGS } from '../constants/notificationSettingList';

export const NotificationSettingPage = () => {
  const { setHeader } = useSubHeaderStore();
  const { settings, updateSetting } = useNotificationSettings();

  useEffect(() => {
    setHeader({
      leftAction: { type: 'back' },
      rightAction: { type: 'none' },
      title: '알림',
      variant: 'sub',
    });
  }, [setHeader]);

  return (
    <div className="pt-4 px-4 divide-y divide-gray-100">
      {NOTIFICATION_SETTINGS.map((item) => (
        <NotificationSettingItem
          checked={settings[item.id] ?? false}
          Icon={item.Icon}
          id={item.id}
          key={item.id}
          label={item.label}
          onToggle={updateSetting}
        />
      ))}
    </div>
  );
};
