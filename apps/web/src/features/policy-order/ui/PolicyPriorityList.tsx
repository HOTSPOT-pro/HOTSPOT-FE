import type { FamilyPriority } from '@entities/policy';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { OrderItem } from './OrderItem';

interface PolicyPriorityListProps {
  data: FamilyPriority;
  isEditing: boolean;
}

interface PolicyPriorityListProps {
  isEditing: boolean;
  members: any[];
  onDragEnd: any;
  onMove: any;
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
