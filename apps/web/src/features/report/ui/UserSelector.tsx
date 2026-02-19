import { type ReportUser, UserChip } from '@/entities/report';

interface UserSelectorProps {
  users: ReportUser[];
  selectedUser: ReportUser;
  onSelect: ({ id, name }: ReportUser) => void;
}

export const UserSelector = ({ users, selectedUser, onSelect }: UserSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 pb-6">
      {users.map((user) => (
        <UserChip
          isSelected={selectedUser.id === user.id}
          key={user.id}
          onSelect={onSelect}
          user={user}
        />
      ))}
    </div>
  );
};
