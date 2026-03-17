import { useModal } from '@hotspot/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { AnalyzeData, DayType } from '@/domains/analyze/model/types';
import type { ApiErrorResponse } from '@/shared/api/types';
import { ERROR_DEFAULT_MESSAGE, ERROR_TITLE } from '@/shared/constants/errorCode';
import { SUBSCRIBE_KEYS } from '@/shared/constants/queryKey';
import { postSubscribe } from '../api/postSubscribe';

export const useUpdateReceiveDay = () => {
  const { open } = useModal();
  const queryClient = useQueryClient();
  const updateReceiveDay = useMutation<string, AxiosError<ApiErrorResponse>, DayType>({
    mutationFn: (receiveDay: DayType) => postSubscribe({ receiveDay }),
    onError: (error) => {
      const errorData = error.response?.data;
      const errorMessage = errorData?.message || ERROR_DEFAULT_MESSAGE;
      const errorCode = String(errorData?.code);
      open('errorModal', {
        props: {
          content: errorMessage,
          title: ERROR_TITLE[errorCode] || ERROR_TITLE.ERROR_DEFAULT,
        },
      });
    },
    onMutate: async (newDay) => {
      await queryClient.cancelQueries({ queryKey: SUBSCRIBE_KEYS.member });

      const previousData = queryClient.getQueryData<AnalyzeData>(SUBSCRIBE_KEYS.member);

      queryClient.setQueryData<AnalyzeData>(SUBSCRIBE_KEYS.member, (oldData) => {
        if (!oldData) return { members: [], receiveDay: newDay };
        return { ...oldData, receiveDay: newDay };
      });

      return { previousData };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIBE_KEYS.member });
    },
  });

  return {
    updateReceiveDay,
  };
};
