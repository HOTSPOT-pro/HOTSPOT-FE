import { memo } from 'react';
import { Chip } from '@/shared/ui';
import type { ReportUser } from '../model/type';

export const UserChip = memo(
  ({
    user,
    isSelected,
    onSelect,
  }: {
    user: ReportUser;
    isSelected: boolean;
    onSelect: (user: ReportUser) => void;
  }) => (
    <Chip
      isSelected={isSelected}
      key={user.id}
      label={user.name || '전체'}
      onClick={() => onSelect(user)} // 여기서 익명 함수를 써도, UserItem이 memo되어 있어 부모 영향 X
    />
  ),
);
