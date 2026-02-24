import { Draggable } from '@hello-pangea/dnd';
import MoreIcon from '@hotspot/ui/assets/icons/more-2.svg';
import { cn } from '@hotspot/ui/lib';
import type { PolicyOrderMember } from '@/entities/policy-order';
import { useUserStore } from '@/features/user';
import { UserProfileIcon } from '@/shared/ui/user-profile-icon/UserProfileIcon';
import { OrderButton } from './OrderButton';

interface OrderItemProps {
  member: PolicyOrderMember;
  index: number;
  isEditing: boolean;
  onMove: (index: number, direction: 'up' | 'down') => void;
  isLast: boolean;
}

export const OrderItem = ({ member, index, isEditing, onMove, isLast }: OrderItemProps) => {
  const myId = useUserStore().userId;

  return (
    <Draggable draggableId={`item${member.id}`} index={index} isDragDisabled={!isEditing}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'flex items-center justify-between p-3.5 gap-3 rounded-2xl border transition-all',
            snapshot.isDragging
              ? 'shadow-lg border-purple-500 bg-purple-100'
              : 'bg-gray-100 border-transparent',
            !isEditing ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
          )}
        >
          <div className="flex items-center gap-4">
            <div>
              <MoreIcon className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-sm font-bold text-purple-500 rounded-2xl bg-purple-100 w-7 h-7 flex items-center justify-center">
              {index + 1}
            </span>
            <UserProfileIcon type={myId === member.id ? 'MAIN' : 'OTHER'} />
            <div>
              <p className="font-medium text-gray-900">{member.name}</p>
              <p className="text-xs text-gray-500">한도 {member.limit.toFixed(1)}GB</p>
            </div>
          </div>

          {isEditing && (
            <div className="flex flex-col items-center gap-0.5 cursor-auto">
              <OrderButton
                direction="up"
                disabled={index === 0}
                onClick={() => onMove(index, 'up')}
              />
              <OrderButton
                direction="down"
                disabled={isLast}
                onClick={() => onMove(index, 'down')}
              />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};
