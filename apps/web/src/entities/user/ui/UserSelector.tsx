import type { UserListItem } from '../model/types';
import { UserChip } from './UserChip';

interface UserSelectorProps<T extends UserListItem> {
  users: T[];
  selectedUser: T;
  onSelect: (user: T) => void;
}

export const UserSelector = <T extends UserListItem>({
  users,
  selectedUser,
  onSelect,
}: UserSelectorProps<T>) => {
  return (
    <div className="flex gap-2">
      {users.map((user, index) => (
        <UserChip
          isSelected={selectedUser.id === user.id}
          key={user.id ?? index}
          onSelect={() => onSelect(user)}
          user={user}
        />
      ))}
    </div>
  );
};
