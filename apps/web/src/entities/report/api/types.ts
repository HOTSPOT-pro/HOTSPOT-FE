export interface ReportFamilyResponse {
  subId: number;
  subName: string;
}
export interface MonthlyUsageResponse {
  currentDateTime: string;
  subUsages: MonthlySubUsage[];
}
export interface MonthlySubUsage {
  subId: number;
  subName: string;
  dataUsageMonths: MonthlyUsage[];
}
export interface MonthlyUsage {
  usageMonth: string;
  usageAmount: number;
}

export interface DailyUsageResponse {
  currentDateTime: string;
  subUsages: DailySubUsage[];
}
export interface DailySubUsage {
  subId: number;
  subName: string;
  dataUsageDays: DailyUsage[];
}
export interface DailyUsage {
  usageDate: string;
  usageDayAmount: number;
}

export interface ServiceUsageResponse {
  currentDateTime: string;
  appUsages: AppUsage[];
}
export interface AppUsage {
  appId: number;
  appName: string;
  appDataUsageAmount: number;
}
