import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POLICY_KEYS } from '@/shared/constants/queryKey';
import { patchPriorityFifoClientApi } from '../api/patchFamilyPriorityClientApi';

export const useFifoOrder = () => {
  const queryClient = useQueryClient();

  const updateFifo = useMutation({
    mutationFn: (familyId: number) => patchPriorityFifoClientApi(familyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POLICY_KEYS.perFamily });
    },
  });

  return { updateFifo };
};
