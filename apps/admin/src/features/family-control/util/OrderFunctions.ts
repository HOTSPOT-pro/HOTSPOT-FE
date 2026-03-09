import type { MemberControlItem } from '@/domains/member-control';

// 리스트의 우선순위 숫자를 1부터 재할당하는 함수
export const refreshPriorityOrder = (list: MemberControlItem[]): MemberControlItem[] =>
  list.map((item, index) => ({
    ...item,
    priorityOrder: index + 1,
  }));

// 드래그 앤 드롭 결과에 따른 리스트 재정렬 함수
export const reorderList = (
  list: MemberControlItem[],
  startIndex: number,
  endIndex: number,
): MemberControlItem[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  if (removed) {
    result.splice(endIndex, 0, removed);
  }
  return refreshPriorityOrder(result);
};

// 위/아래 버튼 클릭 시 리스트 재정렬 함수
export const moveListStep = (
  list: MemberControlItem[],
  index: number,
  direction: 'UP' | 'DOWN',
): MemberControlItem[] => {
  const newIndex = direction === 'UP' ? index - 1 : index + 1;
  if (newIndex < 0 || newIndex >= list.length) return list;

  const result = Array.from(list);
  const [currentItem, targetItem] = [result[index], result[newIndex]];

  if (currentItem && targetItem) {
    result[index] = targetItem;
    result[newIndex] = currentItem;
  }
  return refreshPriorityOrder(result);
};
