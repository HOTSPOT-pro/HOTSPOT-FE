import { useQuery } from '@tanstack/react-query';
import { POLICY_KEYS } from '@/shared/constants/queryKey';
import { STALE_TIME } from '@/shared/constants/time';
import { getAppliedPolicyClientApi } from '../api/getAppliedPolicyClientApi';
import type { GetAppliedPolicyResponse } from '../api/types';
import type { FamilyPriority, PolicyOrderType, PolicyPerFamily } from './types';

export const useFamilyAppliedPolicy = () => {
  const { data, isPending } = useQuery<
    GetAppliedPolicyResponse,
    Error,
    {
      policyPerFamily: PolicyPerFamily;
      priorityPerFamily: FamilyPriority;
    }
  >({
    queryFn: () => getAppliedPolicyClientApi(true),
    queryKey: POLICY_KEYS.perFamily,
    select: (serverData) => {
      const policyPerFamily: PolicyPerFamily = {
        familyDataAmount: serverData.familyDataAmount,
        familyId: serverData.familyId,
        familyNum: serverData.familyNum,
        memberPolicies: serverData.memberPolicies.map((member) => ({
          appBlockedServiceResponseList: member.appBlockedServiceResponseList,
          blockPolicyResponseList: member.blockPolicyResponseList,
          familyDataSubLimit: member.familyDataSubLimit,
          familyDataUsage: member.familyDataUsage,
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
          limit: member.familyDataSubLimit,
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
    staleTime: STALE_TIME.NORMAL,
  });

  return {
    loading: isPending,
    policyPerFamily: data?.policyPerFamily,
    priorityPerFamily: data?.priorityPerFamily,
  };
};
