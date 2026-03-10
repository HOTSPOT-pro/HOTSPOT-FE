import { useQuery } from '@tanstack/react-query';
import { getBlockClientApi } from '../api/getBlockClientApi';
import type { BlockPolicy } from './types';

export const useBlock = () => {
  const { data, isPending } = useQuery<BlockPolicy[]>({
    queryFn: () => getBlockClientApi(),
    queryKey: ['block'],
  });
  const blockList = data;
  return {
    blockList,
    loading: isPending,
  };
};
