import type { FamilyPriority } from '@domains/policy';
import { Button, Card } from '@hotspot/ui';
import { useCallback, useEffect, useState } from 'react';
import { useFifoOrder } from '../model/useFifoOrder';
import { usePriorityOrder } from '../model/usePriorityOrder';
import { PolicyOrderSelector } from './PolicyOrderSelector';
import { PolicyPriorityList } from './PolicyPriorityList';

interface OrderSectionProps {
  data: FamilyPriority;
}

export const OrderSection = ({ data }: OrderSectionProps) => {
  const [policy, setPolicy] = useState<'FIFO' | 'PRIORITY'>(data.priorityType);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setPolicy(data.priorityType);
    }
  }, [data.priorityType, isEditing]);

  const { updateFifo } = useFifoOrder();
  const { members, handleDragEnd, moveStep, updatePriority, reset } = usePriorityOrder(data);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = () => {
    if (policy === 'FIFO') {
      updateFifo.mutate(data.familyId, {
        onSuccess: () => setIsEditing(false),
      });
    } else {
      updatePriority.mutate(undefined, {
        onSuccess: () => setIsEditing(false),
      });
    }
  };

  const handleCancel = () => {
    reset();
    setPolicy(data.priorityType);
    setIsEditing(false);
  };

  return (
    <Card>
      <div className="flex flex-col gap-1">
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
    </Card>
  );
};
