export type ScoreLevel = 'GREAT' | 'GOOD' | 'NORMAL' | 'BAD' | 'WORST';
export type TagType = 'LATE_NIGHT_HIGH' | 'USAGE_SPIKE' | 'STUDY_FOCUSED' | 'ENTERTAINMENT_HEAVY';
export type DayType =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';
export type CategoryType = 'study' | 'media' | 'sns' | 'msg' | 'game';

export interface Subscribe {
  subscribed: boolean;
}

export interface ScoreReason {
  value: number;
  exp: string;
}

export interface ScoreInfo {
  totalScore: number;
  scoreLevel: ScoreLevel;
  scoreDiff: number;
  reason: ScoreReason[];
}

export interface Overview {
  scoreInfo: ScoreInfo;
  tags: TagType[];
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
  totalThisWeek: number; // GB 단위 숫자 ex) 2.7
  totalLastWeek: number; // GB 단위 숫자 ex) 1.7
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
  final_feedback: FinalFeedback;
}
