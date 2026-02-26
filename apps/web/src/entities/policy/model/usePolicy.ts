import { useQuery } from '@tanstack/react-query';
import { getPolicyClientApi } from '../api/getPolicyClientApi';
import type { Policy } from './types';

export const usePolicy = () => {
  const { data, isPending } = useQuery<Policy[]>({
    queryFn: () => getPolicyClientApi(),
    queryKey: ['policy'],
  });
  const policyList = data ?? [];
  return {
    loading: isPending,
    policyList,
  };
};
