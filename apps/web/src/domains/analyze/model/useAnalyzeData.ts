import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/shared/api/types';
import { getAnalyzeData } from '../api/getAnalyzeData';

interface UseAnalyzeDataProps {
  subId: number;
  reportId: number;
}

export const useAnalyzeData = ({ subId, reportId }: UseAnalyzeDataProps) => {
  const { data, isLoading, isError, error } = useQuery({
    enabled: Boolean(subId) && Boolean(reportId),
    queryFn: () => getAnalyzeData({ reportId, subId }),
    queryKey: ['analyzeData', subId, reportId],
    staleTime: 1000 * 60 * 30,
  });

  const getErrorMessage = () => {
    const serverMessage = (error as AxiosError<ApiErrorResponse>)?.response?.data?.message;
    if (serverMessage) return serverMessage;
    return '오류가 발생했습니다. 나중에 다시 시도해주세요.';
  };

  return {
    analyzeData: data,
    errorMessage: getErrorMessage(),
    isError,
    isLoading,
  };
};
