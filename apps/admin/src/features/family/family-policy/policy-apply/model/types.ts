export interface PolicyApply {
  policyId: number;
  isActive: boolean;
}
export interface PutPolicyApplyRequest {
  familyId: number;
  subId: number;
  policies: PolicyApply[];
}
