import { useQuery } from '@tanstack/react-query';
import { getFamilyPolicyClient } from '../api/getFamilyPolicyClient';
import type { GetFamilyCustomPolicy } from './types';

export const useFamilyCustomPolicy = () => {
  const STALE_TIME = 1000 * 60 * 5;
  return useQuery<GetFamilyCustomPolicy[], Error>({
    queryFn: () => getFamilyPolicyClient(),
    queryKey: ['familyPolicy'],
    staleTime: STALE_TIME,
  });
};
