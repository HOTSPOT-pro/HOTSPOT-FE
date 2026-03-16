import type { DayType } from '@domains/analyze';
import { Button, Modal, useModal } from '@hotspot/ui';
import { useForm } from 'react-hook-form';
import { usePostSubscribe } from '../model/usePostSubscribe';
import { useUpdateReceiveDay } from '../model/useUpdateReceiveDay';

const DAY_OPTIONS: { label: string; value: DayType }[] = [
  { label: '월', value: 'MONDAY' },
  { label: '화', value: 'TUESDAY' },
  { label: '수', value: 'WEDNESDAY' },
  { label: '목', value: 'THURSDAY' },
  { label: '금', value: 'FRIDAY' },
  { label: '토', value: 'SATURDAY' },
  { label: '일', value: 'SUNDAY' },
];

interface DaySelectorModalProps {
  type: 'NEW' | 'EDIT';
  defaultDay?: DayType;
  [key: string]: unknown;
}

export const DaySelectorModal = ({ close }: { close: () => void }) => {
  const { getProps } = useModal();
  const props = getProps<DaySelectorModalProps>();

  const { watch, setValue } = useForm({
    defaultValues: {
      selectedDay: props?.defaultDay || null,
    },
  });
  const selectedDay = watch('selectedDay');

  const { subscribe } = usePostSubscribe();
  const { updateReceiveDay } = useUpdateReceiveDay();

  const handleSave = () => {
    if (!selectedDay) return;
    if (props?.type === 'NEW') {
      subscribe.mutate(selectedDay);
    } else {
      updateReceiveDay.mutate(selectedDay);
    }
    close();
  };

  return (
    <div>
      {/*TODO: 모달 스타일 빼기*/}
      <Modal className="w-122 max-w-[calc(100vw-1rem)] max-h-[92vh] overflow-y-auto rounded-3xl p-6">
        <Modal.Header>
          <Modal.Title>
            리포트 수령일
            <p className="text-[13px] font-normal text-gray-600">
              수령일 전날을 기준으로 리포트를 생성합니다.
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Content>
          <div className="flex flex-row gap-2 py-2 items-center justify-center w-full">
            {DAY_OPTIONS.map((day) => {
              const isSelected = selectedDay === day.value;
              return (
                <button
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    isSelected
                      ? 'bg-purple-600 border-purple-600 text-white shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                  key={day.value}
                  onClick={() => {
                    const nextValue = isSelected ? null : day.value;
                    setValue('selectedDay', nextValue, { shouldValidate: true });
                  }}
                  type="button"
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </Modal.Content>
        <Modal.Footer>
          {props?.type === 'EDIT' && (
            <p className="text-[13px] font-normal text-red-500">
              *수령일 변경은 다음주부터 반영됩니다.
            </p>
          )}
          <div className="flex flex-row">
            <Button disabled={!watch().selectedDay} onClick={handleSave}>
              저장
            </Button>
            <Button onClick={close} variant="ghost">
              취소
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
