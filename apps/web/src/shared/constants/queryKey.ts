export const SUBSCRIBE_KEYS = {
  history: (subId: number, yearMonth: string) => ['analyzeHistory', subId, yearMonth] as const,
  info: ['subscribeInfo'] as const,
  member: ['subscribeMember'] as const,
};
