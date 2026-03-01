import type { MemberPriority } from '@/entities/policy-order/model/type';

export const getSortedMembers = (data: MemberPriority[]) => {
  return [...data].sort((a, b) => {
    const aValid = a.priority >= 0;
    const bValid = b.priority >= 0;
    if (aValid && bValid) return a.priority - b.priority;
    if (aValid) return -1;
    if (bValid) return 1;
    return 0;
  });
};
