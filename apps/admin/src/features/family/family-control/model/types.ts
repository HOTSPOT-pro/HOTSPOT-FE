export interface MemberOrderItem {
  subId: number;
  priority: number;
}

export interface PatchOrderRequest {
  familyId: number;
  priorityType: 'FIFO' | 'PRIORITY';
  memberPriorities: MemberOrderItem[];
}
export interface PatchControlRequest {
  familyId: number;
  subId: number;
  body: { dataLimitGb: number; isBlocked: boolean; isParent?: boolean };
}
