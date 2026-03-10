import type { MemberPriority } from '@entities/policy';
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd';
import { OrderItem } from './OrderItem';

interface PolicyPriorityListProps {
  isEditing: boolean;
  members: MemberPriority[];
  onDragEnd: (result: DropResult, isEditing: boolean) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
}

export const PolicyPriorityList = ({
  isEditing,
  members,
  onDragEnd,
  onMove,
}: PolicyPriorityListProps) => {
  return (
    <div className="w-full mx-auto">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, isEditing)}>
        <Droppable droppableId="member-list">
          {(provided) => (
            <div
              className="flex flex-col gap-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {members.map((member, index) => (
                <OrderItem
                  index={index}
                  isEditing={isEditing}
                  isLast={index === members.length - 1}
                  key={member.subId}
                  member={member}
                  onMove={onMove}
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
