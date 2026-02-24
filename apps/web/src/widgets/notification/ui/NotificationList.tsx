import { NotificationItem } from '@entities/notification';
import { NotificationPullToRefresh, useNotification } from '@features/notification';

export const NotificationList = () => {
  const { notifications, readAll, readOne } = useNotification(); // 커스텀 훅 가정

  return (
    <NotificationPullToRefresh onRefresh={readAll}>
      <div className="flex flex-col h-screen">
        {notifications.map((item) => (
          <NotificationItem key={item.id} notification={item} onClick={() => readOne(item.id)} />
        ))}
      </div>
    </NotificationPullToRefresh>
  );
};
