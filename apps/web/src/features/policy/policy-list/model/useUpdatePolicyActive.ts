import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POLICY_KEYS } from '@/shared/constants/queryKey';
import { patchPolicyActiveClient } from '../api/patchPolicyActiveClient';
import type { PatchFamilyPolicyActive } from '../model/types';

export const useUpdatePolicyActive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: PatchFamilyPolicyActive) => patchPolicyActiveClient(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POLICY_KEYS.familyPolicy });
      queryClient.invalidateQueries({ queryKey: POLICY_KEYS.perFamily });
      queryClient.invalidateQueries({ queryKey: POLICY_KEYS.currentBlock });
    },
  });
};
