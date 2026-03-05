import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchActivePolicy } from '../api/patchActivePolicy';
import type { PolicyActivateRequest } from '../model/types';

export const useUpdatePolicyActive = () => {
  const queryClient = useQueryClient();
  const updatePolicyActive = useMutation({
    mutationFn: ({ policyType, policyId, isActive }: PolicyActivateRequest) =>
      patchActivePolicy({ isActive, policyId, policyType }),
    onError: (error) => {
      console.error('정책 상태 업데이트 실패:', error);
    },
    onSuccess: (_, variables) => {
      if (variables.policyType === 'TIME') {
        queryClient.invalidateQueries({
          queryKey: ['adminPolicy'],
          refetchType: 'active',
        });
      } else if (variables.policyType === 'APP') {
        queryClient.invalidateQueries({
          queryKey: ['adminBlock'],
          refetchType: 'active',
        });
      }
    },
  });

  return { updatePolicyActive };
};
