import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAppPolicy } from '../api/postAppPolicy';
import { postTimePolicy } from '../api/postTimePolicy';
import type { PostAppPolicyRequest, PostTimePolicyRequest } from '../model/types';

export const useCreateTimePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPolicy: PostTimePolicyRequest) => postTimePolicy(newPolicy),

    onError: (error) => {
      console.error('정책 생성 실패:', error);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminPolicy'],
        refetchType: 'active',
      });
    },
  });
};

export const useCreateAppPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPolicy: PostAppPolicyRequest) => postAppPolicy(newPolicy),

    onError: (error) => {
      console.error('정책 생성 실패:', error);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminBlock'],
        refetchType: 'active',
      });
    },
  });
};
