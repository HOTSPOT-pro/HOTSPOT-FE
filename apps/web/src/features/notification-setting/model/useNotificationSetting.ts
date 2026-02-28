import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotificationAllow } from '../api/getNotificationAllow';
import { patchNotificationAllow } from '../api/patchNotificationAllow';
import type { NotificationAllowResponse } from '../api/type';
import { NOTIFICATION_SETTINGS } from '../constants/notificationSettingList';

export type NotificationSettings = Record<string, boolean>;

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

  const updateSetting = useMutation({
    mutationFn: ({ category, isAllowed }: { category: string; isAllowed: boolean }) =>
      patchNotificationAllow(category, isAllowed),

    onError: (error) => {
      console.error('업데이트 실패:', error);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationsSettings'] });
    },
  });

  return {
    settings: notiSettingList.data,
    updateSetting: updateSetting.mutate,
  };
};
