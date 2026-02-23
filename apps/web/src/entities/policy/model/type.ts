export interface Policy {
  id: number;
  name: string;
  description: string;
}
export interface PolicyPerUser {
  id: number;
  name: string;
  limit: number;
  policyList: Policy[];
  blockServices: Policy[];
}
