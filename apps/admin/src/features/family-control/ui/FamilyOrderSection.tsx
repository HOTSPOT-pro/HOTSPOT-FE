import { DragDropContext, Draggable, Droppable, type DropResult } from '@hello-pangea/dnd';
import { Button } from '@hotspot/ui';
import DownIcon from '@hotspot/ui/assets/icons/arrow-down.svg';
import UpIcon from '@hotspot/ui/assets/icons/arrow-up.svg';
import MoreIcon from '@hotspot/ui/assets/icons/more-2.svg';
import { useEffect, useState } from 'react';
import { Dropdown } from '@/shared/ui/dropdown/Dropdown';
import type { MemberControl, MemberControlItem } from '../model/types';
import { useFamilyOrder } from '../model/useFamilyOrder';

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

  const reorderAndSet = (newList: MemberControlItem[]) => {
    const updated = newList.map((item, index) => ({
      ...item,
      priorityOrder: index + 1,
    }));
    setMembers(updated);
  };

  const onDragEnd = (result: DropResult) => {
    if (!(result.destination && isEditing)) return;
    const items = Array.from(members);
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (reorderedItem) {
      items.splice(result.destination.index, 0, reorderedItem);
      reorderAndSet(items);
    }
  };

  const moveStep = (index: number, direction: 'UP' | 'DOWN') => {
    const newIndex = direction === 'UP' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= members.length) return;

    const items = Array.from(members);
    const currentItem = items[index];
    const targetItem = items[newIndex];

    if (currentItem && targetItem) {
      items[index] = targetItem;
      items[newIndex] = currentItem;
      reorderAndSet(items);
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
    } catch (error) {}
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">데이터 사용 우선순위</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            낮은 숫자가 높은 우선순위입니다. 데이터 부족 시 우선순위가 먼저 할당됩니다.
          </p>
        </div>

        <Button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          variant={isEditing ? 'solid' : 'outline'}
        >
          {isEditing ? '저장' : '편집'}
        </Button>
      </div>

      <div className="w-35 mb-6">
        {isEditing ? (
          <Dropdown
            items={[
              { label: '선착순', onClick: () => setSelectedType('FIFO') },
              { label: '우선순위순', onClick: () => setSelectedType('PRIORITY') },
            ]}
            label={typeName}
          />
        ) : (
          <div className="px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-[12px] text-gray-500 w-fit">
            {typeName}
          </div>
        )}
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
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-purple-600 font-bold text-sm">
                          {index + 1}
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{member.memberName}</p>
                          <p className="text-xs text-gray-400">{member.familyRole}</p>
                        </div>

                        {isEditing && (
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col border-r border-gray-100 pr-2 mr-2">
                              <button
                                className="p-1 hover:bg-gray-100 rounded disabled:opacity-20"
                                disabled={index === 0}
                                onClick={() => moveStep(index, 'UP')}
                                type="button"
                              >
                                <UpIcon className="w-4 h-4 text-gray-600" />
                              </button>
                              <button
                                className="p-1 hover:bg-gray-100 rounded disabled:opacity-20"
                                disabled={index === members.length - 1}
                                onClick={() => moveStep(index, 'DOWN')}
                                type="button"
                              >
                                <DownIcon className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                            <MoreIcon className="w-6 h-6 text-gray-300 cursor-grab" />
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
