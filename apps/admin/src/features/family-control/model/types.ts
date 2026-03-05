export interface MemberControl {
  priorityType: 'PRIORITY' | 'FIFO';
  members: MemberControlItem[];
}
export interface MemberControlItem {
  subId: number;
  memberName: string;
  familyRole: string;
  isParent?: boolean;
  isBlocked: boolean;
  dataLimitGb: number;
  priorityOrder: number;
}

export interface MemberOrderItem {
  subId: number;
  priority: number;
}

export interface PatchOrderRequest {
  familyId: number;
  priorityType: 'FIFO' | 'PRIORITY';
  memberPriorities: MemberOrderItem[];
}
