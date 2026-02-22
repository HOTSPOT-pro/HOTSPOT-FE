import { UserChip } from './UserChip';

interface UserSelectorProps<T extends { id: number | null; name: string | null }> {
  users: T[];
  selectedUser: T;
  onSelect: (user: T) => void;
}

export const UserSelector = <T extends { id: number | null; name: string | null }>({
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
