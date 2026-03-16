import { useModal } from '@hotspot/ui';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/shared/api/types';
import { ERROR_DEFAULT_MESSAGE, ERROR_TITLE } from '@/shared/constants/errorCode';
import { postSubscribe } from '../api/postSubscribe';

export const useUpdateReceiveDay = () => {
  const { open } = useModal();
  const updateReceiveDay = useMutation<string, AxiosError<ApiErrorResponse>, string>({
    mutationFn: (receiveDay: string) => postSubscribe({ receiveDay }),
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
  });

  return {
    updateReceiveDay,
  };
};
