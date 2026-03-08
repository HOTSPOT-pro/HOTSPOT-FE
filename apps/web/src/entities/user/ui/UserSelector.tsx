import LeftArrowIcon from '@hotspot/ui/assets/icons/arrow-left.svg';
import RightArrowIcon from '@hotspot/ui/assets/icons/arrow-right.svg';
import { useRef } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  // 이동 함수: 방향에 따라 200px씩 이동
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      const target =
        direction === 'left'
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        behavior: 'smooth',
        left: target,
      });
    }
  };

  return (
    <div className="relative flex items-center group w-full">
      {/* 왼쪽 버튼 */}
      <button
        className="absolute left-0 z-10 p-1 bg-white/80 rounded-full shadow-md hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => scroll('left')}
        type="button"
      >
        <LeftArrowIcon size={20} />
      </button>

      {/* 칩 리스트 컨테이너 */}
      <div
        className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-9 select-none scroll-smooth w-full"
        ref={scrollRef}
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
      </div>

      {/* 오른쪽 버튼 */}
      <button
        className="absolute right-0 z-10 p-1 bg-white/80 rounded-full shadow-md hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => scroll('right')}
        type="button"
      >
        <RightArrowIcon size={20} />
      </button>
    </div>
  );
};
