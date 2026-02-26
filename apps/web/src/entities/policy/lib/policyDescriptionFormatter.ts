const DAY_MAP: Record<string, string> = {
  FRI: '금',
  MON: '월',
  SAT: '토',
  SUN: '일',
  THU: '목',
  TUE: '화',
  WED: '수',
};

export const policyDescriptionFormatter = (
  days: string[],
  startTime: string,
  endTime: string,
): string => {
  if (!days || days.length === 0) return '';

  const korDays = days.map((day) => DAY_MAP[day] || day).join(', ');

  return `${korDays} ${startTime}~${endTime}`;
};
