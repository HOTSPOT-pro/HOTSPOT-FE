import {
  type InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { Notification } from '@/domains/notification';
import { getNotificationClientApi } from '@/domains/notification/api/getNotificationClientApi';
import { getUnreadCountClientApi } from '@/domains/notification/api/getUnreadCountClientApi';
import type { GetNotificationResponse } from '@/domains/notification/api/types';
import {
  readAllNotificationClientApi,
  readNotificationClientApi,
} from '../api/readNotificationClientApi';

const STALE_TIME = 600000; // 10분

export const useNotification = () => {
  const queryClient = useQueryClient();

  const notifications = useInfiniteQuery({
    getNextPageParam: (lastPage: GetNotificationResponse) => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getNotificationClientApi({
        page: pageParam as number,
        size: 10,
      }),
    queryKey: ['notifications'],
    select: (data) => ({
      pageParams: data.pageParams,
      pages: data.pages.map((page) => ({
        ...page,
        notifications: page.notifications.map(
          (item): Notification => ({
            createdAt: item.createdTime,
            eventId: item.eventId,
            id: item.id,
            isRead: item.isRead,
            message: item.content,
            title: item.title,
            type: item.notificationType,
          }),
        ),
      })),
    }),
    staleTime: STALE_TIME,
  });

  const unReadCount = useQuery({
    queryFn: getUnreadCountClientApi,
    queryKey: ['unreadCount'],
    select: (data) => data?.unreadCount ?? 0,
    staleTime: STALE_TIME,
  });

  // 2. 단일 읽기 낙관적 업데이트 (InfiniteData 구조 대응)
  const readMutation = useMutation({
    mutationFn: (id: number) => readNotificationClientApi(id),
    onError: (err, _id, context) => {
      if (context) {
        queryClient.setQueryData(['notifications'], context.prevList);
        queryClient.setQueryData(['unreadCount'], context.prevCount);
      }
    },
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      await queryClient.cancelQueries({ queryKey: ['unreadCount'] });

      const prevList = queryClient.getQueryData<InfiniteData<GetNotificationResponse>>([
        'notifications',
      ]);
      const prevCount = queryClient.getQueryData<number>(['unreadCount']);

      // InfiniteData 구조에 맞춰 모든 페이지를 순회하며 해당 ID를 찾음
      queryClient.setQueryData<InfiniteData<GetNotificationResponse>>(['notifications'], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            notifications: page.notifications.map((item) =>
              item.id === id ? { ...item, isRead: true } : item,
            ),
          })),
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

  // 3. 전체 읽기 낙관적 업데이트
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

      const prevList = queryClient.getQueryData<InfiniteData<GetNotificationResponse>>([
        'notifications',
      ]);
      const prevCount = queryClient.getQueryData<number>(['unreadCount']);

      queryClient.setQueryData<InfiniteData<GetNotificationResponse>>(['notifications'], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            notifications: page.notifications.map((n) => ({ ...n, isRead: true })),
          })),
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
    // 추가로 필요한 무한 스크롤 제어 함수들
    fetchNextPage: notifications.fetchNextPage,
    hasNextPage: notifications.hasNextPage,
    isFetchingNextPage: notifications.isFetchingNextPage,
    notifications,
    readAll: () => readAllMutation.mutate(),
    readOne: (id: number) => readMutation.mutate(id),
    unReadCount,
  };
};
