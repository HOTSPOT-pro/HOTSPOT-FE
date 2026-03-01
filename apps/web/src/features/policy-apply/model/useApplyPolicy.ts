import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putPolicyApplyClientApi } from '../api/putPolicyApplyClientApi';
import type { PolicyApply } from './types';

interface useApplyPolicyParams {
  subId: number;
  familyId: number;
}

export const useApplyPolicy = ({ subId, familyId }: useApplyPolicyParams) => {
  const queryClient = useQueryClient();
  const updatePolicy = useMutation({
    mutationFn: (updates: PolicyApply) =>
      putPolicyApplyClientApi({
        familyId,
        subId,
        ...updates,
      }),
    onError: (error) => {
      console.error('적용 정책 수정 실패:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['policyPerFamily'],
        refetchType: 'all',
      });
    },
  });

  return {
    updatePolicy,
  };
};
