export interface GetMemberPolicyRequest {
  familyId: number;
  subId: number;
}
export interface MemberPolicy {
  memberName: string;
  phoneNumber: string;
  familyRole: string;
  blocked: boolean;
  appliedTimePolicies: PolicyItem[];
}
export interface MemberBlock {
  memberName: string;
  phoneNumber: string;
  familyRole: string;
  blocked: boolean;
  appliedBlockedServicePolicies: BlockItem[];
}
export interface PolicyItem {
  policyId: number;
  policyName: string;
  policyDescription: string;
  policyType: string;
  policyScheduleLabel: string;
  isActive: boolean;
}
export interface BlockItem {
  policyId: number;
  policyName: string;
  isActive: boolean;
}
