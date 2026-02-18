'use client';

import { Chip } from '@shared/ui';
import type { ReportUser } from '@/entities/report';

interface UserSelectorProps {
  users: ReportUser[];
  selectedUser: ReportUser;
  onSelect: ({ id, name }: ReportUser) => void;
}

export const UserSelector = ({ users, selectedUser, onSelect }: UserSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 pb-6">
      {users.map((user) => (
        <Chip
          isSelected={selectedUser.id === user.id}
          key={user.id}
          label={user.name || '전체'}
          onClick={() => onSelect({ id: user.id, name: user.name })}
        />
      ))}
    </div>
  );
};
