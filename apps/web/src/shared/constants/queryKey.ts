export const SUBSCRIBE_KEYS = {
  history: (subId: number, yearMonth: string) => ['analyzeHistory', subId, yearMonth] as const,
  info: ['subscribeInfo'] as const,
  member: ['subscribeMember'] as const,
  report: (subId: number, reportId: number) => ['analyzeData', subId, reportId] as const,
};

export const POLICY_KEYS = {
  block: ['block'] as const,
  currentBlock: ['currentBlockedPoliciesStatus'] as const,
  datalimit: (subId: number) => ['datalimit', subId] as const,
  familyPolicy: ['familyPolicy'] as const,
  perFamily: ['policyPerFamily'] as const,
  policy: ['policy'] as const,
};

export const REPORT_KEYS = {
  service: (unit: 'MONTH' | 'DAY', date: Date, userId: number | null) =>
    ['serviceUsage', unit, date, userId] as const,
  usage: (unit: 'MONTH' | 'DAY', date: Date, userId: number | null) =>
    ['familyUsage', unit, date, userId] as const,
  user: ['reportUsers'] as const,
};

export const GIFT_KEYS = {
  receiveLog: ['presentReceiveLog'] as const,
  sendLog: ['presentSendLog'] as const,
  user: ['presentFamilyData'] as const,
};

export const NOTIFICATION_KEYS = {
  list: ['notifications'] as const,
  readCount: ['unreadCount'] as const,
  setting: ['notificationsSettings'] as const,
};
