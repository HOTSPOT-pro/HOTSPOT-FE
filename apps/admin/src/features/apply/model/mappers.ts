import type { ApplicationStatus } from '../api/types';

export const STATUS_ITEMS: ReadonlyArray<{ label: string; value: ApplicationStatus }> = [
  { label: '대기 중', value: 'PENDING' },
  { label: '승인 완료', value: 'APPROVED' },
  { label: '승인 거절', value: 'REJECTED' },
  { label: '취소', value: 'CANCELED' },
];

export const statusLabelMap: Record<ApplicationStatus, string> = {
  APPROVED: '승인 완료',
  CANCELED: '취소',
  PENDING: '대기 중',
  REJECTED: '승인 거절',
};

export const statusBadgeMap: Record<ApplicationStatus, string> = {
  APPROVED: 'bg-emerald-100 text-emerald-700',
  CANCELED: 'bg-gray-100 text-gray-700',
  PENDING: 'bg-amber-100 text-amber-700',
  REJECTED: 'bg-rose-100 text-rose-700',
};
