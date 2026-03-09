import type { FamilyPriority } from '@entities/policy';
import { PolicyOrderSelector, PolicyPriorityList, useFifoOrder } from '@features/policy-order';
import { Button } from '@hotspot/ui';
import { useCallback, useState } from 'react';
import { usePriorityOrder } from '@/features/policy-order/model/usePriorityOrder';

interface OrderSectionProps {
  data: FamilyPriority;
}

export const OrderSection = ({ data }: OrderSectionProps) => {
  const [policy, setPolicy] = useState<'FIFO' | 'PRIORITY'>(data.priorityType);
  const [isEditing, setIsEditing] = useState(false);

  const { updateFifo } = useFifoOrder();
  const { members, handleDragEnd, moveStep, updatePriority, reset } = usePriorityOrder(data);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = () => {
    if (policy === 'FIFO') {
      updateFifo.mutate(data.familyId);
    } else {
      updatePriority.mutate();
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setPolicy(data.priorityType);
    setIsEditing(false);
  };

  return (
    <div className="p-5 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-base font-bold">데이터 우선순위</p>
          <p className="text-sm font-normal text-gray-600">데이터 할당 방식을 선택하세요</p>
        </div>

        <div className="flex gap-2">
          {!isEditing ? (
            <Button className="w-fit h-fit px-2 py-1" onClick={handleEditClick} variant="outline">
              편집
            </Button>
          ) : (
            <>
              <Button className="w-fit h-fit px-2 py-1" onClick={handleCancel} variant="ghost">
                취소
              </Button>
              <Button className="w-fit h-fit px-2 py-1" onClick={handleSave} variant="solid">
                저장
              </Button>
            </>
          )}
        </div>
      </div>

      <PolicyOrderSelector
        isEditing={isEditing}
        policy={policy}
        setPolicy={(type) => isEditing && setPolicy(type)}
      />

      <div className="flex flex-col justify-center mt-4">
        {policy === 'FIFO' ? (
          <div className="bg-gray-100 p-4 rounded-2xl">
            <p className="text-sm text-gray-500 leading-relaxed">
              선착순 모드에서는 데이터를 먼저 사용하는 구성원 순서대로 할당됩니다.
            </p>
          </div>
        ) : (
          <PolicyPriorityList
            isEditing={isEditing}
            members={members}
            onDragEnd={handleDragEnd}
            onMove={moveStep}
          />
        )}
      </div>
    </div>
  );
};
