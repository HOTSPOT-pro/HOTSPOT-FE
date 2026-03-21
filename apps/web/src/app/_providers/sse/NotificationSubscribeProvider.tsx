/** biome-ignore-all lint/correctness/noProcessGlobal: <explanation> */
'use client';
import type { InfiniteData } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { GetNotificationResponse } from '@/domains/notification/api/types';
import { usePopUp } from '@/widgets/app-popup/model/PopUpContext';

export const NotificationSubscribeProvider = () => {
  const queryClient = useQueryClient();
  const { open } = usePopUp();

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/sse/subscribe`,
      { withCredentials: true },
    );

    const handleMessage = (event: MessageEvent) => {
      try {
        const sseData = JSON.parse(event.data);

        const newRawNotification = {
          content: sseData.content,
          createdTime: sseData.createdTime,
          eventId: sseData.eventId,
          id: sseData.notificationId,
          isRead: sseData.isRead,
          notificationType: sseData.notificationType,
          title: sseData.title,
        };

        const cachedNotifications = queryClient.getQueryData<InfiniteData<GetNotificationResponse>>(
          ['notifications'],
        );
        const isDuplicated = cachedNotifications?.pages.some((page) =>
          page.notifications.some((notification) => notification.id === newRawNotification.id),
        );

        if (!isDuplicated) {
          queryClient.setQueryData<InfiniteData<GetNotificationResponse>>(
            ['notifications'],
            (old) => {
              if (!old || old.pages.length === 0) {
                return old;
              }

              return {
                ...old,
                pages: old.pages.map((page, index) =>
                  index === 0
                    ? {
                        ...page,
                        notifications: [newRawNotification, ...page.notifications],
                      }
                    : page,
                ),
              };
            },
          );

          if (newRawNotification.notificationType === 'PRESENT_DATA') {
            open('presentDataPopUp', {
              options: {
                closeOnEsc: false,
                closeOnOutsideClick: false,
              },
              props: {
                content: newRawNotification.content,
                title: newRawNotification.title,
              },
            });
          }
        }

        queryClient.setQueryData(['unreadCount'], { unreadCount: sseData.unreadCount });
      } catch (error) {
        console.error('SSE onmessage error:', error);
      }
    };

    eventSource.addEventListener('notification', handleMessage);

    const handleError = (error: Event) => {
      console.error('SSE Connection Error:', error);
    };
    eventSource.addEventListener('error', handleError);

    return () => {
      eventSource.removeEventListener('notification', handleMessage);
      eventSource.removeEventListener('error', handleError);
      eventSource.close();
    };
  }, [open, queryClient]);

  return null;
};
