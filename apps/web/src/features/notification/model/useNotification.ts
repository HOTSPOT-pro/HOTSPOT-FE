import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Notification } from '@/entities/notification';
import { getNotificationClientApi } from '@/entities/notification/api/getNotificationClientApi';
import { getUnreadCountClientApi } from '@/entities/notification/api/getUnreadCountClientApi';
import type { GetNotificationResponse } from '@/entities/notification/api/types';
import {
  readAllNotificationClientApi,
  readNotificationClientApi,
} from '../api/readNotificationClientApi';

const STALE_TIME = 600000; //10분

export const useNotification = () => {
  const queryClient = useQueryClient();

  const notifications = useQuery({
    queryFn: getNotificationClientApi,
    queryKey: ['notifications'],
    select: (data: GetNotificationResponse) => {
      return data.notifications.map(
        (item): Notification => ({
          createdAt: item.createdTime,
          eventId: item.eventId,
          id: item.id,
          isRead: item.isRead,
          message: item.content,
          title: item.title,
          type: item.notificationType,
        }),
      );
    },
    staleTime: STALE_TIME,
  });

  const unReadCount = useQuery({
    queryFn: getUnreadCountClientApi,
    queryKey: ['unreadCount'],
    select: (data) => data.unreadCount ?? 0,
    staleTime: STALE_TIME,
  });

  const readMutation = useMutation({
    mutationFn: (id: number) => readNotificationClientApi(id),
    onError: (err, _id, context) => {
      console.error(err);
      if (context) {
        queryClient.setQueryData(['notifications'], context.prevList);
        queryClient.setQueryData(['unreadCount'], context.prevCount);
      }
    },
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      await queryClient.cancelQueries({ queryKey: ['unreadCount'] });

      const prevList = queryClient.getQueryData<GetNotificationResponse>(['notifications']);
      const prevCount = queryClient.getQueryData<number>(['unreadCount']);

      queryClient.setQueryData<GetNotificationResponse>(['notifications'], (old) => {
        if (!old) return old;
        return {
          ...old,
          notifications: old.notifications.map((item) =>
            item.id === id ? { ...item, isRead: true } : item,
          ),
        };
      });

      queryClient.setQueryData<number>(['unreadCount'], (old = 0) => Math.max(0, old - 1));

      return { prevCount, prevList };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
    },
  });

  const readAllMutation = useMutation({
    mutationFn: readAllNotificationClientApi,
    onError: (_err, _variables, context) => {
      if (context) {
        queryClient.setQueryData(['notifications'], context.prevList);
        queryClient.setQueryData(['unreadCount'], context.prevCount);
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      await queryClient.cancelQueries({ queryKey: ['unreadCount'] });

      const prevList = queryClient.getQueryData<GetNotificationResponse>(['notifications']);
      const prevCount = queryClient.getQueryData<number>(['unreadCount']);

      queryClient.setQueryData<GetNotificationResponse>(['notifications'], (old) => {
        if (!old) return old;
        return {
          ...old,
          notifications: old.notifications.map((n) => ({ ...n, isRead: true })),
        };
      });

      queryClient.setQueryData<number>(['unreadCount'], 0);

      return { prevCount, prevList };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
    },
  });

  return {
    notifications,
    readAll: () => readAllMutation.mutate(),
    readOne: (id: number) => readMutation.mutate(id),
    unReadCount,
  };
};
