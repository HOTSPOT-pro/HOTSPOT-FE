import ScrollContainer from 'react-indiana-drag-scroll';
import type { ReportUser } from '@/domains/report';
import { UserChip } from './UserChip';

interface UserSelectorProps<T extends ReportUser> {
  users: T[];
  selectedUser: T;
  onSelect: (user: ReportUser) => void;
}

export const UserSelector = <T extends ReportUser>({
  users,
  selectedUser,
  onSelect,
}: UserSelectorProps<T>) => {
  return (
    <div className="w-full">
      <ScrollContainer
        className="flex gap-4 select-none cursor-grab active:cursor-grabbing"
        hideScrollbars={true}
        nativeMobileScroll={true}
      >
        {users.map((user, index) => (
          <div className="shrink-0" key={user.subId ?? index}>
            <UserChip
              isSelected={selectedUser.subId === user.subId}
              onSelect={onSelect}
              user={user}
            />
          </div>
        ))}
      </ScrollContainer>
    </div>
  );
};
