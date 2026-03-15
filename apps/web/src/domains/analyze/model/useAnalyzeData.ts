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
    if (!isError) return '';
    const serverMessage = (error as AxiosError<ApiErrorResponse>)?.response?.data?.message;
    if (serverMessage) return serverMessage;
  };

  return {
    analyzeData: data,
    errorMessage: getErrorMessage(),
    isError,
    isLoading,
  };
};
