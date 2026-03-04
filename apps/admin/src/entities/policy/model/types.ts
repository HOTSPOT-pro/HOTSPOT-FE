export interface GetPolicyRequest {
  page?: number;
  size?: number;
}

export interface Policy {
  policyId: number;
  displayId: string;
  policyName: string;
  policyCode: string;
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
