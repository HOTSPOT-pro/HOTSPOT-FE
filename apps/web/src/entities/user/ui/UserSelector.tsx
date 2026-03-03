import type { ReportUser } from '@/entities/report';
import { UserChip } from './UserChip';

interface UserSelectorProps<T extends ReportUser> {
  users: T[];
  selectedUser: T;
  onSelect: (user: T) => void;
}

export const UserSelector = <T extends ReportUser>({
  users,
  selectedUser,
  onSelect,
}: UserSelectorProps<T>) => {
  return (
    <div className="flex gap-2">
      {users.map((user, index) => (
        <UserChip
          isSelected={selectedUser.subId === user.subId}
          key={user.subId ?? index}
          onSelect={() => onSelect(user)}
          user={user}
        />
      ))}
    </div>
  );
};
