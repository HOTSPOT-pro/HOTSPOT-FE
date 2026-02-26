export interface Policy {
  id: number;
  name: string;
  policyType: string;
  policySnapshot: { days?: string[]; durationMinutes?: number };
  startTime: string;
  endTime: string;
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
  dataLimit: number;
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
