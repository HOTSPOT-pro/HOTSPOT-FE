export type ScoreLevel = 'GREAT' | 'GOOD' | 'NORMAL' | 'BAD' | 'WORST';
export type DayType =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';
export type CategoryType =
  | 'STUDY'
  | 'MEDIA'
  | 'SNS'
  | 'MSG'
  | 'GAME'
  | 'GIFT'
  | 'FIN'
  | 'WEB'
  | 'TOON'
  | 'etc';
export type RoleType = 'OWNER' | 'PARENT' | 'CHILD';
export type ReportStatus = 'COMPLETED';

export interface Subscribe {
  subscribed: boolean;
}

export interface History {
  subId: number;
  name: string;
  yearMonth: string;
  reports: HistoryMeta[];
}
export interface HistoryMeta {
  reportId: number;
  title: string;
  period: string;
  weekStartDate: string;
  weekEndDate: string;
  reportStatus: ReportStatus;
}

export interface ScoreReason {
  value: number;
  exp: string;
}

export interface scoreData {
  totalScore: number;
  scoreLevel: ScoreLevel;
  scoreDiff: number;
  reason: ScoreReason[];
}

export interface Overview {
  scoreData: scoreData;
  tags: string[];
}

export interface DailyUsageItem {
  day: DayType;
  lastWeek: number; // 차트 높이 계산용 raw 값
  thisWeek: number; // 차트 높이 계산용 raw 값
}

export interface DailyUsage {
  weekdayAvg: number; // GB 단위 숫자 ex) 2.3
  weekdayAvgDiff: number;
  weekdayAvgChangeRate: number;
  weekendAvg: number; // GB 단위 숫자 ex) 5.6
  weekendAvgDiff: number;
  weekendAvgChangeRate: number;
  ai_feedback: string;
  dailyUsageList: DailyUsageItem[];
}

export interface HourlyUsageItem {
  hour: number;
  isLateNight: boolean;
  isStudyTime: boolean;
  lastWeek: number; // 차트 높이 계산용 raw 값
  thisWeek: number; // 차트 높이 계산용 raw 값
}

export interface HourlyUsage {
  lateNightUsage: number; // GB 단위 숫자 ex) 1.2
  lateNightUsageDiff: number;
  lateNightUsageChangeRate: number;
  studyTimeUsage: number; // GB 단위 숫자 ex) 2.3
  studyTimeUsageDiff: number;
  studyTimeUsageChangeRate: number;
  ai_feedback: string;
  hourlyUsageList: HourlyUsageItem[];
}

export interface CategoryUsageItem {
  category: CategoryType;
  usage: number; // 차트 비율 계산용 raw 값
  percent: number;
}

export interface CategoryComparison {
  category: CategoryType;
  changeRate: number;
}

export interface CategoryUsageList {
  ai_feedback: string;
  thisWeek: CategoryUsageItem[];
  lastWeek: CategoryUsageItem[];
  comparison: CategoryComparison[];
}

export interface PolicyRecommend {
  title: string;
  description: string;
  reason: string;
}

export interface FinalFeedback {
  parent: string;
  child: string;
  policyRecommendList: PolicyRecommend[];
}

export interface AIReportData {
  subId: number;
  name: string;
  weekStartDate: string;
  weekEndDate: string;
  overview: Overview;
  dailyUsage: DailyUsage;
  hourlyUsage: HourlyUsage;
  categoryUsageList: CategoryUsageList;
  finalFeedback: FinalFeedback;
}

export interface AnalyzeData {
  receiveDay: DayType;
  members: AnalyzeMember[];
}
export interface AnalyzeMember {
  subId: number;
  name: string;
  familyRole: RoleType;
  reportId: number | null;
}
