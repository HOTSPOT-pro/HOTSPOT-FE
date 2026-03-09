import type { FamilyPriority } from '@entities/policy';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useEffect } from 'react';
import { usePriorityOrder } from '../model/usePriorityOrder';
import { OrderItem } from './OrderItem';

interface PolicyPriorityListProps {
  data: FamilyPriority;
  isEditing: boolean;
}

export const PolicyPriorityList = ({ data, isEditing }: PolicyPriorityListProps) => {
  const { members, handleDragEnd, moveStep, updatePriority } = usePriorityOrder(data);

  useEffect(() => {
    if (!isEditing) {
      updatePriority.mutate();
    }
  }, [isEditing, updatePriority]);

  return (
    <div className="w-full mx-auto bg-white">
      <h3 className="text-base font-bold mb-3">우선순위 설정</h3>

      <DragDropContext onDragEnd={(result) => handleDragEnd(result, isEditing)}>
        <Droppable droppableId="member-list">
          {(provided) => (
            <div {...provided.droppableProps} className="space-y-2" ref={provided.innerRef}>
              {members.map((member, index) => (
                <OrderItem
                  index={index}
                  isEditing={isEditing}
                  isLast={index === members.length - 1}
                  key={member.subId}
                  member={member}
                  onMove={moveStep}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
