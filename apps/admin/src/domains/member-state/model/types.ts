import type { FAMILY_ROLE } from '@/domains/family';

export interface GiftUsageStatus {
  giftId: number;
  giftUserName: string;
  giftDataLimit: number;
  giftDataUsageAmount: number;
  giftDataUsageRemainAmount: number;
  dataUsagePercent: number;
}

export interface MemberUsageStatus {
  subId: number;
  currentTime: string;
  subName: string;
  familyRole: FAMILY_ROLE;
  blocked: boolean;
  phoneEnc: string;
  planName: string;
  subDataAmount: number;
  subDataUsageAmount: number;
  subDataRemainAmount: number;
  dataUsagePercent: number;
  giftDataAmount: number;
  giftDataUsageAmount: number;
  giftDataRemainAmount: number;
  giftUsagePercent: number;
  giftUsages: GiftUsageStatus[];
}

export interface FamilyUsageMemberStatus {
  subId: number;
  subName: string;
  dataLimit: number;
  dataUsageAmount: number;
  dataUsageRemainAmount: number;
  dataUsagePercent: number;
}

export interface FamilyUsageStatus {
  currentTime: string;
  familyDataAmount: number;
  familyDataUsageAmount: number;
  familyDataRemainAmount: number;
  dataUsagePercent: number;
  subUsages: FamilyUsageMemberStatus[];
}

export interface FamilyRealtimeStatus {
  familyUsage: FamilyUsageStatus;
  members: MemberUsageStatus[];
}
