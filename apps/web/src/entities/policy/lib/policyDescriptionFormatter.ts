import type { Policy } from '../model/types';

const DAY_MAP: Record<string, string> = {
  FRIDAY: '금',
  MONDAY: '월',
  SATURDAY: '토',
  SUNDAY: '일',
  THURSDAY: '목',
  TUESDAY: '화',
  WEDNESDAY: '수',
};

export const policyDescriptionFormatter = (policy: Policy): string => {
  const { policyType, policySnapshot } = policy;
  const { days, durationMinutes, startTime, endTime } = policySnapshot;

  if (policyType === 'SCHEDULED') {
    const korDays = days ? days.map((day) => DAY_MAP[day] || day).join(', ') : '';
    return `${korDays} ${startTime}~${endTime}`;
  }

  if (policyType === 'ONCE') {
    if (startTime && endTime) {
      return `${startTime}~${endTime}`;
    }
    if (durationMinutes) {
      return `${durationMinutes}분`;
    }
  }
  return '정보 없음';
};
