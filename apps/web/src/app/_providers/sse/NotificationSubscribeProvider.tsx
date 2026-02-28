/** biome-ignore-all lint/correctness/noProcessGlobal: <explanation> */
'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { Notification } from '@/entities/notification';

export const NotificationSubscribeProvider = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/sse/subscribe`,
      { withCredentials: true },
    );

    eventSource.onmessage = (event) => {
      const sseData = JSON.parse(event.data);
      const newNotification: Notification = {
        createdAt: sseData.createdTime,
        eventId: sseData.eventId,
        id: sseData.id,
        isRead: sseData.isRead,
        message: sseData.content,
        title: sseData.title,
        type: sseData.notificationType,
      };

      queryClient.setQueryData<Notification[]>(['notifications'], (old) => {
        if (!old) return [newNotification];
        if (old.some((n) => n.id === newNotification.id)) return old;
        return [newNotification, ...old];
      });
      queryClient.setQueryData(['unreadCount'], sseData.unreadCount);
    };

    eventSource.onerror = (error) => {
      console.error('SSE Connection Error:', error);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [queryClient]);

  return null;
};
