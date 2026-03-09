import ScrollContainer from 'react-indiana-drag-scroll';
import type { ReportUser } from '@/entities/report';
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
      {/* ScrollContainer가 기존의 scrollRef와 overflow 로직을 대체합니다.
        nativeMobileScroll: 모바일에서의 네이티브 스크롤 감도를 유지합니다.
        hideScrollbars: 라이브러리 차원에서 스크롤바를 숨길 수 있습니다.
      */}
      <ScrollContainer
        className="flex gap-2 py-2 px-4 select-none cursor-grab active:cursor-grabbing"
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
