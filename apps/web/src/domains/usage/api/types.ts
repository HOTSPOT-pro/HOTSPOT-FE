export interface SubscriptionUsage {
  subId: number;
  currentTime: string;
  planName: string;
  subDataAmount: number;
  subDataUsageAmount: number;
  subDataRemainAmount: number;
  dataRemainPercent: number;
}

export interface GiftUsageItem {
  giftId: number;
  giftUserName: string;
  giftDataLimit: number;
  giftDataUsageAmount: number;
  giftDataUsageRemainAmount: number;
  dataRemainPercent: number;
}

export interface GiftUsage {
  currentTime: string;
  giftDataAmount: number;
  giftDataUsageAmount: number;
  giftDataRemainAmount: number;
  giftRemainPercent: number;
  giftUsages: GiftUsageItem[];
}

export interface TotalUsage {
  subId: number;
  currentTime: string;
  totalDataAmount: number;
  totalDataRemainAmount: number;
  totalDataRemainPercent: number;
  planName: string;
  subDataRemainAmount: number;
  giftDataRemainAmount: number;
  familyDataRemainAmount: number;
}
