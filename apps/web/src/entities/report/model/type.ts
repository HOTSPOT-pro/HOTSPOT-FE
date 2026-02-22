export interface MemberUsage {
  memberId: number;
  name: string;
  usage: number;
  limit: number;
}

export interface UsageDetail {
  date: string;
  totalUsage: number;
  totalLimit: number;
  memberUsages: MemberUsage[];
}

export interface UsageResponse {
  start: string;
  end: string;
  periodType: 'DAILY' | 'MONTHLY';
  detail: UsageDetail[];
}

export interface ReportUser {
  id: number | null; // 전체일 때 null
  name: string | null;
}

export interface AppUsage {
  appName: string;
  usage: number;
}
export interface MemberAppUsage {
  memberId: number | null;
  name: string;
  total: number;
  usage: AppUsage[];
}
export interface AppUsageDetail {
  personal: MemberAppUsage[];
  total: { total: number; usage: AppUsage[] };
}
export interface AppUsageResponse {
  detail: AppUsageDetail;
}

export interface ReportRange {
  unit: 'MONTH' | 'DAY';
  month: number;
  year: number;
}
