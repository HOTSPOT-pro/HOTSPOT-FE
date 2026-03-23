import { useSuspenseQuery } from '@tanstack/react-query';
import { SUBSCRIBE_KEYS } from '@/shared/constants/queryKey';
import { GC_TIME, STALE_TIME } from '@/shared/constants/time';
import { getSubscribeInfo } from '../api/getSubscribeInfo';

export const useSubscribeInfo = () => {
  const { data } = useSuspenseQuery({
    gcTime: GC_TIME.STATIC,
    queryFn: getSubscribeInfo,
    queryKey: SUBSCRIBE_KEYS.info,
    staleTime: STALE_TIME.INSTANT,
  });

  return {
    subscribeData: data,
  };
};
