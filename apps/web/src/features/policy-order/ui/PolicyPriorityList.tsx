import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Button } from '@hotspot/ui/components';
import { useCallback, useState } from 'react';
import type { FamilyPriority } from '@/entities/policy-order/model/type';
import { usePriorityOrder } from '../model/usePriorityOrder';
import { OrderItem } from './OrderItem';

interface PolicyPriorityListProps {
  data: FamilyPriority;
}

export const PolicyPriorityList = ({ data }: PolicyPriorityListProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { members, handleDragEnd, moveStep, updatePriority } = usePriorityOrder(data);

  const toggleEditing = useCallback(() => {
    isEditing && updatePriority.mutate();
    setIsEditing((prev) => !prev);
  }, [updatePriority, isEditing]);

  return (
    <div className="w-full mx-auto bg-white">
      <header className="flex justify-between items-center mb-3">
        <h3 className="text-base font-bold">우선순위 설정</h3>
      </header>

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

      <footer className="mt-4">
        <Button onClick={toggleEditing} variant={isEditing ? 'solid' : 'outline'}>
          {isEditing ? '저장' : '편집'}
        </Button>
      </footer>
    </div>
  );
};
