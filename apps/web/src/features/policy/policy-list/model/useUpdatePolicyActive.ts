import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchPolicyActiveClinet } from '../api/patchPolicyActiveClient';
import type { PatchFamilyPolicyActive } from '../model/types';

export const useUpdatePolicyActive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: PatchFamilyPolicyActive) => patchPolicyActiveClinet(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['familyPolicy'] });
      queryClient.invalidateQueries({ queryKey: ['policyPerFamily'] });
    },
  });
};
