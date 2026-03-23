import { useQuery } from '@tanstack/react-query';
import { POLICY_KEYS } from '@/shared/constants/queryKey';
import { STALE_TIME } from '@/shared/constants/time';
import { getBlockClientApi } from '../api/getBlockClientApi';
import type { BlockPolicy } from './types';

export const useBlock = () => {
  const { data, isPending } = useQuery<BlockPolicy[]>({
    queryFn: () => getBlockClientApi(),
    queryKey: POLICY_KEYS.block,
    staleTime: STALE_TIME.STATIC,
  });
  const blockList = data;
  return {
    blockList,
    loading: isPending,
  };
};
