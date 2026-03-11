import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { PolicyPerFamily, PolicyPerUser } from '@/domains/policy';
import { getDatalimitClientApi } from '../api/getDatalimitClientApi';
import { patchDatalimitClientApi } from '../api/patchDatalimitClientApi';
import type { GetDatalimitResponse } from '../api/types';
import type { Datalimit, UpdateDatalimit } from './types';

interface useDatalimitParams {
  subId: number;
  familyId: number;
}
interface DatalimitContext {
  previousDatalimit?: Datalimit;
  previousPolicy?: PolicyPerFamily;
}

export const useDatalimit = ({ subId, familyId }: useDatalimitParams) => {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<GetDatalimitResponse, Error, Datalimit>({
    enabled: Boolean(subId),
    queryFn: () => getDatalimitClientApi(subId),
    queryKey: ['datalimit', subId],
    select: (serverData): Datalimit => ({
      dataLimit: serverData.dataLimit,
      familyDataAmount: serverData.familyDataAmount,
      isLocked: serverData.isLocked,
      name: serverData.name,
      subId: subId,
    }),
  });

  const updateLockStatus = useMutation<void, Error, UpdateDatalimit, DatalimitContext>({
    mutationFn: (updates: UpdateDatalimit) =>
      patchDatalimitClientApi({
        familyId,
        subId,
        ...updates,
      }),

    onError: (error, _variables, context) => {
      console.error('데이터 제한 수정 실패:', error);
      if (context?.previousDatalimit) {
        queryClient.setQueryData(['datalimit', subId], context.previousDatalimit);
      }
      if (context?.previousPolicy) {
        queryClient.setQueryData(['policyPerFamily'], context.previousPolicy);
      }
    },

    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: ['datalimit', subId] });
      await queryClient.cancelQueries({ queryKey: ['policyPerFamily'] });

      const previousDatalimit = queryClient.getQueryData<Datalimit>(['datalimit', subId]);
      const previousPolicy = queryClient.getQueryData<PolicyPerFamily>(['policyPerFamily']);

      if (previousDatalimit) {
        queryClient.setQueryData<Datalimit>(['datalimit', subId], {
          ...previousDatalimit,
          dataLimit: updates.dataLimit,
          isLocked: updates.isLocked,
        });
      }

      queryClient.setQueryData(['policyPerFamily'], (old: PolicyPerFamily) => {
        if (!old?.memberPolicies) return old;
        return {
          ...old,
          memberPolicies: old.memberPolicies.map((member: PolicyPerUser) =>
            member.subId === subId
              ? {
                  ...member,
                  familyDataSubLimit: updates.dataLimit,
                  isBlocked: updates.isLocked,
                }
              : member,
          ),
        };
      });

      return { previousDatalimit, previousPolicy };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['currentBlockedPoliciesStatus'] });
    },
  });

  return {
    datalimit: data,
    loading: isPending,
    updateLockStatus,
  };
};
