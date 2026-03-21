import type { FAMILY_ROLE } from '@/domains/family';

export interface MemberControl {
  priorityType: 'PRIORITY' | 'FIFO';
  members: MemberControlItem[];
}
export interface MemberControlItem {
  subId: number;
  memberName: string;
  familyRole: FAMILY_ROLE;
  isParent?: boolean;
  isBlocked: boolean;
  familyDataLimit: number;
  familyDataUsage: number;
  familyDataSubLimit: number;
  priorityOrder: number;
}
