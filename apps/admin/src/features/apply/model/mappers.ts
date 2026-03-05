import type { ApplicationStatus } from '../api/types';

const STATUS_DEFINITIONS = [
  { badge: 'bg-amber-100 text-amber-700', label: '대기 중', value: 'PENDING' },
  { badge: 'bg-emerald-100 text-emerald-700', label: '승인 완료', value: 'APPROVED' },
  { badge: 'bg-rose-100 text-rose-700', label: '승인 거절', value: 'REJECTED' },
  { badge: 'bg-gray-100 text-gray-700', label: '취소', value: 'CANCELED' },
] as const;

export const STATUS_ITEMS: ReadonlyArray<{ label: string; value: ApplicationStatus }> =
  STATUS_DEFINITIONS.map(({ value, label }) => ({ label, value }));

export const statusLabelMap: Record<ApplicationStatus, string> = Object.fromEntries(
  STATUS_DEFINITIONS.map(({ value, label }) => [value, label]),
) as Record<ApplicationStatus, string>;

export const statusBadgeMap: Record<ApplicationStatus, string> = Object.fromEntries(
  STATUS_DEFINITIONS.map(({ value, badge }) => [value, badge]),
) as Record<ApplicationStatus, string>;
