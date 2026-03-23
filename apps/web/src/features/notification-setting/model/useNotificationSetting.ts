import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NOTIFICATION_KEYS } from '@/shared/constants/queryKey';
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
    queryKey: NOTIFICATION_KEYS.setting,
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

    onError: (_err, _newSetting, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(NOTIFICATION_KEYS.setting, context.previousData);
      }
    },

    onMutate: async (newSetting): Promise<MutationContext> => {
      await queryClient.cancelQueries({ queryKey: NOTIFICATION_KEYS.setting });

      const previousData = queryClient.getQueryData<NotificationAllowResponse>([
        NOTIFICATION_KEYS.setting,
      ]);

      queryClient.setQueryData<NotificationAllowResponse>(NOTIFICATION_KEYS.setting, (old) => {
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
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.setting });
    },
  });

  return {
    isUpdating: updateSetting.isPending,
    settings: notiSettingList.data,
    updateSetting: updateSetting.mutate,
  };
};
