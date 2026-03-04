import { cn } from '@hotspot/ui';
import type { PresentSubUsage } from '../model/types';

interface PresentFamilyListProps {
  data: PresentSubUsage[];
  handleSelect: (subId: number) => void;
  selected: number | null;
}

export const PresentFamilyList = ({ data, handleSelect, selected }: PresentFamilyListProps) => {
  return (
    <div className="p-5 flex flex-col gap-1">
      <p className="text-[13px] font-bold">선물 받을 구성원</p>
      <p className="text-gray-500 text-[11px]">데이터를 선물할 가족 구성원을 선택하세요.</p>
      <div className="flex flex-col gap-2 pt-3">
        {data.map((i, index) => (
          <button key={index} onClick={() => handleSelect(i.subId)} type="button">
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
        'border px-4 py-3.5 rounded-2xl text-left',
        isSelected
          ? 'border-purple-600 bg-purple-100 shadow-[0_0_0_2px_#8854E3]'
          : 'bg-gray-100 border-gray-100',
      )}
    >
      <p className="text-[14px] font-bold">{user.subName}</p>
      <div className="flex flex-row gap-2">
        <p className="text-[11px] font-normal text-gray-500">
          {user.subDataUsageAmount}/{user.subDataLimitAmount}
        </p>
        <p className="text-[11px]">{user.dataUsagePercent}%</p>
      </div>
    </div>
  );
};
