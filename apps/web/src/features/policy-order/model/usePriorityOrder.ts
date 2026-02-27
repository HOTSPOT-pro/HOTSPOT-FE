import type { DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';
import type { PolicyOrderMember } from '@/entities/policy-order';

export const usePriorityOrder = (initialMembers: PolicyOrderMember[]) => {
  const [members, setMembers] = useState<PolicyOrderMember[]>(initialMembers);

  const handleDragEnd = (result: DropResult, isEditing: boolean) => {
    if (!(result.destination && isEditing)) return;

    const items = [...members];
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (reorderedItem) {
      items.splice(result.destination.index, 0, reorderedItem);
      setMembers(items);
    }
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= members.length) return;

    const items = [...members];
    [items[index], items[nextIndex]] = [items[nextIndex]!, items[index]!];
    setMembers(items);
  };

  return { handleDragEnd, members, moveStep };
};
