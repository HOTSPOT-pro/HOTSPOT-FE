import { useQuery } from '@tanstack/react-query';
import { getSubscribeInfo } from '../api/getSubscribeInfo';

const STALE_TIME = 1000 * 60 * 5;

export const useSubscribeInfo = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getSubscribeInfo,
    queryKey: ['subscribeInfo'],
    staleTime: STALE_TIME,
  });

  const getErrorMessage = () => {
    if (!isError) return '';
    const serverMessage = (error as any)?.response?.data?.message;
    if (serverMessage) return serverMessage;
    return '구독 정보를 불러오는 중 에러가 발생했습니다.';
  };

  return {
    errorMessage: getErrorMessage(),
    isError,
    isLoading,
    subscribeData: data,
  };
};
