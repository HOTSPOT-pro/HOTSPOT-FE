// entities/policy/model/useCreateFamilyPolicy.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POLICY_KEYS } from '@/shared/constants/queryKey';
import { postFamilyCustomPolicyClient } from '../api/postFamilyPolicyClient';
import type { PostFamilyCustomPolicy } from '../model/types';

export const useAddFamilyPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPolicy: PostFamilyCustomPolicy) => postFamilyCustomPolicyClient(newPolicy),
    onError: (error) => {
      console.error('정책 생성 실패:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POLICY_KEYS.familyPolicy });
    },
  });
};
