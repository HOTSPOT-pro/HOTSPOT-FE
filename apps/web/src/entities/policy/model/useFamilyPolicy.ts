import { useQuery } from '@tanstack/react-query';
import { getAppliedPolicyClientApi } from '../api/getAppliedPolicyClientApi';
import type { GetAppliedPolicyResponse } from '../api/types';
import type { FamilyPriority, PolicyOrderType, PolicyPerFamily } from './types';

export const useFamilyPolicy = () => {
  const { data, isPending } = useQuery<
    GetAppliedPolicyResponse,
    Error,
    {
      policyPerFamily: PolicyPerFamily;
      priorityPerFamily: FamilyPriority;
    }
  >({
    queryFn: () => getAppliedPolicyClientApi(true),
    queryKey: ['policyPerFamily'],
    select: (serverData) => {
      const policyPerFamily: PolicyPerFamily = {
        familyDataAmount: serverData.familyDataAmount,
        familyId: serverData.familyId,
        familyNum: serverData.familyNum,
        memberPolicies: serverData.memberPolicies.map((member) => ({
          appBlockedServiceResponseList: member.appBlockedServiceResponseList,
          blockPolicyResponseList: member.blockPolicyResponseList,
          dataLimit: member.dataLimit,

          familyDataSubLimit: member.dataLimit,
          familyDataUsage: 0,
          isBlocked: member.isBlocked,
          memberId: member.memberId,
          memberName: member.memberName,
          priority: member.priority,
          role: member.role,
          subId: member.subId,
        })),
        priorityType: serverData.priorityType,
      };

      const priorityPerFamily: FamilyPriority = {
        familyId: serverData.familyId,
        memberPriorities: serverData.memberPolicies.map((member) => ({
          limit: member.dataLimit,
          name: member.memberName,
          priority: member.priority,
          role: member.role,
          subId: member.subId,
        })),
        priorityType: serverData.priorityType as PolicyOrderType,
      };

      return {
        policyPerFamily: policyPerFamily,
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
