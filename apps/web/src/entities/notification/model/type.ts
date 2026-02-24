export interface Notification {
  id: string;
  title: string;
  message?: string;
  createdAt: string;
  isRead: boolean;
  type: string;
  metadata?: Record<string, string>;
}

export const NOTIFICATION_MESSAGES: Record<string, (params?: any) => string> = {
  // 가족 공유 데이터 사용량
  FAMILY_USAGE_EXHAUSTED: () => '가족 공유 데이터 잔여량이 모두 소진되었습니다.',
  FAMILY_USAGE_THRESHOLD_10: () => '가족 공유 데이터 잔여량이 10% 남았습니다.',
  FAMILY_USAGE_THRESHOLD_30: () => '가족 공유 데이터 잔여량이 30% 남았습니다.',
  FAMILY_USAGE_THRESHOLD_50: () => '가족 공유 데이터 잔여량이 50% 남았습니다.',

  // 즉시 차단
  IMMEDIATE_BLOCK_APPLIED: () => '데이터 사용 차단이 즉시 적용되었습니다.',
  IMMEDIATE_BLOCK_RELEASED: () => '데이터 사용 차단이 해제되었습니다.',

  // 선물 데이터 사용량
  PRESENT_DATA: (params) => `“${params.senderName}”님이 데이터 ${params.amount}을 선물하셨습니다.`,
  PRESENT_USAGE_EXHAUSTED: () => '선물 받은 데이터 잔여량이 모두 소진되었습니다.',
  PRESENT_USAGE_THRESHOLD_10: () => '선물 받은 데이터 잔여량이 10% 남았습니다.',
  PRESENT_USAGE_THRESHOLD_30: () => '선물 받은 데이터 잔여량이 30% 남았습니다.',
  PRESENT_USAGE_THRESHOLD_50: () => '선물 받은 데이터 잔여량이 50% 남았습니다.',

  // 앱/서비스 차단
  SERVICE_ACCESS_BLOCKED: (params) => `“${params.serviceName}” 서비스 이용이 차단되었습니다.`,
  SERVICE_ACCESS_RELEASED: (params) => `“${params.serviceName}” 서비스 이용 차단이 해제되었습니다.`,

  //개인 데이터 사용량
  SINGLE_USAGE_EXHAUSTED: () => '데이터 잔여량이 모두 소진되었습니다.',
  SINGLE_USAGE_THRESHOLD_10: () => '데이터 잔여량이 10% 남았습니다.',
  SINGLE_USAGE_THRESHOLD_30: () => '데이터 잔여량이 30% 남았습니다.',
  SINGLE_USAGE_THRESHOLD_50: () => '데이터 잔여량이 50% 남았습니다.',

  // 시간 차단 정책
  TIME_WINDOW_POLICY_APPLIED: (params) => `“${params.policyName}” 시간 차단 정책이 적용되었습니다.`,
  TIME_WINDOW_POLICY_RELEASED: (params) =>
    `“${params.policyName}” 시간 차단 정책이 해제되었습니다.`,
};
