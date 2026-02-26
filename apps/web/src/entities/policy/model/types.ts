export interface Policy {
  id: number;
  name: string;
  policyType: string;
  policySnapshot: { days: string[] };
  startTime: string;
  endTime: string;
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
  dataLimit: number;
  priority: number;
  blockPolicyResponseList: Policy[];
  appBlockedServiceResponseList: Block[];
}
export interface PolicyPerFamily {
  familyId: number;
  familyNum: number;
  familyDataAmount: number;
  priorityType: string;
  memberPolicies: PolicyPerUser[];
}
