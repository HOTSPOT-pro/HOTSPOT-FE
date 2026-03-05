export interface MemberControl {
  priorityType: string;
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
