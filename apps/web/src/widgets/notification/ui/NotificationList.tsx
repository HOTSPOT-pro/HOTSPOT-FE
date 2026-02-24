import { NotificationItem } from '@entities/notification';
import { NotificationPullToRefresh, useNotification } from '@features/notification';

export const NotificationList = () => {
  const { notifications, readAll, readOne } = useNotification(); // 커스텀 훅 가정

  return (
    <NotificationPullToRefresh onRefresh={readAll}>
      <div className="flex flex-col h-full mb-23">
        {notifications.map((item) => (
          <NotificationItem key={item.id} notification={item} onClick={() => readOne(item.id)} />
        ))}
        <p className="text-gray-500 text-center pt-8 text-[13px] font-normal">
          알림은 1달 동안 보관됩니다.
        </p>
      </div>
    </NotificationPullToRefresh>
  );
};
