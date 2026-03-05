export interface GetPolicyRequest {
  page?: number;
  size?: number;
}

export interface Policy {
  policyId: number;
  displayId: string;
  policyName: string;
  policyDescription: string;
  policyType: string;
  policyScheduleLabel: string;
  is_active: boolean;
  createdTime: string;
}
export interface GetPolicyResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  items: Policy[];
}

export interface Block {
  policyId: number;
  displayId: string;
  policyName: string;
  policyCode: string;
  createdTime: string;
  is_active: boolean;
}
export interface GetBlockResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  items: Block[];
}
