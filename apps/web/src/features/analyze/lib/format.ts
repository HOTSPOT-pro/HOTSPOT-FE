import type { CategoryType, DayType } from '@/domains/analyze';

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

export const formatGB = (gb: number): string => `${gb}GB`;

export const formatReportTitle = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  //해당 월의 첫 번째 월요일 기준
  const date = start.getDate();
  const day = start.getDay();
  const adjustedDay = day === 0 ? 7 : day;
  const weekNumber = Math.ceil((date + (7 - adjustedDay)) / 7);

  const startMonth = start.getMonth() + 1;
  const endMonth = end.getMonth() + 1;
  const startDay = start.getDate();
  const endDay = end.getDate();

  return `${start.getFullYear()}년 ${startMonth}월 ${weekNumber}주차 리포트 (${startMonth}/${startDay}~${endMonth}/${endDay})`;
};
