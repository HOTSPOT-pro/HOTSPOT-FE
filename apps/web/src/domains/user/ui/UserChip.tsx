import { memo } from 'react';
import type { ReportUser } from '@/domains/report';
import { Chip } from '@/shared/ui';

export const UserChip = memo(
  <T extends ReportUser>({
    user,
    isSelected,
    onSelect,
  }: {
    user: T;
    isSelected: boolean;
    onSelect: (user: T | ReportUser) => void;
  }) => (
    <Chip
      isSelected={isSelected}
      label={user.name || '전체'}
      onClick={() => {
        user.subId === null ? onSelect({ name: null, subId: null }) : onSelect(user);
      }}
    />
  ),
);
