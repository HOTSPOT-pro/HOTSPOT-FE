import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POLICY_KEYS } from '@/shared/constants/queryKey';
import { deleteFamilyPolicyClient } from '../api/deleteFamilyPolicyClient';

export const useDeleteFamilyPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deleteId: number) => deleteFamilyPolicyClient(deleteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POLICY_KEYS.familyPolicy });
      queryClient.invalidateQueries({ queryKey: POLICY_KEYS.perFamily });
    },
  });
};
