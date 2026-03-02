/** biome-ignore-all lint/correctness/noProcessGlobal: <explanation> */
'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const NotificationSubscribeProvider = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/sse/subscribe`,
      { withCredentials: true },
    );

    eventSource.onmessage = (event) => {
      try {
        const sseData = JSON.parse(event.data);

        const newRawNotification = {
          content: sseData.content,
          createdTime: sseData.createdTime,
          eventId: sseData.eventId,
          id: sseData.id,
          isRead: sseData.isRead,
          notificationType: sseData.notificationType,
          title: sseData.title,
        };

        queryClient.setQueryData<
          import('@/entities/notification/api/types').GetNotificationResponse
        >(['notifications'], (old) => {
          if (!old || old.notifications.some((n) => n.id === newRawNotification.id)) {
            return old;
          }
          return {
            ...old,
            notifications: [newRawNotification, ...old.notifications],
          };
        });
        queryClient.setQueryData(['unreadCount'], sseData.unreadCount);
      } catch (error) {
        console.error('SSE onmessage error:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE Connection Error:', error);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [queryClient]);

  return null;
};
