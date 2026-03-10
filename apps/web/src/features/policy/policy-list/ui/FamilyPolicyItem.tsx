import { cn, useModal } from '@hotspot/ui';
import MoreIcon from '@hotspot/ui/assets/icons/more-vertical.svg';
import { useEffect, useRef, useState } from 'react';
import type { GetFamilyCustomPolicy } from '../model/types';

interface FamilyPolicyItemProps {
  data: GetFamilyCustomPolicy;
  onEdit: () => void;
  onActiving: () => void;
}

const DAY_ORDER = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const DAY_LABEL_MAP: Record<string, string> = {
  FRIDAY: '금',
  MONDAY: '월',
  SATURDAY: '토',
  SUNDAY: '일',
  THURSDAY: '목',
  TUESDAY: '화',
  WEDNESDAY: '수',
};

export const FamilyPolicyItem = ({ data, onEdit, onActiving }: FamilyPolicyItemProps) => {
  const { open } = useModal();

  const sortedDays = data.policySnapshot.days
    ? [...data.policySnapshot.days].sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b))
    : [];

  const handleOpenDeleteModal = () => {
    open('deleteFamilyPolicyModal', {
      props: {
        policyId: data.id,
        policyName: data.name,
      },
    });
  };

  return (
    <div
      className={`flex flex-row justify-between border p-3 rounded-sm gap-4 items-start transition-colors ${
        data.isActive ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'
      }`}
    >
      <div className={`flex flex-col gap-1 ${!data.isActive && 'opacity-60'}`}>
        <div className="flex flex-row items-center gap-2">
          <span className={`font-bold ${!data.isActive && 'text-gray-500'}`}>{data.name}</span>
          <span
            className={cn(
              'text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase',
              !data.isActive && 'bg-gray-200 text-gray-500',
              data.isActive && data.policyType === 'SCHEDULED' && 'bg-purple-100 text-purple-600',
              data.isActive && data.policyType !== 'SCHEDULED' && 'bg-lime-100 text-lime-600',
            )}
          >
            {data.policyType === 'SCHEDULED' ? '반복' : '일회성'}
          </span>
          {!data.isActive && <span className="text-[10px] text-gray-400 font-medium">비활성</span>}
        </div>

        <span className="text-[13px] text-gray-600 break-keep">{data.policyDescription}</span>

        <div className="flex items-center gap-1 bg-white/50 w-fit px-2 rounded-sm border border-gray-100">
          <div className="flex items-center text-[11px] text-gray-600 py-1">
            <span>
              {data.policySnapshot.durationMinutes
                ? `${data.policySnapshot.durationMinutes}분 차단`
                : `${data.policySnapshot.startTime}~${data.policySnapshot.endTime}`}
            </span>
          </div>
          {sortedDays.length > 0 && (
            <div className="flex text-[11px] text-gray-600 gap-1">
              |
              {sortedDays.map((day) => (
                <span key={day}>{DAY_LABEL_MAP[day] || day}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <PolicyActionMenu
        isActive={data.isActive}
        onActiving={onActiving}
        onDelete={handleOpenDeleteModal}
        onEdit={onEdit}
      />
    </div>
  );
};

interface PolicyActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  isActive: boolean;
  onActiving: () => void;
}

export const PolicyActionMenu = ({
  onEdit,
  onDelete,
  isActive,
  onActiving,
}: PolicyActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <MoreIcon className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-xl z-20 py-1 overflow-hidden animate-in fade-in zoom-in duration-150">
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
            type="button"
          >
            정책 편집
          </button>
          <button
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
              isActive ? 'text-red-500' : 'text-lime-600'
            }`}
            onClick={() => {
              onActiving();
              setIsOpen(false);
            }}
            type="button"
          >
            {isActive ? '정책 비활성화' : '정책 활성화'}
          </button>
          <div className="border-t border-gray-100 my-1" />
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            type="button"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
};
