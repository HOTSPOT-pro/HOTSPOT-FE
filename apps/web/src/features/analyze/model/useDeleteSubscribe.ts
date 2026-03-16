import { useModal } from '@hotspot/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/shared/api/types';
import { ERROR_DEFAULT_MESSAGE, ERROR_TITLE } from '@/shared/constants/errorCode';
import { SUBSCRIBE_KEYS } from '@/shared/constants/queryKey';
import { deleteSubscribe } from '../api/deleteSubscribe';

export const useDeleteSubscribe = () => {
  const { open } = useModal();
  const queryClient = useQueryClient();
  const cancelSubscribe = useMutation<string, AxiosError<ApiErrorResponse>>({
    mutationFn: deleteSubscribe,
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SUBSCRIBE_KEYS.info],
        refetchType: 'all',
      });
    },
  });

  return {
    cancelSubscribe,
  };
};
