import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Button } from '@hotspot/ui/components';
import { useCallback, useState } from 'react';
import { usePriorityOrder } from '../model/usePriorityOrder';
import { OrderItem } from './OrderItem';

export const PolicyPriorityList = () => {
  const [isEditing, setIsEditing] = useState(false);
  //나중에 usePriorityOrder에서 useQuery
  const { members, handleDragEnd, moveStep } = usePriorityOrder([
    { id: 1, limit: 30.0, name: '김철수' },
    { id: 2, limit: 20.5, name: '이영희' },
    { id: 3, limit: 20.0, name: '박민수' },
  ]);

  const toggleEditing = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

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
                  key={member.id}
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
