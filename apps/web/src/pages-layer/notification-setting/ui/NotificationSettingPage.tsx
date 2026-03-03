'use client';

import { NotificationSettingItem, useNotificationSettings } from '@features/notification-setting';
import { useSubHeaderStore } from '@widgets/app-header/ui/SubHeaderProvider';
import { useEffect } from 'react';

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
    <div className="pt-4 px-4">
      {settings?.map(({ id, icon, label, isAllowed, description }) => (
        <NotificationSettingItem
          checked={isAllowed}
          description={description}
          Icon={icon}
          id={id}
          key={id}
          label={label}
          onToggle={(checked) => updateSetting({ category: id, isAllowed: checked })}
        />
      ))}
    </div>
  );
};
