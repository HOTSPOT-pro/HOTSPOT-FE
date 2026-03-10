import { useModal } from '@hotspot/ui';
import DeleteIcon from '@hotspot/ui/assets/icons/close-circle.svg';
import EditIcon from '@hotspot/ui/assets/icons/pencil.svg';
import type { GetFamilyCustomPolicy } from '../model/types';

interface FamilyPolicyItemProps {
  data: GetFamilyCustomPolicy;
  onEdit: () => void;
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

export const FamilyPolicyItem = ({ data, onEdit }: FamilyPolicyItemProps) => {
  const sortedDays = data.policySnapshot.days
    ? [...data.policySnapshot.days].sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b))
    : [];

  const { open } = useModal();
  const handleOpenDeleteModal = () => {
    open('deleteFamilyPolicyModal', {
      props: {
        policyId: data.id,
        policyName: data.name,
      },
    });
  };

  return (
    <div className="flex flex-row justify-between border border-gray-200 p-3 rounded-sm gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <span className="font-bold">{data.name}</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
              data.policyType === 'SCHEDULED'
                ? 'bg-purple-100 text-purple-600'
                : 'bg-lime-100 text-lime-600'
            }`}
          >
            {data.policyType === 'SCHEDULED' ? '반복' : '일회성'}
          </span>
        </div>
        <span className="text-[13px] text-gray-600 break-keep">{data.policyDescription}</span>

        <div className="flex items-center gap-1 bg-gray-50 w-fit px-2 rounded-sm">
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
      <div className="flex flex-row gap-2">
        <button onClick={onEdit} type="button">
          <EditIcon className="text-gray-500 w-5 h-5" />
        </button>
        <button onClick={handleOpenDeleteModal} type="button">
          <DeleteIcon className="text-red-500 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
