export interface ReportUser {
  id: string;
  name: string | null;
}

export interface ReportAppUsage {
  appName: string;
  limit: number;
  usage: number;
}
