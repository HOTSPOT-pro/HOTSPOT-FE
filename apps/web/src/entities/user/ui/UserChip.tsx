import { memo } from 'react';
import { Chip } from '@/shared/ui';
import type { UserListItem } from '../model/types';

export const UserChip = memo(
  <T extends UserListItem>({
    user,
    isSelected,
    onSelect,
  }: {
    user: T;
    isSelected: boolean;
    onSelect: (user: T) => void;
  }) => <Chip isSelected={isSelected} label={user.name || '전체'} onClick={() => onSelect(user)} />,
);
