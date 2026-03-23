import { useQuery } from '@tanstack/react-query';
import { POLICY_KEYS } from '@/shared/constants/queryKey';
import { STALE_TIME } from '@/shared/constants/time';
import { getFamilyPolicyClient } from '../api/getFamilyPolicyClient';
import type { GetFamilyCustomPolicy } from './types';

export const useFamilyCustomPolicy = () => {
  return useQuery<GetFamilyCustomPolicy[], Error>({
    queryFn: () => getFamilyPolicyClient(),
    queryKey: POLICY_KEYS.familyPolicy,
    staleTime: STALE_TIME.NORMAL,
  });
};
