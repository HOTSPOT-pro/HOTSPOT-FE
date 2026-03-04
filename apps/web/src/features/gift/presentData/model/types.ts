export interface PresentFamilyData {
  subId: number;
  dataRemainAmount: number;
  subUsages: PresentSubUsage[];
}
export interface PresentSubUsage {
  subId: number;
  subName: string;
  subDataLimitAmount: number;
  subDataUsageAmount: number;
  dataUsagePercent: number;
}
