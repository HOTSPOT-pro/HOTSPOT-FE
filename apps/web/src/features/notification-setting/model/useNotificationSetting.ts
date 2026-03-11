import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotificationAllow } from '../api/getNotificationAllow';
import { patchNotificationAllow } from '../api/patchNotificationAllow';
import type { NotificationAllowResponse } from '../api/type';
import { NOTIFICATION_SETTINGS } from '../constants/notificationSettingList';

interface MutationContext {
  previousData?: NotificationAllowResponse;
}

export const useNotificationSettings = () => {
  const queryClient = useQueryClient();

  const notiSettingList = useQuery({
    queryFn: getNotificationAllow,
    queryKey: ['notificationsSettings'],
    select: (data: NotificationAllowResponse) => {
      const serverData = data.notificationAllows;
      return NOTIFICATION_SETTINGS.map((setting) => {
        const serverStatus = serverData.find((item) => item.notificationCategory === setting.id);
        return {
          ...setting,
          isAllowed: serverStatus?.notificationAllow ?? false,
        };
      });
    },
  });

  const updateSetting = useMutation<
    any,
    Error,
    { category: string; isAllowed: boolean },
    MutationContext
  >({
    mutationFn: ({ category, isAllowed }) => patchNotificationAllow(category, isAllowed),

    onError: (err, newSetting, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['notificationsSettings'], context.previousData);
      }
    },

    onMutate: async (newSetting): Promise<MutationContext> => {
      await queryClient.cancelQueries({ queryKey: ['notificationsSettings'] });

      const previousData = queryClient.getQueryData<NotificationAllowResponse>([
        'notificationsSettings',
      ]);

      queryClient.setQueryData<NotificationAllowResponse>(['notificationsSettings'], (old) => {
        if (!old) return old;
        return {
          ...old,
          notificationAllows: old.notificationAllows.map((item) =>
            item.notificationCategory === newSetting.category
              ? { ...item, notificationAllow: newSetting.isAllowed }
              : item,
          ),
        };
      });

      return { previousData };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationsSettings'] });
    },
  });

  return {
    isUpdating: updateSetting.isPending,
    settings: notiSettingList.data,
    updateSetting: updateSetting.mutate,
  };
};
