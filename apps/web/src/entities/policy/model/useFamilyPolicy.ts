import { useQuery } from '@tanstack/react-query';
import type { FamilyPriority, PolicyOrderType } from '@/entities/policy-order';
import { getAppliedPolicyClientApi } from '../api/getAppliedPolicyClientApi';
import type { GetAppliedPolicyResponse } from '../api/types';

export const useFamilyPolicy = () => {
  const { data, isPending } = useQuery<
    GetAppliedPolicyResponse,
    Error,
    {
      policyPerFamily: GetAppliedPolicyResponse;
      priorityPerFamily: FamilyPriority;
    }
  >({
    queryFn: () => getAppliedPolicyClientApi(true),
    queryKey: ['policyPerFamily'],
    select: (serverData) => {
      const priorityPerFamily: FamilyPriority = {
        familyId: serverData.familyId,
        memberPriorities: serverData.memberPolicies.map((member) => ({
          limit: member.dataLimit,
          name: member.memberName,
          priority: member.priority,
          subId: member.subId,
        })),
        priorityType: serverData.priorityType as PolicyOrderType,
      };

      return {
        policyPerFamily: serverData,
        priorityPerFamily,
      };
    },
  });

  return {
    loading: isPending,
    policyPerFamily: data?.policyPerFamily,
    priorityPerFamily: data?.priorityPerFamily,
  };
};
