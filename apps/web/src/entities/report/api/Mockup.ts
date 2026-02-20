import type { ReportAppUsage, ReportUser } from '../model/type';

export const REPORT_USERS: ReportUser[] = [
  { id: 'all', name: null },
  { id: 'user1', name: '김철수' },
  { id: 'user2', name: '이영희' },
];

export const TOTAL_USAGE = [30, 40, 40, 50, 62, 40, 30, 35, 45, 40, 60, 50];

export const USAGE_DATA_BY_USER: Record<string, number[]> = {
  all: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 전체일 땐 개인 선을 숨기거나 0으로 표시
  user1: [10, 20, 15, 25, 30, 20, 10, 15, 30, 20, 30, 25],
  user2: [25, 15, 30, 10, 20, 30, 25, 10, 15, 30, 10, 20],
};

export const APP_USAGE_DATA: Record<string, ReportAppUsage[]> = {
  all: [
    { appName: 'YouTube', limit: 130, usage: 120.5 },
    { appName: 'Instagram', limit: 130, usage: 85.2 },
    { appName: 'KakaoTalk', limit: 130, usage: 45.8 },
    { appName: 'Netflix', limit: 130, usage: 200.1 },
  ],
  user1: [
    { appName: 'YouTube', limit: 130, usage: 50.2 },
    { appName: 'KakaoTalk', limit: 130, usage: 20.1 },
  ],
  user2: [
    { appName: 'Instagram', limit: 130, usage: 70.5 },
    { appName: 'Netflix', limit: 130, usage: 150.0 },
  ],
};
