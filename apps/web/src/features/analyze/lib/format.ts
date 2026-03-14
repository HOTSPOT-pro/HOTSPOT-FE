import type { CategoryType, DayType, TagType } from '@/domains/analyze';

export const formatDateRange = (start: string, end: string): string => {
  const s = new Date(start);
  const e = new Date(end);
  return `${s.getMonth() + 1}/${s.getDate()}~${e.getMonth() + 1}/${e.getDate()}`;
};

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
  game: '게임',
  media: '미디어',
  msg: '메신저',
  sns: 'SNS',
  study: '학습',
};

export const CATEGORY_COLORS: Record<CategoryType, string> = {
  game: '#7C3AED',
  media: '#8B5CF6',
  msg: '#DDD6FE',
  sns: '#C4B5FD',
  study: '#A78BFA',
};

export const TAG_LABELS: Record<TagType, { label: string; icon: string }> = {
  ENTERTAINMENT_HEAVY: { icon: '�', label: '엔터테인먼트 집중' },
  LATE_NIGHT_HIGH: { icon: '🌙', label: '심야 사용 높음' },
  STUDY_FOCUSED: { icon: '📚', label: '학습 집중' },
  USAGE_SPIKE: { icon: '⚡', label: '엔터테인먼트 집중' },
};

export const formatGB = (gb: number): string => `${gb}GB`;
