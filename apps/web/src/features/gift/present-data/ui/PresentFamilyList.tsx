import { cn } from '@hotspot/ui';
import type { PresentSubUsage } from '../model/types';

interface PresentFamilyListProps {
  data: PresentSubUsage[];
  handleSelect: (subId: number) => void;
  selected: number | null;
}

export const PresentFamilyList = ({ data, handleSelect, selected }: PresentFamilyListProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-title-title3-semibold">선물 받을 구성원</p>
      <p className="text-gray-500 font-body-body3">데이터를 선물할 가족 구성원을 선택하세요.</p>
      <div className="flex flex-col gap-8 pt-12">
        {data.map((i, index) => (
          <button
            aria-pressed={selected === i.subId}
            key={index}
            onClick={() => handleSelect(i.subId)}
            type="button"
          >
            <PresentFamilyItem isSelected={selected === i.subId} user={i} />
          </button>
        ))}
      </div>
    </div>
  );
};

interface PresentFamilyItemProps {
  user: PresentSubUsage;
  isSelected: boolean;
}

const PresentFamilyItem = ({ user, isSelected }: PresentFamilyItemProps) => {
  return (
    <div
      className={cn(
        'border-2 px-16 py-3.5 rounded-2xl text-left flex flex-row justify-between items-center',
        isSelected ? 'border-purple-600 bg-purple-100' : 'bg-white border-gray-100',
      )}
    >
      <div>
        <p className="text-[14px] font-bold">{user.subName}</p>
        <p className="text-[11px] font-normal text-gray-500">
          {user.subDataLimitAmount === -1
            ? '무제한'
            : `사용량 ${user.subDataUsageAmount}GB / ${user.subDataLimitAmount}GB`}
        </p>
      </div>

      <p className="text-[16px] font-normal">
        {user.dataUsagePercent === -1 ? '무제한' : `${user.dataUsagePercent}%`}
      </p>
    </div>
  );
};
