import { memo } from 'react';
import { Chip } from '@/shared/ui';

interface BaseUser {
  id: number | null;
  name?: string | null;
}

export const UserChip = memo(
  <T extends BaseUser>({
    user,
    isSelected,
    onSelect,
  }: {
    user: T;
    isSelected: boolean;
    onSelect: (user: T) => void;
  }) => <Chip isSelected={isSelected} label={user.name || '전체'} onClick={() => onSelect(user)} />,
);
