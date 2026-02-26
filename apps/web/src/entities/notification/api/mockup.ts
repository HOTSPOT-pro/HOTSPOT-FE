import type { Notification } from '../model/type';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    createdAt: '2024-03-24T10:00:00Z',
    id: '123e4567-e89b-12d3-a456-426614174000',
    isRead: false,
    message: '데이터 잔여량이 50% 남았습니다.',
    metadata: {},
    title: '데이터 사용량 알림',
    type: 'SINGLE_USAGE_THRESHOLD_50',
  },
  {
    createdAt: '2024-03-24T09:15:00Z',
    id: '223e4567-e89b-12d3-a456-426614174001',
    isRead: false,
    metadata: {},
    title: '가족 데이터 알림',
    type: 'FAMILY_USAGE_THRESHOLD_10',
  },
  {
    createdAt: '2024-03-23T18:30:00Z',
    id: '323e4567-e89b-12d3-a456-426614174002',
    isRead: true,
    metadata: {
      amount: '500MB',
      senderName: '김철수',
    },
    title: '데이터 선물 도착',
    type: 'PRESENT_DATA',
  },
  {
    createdAt: '2024-03-23T23:00:00Z',
    id: '423e4567-e89b-12d3-a456-426614174003',
    isRead: true,
    metadata: {
      policyName: '심야 게임 금지',
    },
    title: '정책 적용 알림',
    type: 'TIME_WINDOW_POLICY_APPLIED',
  },
  {
    createdAt: '2024-03-23T14:20:00Z',
    id: '523e4567-e89b-12d3-a456-426614174004',
    isRead: false,
    metadata: {
      serviceName: 'YouTube',
    },
    title: '서비스 차단',
    type: 'SERVICE_ACCESS_BLOCKED',
  },
  {
    createdAt: '2024-03-22T08:00:00Z',
    id: '623e4567-e89b-12d3-a456-426614174005',
    isRead: true,
    metadata: {},
    title: '즉시 차단 실행',
    type: 'IMMEDIATE_BLOCK_APPLIED',
  },
  {
    createdAt: '2024-03-21T21:45:00Z',
    id: '723e4567-e89b-12d3-a456-426614174006',
    isRead: true,
    metadata: {},
    title: '선물 데이터 소진',
    type: 'PRESENT_USAGE_EXHAUSTED',
  },
];
