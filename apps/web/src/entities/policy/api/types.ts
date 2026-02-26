export interface GetAppliedPolicyRequest {
  isFamily: boolean;
}

interface Policy {
  id: number;
  name: string;
  policyType: string;
  policySnapshot: { days: string[] };
  startTime: string;
  endTime: string;
}
interface Block {
  id: number;
  name: string;
  serviceCode: string;
}
interface PolicyPerUser {
  memberId: number;
  memberName: string;
  subId: number;
  dataLimit: number;
  priority: number;
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
