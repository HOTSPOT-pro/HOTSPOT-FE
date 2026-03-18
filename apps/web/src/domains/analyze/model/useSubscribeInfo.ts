import { useSuspenseQuery } from '@tanstack/react-query';
import { SUBSCRIBE_KEYS } from '@/shared/constants/queryKey';
import { STALE_TIME } from '@/shared/constants/time';
import { getSubscribeInfo } from '../api/getSubscribeInfo';

export const useSubscribeInfo = () => {
  const { data } = useSuspenseQuery({
    queryFn: getSubscribeInfo,
    queryKey: SUBSCRIBE_KEYS.info,
    staleTime: STALE_TIME.INSTANT,
  });

  return {
    subscribeData: data,
  };
};
