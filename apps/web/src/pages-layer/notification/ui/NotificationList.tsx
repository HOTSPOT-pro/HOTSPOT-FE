import { NotificationItem } from '@domains/notification';
import { useNotification } from '@features/notification';
import { Loading } from '@hotspot/ui';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const NotificationList = () => {
  const { notifications, readOne, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotification();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (notifications.isLoading)
    return (
      <div className="w-full mx-auto text-purple-600">
        <Loading />
      </div>
    );

  const list = notifications.data?.pages.flatMap((page) => page.notifications) || [];

  return (
    <div className="flex flex-col h-full mb-23">
      {list.length > 0 ? (
        <>
          {list.map((item) => (
            <NotificationItem
              key={item.id}
              notification={item}
              onClick={() => {
                if (!item.isRead) readOne(item.id);
              }}
            />
          ))}

          {/* 3. 무한 스크롤 감지 지점 */}
          <div className="h-10 flex items-center justify-center" ref={ref}>
            {isFetchingNextPage && (
              <div className="mx-auto text-purple-600">
                <Loading />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-20 text-gray-400">새로운 알림이 없습니다.</div>
      )}

      <p className="text-gray-500 text-center pt-8 text-[13px] font-normal">
        알림은 1달 동안 보관됩니다.
      </p>
    </div>
  );
};
