import { NotificationItem } from '@entities/notification';
import { useNotification } from '@features/notification';

export const NotificationList = () => {
  const { notifications, readOne } = useNotification();
  if (notifications.isLoading) return <div>알림을 불러오는 중입니다...</div>;
  const notificationList = notifications.data || [];

  return (
    <div className="flex flex-col h-full mb-23">
      {notificationList.length > 0 ? (
        notificationList.map((item) => {
          return (
            <NotificationItem
              key={item.id}
              notification={item}
              onClick={() => {
                if (!item.isRead) readOne(item.id);
              }}
            />
          );
        })
      ) : (
        <div className="text-center py-20 text-gray-400">새로운 알림이 없습니다.</div>
      )}

      <p className="text-gray-500 text-center pt-8 text-[13px] font-normal">
        알림은 1달 동안 보관됩니다.
      </p>
    </div>
  );
};
