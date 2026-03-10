import type { UserRole } from '@/domains/user/model/types';

export interface Policy {
  id: number;
  name: string;
  policyType: string;
  policySnapshot: {
    days?: string[];
    durationMinutes?: number;
    startTime?: string;
    endTime?: string;
  };
  policyDescription: string;
  isActive: boolean;
}
export interface BlockPolicy {
  id: number;
  name: string;
  serviceCode: string;
}
export interface PolicyPerUser {
  memberId: number;
  memberName: string;
  subId: number;
  role: UserRole;
  isBlocked: boolean;
  familyDataSubLimit: number;
  familyDataUsage: number;
  priority: number;
  blockPolicyResponseList: Policy[];
  appBlockedServiceResponseList: BlockPolicy[];
}
export interface PolicyPerFamily {
  familyId: number;
  familyNum: number;
  familyDataAmount: number;
  priorityType: string;
  memberPolicies: PolicyPerUser[];
}

export interface MemberPriority {
  subId: number;
  priority: number;
  name: string;
  limit: number;
  role: UserRole;
}
export interface FamilyPriority {
  familyId: number;
  priorityType: PolicyOrderType;
  memberPriorities: MemberPriority[];
}

export const POLICY_ORDER_TYPE = {
  FIFO: 'FIFO',
  PRIORITY: 'PRIORITY',
} as const;
export type PolicyOrderType = (typeof POLICY_ORDER_TYPE)[keyof typeof POLICY_ORDER_TYPE];
