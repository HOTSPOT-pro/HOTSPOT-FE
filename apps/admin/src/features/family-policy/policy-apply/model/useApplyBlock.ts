import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchBlockApplyClientApi } from '../api/patchBlockApplyClientApi';
import type { PolicyApply } from './types';

interface useApplyPolicyParams {
  subId: number;
  familyId: number;
}

export const useApplyBlock = ({ subId, familyId }: useApplyPolicyParams) => {
  const queryClient = useQueryClient();
  const updateBlock = useMutation({
    mutationFn: (updates: PolicyApply[]) => {
      return patchBlockApplyClientApi({
        familyId,
        policies: updates,
        subId,
      });
    },
    onError: (error) => {
      console.error('적용 정책 수정 실패:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminMemberBlock', { familyId, subId }],
        refetchType: 'active',
      });
      queryClient.invalidateQueries({
        queryKey: ['adminFamilyDatailPolicy', familyId],
        refetchType: 'active',
      });
    },
  });

  return {
    updateBlock,
  };
};
