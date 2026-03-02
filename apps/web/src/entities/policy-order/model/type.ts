export interface MemberPriority {
  subId: number;
  priority: number;
  name: string;
  limit: number;
}
export interface FamilyPriority {
  familyId: number;
  priorityType: PolicyOrderType;
  memberPriorities: MemberPriority[];
}

export const POLICY_ORDER_TYPE = {
  FIFO: 'FIFO',
  PRIORITY: 'PRIORITY',
} as const;
export type PolicyOrderType = (typeof POLICY_ORDER_TYPE)[keyof typeof POLICY_ORDER_TYPE];
