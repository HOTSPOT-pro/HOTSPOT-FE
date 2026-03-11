import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MemberControl } from '@/domains/member-control';
import { patchFamilyControlClientApi } from '../api/patchFamilyControlClient';
import type { PatchControlRequest } from './types';

interface UpdateContext {
  previousData?: MemberControl;
}

export const useFamilyUpdateControl = ({ familyId }: { familyId: number }) => {
  const queryClient = useQueryClient();
  const queryKey = ['adminFamilyDatailControl', familyId];

  const updateMember = useMutation<void, Error, PatchControlRequest, UpdateContext>({
    mutationFn: ({ subId, body }: PatchControlRequest) =>
      patchFamilyControlClientApi({ body, familyId, subId }),
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<MemberControl>(queryKey);

      if (previousData) {
        queryClient.setQueryData<MemberControl>(queryKey, {
          ...previousData,
          members: previousData.members.map((member) =>
            member.subId === variables.subId
              ? {
                  ...member,
                  familyDataSubLimit: variables.body.dataLimitGb,
                  isBlocked: variables.body.isBlocked,
                  isParent: variables.body.isParent ?? member.isParent,
                }
              : member,
          ),
        });
      }
      return { previousData };
    },
  });

  return { updateMember };
};
