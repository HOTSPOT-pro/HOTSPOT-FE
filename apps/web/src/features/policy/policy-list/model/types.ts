export type POLICY_TYPE = 'ONCE' | 'SCHEDULED';
export type DAYS =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';
export interface GetFamilyCustomPolicy {
  id: number;
  name: string;
  familyId: number;
  policyType: POLICY_TYPE;
  policySnapshot: PolicySnapshot;
  policyDescription: string;
  isActive: boolean;
}
export interface PolicySnapshot {
  days?: DAYS[];
  startTime?: string;
  endTime?: string;
  durationMinutes?: number;
}

export interface PostFamilyCustomPolicy {
  name: string;
  policyDescription: string;
  policyType: 'SCHEDULED' | 'ONCE';
  policySnapshot: {
    days?: DAYS[];
    startTime?: string;
    endTime?: string;
    durationMinutes?: number;
  };
  isActive: boolean;
}

export interface PatchFamilyPolicyActive {
  familyId: number;
  blockPolicyIdList: number[];
}
