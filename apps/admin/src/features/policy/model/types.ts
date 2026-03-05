export interface PolicyActivateRequest {
  policyType: string;
  policyId: number;
  isActive: boolean;
}

export interface PostAppPolicyRequest {
  policyName: string;
  policyCode: string;
}

export interface PostTimePolicyRequest {
  policyName: string;
  policyDescription: string;
  policyType: 'SCHEDULED' | 'ONCE';
  policySnapshot: {
    days?: DAYS[];
    startTime?: string;
    endTime?: string;
    durationMinutes?: number;
  };
}
export type DAYS = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export interface DeletePolicyRequest {
  policyType: 'TIME' | 'APP';
  policyId: number;
}
