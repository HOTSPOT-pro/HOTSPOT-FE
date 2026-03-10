// entities/policy/model/useCreateFamilyPolicy.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFamilyCustomPolicyClinet } from '../api/postFamilyPolicyClient';
import type { PostFamilyCustomPolicy } from '../model/types';

export const useAddFamilyPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPolicy: PostFamilyCustomPolicy) => postFamilyCustomPolicyClinet(newPolicy),
    onError: (error) => {
      console.error('정책 생성 실패:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['familyPolicy'] });
    },
  });
};
