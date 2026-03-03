export interface PresentFamilyDataResponse {
  selfSubId: number;
  selfDataRemainAmount: number;
  subUsages: PresentFamilySubUsage[];
}
export interface PresentFamilySubUsage {
  subId: number;
  subName: string;
  subDataLimitAmount: number;
  subDataUsageAmount: number;
  dataUsagePercent: number;
}
export interface PresentDataRequest {
  targetSubId: number;
  dataAmount: number;
}
