import type { DropResult } from '@hello-pangea/dnd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import type { FamilyPriority, MemberPriority } from '@/entities/policy-order/model/type';
import { patchPriorityPriorityClientApi } from '../api/patchFamilyPriorityClientApi';
import { getSortedMembers } from '../lib/memberSorting';

export const usePriorityOrder = (initial: FamilyPriority) => {
  const [members, setMembers] = useState<MemberPriority[]>(() =>
    getSortedMembers(initial.memberPriorities),
  );

  useEffect(() => {
    setMembers(getSortedMembers(initial.memberPriorities));
  }, [initial]);

  const handleDragEnd = (result: DropResult, isEditing: boolean) => {
    if (!(result.destination && isEditing)) return;
    if (result.destination.index === result.source.index) return;
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

  const queryClient = useQueryClient();

  const updatePriority = useMutation({
    mutationFn: () =>
      patchPriorityPriorityClientApi({
        familyId: initial.familyId,
        memberPriorities: members.map((m, idx) => ({
          priority: idx + 1,
          subId: m.subId,
        })),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['policyPerFamily'] });
    },
  });

  return { handleDragEnd, members, moveStep, updatePriority };
};
