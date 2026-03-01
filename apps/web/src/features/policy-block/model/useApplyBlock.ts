import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchBlockApplyClientApi } from '../api/putBlockApplyClientApi';
import type { BlockApply } from './types';

interface useApplyPolicyParams {
  subId: number;
  familyId: number;
}

export const useApplyBlock = ({ subId, familyId }: useApplyPolicyParams) => {
  const queryClient = useQueryClient();
  const updateBlock = useMutation({
    mutationFn: (updates: BlockApply) => {
      console.log(subId, familyId, updates);
      return patchBlockApplyClientApi({
        blockServiceIdList: updates.blockedServiceIdList,
        familyId,
        subId,
      });
    },
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
    updateBlock,
  };
};
