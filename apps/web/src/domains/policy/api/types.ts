import type { UserRole } from '@/domains/user/model/types';

export interface GetAppliedPolicyRequest {
  isFamily: boolean;
}

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
export interface Block {
  id: number;
  name: string;
  serviceCode: string;
}
export interface PolicyPerUser {
  memberId: number;
  memberName: string;
  subId: number;
  familyDataSubLimit: number;
  familyDataUsage: number;
  priority: number;
  role: UserRole;
  isBlocked: boolean;
  blockPolicyResponseList: Policy[];
  appBlockedServiceResponseList: Block[];
}
export interface GetAppliedPolicyResponse {
  familyId: number;
  familyNum: number;
  familyDataAmount: number;
  priorityType: string;
  memberPolicies: PolicyPerUser[];
}
