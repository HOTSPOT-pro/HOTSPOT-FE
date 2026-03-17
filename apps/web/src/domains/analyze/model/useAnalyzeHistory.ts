import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/shared/api/types';
import { SUBSCRIBE_KEYS } from '@/shared/constants/queryKey';
import { STALE_TIME } from '@/shared/constants/time';
import { getAnalyzeHistory } from '../api/getAnalyzeHistory';

interface UseAnalyzeDataProps {
  subId: number;
  yearMonth: string;
}

export const useAnalyzeHistory = ({ subId, yearMonth }: UseAnalyzeDataProps) => {
  const { data, isLoading, isError, error } = useQuery({
    enabled: Boolean(subId) && Boolean(yearMonth),
    queryFn: () => getAnalyzeHistory({ subId, yearMonth }),
    queryKey: SUBSCRIBE_KEYS.history(subId, yearMonth),
    staleTime: STALE_TIME.LONG,
  });

  const getErrorMessage = () => {
    const serverMessage = (error as AxiosError<ApiErrorResponse>)?.response?.data?.message;
    if (serverMessage) return serverMessage;
    return '오류가 발생했습니다. 나중에 다시 시도해주세요.';
  };

  return {
    errorMessage: getErrorMessage(),
    history: data,
    isError,
    isLoading,
  };
};
