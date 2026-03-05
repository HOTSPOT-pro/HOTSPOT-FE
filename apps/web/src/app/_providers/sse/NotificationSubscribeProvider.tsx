/** biome-ignore-all lint/correctness/noProcessGlobal: <explanation> */
'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { GetNotificationResponse } from '@/entities/notification/api/types';

export const NotificationSubscribeProvider = () => {
  const queryClient = useQueryClient();

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

        queryClient.setQueryData<GetNotificationResponse>(['notifications'], (old) => {
          if (!old || old.notifications.some((n) => n.id === newRawNotification.id)) {
            return old;
          }
          return {
            ...old,
            notifications: [newRawNotification, ...old.notifications],
          };
        });
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
  }, [queryClient]);

  return null;
};
