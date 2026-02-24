import { MOCK_NOTIFICATIONS, type Notification } from '@entities/notification';
import { useCallback, useState } from 'react';

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const readOne = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
    );
  }, []);

  const readAll = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300)); //애니메이션용 딜레이
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  }, []);

  return {
    notifications,
    readAll,
    readOne,
  };
};
