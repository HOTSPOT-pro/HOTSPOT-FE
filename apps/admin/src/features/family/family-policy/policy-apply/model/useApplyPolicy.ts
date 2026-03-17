import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchPolicyApplyClientApi } from '../api/patchPolicyApplyClientApi';
import type { PolicyApply } from './types';

interface useApplyPolicyParams {
  subId: number;
  familyId: number;
}

export const useApplyPolicy = ({ subId, familyId }: useApplyPolicyParams) => {
  const queryClient = useQueryClient();
  const updatePolicy = useMutation({
    mutationFn: (updates: PolicyApply[]) =>
      patchPolicyApplyClientApi({
        familyId,
        policies: updates,
        subId,
      }),
    onError: (error) => {
      console.error('적용 정책 수정 실패:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminMemberPolicy', { familyId, subId }],
        refetchType: 'active',
      });
      queryClient.invalidateQueries({
        queryKey: ['adminFamilyDatailPolicy', familyId],
        refetchType: 'active',
      });
    },
  });

  return {
    updatePolicy,
  };
};
