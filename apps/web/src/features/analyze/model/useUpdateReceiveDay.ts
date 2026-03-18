import { useModal } from '@hotspot/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { AnalyzeMember, DayType } from '@/domains/analyze/model/types'; // AnalyzeData 대신 정확한 타입 사용 권장
import type { ApiErrorResponse } from '@/shared/api/types';
import { ERROR_DEFAULT_MESSAGE, ERROR_TITLE } from '@/shared/constants/errorCode';
import { SUBSCRIBE_KEYS } from '@/shared/constants/queryKey';
import { patchReceiveDay } from '../api/patchReceiveDay';

interface MutationContext {
  previousData?: AnalyzeMember;
}

export const useUpdateReceiveDay = () => {
  const { open } = useModal();
  const queryClient = useQueryClient();

  const updateReceiveDay = useMutation<
    string,
    AxiosError<ApiErrorResponse>,
    DayType,
    MutationContext
  >({
    mutationFn: (receiveDay: DayType) => patchReceiveDay({ receiveDay }),

    onError: (error, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(SUBSCRIBE_KEYS.member, context.previousData);
      }

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
      const previousData = queryClient.getQueryData<AnalyzeMember>(SUBSCRIBE_KEYS.member);

      queryClient.setQueryData<AnalyzeMember>(SUBSCRIBE_KEYS.member, (oldData) => {
        if (!oldData) return undefined;
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
