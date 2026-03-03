import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchPriorityFifoClientApi } from '../api/patchFamilyPriorityClientApi';

export const useFifoOrder = () => {
  const queryClient = useQueryClient();

  const updateFifo = useMutation({
    mutationFn: (familyId: number) => patchPriorityFifoClientApi(familyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['policyPerFamily'] });
    },
  });

  return { updateFifo };
};
