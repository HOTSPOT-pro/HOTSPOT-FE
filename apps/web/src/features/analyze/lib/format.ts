import type { CategoryType, DayType, TagType } from '@/domains/analyze';

export const DAY_LABELS: Record<DayType, string> = {
  FRIDAY: '금',
  MONDAY: '월',
  SATURDAY: '토',
  SUNDAY: '일',
  THURSDAY: '목',
  TUESDAY: '화',
  WEDNESDAY: '수',
};

export const CATEGORY_LABELS: Record<CategoryType, string> = {
  etc: '기타',
  FIN: '금융',
  GAME: '게임',
  GIFT: '선물',
  MEDIA: '미디어',
  MSG: '메신저',
  SNS: 'SNS',
  STUDY: '학습',
  TOON: '툰',
  WEB: '웹',
};

export const CATEGORY_COLORS: Record<CategoryType, string> = {
  etc: '#008FFA',
  FIN: '#A700FA',
  GAME: '#7C3AED',
  GIFT: '#A78B00',
  MEDIA: '#8B5CF6',
  MSG: '#DDD6FE',
  SNS: '#C4B5FD',
  STUDY: '#A78BFA',
  TOON: '#A78BFF',
  WEB: '#008BFA',
};

export const TAG_LABELS: Record<TagType, { label: string; icon: string }> = {
  ENTERTAINMENT_HEAVY: { icon: '�', label: '엔터테인먼트 집중' },
  LATE_NIGHT_HIGH: { icon: '🌙', label: '심야 사용 높음' },
  STUDY_FOCUSED: { icon: '📚', label: '학습 집중' },
  USAGE_SPIKE: { icon: '⚡', label: '엔터테인먼트 집중' },
};

export const formatGB = (gb: number): string => `${gb}GB`;

export const formatReportTitle = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const date = start.getDate();
  const day = start.getDay();
  const weekNumber = Math.ceil((date + (6 - day === 6 ? 0 : 6 - day)) / 7);

  const month = start.getMonth() + 1;
  const startDay = start.getDate();
  const endDay = end.getDate();

  return `${start.getFullYear()}년 ${month}월 ${weekNumber}주차 리포트 (${month}/${startDay}~${month}/${endDay})`;
};
