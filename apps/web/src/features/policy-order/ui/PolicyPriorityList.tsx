import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Button } from '@hotspot/ui/components';
import { cn } from '@hotspot/ui/lib';
import { useState } from 'react';
import { usePriorityOrder } from '../model/usePriorityOrder';
import { MemberItem } from './OrderItem';

export const PolicyPriorityList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { members, handleDragEnd, moveStep } = usePriorityOrder([
    { id: 1, limit: 30.0, name: '김철수' },
    { id: 2, limit: 20.5, name: '이영희' },
    { id: 3, limit: 20.0, name: '박민수' },
  ]);

  return (
    <div className="w-full max-w-md mx-auto bg-white">
      <header className="flex justify-between items-center mb-3">
        <h3 className="text-base font-bold">우선순위 설정</h3>
      </header>

      <DragDropContext onDragEnd={(result) => handleDragEnd(result, isEditing)}>
        <Droppable droppableId="member-list">
          {(provided) => (
            <div {...provided.droppableProps} className="space-y-2" ref={provided.innerRef}>
              {members.map((member, index) => (
                <MemberItem
                  index={index}
                  isEditing={isEditing}
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
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? 'solid' : 'outline'}>
          {isEditing ? '저장' : '편집'}
        </Button>
      </footer>
    </div>
  );
};
