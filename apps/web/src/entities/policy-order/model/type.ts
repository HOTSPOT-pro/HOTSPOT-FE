export interface PolicyOrderMember {
  id: number;
  name: string;
  limit: number;
}

export const POLICY_ORDER_TYPE = {
  FIFO: 'FIFO',
  PRIORITY: 'PRIORITY',
} as const;
export type PolicyOrderType = (typeof POLICY_ORDER_TYPE)[keyof typeof POLICY_ORDER_TYPE];
