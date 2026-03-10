import { DragDropContext, Draggable, Droppable, type DropResult } from '@hello-pangea/dnd';
import { Button } from '@hotspot/ui';
import DownIcon from '@hotspot/ui/assets/icons/arrow-down.svg';
import UpIcon from '@hotspot/ui/assets/icons/arrow-up.svg';
import MoreIcon from '@hotspot/ui/assets/icons/more-vertical.svg';
import { useEffect, useState } from 'react';
import type { MemberControl, MemberControlItem } from '@/domains/member-control';
import { CategorySelect } from '@/shared';
import { useFamilyOrder } from '../model/useFamilyOrder';
import { moveListStep, refreshPriorityOrder, reorderList } from '../util/OrderFunctions';

interface FamilyOrderSectionProps {
  familyId: number;
  familyControlData?: MemberControl;
}

export const FamilyOrderSection = ({ familyId, familyControlData }: FamilyOrderSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  console.log(familyControlData?.priorityType);
  const [selectedType, setSelectedType] = useState<'FIFO' | 'PRIORITY'>(
    familyControlData?.priorityType ?? 'FIFO',
  );
  const [members, setMembers] = useState<MemberControlItem[]>([]);
  const { updatePriority } = useFamilyOrder({ familyId });

  useEffect(() => {
    if (familyControlData) {
      setSelectedType(familyControlData.priorityType);
      if (familyControlData.members) {
        const sorted = [...familyControlData.members].sort(
          (a, b) => a.priorityOrder - b.priorityOrder,
        );
        setMembers(sorted);
      }
    }
  }, [familyControlData]);

  const typeName = selectedType === 'FIFO' ? '선착순' : '우선순위순';

  const onDragEnd = (result: DropResult) => {
    if (!(result.destination && isEditing)) return;
    const updated = reorderList(members, result.source.index, result.destination.index);
    setMembers(updated);
  };

  const moveStep = (index: number, direction: 'UP' | 'DOWN') => {
    const updated = moveListStep(members, index, direction);
    setMembers(updated);
  };

  const handleTypeChange = (value: 'FIFO' | 'PRIORITY') => {
    setSelectedType(value);
    if (value === 'PRIORITY' && members.some((m) => m.priorityOrder <= 0)) {
      setMembers(refreshPriorityOrder(members));
    }
  };

  const handleSave = async () => {
    const memberPriorities = members.map((member) => ({
      priority: member.priorityOrder,
      subId: member.subId,
    }));

    try {
      await updatePriority.mutateAsync({
        memberPriorities,
        priorityType: selectedType,
      });

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="w-full">
          <h3 className="text-[14px] font-bold text-black mb-1">데이터 사용 우선순위</h3>
          <p className="text-[11px] text-gray-600">
            낮은 숫자가 높은 우선순위입니다. 데이터 부족 시 우선순위가 먼저 할당됩니다.
          </p>
        </div>

        <div className="flex flex-row gap-2">
          {isEditing ? (
            <div className="border border-gray-300 rounded-sm flex items-center justify-center">
              <CategorySelect
                className="w-30"
                onChange={(value: 'FIFO' | 'PRIORITY') => handleTypeChange(value)}
                options={[
                  { label: '선착순', value: 'FIFO' },
                  { label: '우선순위순', value: 'PRIORITY' },
                ]}
                value={selectedType}
              />
            </div>
          ) : (
            <div className="bg-gray-100 flex w-30 items-center gap-2 rounded-md p-2 text-[0.8rem] font-semibold text-black">
              {typeName}
            </div>
          )}

          <Button
            className="w-fit px-6"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            variant={isEditing ? 'solid' : 'outline'}
          >
            {isEditing ? '저장' : '편집'}
          </Button>
          {isEditing && (
            <Button
              className="w-fit px-6"
              onClick={() => {
                setSelectedType(familyControlData?.priorityType ?? 'FIFO');
                setMembers(
                  [...(familyControlData?.members ?? [])].sort(
                    (a, b) => a.priorityOrder - b.priorityOrder,
                  ),
                );
                setIsEditing(false);
              }}
              variant="outline"
            >
              취소
            </Button>
          )}
        </div>
      </div>

      {selectedType === 'PRIORITY' && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="member-priority-list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                className="flex flex-col gap-3"
                ref={provided.innerRef}
              >
                {members.map((member, index) => (
                  <Draggable
                    draggableId={String(member.subId)}
                    index={index}
                    isDragDisabled={!isEditing}
                    key={member.subId}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                          snapshot.isDragging
                            ? 'bg-purple-50 border-purple-300 shadow-lg scale-[1.02]'
                            : 'bg-white border-gray-100'
                        } ${!isEditing && 'opacity-90'}`}
                        style={provided.draggableProps.style}
                      >
                        <MoreIcon className="w-6 h-6 text-gray-300 cursor-grab" />
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-purple-600 font-bold text-sm">
                          {index + 1}
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{member.memberName}</p>
                          <p className="text-xs text-gray-400">{member.familyRole}</p>
                        </div>

                        {isEditing && (
                          <div className="flex items-center gap-2">
                            <button
                              aria-label={`${member.memberName} 우선순위를 위로 이동`}
                              className="p-1 hover:bg-gray-100 rounded disabled:opacity-20"
                              disabled={index === 0}
                              onClick={() => moveStep(index, 'UP')}
                              type="button"
                            >
                              <UpIcon aria-hidden="true" className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              aria-label={`${member.memberName} 우선순위를 아래로 이동`}
                              className="p-1 hover:bg-gray-100 rounded disabled:opacity-20"
                              disabled={index === members.length - 1}
                              onClick={() => moveStep(index, 'DOWN')}
                              type="button"
                            >
                              <DownIcon aria-hidden="true" className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};
