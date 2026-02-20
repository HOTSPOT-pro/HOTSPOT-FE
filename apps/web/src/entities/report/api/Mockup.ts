import type { AppUsageResponse, UsageResponse } from '../model/type';

// 1. 일별 데이터 (1월 1일 ~ 1월 7일, 일주일치)
export const MOCK_DAILY_USAGE: UsageResponse = {
  detail: [
    {
      date: '2026-01-01',
      memberUsages: [
        { limit: 100.0, memberId: 1, name: '김철수', usage: 20.5 },
        { limit: 100.0, memberId: 2, name: '김영희', usage: 25.0 },
        { limit: 100.0, memberId: 3, name: '이민수', usage: 0 },
      ],
      totalLimit: 200.0,
      totalUsage: 45.5,
    },
    {
      date: '2026-01-02',
      memberUsages: [
        { limit: 100.0, memberId: 1, name: '김철수', usage: 30.0 },
        { limit: 100.0, memberId: 2, name: '김영희', usage: 45.0 },
        { limit: 100.0, memberId: 3, name: '이민수', usage: 10.0 },
      ],
      totalLimit: 200.0,
      totalUsage: 85.0,
    },
    {
      date: '2026-01-03',
      memberUsages: [
        { limit: 100.0, memberId: 1, name: '김철수', usage: 50.2 },
        { limit: 100.0, memberId: 2, name: '김영희', usage: 60.0 },
        { limit: 100.0, memberId: 3, name: '이민수', usage: 0 },
      ],
      totalLimit: 200.0,
      totalUsage: 110.2,
    },
    {
      date: '2026-01-04',
      memberUsages: [
        { limit: 100.0, memberId: 1, name: '김철수', usage: 10.2 },
        { limit: 100.0, memberId: 2, name: '김영희', usage: 20.0 },
        { limit: 100.0, memberId: 3, name: '이민수', usage: 0 },
      ],
      totalLimit: 200.0,
      totalUsage: 30.2,
    },
    {
      date: '2026-01-05',
      memberUsages: [
        { limit: 100.0, memberId: 1, name: '김철수', usage: 70.5 },
        { limit: 100.0, memberId: 2, name: '김영희', usage: 75.0 },
        { limit: 100.0, memberId: 3, name: '이민수', usage: 0 },
      ],
      totalLimit: 200.0,
      totalUsage: 145.5,
    },
    {
      date: '2026-01-06',
      memberUsages: [
        { limit: 100.0, memberId: 1, name: '김철수', usage: 80.0 },
        { limit: 100.0, memberId: 2, name: '김영희', usage: 75.0 },
        { limit: 100.0, memberId: 3, name: '이민수', usage: 0 },
      ],
      totalLimit: 200.0,
      totalUsage: 155.0,
    },
    {
      date: '2026-01-07',
      memberUsages: [
        { limit: 100.0, memberId: 1, name: '김철수', usage: 50.2 },
        { limit: 100.0, memberId: 2, name: '김영희', usage: 80.0 },
        { limit: 100.0, memberId: 3, name: '이민수', usage: 0 },
      ],
      totalLimit: 200.0,
      totalUsage: 130.2,
    },
  ],
  end: '2026-01-07',
  periodType: 'DAILY',
  start: '2026-01-01',
};

// 2. 월별 데이터 (1월 ~ 6월, 반기치)
export const MOCK_MONTHLY_USAGE: UsageResponse = {
  detail: [
    {
      date: '2026-01',
      memberUsages: [
        { limit: 2500.0, memberId: 1, name: '김철수', usage: 500.5 },
        { limit: 2500.0, memberId: 2, name: '김영희', usage: 700.0 },
      ],
      totalLimit: 5000.0,
      totalUsage: 1200.5,
    },
    {
      date: '2026-02',
      memberUsages: [
        { limit: 2500.0, memberId: 1, name: '김철수', usage: 800.0 },
        { limit: 2500.0, memberId: 2, name: '김영희', usage: 700.0 },
      ],
      totalLimit: 5000.0,
      totalUsage: 1500.0,
    },
    {
      date: '2026-03',
      memberUsages: [
        { limit: 2500.0, memberId: 1, name: '김철수', usage: 1100.2 },
        { limit: 2500.0, memberId: 2, name: '김영희', usage: 1000.0 },
      ],
      totalLimit: 5000.0,
      totalUsage: 2100.2,
    },
    {
      date: '2026-04',
      memberUsages: [
        { limit: 2500.0, memberId: 1, name: '김철수', usage: 900.5 },
        { limit: 2500.0, memberId: 2, name: '김영희', usage: 900.0 },
      ],
      totalLimit: 5000.0,
      totalUsage: 1800.5,
    },
    {
      date: '2026-05',
      memberUsages: [
        { limit: 2500.0, memberId: 1, name: '김철수', usage: 1200.0 },
        { limit: 2500.0, memberId: 2, name: '김영희', usage: 1300.0 },
      ],
      totalLimit: 5000.0,
      totalUsage: 2500.0,
    },
    {
      date: '2026-06',
      memberUsages: [
        { limit: 2500.0, memberId: 1, name: '김철수', usage: 500.2 },
        { limit: 2500.0, memberId: 2, name: '김영희', usage: 600.0 },
      ],
      totalLimit: 5000.0,
      totalUsage: 1100.2,
    },
  ],
  end: '2026-06',
  periodType: 'MONTHLY',
  start: '2026-01',
};

// 3. 앱별 상세 사용량 (새로운 멤버 '이민수' 및 앱 추가)
export const MOCK_APP_USAGE_DATA: AppUsageResponse = {
  detail: {
    personal: [
      {
        memberId: 1,
        name: '김철수',
        total: 130.5,
        usage: [
          { appName: 'YouTube', usage: 85.2 },
          { appName: 'KakaoTalk', usage: 25.1 },
          { appName: 'Safari', usage: 15.2 },
          { appName: 'Slack', usage: 5.0 },
        ],
      },
      {
        memberId: 2,
        name: '김영희',
        total: 245.5,
        usage: [
          { appName: 'Instagram', usage: 95.5 },
          { appName: 'Netflix', usage: 120.0 },
          { appName: 'Melon', usage: 20.0 },
          { appName: 'Coupang', usage: 10.0 },
        ],
      },
      {
        memberId: 3,
        name: '이민수',
        total: 55.0,
        usage: [
          { appName: 'Tiktok', usage: 40.0 },
          { appName: 'ChatGPT', usage: 10.0 },
          { appName: 'Notion', usage: 5.0 },
        ],
      },
    ],
    total: {
      total: 431.0,
      usage: [
        { appName: 'YouTube', usage: 120.5 },
        { appName: 'Netflix', usage: 110.1 },
        { appName: 'Instagram', usage: 85.2 },
        { appName: 'KakaoTalk', usage: 45.8 },
        { appName: 'Tiktok', usage: 40.0 },
        { appName: 'Safari', usage: 15.2 },
        { appName: 'ChatGPT', usage: 14.2 },
      ],
    },
  },
};
