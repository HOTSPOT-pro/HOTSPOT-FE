import type { Policy } from '@/domains/policy';
import type { DAYS } from '../model/types';

interface PolicyAdminItemProps {
  policy: Policy;
  onSelect: (policy: Policy) => void;
}

const DAY_OPTIONS: { label: string; value: DAYS }[] = [
  { label: '월', value: 'MONDAY' },
  { label: '화', value: 'TUESDAY' },
  { label: '수', value: 'WEDNESDAY' },
  { label: '목', value: 'THURSDAY' },
  { label: '금', value: 'FRIDAY' },
  { label: '토', value: 'SATURDAY' },
  { label: '일', value: 'SUNDAY' },
];

export const PolicyAdminItem = ({ policy, onSelect }: PolicyAdminItemProps) => {
  const getDayLabel = (dayValue: string) => {
    return DAY_OPTIONS.find((opt) => opt.value === dayValue)?.label || dayValue;
  };

  return (
    <button
      className="bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer 
                    hover:border-purple-300 transition-all hover:ring-2 hover:ring-purple-500 "
      key={policy.id}
      onClick={() => onSelect(policy)}
      type="button"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
            {policy.name}
          </span>
        </div>
        <div className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase">
          {policy.policyType === 'SCHEDULED' ? '반복' : '일회성'}
        </div>
      </div>

      <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
        {policy.policyDescription}
      </p>

      <div className="flex flex-wrap gap-2 items-center text-[11px] text-gray-600 bg-gray-50 p-2 rounded-lg">
        <div className="flex items-center gap-1">
          <span>
            {policy.policySnapshot.durationMinutes
              ? `${policy.policySnapshot.durationMinutes}분 차단`
              : `${policy.policySnapshot.startTime} ~ ${policy.policySnapshot.endTime}`}
          </span>
        </div>

        {policy.policySnapshot.days && (
          <>
            <div className="w-px h-2 bg-gray-300" />
            <div className="flex gap-1">
              {policy.policySnapshot.days.map((day) => (
                <span className="text-gray-600 font-medium" key={day}>
                  {getDayLabel(day)}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </button>
  );
};
